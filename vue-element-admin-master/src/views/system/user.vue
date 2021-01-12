<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddUser">新建用户</el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户" width="220">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户姓名" width="220">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.roleName == undefined || scope.row.roleName == ''?"无":scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="所属分组">
        <template slot-scope="scope">
          {{ scope.row.groupName == undefined || scope.row.groupName == ''?"无":scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改用户':'新建用户'">
      <el-form id="thisForm" ref="ruleForm" :model="user" status-icon :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="账户" prop="account">
          <el-input v-model="user.account" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入" />
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

        <el-form-item v-if="dialogType==='edit'" label="旧密码" prop="oldpassword">
          <el-input v-model="user.oldpassword" type="password" placeholder="请输入6~15个字符或数字" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="newpassword">
          <el-input v-model="user.newpassword" type="password" placeholder="请输入6~15个字符或数字" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input v-model="user.rePassword" type="password" placeholder="请输入确认密码" autocomplete="off" />
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
import path from 'path'
import { deepClone } from '@/utils'
import md5 from 'js-md5'
import {
  getUsers,
  getUser,
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        console.log('xinxi')
        callback(new Error('请输入旧密码！'))
      } else if (this.user.oldpassword.length < 6 || this.user.oldpassword.length > 15) {
        callback(new Error('请输入正确的长度！'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置密码！'))
      } else if (this.user.newpassword.length < 6 || this.user.newpassword.length > 15) {
        callback(new Error('请输入正确的长度！'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.user.newpassword) {
        console.log(value, this.user.newpassword)
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    var validateEnter = (rule, value, callback) => {
      if (value !== '' && this.user.roleId === '1') {
        callback()
      } else {
        callback()
      }
    }
    return {
      user: Object.assign({}, defaultUser),
      usersList: [],
      roleList: [],
      orgList: [],
      groupList: [],
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
        }],
        oldpassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        newpassword: [{
          validator: validatePass3,
          trigger: 'blur'
        }],
        rePassword: [{
          validator: validatePass2,
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
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.getUsers()
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

    async getUsers() {
      var orgId = this.$store.getters.orgId
      const res = await getUsers(orgId)
      this.usersList = res.data
    },
    async getRoleList() {
      var orgId = this.$store.getters.orgId
      const res = await getRoleList(this.$store.getters.roles[0], orgId)
      this.roleList = res.data
    },
    handleAddUser() {
      this.getRoleList()
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async handleEdit(scope) {
      this.getRoleList()
      const res = await getOrgList(this.$store.getters.orgId, this.user.roleId)
      this.orgList = res.data
      const res2 = await getGroupList(this.user.orgId)
      this.groupList = res2.data

      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
      console.log(this.user)
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
          this.user.id = data
          this.usersList.push(this.user)
        }

        const {
          id,
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

    #thisForm{
      .el-select--medium{
        width: 100%;
      }
    }
  }
</style>
