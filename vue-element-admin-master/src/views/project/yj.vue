<template>
  <div class="app-container">
    <div class="container-header">
      <el-input style="width: 20%;" placeholder="请输入" v-model="searchContent" @input="searchProject">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-radio-group class="yhj-el-radio-group" v-model="searchStatus" style="margin-bottom: 30px;" @change="searchProject"
        placeholder="搜索预警内容">
        <el-radio-button label="0" value="0">全部预警</el-radio-button>
        <el-radio-button label="1" value="1">我负责的预警</el-radio-button>
        <el-radio-button label="2" value="2">进行中的预警</el-radio-button>
        <el-radio-button label="3" value="3">已完成的预警</el-radio-button>
      </el-radio-group>
    </div>
    <div class="project-body">
      <el-table :data="yjList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="预警名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="预警类型" width="220">
          <template slot-scope="scope">
            {{ scope.row.typeStr }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="预警描述">
          <template slot-scope="scope">
            {{ scope.row.stip }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="预警时间">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    getYjs
  } from '@/api/yj'
  export default {
    data() {
      return {
        orgId: '',
        showContainer: true,
        tabPosition: "0",
        searchContent: "",
        searchStatus: '0',
        yjList: [],
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
      this.getYjs()
    },
    methods: {
      async getYjs() {
        const res = await getYjs(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      async searchProject() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
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
<style>
  .yhj-el-radio-group {
    margin: 0px !important;
  }

  .padding0 {
    padding: 0 !important;
  }

  .width100 {
    width: 100% !important;
  }
</style>
