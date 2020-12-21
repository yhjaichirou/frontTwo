<template>
  <div class="app-container">
    <div class="left-project">
      <ul>

        <li class="ng-star-inserted"><a class="section-item" routerlinkactive="active" skiplocationchange="true" href="/mission/work-timeline">
            <!----><i class="item-icon font-size-md wtf wtf-work-timeline text-primary ng-star-inserted"></i>时间视图
            <!----></a>
        </li>
        <li class="ng-star-inserted"><a class="section-item" routerlinkactive="active" skiplocationchange="true" href="/mission/work-timeline">
            <!----><i class="item-icon font-size-md wtf wtf-work-timeline text-primary ng-star-inserted"></i>时间视图
            <!----></a>
        </li>
        <li class="ng-star-inserted"><a class="section-item" routerlinkactive="active" skiplocationchange="true" href="/mission/work-timeline">
            <!----><i class="item-icon font-size-md wtf wtf-work-timeline text-primary ng-star-inserted"></i>时间视图
            <!----></a>
        </li>

      </ul>

    </div>
    <div class="right-project">
      <div class="top-project-menu">

      </div>
      <div class="project-body">

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .app-container {
    display: flex;

    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }

    .left-project {
      width: 200px;
      .section-item {
          color: #666;
          display: block;
          padding: 9px 20px 9px 39px;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-transition: -webkit-box-shadow .2s;
          transition: -webkit-box-shadow .2s;
          transition: box-shadow .2s;
          transition: box-shadow .2s,-webkit-box-shadow .2s;
          border-right: 4px solid transparent;
      }
    }

    .right-project {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      overflow-wrap: break-word;

    }
  }
</style>
<script>
  import path from 'path'
  import {
    deepClone
  } from '@/utils'
  import md5 from "js-md5"
  import {
    getUsers,
    addUser,
    deleteUser,
    updateUser
  } from '@/api/user'

  const defaultUser = {
    id: '',
    userName: '',
    account: '',
    password: ''
  }

  export default {
    data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账户信息不能为空！'));
        } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
          callback(new Error('手机号格式不正确！'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          console.log("xinxi")
          callback(new Error('请输入密码！'));
        } else if (this.user.password.length < 6 || this.user.password.length > 15) {
          callback(new Error('请输入正确的长度！'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'));
        } else if (value !== this.user.rePassword) {
          console.log(this.user.rePassword)
          callback(new Error('两次输入密码不一致！'));
        } else {
          callback();
        }
      };
      return {
        user: Object.assign({}, defaultUser),
        usersList: [],
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
          password: [{
            validator: validatePass,
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
      handleAddUser() {
        this.user = Object.assign({}, defaultUser)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.checkStrictly = true
        this.user = deepClone(scope.row)
        console.log(this.user)
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
          .then(async () => {
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
        var isComfirm = false;
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            isComfirm = true;
          } else {
            this.$message.error('提交信息错误！');
            return false;
          }
        });
        if (isComfirm) {
          const isEdit = this.dialogType === 'edit';
          if (isEdit) {
            this.user.password = md5(this.user.password)
            await updateUser(this.user)
            for (let index = 0; index < this.usersList.length; index++) {
              if (this.usersList[index].id === this.user.id) {
                this.usersList.splice(index, 1, Object.assign({}, this.user))
                break
              }
            }
          } else {
            this.user.roleId = this.$store.getters.roles[0]
            this.user.orgId = this.$store.getters.orgId
            this.user.password = md5(this.user.password)
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

