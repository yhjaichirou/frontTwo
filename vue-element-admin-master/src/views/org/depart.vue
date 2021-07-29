<template>
  <div class="app-container">
    <div class="container-header">
      <div style="display: flex;">
        <el-button type="primary" @click="addDepartEvent">新建部门</el-button>
        <xlsx
          :before-upload="xlsBeforeUpload"
          :on-success="xlsSuccess"
          tem-src="/xlsx/单位导入模板.xlsx"
          :must-field="xlsMustField"
          :tranfer-filed="tranferFiled"
          :key-name="keyName"
          btn-size=""
        />
      </div>
      <div class="search">
        <el-input v-model="searchContent" placeholder="请输入内容" @input="searchProject">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <!-- <el-radio-group
          v-model="searchStatus"
          class="yhj-el-radio-group2"
          style=""
          placeholder="搜索项目"
          @change="searchProject"
        > -->
        <!-- <el-radio-button label="0" value="0">全部任务</el-radio-button>
          <el-radio-button label="1" value="1">我负责的任务</el-radio-button> -->
        <!-- </el-radio-group> -->
      </div>
    </div>
    <div class="project-body">
      <el-table :data="departList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="单位名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="负责人">
          <template slot-scope="scope">
            {{ scope.row.manager }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="负责人电话">
          <template slot-scope="scope">
            {{ scope.row.managerMobile }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="属性">
          <template slot-scope="scope">
            {{ scope.row.propertyStr }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="行业类型">
          <template slot-scope="scope">
            {{ scope.row.typeStr }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="dataMap.pn"
        :page-sizes="[20, 50, 100]"
        :page-size="dataMap.ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataMap.total"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改单位':'新建单位'">
      <el-form ref="ruleForm" :model="depart" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="单位名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="depart.name" autocomplete="off" placeholder="请输入单位名称" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="负责人" prop="manager" :label-width="formLabelWidth">
                <el-input v-model="depart.manager" autocomplete="off" placeholder="请输入负责人" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="负责人电话" prop="managerMobile" :label-width="formLabelWidth">
                <el-input v-model="depart.managerMobile" autocomplete="off" placeholder="请输入负责人电话" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="所在地点" :label-width="formLabelWidth">
                <el-input v-model="depart.position" autocomplete="off" placeholder="请输入所在地点" />
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="currProperty===1" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="单位性质" prop="property" :label-width="formLabelWidth">
                <el-select v-model="depart.property" placeholder="请选择单位性质">
                  <el-option label="各级发改委" value="2" />
                  <el-option label="职能部门" value="3" />
                  <el-option label="企业" value="4" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="currProperty===2" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="单位性质" prop="property" :label-width="formLabelWidth">
                <el-select v-model="depart.property" placeholder="请选择单位性质" @change="handleProperChange()">
                  <el-option label="职能部门" value="3" />
                  <el-option label="企业" value="4" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="currProperty===3" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="单位性质" prop="property" :label-width="formLabelWidth">
                <el-select v-model="depart.property" placeholder="请选择单位性质">
                  <el-option label="企业" value="4" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="隶属关系" :label-width="formLabelWidth">
                <el-select v-model="depart.pid" placeholder="请选择隶属关系">
                  <el-option label="请选择" value="" />
                  <el-option v-for="(upitem,index) in upDapartList" :key="index" :label="upitem.name" :value="upitem.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="所属行业" :label-width="formLabelWidth">
                <el-cascader v-model="depart.typeArr" :options="typeList" :props="{ expandTrigger: 'hover' }" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmDepart('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import path from 'path'
import {
  deepClone
} from '@/utils'
import {
  importXls,
  getUpOrgs,
  getOrgtypes,
  getDepartList,
  addDepart,
  updateDepart,
  deleteDepart
} from '@/api/depart'
import xlsx from '@/components/YhjComponent/xlsx.vue'

const defaultDepart = {
  id: '',
  name: '',
  position: '',
  manager: '',
  managerMobile: '',
  status: '',
  capacityValue: '',
  level: '',
  pid: '',
  property: '',
  type: '',
  typeName: '',
  typeArr: []
}

export default {
  components: {
    xlsx
  },
  data() {
    var val_mobil = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入负责人电话！'))
      } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      keyName: [{
        'chinaName': '单位名称',
        'enName': 'name'
      }, {
        'chinaName': '单位负责人',
        'enName': 'manager'
      }, {
        'chinaName': '单位负责人电话',
        'enName': 'managerMobile'
      }, {
        'chinaName': '类型',
        'enName': 'property'
      }, {
        'chinaName': '所在位置',
        'enName': 'position'
      }, {
        'chinaName': '隶属单位ID',
        'enName': 'pid'
      }],
      xlsMustField: ['单位名称', '单位负责人', '单位负责人电话', '类型'],
      tranferFiled: {
        'property': [{
          'id': 1,
          'value': '市发改委'
        }, {
          'id': 2,
          'value': '各级发改委'
        }, {
          'id': 3,
          'value': '职能部门'
        }, {
          'id': 4,
          'value': '企业'
        }]
      },
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },
      orgId: '',
      upDapartList: [],
      typeList: [],
      searchContent: '',
      searchStatus: '',
      currProperty: true,
      depart: Object.assign({}, defaultDepart),
      departList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      formLabelWidth: '90px',
      rules: {
        name: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在 2 到 50 个字符',
          trigger: 'blur'
        }
        ],
        manager: [{
          required: true,
          message: '请输入负责人',
          trigger: 'blur'
        }],
        managerMobile: [{
          required: true,
          validator: val_mobil,
          trigger: 'blur'
        }],
        property: [{
          required: true,
          message: '请选择单位性质',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    // routesData() {
    //   return this.routes
    // }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.orgId = this.$store.getters.orgId
    this.currProperty = this.$store.getters.property
    this.getDepartList(1, 20)
    this.getOrgtypes()
  },
  methods: {
    async xlsSuccess(xlsValues) {
      console.log('导表返回', xlsValues)
      await importXls({
        'orgId': this.orgId,
        'data': xlsValues
      })
    },
    xlsBeforeUpload(rt) {
      console.log('导表qian返回', rt)
      return true
    },
    async getOrgtypes() {
      const res = await getOrgtypes(this.orgId)
      this.typeList = res.data
    },
    handleProperChange() {
      this.getUpOrgs()
    },
    async getUpOrgs() {
      const res = await getUpOrgs(this.depart.property)
      this.upDapartList = res.data
    },

    async handlePageSizeChange(val) {
      this.getDepartList(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.getDepartList(val, this.dataMap.ps)
    },
    async getDepartList(pn, ps) {
      const res = await getDepartList({
        'pn': pn,
        'ps': ps,
        'orgId': this.orgId,
        'searchContent': this.searchContent,
        '': this.searchStatus
      })
      this.departList = res.data.list
    },
    searchProject() {
      this.getDepartList(1, 20)
    },

    async addDepartEvent() {
      this.depart = Object.assign({}, defaultDepart)
      this.dialogType = 'new'
      this.dialogVisible = true
      // const res = await getOrgtypes()
      // this.typeList = res.data
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.depart = deepClone(scope.row)
      this.getUpOrgs()
      this.depart.property = this.depart.property + ''
      console.log(this.depart)
    },
    handleDelete({
      $index,
      row
    }) {
      this.$confirm('确定要删除吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteDepart(row.id)
          this.departList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async confirmDepart(formName) {
      const isEdit = this.dialogType === 'edit'
      var isGo = false

      this.$refs[formName].validate((valid) => {
        if (valid) {
          isGo = true
        } else {
          this.$message.error('提交信息错误！')
          return false
        }
      })
      if (isGo) {
        if (isEdit) {
          await updateDepart(this.depart)
          for (let index = 0; index < this.departList.length; index++) {
            if (this.departList[index].id === this.depart.id) {
              this.departList.splice(index, 1, Object.assign({}, this.depart))
              break
            }
          }
        } else {
          this.depart.orgId = this.orgId
          const {
            data
          } = await addDepart(this.depart)
          this.depart.id = data
          this.getDepartList(this.dataMap.pn, this.dataMap.ps)
          // this.departList.push(this.depart)
        }
        const {
          id,
          name,
          managerName
        } = this.depart
        this.dialogVisible = false
        this.$notify({
          title: '提交成功！',
          dangerouslyUseHTMLString: true,
          message: `
              <div>组织ID: ${id}</div>
              <div>组织名称: ${name}</div>
              <div>负责人: ${managerName}</div>
            `,
          type: 'success'
        })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  .app-container {

    .container-header {

      .yhj-el-radio-group2 {
        margin-left: 20px;
      }

      .lc-search-container {
        position: relative;
        width: 300px;
        padding: 0;
        float: left;

        .el-icon-search {
          position: absolute;
          top: 7px;
          left: 14px;
          color: #aaa;
          font-family: wtf !important;
          display: inline-block;
        }

        input {
          padding-left: 34px;
        }
      }
    }

    .project-body {
      height: 100%;
      padding: 20px;
      width: 100%;
      background-color: white;
      border: 1px solid #eee;
      overflow-x: hidden;
      overflow-y: auto;

      .el-table {
        margin-top: 0px !important;
      }

      .el-row {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        overflow: auto;

        .el-col {
          padding-top: 10px;
        }
      }
    }
  }
</style>
<style>
  .el-pagination {
    margin-top: 20px;
  }
</style>
