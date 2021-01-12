<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <div class="manager-card">
        <div class="manager-header">
          <div class="manager-bluer" />
          <div>预警配置</div>
        </div>

        <div class="manager-card-content">
          <el-form-item label="预警期限">
            <el-col :span="12">
              <el-input v-model="form.yjDay" tyle="number" :value="yjDay" placeholder="请填写项目临近预警天数" />
            </el-col>
            <el-col class="line" :span="2"><span>天</span></el-col>

          </el-form-item>

          <el-form-item label="通知时间">
            <el-col :span="24">
              <el-time-picker v-model="form.yjTime" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
            </el-col>
          </el-form-item>

          <el-form-item label="预警类型">
            <el-checkbox-group v-model="form.yjType">
              <el-checkbox label="项目预警" name="1" />
              <el-checkbox label="任务预警" name="2" />
              <el-checkbox label="逾期预警" name="3" />
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>

      <div class="manager-card">
        <div class="manager-header">
          <div class="manager-bluer" />
          <div>短信配置</div>
        </div>

        <div class="manager-card-content">
          <el-form-item label="开通短信">
            <el-switch v-model="form.mesMessage" />
          </el-form-item>
          <el-form-item label="短信默认通知人员">
            <el-select v-model="form.mesDefaultPel" multiple placeholder="请选择">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>

        </div>
      </div>

      <div class="manager-card">
        <div class="manager-header">
          <div class="manager-bluer" />
          <div>单位配置</div>
        </div>

        <div class="manager-card-content">
          <el-form-item label="单位人员上限">
            <el-col :span="20">
              <el-input v-model="form.dwMaxPel" tyle="number" :value="yjDay" placeholder="请输入单位最多人数" />
            </el-col>
            <el-col class="line" :span="2"><span>人</span></el-col>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit()">保 存</el-button>
    </div>
  </div>

</template>

<script>
import { getConfig, updateConfig, getUserList } from '@/api/config'
export default {
  data() {
    return {
      yjDay: 30,
      userList: [],
      form: {
        id: '',
        yjDay: 30,
        yjTime: '',
        yjType: [],
        mesMessage: false,
        mesdefaultPel: '',
        dwMaxPel: ''
      }
    }
  },
  created() {
    this.orgId = this.$store.getters.orgId
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const res = await getConfig()
      if (res.data != null) {
        this.form = res.data
        this.form.mesMessage = res.data.mesMessage === 1
        this.form.mesDefaultPel = this.form.mesDefaultPel != null ? JSON.parse(this.form.mesDefaultPel) : ''
      }
      const res2 = await getUserList()
      this.userList = res2.data
      console.log(this.userList)
    },
    async onSubmit() {
      const res = await updateConfig(this.form)
      this.$message({
        type: 'success',
        message: res.msg
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {

    .manager-card {
      padding: 10px 10px;
      color: #666;
      background-color: white;

      .manager-header {
        display: flex;

        .manager-bluer {
          width: 3px;
          background-color: #4e8afa;
          margin-right: 5px;
        }
      }

      .manager-card-content {
        padding: 10px 20px 20px;

        .d-flex {
          display: flex !important;

          .project-basic-property {
            display: flex;
            margin-left: 0;
            margin-bottom: 25px;
            align-items: center;

            .project-property-item-name {
              color: #9c9c9c;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-right: 10px;
            }

            .circle {
              border-radius: 50%;
              vertical-align: middle;
              background: #aaa;
              height: 18px;
              width: 18px;
              display: inline-block;
            }

            .circle-ing {
              background-color: #71cd33;
            }

            .circle-success {
              background-color: #30B08F;
            }

            .circle-error {
              background-color: brown;
            }
          }

          .project-basic-property-border {
            margin-left: 26px;
            margin-right: 26px;
            border-right: solid 1px #eee;
          }
        }

        .project-basic-property-line {
          display: block;
          margin: 30px 0;
          border-bottom: solid 1px #f3f3f3;
        }
      }

    }
  }
</style>
<style>

</style>
