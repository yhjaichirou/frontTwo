<template>
  <div class="app-container">
    <div class="container-header">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="first">
          <div class="container-body">

            <el-form ref="ruleForm" :model="userInfo" label-width="80px">
              <div class="avater">
                <el-image :src="userInfo.avater?userInfo.avater:defulatAvater" fit="fill" @click="addFj()" @onError="this.defulatAvater">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <input id="openfj" ref="openfj" type="file" style="display:none;" @change="getFile($event)">
              </div>

              <el-form-item label="账户" prop="account">
                <el-input v-model="userInfo.account" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="用户姓名" prop="name">
                <el-input v-model="userInfo.name" placeholder="请输入" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmUser('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>

          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div class="container-body">
            <el-form ref="ruleForm" :model="userInfo" label-width="80px">
              <el-form-item label="旧密码" prop="password">
                <el-input v-model="userInfo.oldpassword" placeholder="请输入旧密码" type="password" />
              </el-form-item>
              <el-form-item label="密码" prop="newpassword">
                <el-input v-model="userInfo.newpassword" type="password" placeholder="请输入6~15个字符或数字" autocomplete="off" />
              </el-form-item>
              <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="userInfo.rePassword" type="password" placeholder="请输入确认密码" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmUser2('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

import md5 from 'js-md5'
import $ from 'jquery'
import {
  getUserInfo,
  updateUser
} from '@/api/user'

const defaultUser = {
  id: '',
  name: '',
  account: '',
  password: '',
  oldpassword: '',
  newpassword: '',
  rePassword: '',
  roleId: '',
  orgId: '',
  groupId: '',
  avater: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  avaterReal: ''
}
const baseURL = process.env.VUE_APP_BASE_API
const defulatAvater = '/avater.png'
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
      } else if (this.userInfo.oldpassword.length < 6 || this.userInfo.oldpassword.length > 15) {
        callback(new Error('请输入正确的长度！'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置密码！'))
      } else if (this.userInfo.newpassword.length < 6 || this.userInfo.newpassword.length > 15) {
        callback(new Error('请输入正确的长度！'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.userInfo.newpassword) {
        console.log(value, this.userInfo.newpassword)
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      defulatAvater: defulatAvater,
      avaterThum: '',
      activeName: 'first',
      userInfo: Object.assign({}, defaultUser),
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
      avaterFile: '',
      ruleForm: {
        name: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        account: [{
          validator: validateAccount,
          trigger: 'blur'
        }]
      },
      ruleForm2: {
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

  },
  created() {
    this.getUserInfo()
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
    // 上传
    async addFj() {
      this.$refs.openfj.dispatchEvent(new MouseEvent('click'))
    },
    getFile($event) {
      // var that = this
      const inputFile = this.$refs.openfj.files[0]
      if (inputFile) {
        // if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
        //   alert('不是有效的图片文件！')
        //   return
        // }
        this.avaterFile = $event.target.files[0]
        this.submitUpload(inputFile)
        // this.avaterFile = {
        //   fileName: inputFile.name,
        //   inputFile: $event.target.files[0]
        // })
      } else {
        return
      }
    },
    // 执行上传
    submitUpload(thumfile) {
      var formData = new FormData() // new一个formData事件
      formData.append('file', this.avaterFile) // 将file属性添加到formData里
      var that = this
      $.ajax({
        url: baseURL + 'project/uploadFJ',
        method: 'post',
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        headers: {
          'X-Token': getToken(), // 值得注意的是，这个地方一定要把请求头更改一下
          'agentId': that.$store.getters.userId
        },
        success: function(res) {
          // var isUpload = false
          if (res.code === 200) {
            that.$message({
              type: 'success',
              message: '上传成功!'
            })
            that.userInfo.avaterReal = res.data
            // 更新路径
            var read = new FileReader()
            read.readAsDataURL(thumfile)
            read.onload = function() {
              that.userInfo.avater = read.result
            }
            // isUpload = true
          } else {
            // isUpload = false
          }
        }
      })
    },
    async getUserInfo() {
      const res = await getUserInfo(this.$store.getters.userId)
      this.userInfo = res.data
    },
    async confirmUser(formName) {
      var isComfirm = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          isComfirm = true
        } else {
          this.$message.error('提交信息错误！')
          return false
        }
      })
      if (isComfirm) {
        this.userInfo.userName = this.userInfo.name
        this.userInfo.avater = this.userInfo.avaterReal
        var usernew = await updateUser(this.userInfo)
        console.log(usernew)
        this.$message.success('保存成功！')
      }
    },

    async confirmUser2(formName) {
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
        this.userInfo.password = md5(this.userInfo.newpassword)
        var usernew = await updateUser(this.userInfo)
        console.log(usernew)
        this.$message.success('保存成功！')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);
    flex-direction: column;

    .container-header {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      background-color: white;

      .el-tabs--top {
        width: 100%;
      }

      ::v-deep .el-tabs__content {
        border: 1px solid #eee;
        padding: 20px;
        border-top: none;
      }
    }

    .container-body {
      background-color: white;
      width: 600px;
      margin: auto;

      .avater {
        width: 100%;
        height: 100px;
        text-align: center;
        margin-bottom: 60px;
        margin-top: 20px;

        ::v-deep img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
    }

  }
</style>
