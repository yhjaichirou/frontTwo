<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <el-button :loading="loading" style="margin-left:16px;" :size="btnSize" type="warning" @click="handDownload">
      数据模板
      <a ref="handDownload" class="mr-3 btn btn-icon " title="下载模板" :href="temSrc"><i class="el-icon-download" /></a>
    </el-button>
    <el-button :loading="loading" style="margin-left:16px;" :size="btnSize" type="warning" @click="handleUpload">
      数据导入
    </el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'Xls',
  props: {
    temSrc: {
      type: String,
      default: ''
    },
    keyName: {
      type: Array,
      default: function() {
        return []
      }
    },
    mustField: {
      type: Array,
      default: function() {
        return []
      }
    },
    tranferFiled: {
      type: Array,
      default: function() {
        return {}
      }
    },
    btnSize: {
      type: String,
      default: ''
    },
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  created() {
    console.log(this.mustField)
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },

    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handDownload() {
      this.$refs['handDownload'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      console.log('导入结果：', this.excelData)
      var xheaders = header
      var xresults = results
      if (xheaders == null || xheaders.length === 0 || xresults == null || xresults.length === 0) {
        this.$message.error('Excel表信息错误！')
        return false
      }
      // 检查 字段 是否齐全必填字段是否填写
      var mustfiled = this.mustField
      var keyName = this.keyName
      for (var key in keyName) {
        // 判断 是否存在此字段
        var keyChinaName = keyName[key]['chinaName']
        if (xheaders.indexOf(keyChinaName) === -1) {
          this.$message.error('表头信息错误，请勿修改表头信息！')
          return false
        }
      }
      var xlsForms = []
      for (var key_ in xresults) {
        var xlsForm = {} // 封装字段去后台
        for (var key2 in keyName) {
          var keyChinaName2 = keyName[key2]['chinaName']
          if (!(Object.prototype.hasOwnProperty.call(xresults[key], keyChinaName2))) { // 不存在的字段
            // 判断是否是必填字段
            if (mustfiled.indexOf(keyChinaName2) !== -1) {
              this.$message.error('必填字段不能为空！‘' + keyChinaName2 + '’')
              return false
            } else {
              xlsForm[keyName[key2]['enName']] = ''
            }
          } else {
            var tranferFiledValue = this.tranferFiledFun({ 'k': keyName[key2]['enName'], 'v': xresults[key_][keyChinaName2] })
            xlsForm[keyName[key2]['enName']] = tranferFiledValue
          }
        }
        xlsForms.push(xlsForm)
      }
      this.onSuccess && this.onSuccess(xlsForms)
    },
    // 转换字段
    tranferFiledFun(tranObj) {
      if (tranObj && tranObj.k !== '') {
        console.log('ssss', this.tranferFiled)
        var ss = this.tranferFiled
        Object.getOwnPropertyNames(ss).forEach(function(key) {
          if (tranObj.k === key) {
            for (var i in ss[key]) {
              console.log(ss[i])
              if (ss[i]['id'] === tranObj.v) {
                return ss[key][i]['value']
              }
            }
            return tranObj.v
          } else {
            return tranObj.v
          }
        })
      } else {
        return ''
      }
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
