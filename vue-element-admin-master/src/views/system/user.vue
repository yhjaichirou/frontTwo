<template>
  <div class="app-container">
    <div class="container-header">
      <el-button type="primary" @click="handleAddUser">新建用户</el-button>
      <div class="search">
        <el-input v-model="searchContent" placeholder="请输入姓名" @input="search">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
    </div>
    <div class="project-body">
      <el-table :data="usersList" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户姓名" width="220">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户" width="220">
          <template slot-scope="scope">
            {{ scope.row.account }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            {{ scope.row.roleName == undefined || scope.row.roleName == ''?"无":scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属分组">
          <template slot-scope="scope">
            {{ scope.row.groupName == undefined || scope.row.groupName == ''?"无":scope.row.groupName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属组织" width="220">
          <template slot-scope="scope">
            {{ scope.row.orgName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.roleId!==1">
              <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
            </div>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改用户':'新建用户'">
      <el-form
        id="thisForm"
        ref="ruleForm"
        :model="user"
        status-icon
        :rules="rules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="账户" prop="account">
          <el-input v-model="user.account" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="user.roleId" placeholder="请选择角色" @change="changeRole">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="user.roleId!==''" label="单位" prop="orgId">
          <el-select v-model="user.orgId" placeholder="请选择单位" @change="changeOrg">
            <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="user.orgId!==''" label="分组" prop="groupId">
          <el-select v-model="user.groupId" placeholder="请选择单位">
            <el-option v-for="item in groupList" :key="item.id" :label="item.groupName" :value="item.id" />
          </el-select>
        </el-form-item>

        <!-- <div v-if="visiblePwd">
            <el-form-item v-if="dialogType==='edit'" label="旧密码" prop="oldpassword">
              <el-input v-model="user.oldpassword" type="password" placeholder="请输入6~15个字符或数字" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="newpassword">
              <el-input v-model="user.newpassword" type="password" placeholder="请输入6~15个字符或数字" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input v-model="user.rePassword" type="password" placeholder="请输入确认密码" autocomplete="off" />
            </el-form-item>
          </div> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import {
  deepClone
} from '@/utils'
import md5 from 'js-md5'
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getRoleList,
  getOrgList,
  getGroupList
} from '@/api/user'

const defaultUser = {
  id: '',
  userName: '',
  account: '',
  password: '',
  oldpassword: '',
  newpassword: '',
  rePassword: '',
  roleId: '',
  orgId: '',
  groupId: ''
}

export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账户信息不能为空！'))
      } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     console.log('xinxi')
    //     callback(new Error('请输入旧密码！'))
    //   } else if (this.user.oldpassword.length < 6 || this.user.oldpassword.length > 15) {
    //     callback(new Error('请输入正确的长度！'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validatePass3 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请设置密码！'))
    //   } else if (this.user.newpassword.length < 6 || this.user.newpassword.length > 15) {
    //     callback(new Error('请输入正确的长度！'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码！'))
    //   } else if (value !== this.user.newpassword) {
    //     console.log(value, this.user.newpassword)
    //     callback(new Error('两次输入密码不一致！'))
    //   } else {
    //     callback()
    //   }
    // }
    var validateEnter = (rule, value, callback) => {
      if (value !== '' && this.user.roleId === '1') {
        callback()
      } else {
        callback()
      }
    }
    return {
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },
      searchContent: '',
      loginRoleId: '',
      user: Object.assign({}, defaultUser),
      usersList: [],
      roleList: [],
      orgList: [],
      groupList: [],
      visiblePwd: true, // 密码块是否显示
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      ruleForm: {
        account: '',
        password: '',
        rePassword: ''
      },
      rules: {
        account: [{
          required: true,
          validator: validateAccount,
          trigger: 'blur'
        }],
        userName: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        roleId: [{
          required: true,
          message: '请选择所属角色',
          trigger: 'change'
        }],
        orgId: [{
          validator: validateEnter,
          trigger: 'change'
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
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.loginRoleId = this.$store.getters.roleId
    this.getUsers(1, 20)
  },
  methods: {
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
    async getUsers(pn, ps) {
      const res = await getUsers({ 'pn': pn, 'ps': ps, 'orgId': this.$store.getters.orgId, 'search': this.searchContent })
      this.usersList = res.data.list
    },
    async getRoleList() {
      const res = await getRoleList(this.$store.getters.orgId, this.$store.getters.roleId)
      this.roleList = res.data
    },
    search() {
      this.getUsers(1, 20)
    },
    async handlePageSizeChange(val) {
      this.getUsers(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.getUsers(val, this.dataMap.ps)
    },
    handleAddUser() {
      this.getRoleList()
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.visiblePwd = true
      this.dialogVisible = true
    },
    async handleEdit(scope) {
      this.getRoleList()
      this.user = deepClone(scope.row)
      console.log(this.user)
      const res = await getOrgList(this.$store.getters.orgId, this.user.roleId)
      this.orgList = res.data
      const res2 = await getGroupList(this.user.orgId)
      this.groupList = res2.data

      this.visiblePwd = false
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
    },
    async changeRole() {
      console.log(this.user.roleId)

      const res = await getOrgList(this.$store.getters.orgId, this.user.roleId)
      this.orgList = res.data
    },
    async changeOrg() {
      const res = await getGroupList(this.user.orgId)
      this.groupList = res.data
    },

    handleDelete({
      $index,
      row
    }) {
      this.$confirm('确定删除用户吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser(row.id)
          this.usersList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
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
        this.user.loginRole = this.loginRoleId
        const isEdit = this.dialogType === 'edit'
        this.user.password = md5(this.user.newpassword)
        if (isEdit) {
          await updateUser(this.user)
          for (let index = 0; index < this.usersList.length; index++) {
            if (this.usersList[index].id === this.user.id) {
              this.usersList.splice(index, 1, Object.assign({}, this.user))
              break
            }
          }
        } else {
          const {
            data
          } = await addUser(this.user)
          // this.user = data
          this.usersList.push(data)
        }

        const {
          account,
          password
        } = this.user
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>登录账户: ${account}</div>
              <div>密码: ${password}</div>
            `,
          type: 'success'
        })
      }
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent,
          path: '',
          noShowingChildren: true
        }
        return onlyOneChild
      }

      return false
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

    #thisForm {
      .el-select--medium {
        width: 100%;
      }
    }
  }
</style>
<style>
  .app-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .app-container .container-header{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 20px;
    background-color: white;
  }
  .app-container .project-body{
    height: calc(100% - 40px);
    padding: 20px;
    width: 100%;
    background-color: white;
    border: 1px solid #eee;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .app-container .project-body .el-table{
    margin-bottom: 20px;
  }
  .app-container .project-body .el-pagination {
    margin-top: 0px;
    margin-bottom: 20px;
  }
</style>
