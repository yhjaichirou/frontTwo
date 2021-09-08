<template>
  <div class="app-container">
    <div class="container-header">
      <el-input v-model="searchContent" style="width: 20%;" placeholder="请输入" @input="getDbList">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>

      <el-radio-group
        v-model="searchStatus"
        class="yhj-el-radio-group"
        style="margin-bottom: 30px;"
        placeholder="搜索督办的任务名称(可模糊)"
        @change="getDbList"
      >
        <el-radio-button label="0" value="0">全部</el-radio-button>
        <el-radio-button label="1" value="1">督办中</el-radio-button>
        <el-radio-button label="2" value="2">已处理</el-radio-button>
      </el-radio-group>
    </div>
    <div class="project-body">
      <el-table :data="dbList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="督办项目名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.proName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="督办任务名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.taskName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="督办时间" width="220">
          <template slot-scope="scope">
            {{ scope.row.dbTimeStr }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="督办组织">
          <template slot-scope="scope">
            {{ scope.row.dbCreateOrgName }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="督办人">
          <template slot-scope="scope">
            {{ scope.row.dbCreaterName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDeal(scope.row.id)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="dataMap.pn"
        :page-sizes="[20, 50, 100]"
        :page-size="dataMap.ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataMap.total"
        @size-change="handlePSChange"
        @current-change="handlePSChange"
      />
    </div>
  </div>
</template>

<script>
import {
  getDbList, dealDb
} from '@/api/task'
export default {
  data() {
    return {
      orgId: '',
      searchContent: '',
      searchStatus: '0',
      dbList: [],
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.orgId = this.$store.getters.orgId
    this.orgName = this.$store.getters.orgName
    this.getDbList()
  },
  methods: {
    async handlePSChange() {
      this.getDbList()
    },
    async getDbList() {
      const res = await getDbList({ pn: this.dataMap.pn, ps: this.dataMap.ps, dbOrg: this.orgId, search: this.searchContent, status: this.searchStatus })
      this.dbList = res.list
      this.dataMap.total = res.count
      console.log(this.dbList)
    },
    async handleDeal(id) {
      const res = await dealDb({ id: id })
      this.$message({
        type: 'success',
        message: res.msg || '操作成功'
      })
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
      display: flex;
      border: 1px solid #eee;
      overflow-x: hidden;
      overflow-y: auto;

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

      .yhj-task-card-text {
        padding: 14px;

        .yhj-card-row {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;

          .yhj-card-span {
            margin-left: 4px;
            color: cadetblue;
            border-left: 2px solid cadetblue;
            padding-left: 4px;
          }

          .yhj-card-span:first-child {
            margin-left: 0px;
          }

          .yhj-card-span-v {
            margin-left: 4px;
            display: flex;

            .yhj-i {
              width: 18px;
              background-color: #ca5858;
              height: 18px;
              display: inline-block;
              border-radius: 50%;
              box-shadow: 0 0 6px 2px #ca5858;
              border: none;
              margin-right: 10px;
            }

            .el-icon-circle-check {
              color: #1d9104;
              font-size: 22px;
            }

            .statusColor1 {
              background-color: #3bea15;
              box-shadow: 0 0 6px 2px #87f270;
            }

            .statusColor3 {
              background-color: #ca5858;
              box-shadow: 0 0 6px 2px #ca5858;
            }

            .statusColor4 {
              background-color: #7b7777;
              box-shadow: 0 0 6px 2px #b3b3b3;
            }

            .statusColor7 {
              background-color: #fbfbfb;
              box-shadow: 0 0 6px 2px #d9d9d9;
            }
          }

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

      /* 详情 */
      .tabs-second-container {
        padding: 15px;
        .el-steps-list{
          display: flex;
          justify-content: center;
          align-items: center;
          .el-steps-list-title{
            width: 120px;
          }
          .el-steps-list-con{
            width: 100%;
          }
        }
      }

      .svg-icon {
        width: 2em;
        height: 2em;
      }

      .image {
        width: 100%;
        display: block;
        height: 200px;
      }

    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    display: flex;
    justify-content: right;
    align-items: center;

    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
