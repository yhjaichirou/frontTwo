<template>
  <div class="app-container">
    <div class="container-header">
      <div style="display: flex;">
        <BtnList :btn-data="btnList" />
        <xlsx
          :before-upload="xlsBeforeUpload"
          :on-success="xlsSuccess"
          tem-src="/xlsx/成员导入模板.xlsx"
          :must-field="xlsMustField"
          :tranfer-filed="tranferFiled"
          :key-name="keyName"
          btn-size=""
        />
      </div>
      <div class="search">
        <el-input v-model="searchContent" placeholder="请输入成员" @input="search">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <!-- <el-radio-button label="0" value="0">全部任务</el-radio-button>
          <el-radio-button label="1" value="1">我负责的任务</el-radio-button> -->
        <!-- </el-radio-group> -->
      </div>
    </div>
    <div class="project-body">
      <el-table :data="peopleList" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="人员姓名" width="120">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="120">
          <template slot-scope="scope">
            {{ scope.row.mobile }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="header-center" label="身份证号">
          <template slot-scope="scope">
            {{ scope.row.idcard }}
          </template>
        </el-table-column> -->
        <el-table-column align="header-center" label="职务">
          <template slot-scope="scope">
            {{ scope.row.job }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否为领导" width="100">
          <template slot-scope="scope">
            {{ scope.row.isLeader }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="年龄" width="100">
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别" width="100">
          <template slot-scope="scope">
            {{ scope.row.sex }}
          </template> -->
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改人员':'新建人员'">
      <el-form ref="ruleForm" :model="people" status-icon :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="人员姓名" prop="name">
          <el-input v-model="people.name" placeholder="请输入人员姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="people.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <!-- <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="people.idcard" type="text" placeholder="请输入身份证号" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="职务" prop="job">
          <el-input v-model="people.job" type="text" placeholder="请输入职务" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否为领导">
          <el-radio v-model="people.isLeader" label="1">是</el-radio>
          <el-radio v-model="people.isLeader" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import path from 'path'
import { deepClone } from '@/utils'
import BtnList from '@/components/YhjComponent/btnList.vue'
import xlsx from '@/components/YhjComponent/xlsx.vue'
import {
  getPeopleList,
  // getPeople,
  deletePeople,
  importPelXls,
  addPeople,
  updatePeople
} from '@/api/depart'

const defaultPeople = {
  id: '',
  name: '',
  mobile: '',
  orgId: '',
  orgName: '',
  sex: '',
  job: '',
  age: '',
  status: '',
  openid: '',
  idcard: '',
  isLeader: '0'
}

export default {
  components: {
    BtnList, xlsx
  },
  data() {
    var validateMoblie = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    // var validateIdcard = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入身份证号！'))
    //   } else if (!(/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value))) {
    //     callback(new Error('身份证号不正确！'))
    //   } else {
    //     callback()
    //   }
    // }
    var that = this
    return {
      btnList: [
        {
          loading: '',
          btnSize: '',
          primary: 'primary',
          btnClass: '',
          name: '新建单位成员',
          clickName: 'click1',
          click: function() {
            that.handleAddPeople()
          }
        }
      ],
      loading: '',
      keyName: [{
        'chinaName': '人员名称',
        'enName': 'name'
      }, {
        'chinaName': '手机号',
        'enName': 'mobile'
      }, {
        'chinaName': '职务',
        'enName': 'job'
      }, {
        'chinaName': '是否领导',
        'enName': 'isLeader'
      }],
      xlsMustField: ['人员名称', '手机号', '职务', '是否领导'],
      tranferFiled: {},

      people: Object.assign({}, defaultPeople),
      peopleList: [],
      searchContent: '',
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },
      ruleForm: {
        name: '',
        mobile: '',
        // idcard: '',
        job: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          validator: validateMoblie,
          trigger: 'blur'
        }],
        // idcard: [{
        //   required: true,
        //   validator: validateIdcard,
        //   trigger: 'blur'
        // }],
        job: [{
          required: true,
          message: '请输入职位',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    console.log(this.aabtnList)
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.getPeopleList(1, 20)
  },
  methods: {
    async xlsSuccess(xlsValues) {
      var res = await importPelXls({
        'loginOrgId': this.$store.getters.orgId,
        'loginUserId': this.$store.getters.userId,
        'data': xlsValues
      }).catch(() => {
        this.loading.close()
      })
      this.$message({
        type: 'success',
        message: res.msg || '操作成功',
        duration: 5 * 1000
      })
      this.getPeopleList(this.dataMap.pn, this.dataMap.ps)
      this.loading.close()
    },
    xlsBeforeUpload(rt) {
      console.log('导表qian返回', rt)
      this.loading = this.$loading({
        lock: true,
        text: '导入中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      return true
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    async handlePageSizeChange(val) {
      this.getPeopleList(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.getPeopleList(val, this.dataMap.ps)
    },
    async getPeopleList(pn, ps) {
      console.log('res', pn, ps)
      const res = await getPeopleList({ 'pn': pn, 'ps': ps, 'orgId': this.$store.getters.orgId, 'search': this.searchContent })
      this.peopleList = res.data.list
    },
    search() {
      this.getPeopleList(this.dataMap.pn, this.dataMap.ps)
    },
    handleAddPeople() {
      this.people = Object.assign({}, defaultPeople)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.people = deepClone(scope.row)
      console.log(this.user)
    },

    async confirmUser(formName) {
      var isComfirm = false
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          isComfirm = true
        } else {
          this.$message.error('提交信息错误！')
          return false
        }
      })
      if (isComfirm) {
        const isEdit = this.dialogType === 'edit'
        var UUserCard = this.people.idcard
        if (!UUserCard) {
          this.people.sex = parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? '男' : '女'
          var myDate = new Date()
          var month = myDate.getMonth() + 1
          var day = myDate.getDate()
          var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
          if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) === month && UUserCard.substring(12, 14) <= day) {
            age++
          }
          this.people.age = age
        }
        if (isEdit) {
          await updatePeople(this.people)
          // for (let index = 0; index < this.peopleList.length; index++) {
          //   if (this.peopleList[index].id === this.people.id) {
          //     this.peopleList.splice(index, 1, Object.assign({}, this.people))
          //     break
          //   }
          // }
        } else {
          this.people.orgId = this.$store.getters.orgId
          const {
            data
          } = await addPeople(this.people)
          this.people.id = data
          // this.peopleList.push(this.people)
        }
        this.getPeopleList(this.dataMap.pn, this.dataMap.ps)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.dialogVisible = false
      }
    },
    handleDelete({
      $index,
      row
    }) {
      this.$confirm('确定删除该人员吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deletePeople(row.id)
          this.peopleList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    click1() {
      console.log('click1')
    },
    click2() {
      console.log('click2')
    }

  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }

  }
  .el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    margin: 0px auto !important;
    height: 50%;
  }
  .el-dialog .el-dialog__body{
    overflow: auto;
  }

</style>
