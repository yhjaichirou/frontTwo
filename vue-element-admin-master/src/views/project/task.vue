<template>
  <div v-if="showContainer" class="app-container">
    <div class="container-header">
      <el-input style="width: 20%;" placeholder="请输入内容" v-model="searchContent" @input="searchProject">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-radio-group class="yhj-el-radio-group" v-model="searchStatus" style="margin-bottom: 30px;" @change="searchProject"
        placeholder="搜索项目">
        <el-radio-button label="0" value="0">全部任务</el-radio-button>
        <el-radio-button label="1" value="1">我负责的任务</el-radio-button>
        <el-radio-button label="2" value="2">进行中的任务</el-radio-button>
        <el-radio-button label="3" value="3">已完成的任务</el-radio-button>
      </el-radio-group>
    </div>
    <div class="project-body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in projectList">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div class="yhj-task-card-text">
              <span>{{item.name}}</span>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目负责人</span><span class="yhj-card-span-v">{{item.proManagerName}}</span>
              </div>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目开始时间</span><span class="yhj-card-span-v">{{item.startDateStr}}</span>
              </div>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目状态</span><span class="yhj-card-span-v">
                  <i :class="item.status==2?statusColor2:item.status==3?statusColor3:item.status==4?statusColor4:item.status==7?statusColor7:statusColor1"></i>{{item.proManagerName}}</span>
              </div>
              <div class="bottom clearfix">
                <time class="time"></time>
                <el-button type="text" class="button">查看报表</el-button>
                <el-button type="text" class="button">
                  <svg-icon icon-class="browse" @click="openThisTask(item.id)" />
                </el-button>

              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>

    </div>
  </div>
  <div v-else class="app-container">
    <div class="container-header">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </div>
    <div class="project-body padding0">
      <el-tabs type="border-card" class="width100" v-model="activeFirst" @tab-click="handleFirstClick">
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-date"></i>项目概况</span>
          <el-tabs v-model="activeSecond" @tab-click="handleSecondClick">
            <el-tab-pane label="信息概况" name="1">
              <div class="tabs-second-container">

                  <div class="manager-card-content">
                    <div class="d-flex">
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目名称:</span>
                        {{ project.name }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">产业类型:</span>
                        {{ project.categoryName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                        {{ project.startDateStr }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                        {{ project.completeDateStr }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property align-items-start">
                        <span class="project-property-item-name project-basic-property-item-name">项目编码:</span><span class="text-muted">XG-nmg123123</span>
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管部门:</span>
                        {{ project.orgName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管负责人:</span>
                        {{ project.proManagerName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管人联系电话:</span>
                        {{ project.proManagerMobile }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property align-items-start">
                        <span class="project-property-item-name project-basic-property-item-name project-basic-property-item-name">项目成熟度:</span>
                        {{ project.maturityStr }}
                      </div>

                    </div>

                    <div class="d-flex">
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头单位:</span>
                        {{ project.leadenterName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头领导:</span>
                        {{ project.leaderName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">对接时间:</span>
                        {{ project.dockingDateStr }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">协调负责人:</span>
                        {{ project.coordinateName }}
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人:</span>
                        {{ project.enterManagerName }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人电话:</span>
                        {{ project.enterManagerMobile }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目建设阶段:</span>
                        {{ project.stage=="1"?"无所属":project.stage=="2"?"立项阶段":project.stage=="3"?"执行阶段":"完成阶段" }}
                      </div>
                      <div class="project-basic-property project-basic-property-border" />
                      <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">预计完成时间:</span>
                        {{ project.expectedDateStr }}
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="project-basic-property align-items-start">
                        <span class="project-property-item-name project-basic-property-item-name">项目描述:</span>
                        {{ project.content }}
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="project-basic-property align-items-start" style="display:flex;align-items: center;">
                        <span class="project-property-item-name project-basic-property-item-name">当前状态:</span>
                        <div class="flex-se1">
                          <span class="circle" :class="projectStatusClass" />
                          <span class="ml-1">{{ project.status==1?"进行中":project.status==2?"已完成":project.status==3?"逾期":project.status==7?"新建":project.status==8?"提交审批中":project.status==9?"审批失败":"审批通过" }}</span>
                          <el-button type="primary" size="mini" round @click="clickUpdateStatus">更新</el-button>
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="审核备" name="2">
              <div class="tabs-second-container">
                <div v-for="item in shbList"  class="el-steps-list">
                  <div class="el-steps-list-title">{{item.name}}</div>
                  <div class="el-steps-list-con">
                    <el-steps :active="item.index" finish-status="success"  simple>
                      <el-step :title="item.setp1"></el-step>
                      <el-step :title="item.setp2"></el-step>
                      <el-step :title="item.setp3"></el-step>
                    </el-steps>
                  </div>
                </div>


              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="任务列表" name="2">
          <el-table :data="taskList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="ID" width="60">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="任务名称" width="220">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="编号" width="220">
              <template slot-scope="scope">
                {{ scope.row.code }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="负责部门" width="220">
              <template slot-scope="scope">
                {{ scope.row.orgName }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="执行人" width="220">
              <template slot-scope="scope">
                {{ scope.row.executorName }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="开始时间" width="220">
              <template slot-scope="scope">
                {{ scope.row.startDateStr }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="开始时间" width="220">
              <template slot-scope="scope">
                {{ scope.row.endDateStr }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="状态" width="220">
              <template slot-scope="scope">
                {{ scope.row.statusStr }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane name="3">
          <span slot="label"><i class="el-icon-date"></i>我的任务</span>
          <el-table :data="taskMyList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="ID" width="60">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="任务名称" width="220">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="编号" width="220">
              <template slot-scope="scope">
                {{ scope.row.code }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="执行人" width="220">
              <template slot-scope="scope">
                {{ scope.row.executorName }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="开始时间" width="220">
              <template slot-scope="scope">
                {{ scope.row.startDateStr }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="结束时间" width="220">
              <template slot-scope="scope">
                {{ scope.row.endDateStr }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="状态" width="220">
              <template slot-scope="scope">
                {{ scope.row.statusStr }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleOpen(scope)">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>



    </div>
  </div>
</template>

<script>
  import {
    getAllProject,
    getProject,
    getProjectAboutSHB
  } from '@/api/project'
  import {
    getAllTasksOfProject,
    getAllTaskMyList
  } from '@/api/task'
  export default {
    data() {
      return {
        orgId:'',
        orgName:'',
        showContainer: true,
        tabPosition: "0",
        searchContent: "",
        searchStatus: '0',
        projectList: [],
        project: {},
        taskList: [],
        taskMyList: [],
        statusColor1: 'statusColor1 yhj-i',
        statusColor2: 'el-icon-circle-check',
        statusColor3: 'statusColor3 yhj-i',
        statusColor4: 'statusColor4 yhj-i',
        statusColor7: 'statusColor7 yhj-i',

        activeFirst: '1',
        activeSecond: '1',
        shbList: []
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
      this.getAllProject()
    },
    methods: {
      async openThisTask(projectId) {
        // this.$router.push("/project/taskDetail")
        const res = await getProject(projectId)
        this.project = res.data
        this.showContainer = false
        // this.$router.push({
        //   path: "/project/taskDetail",
        //   jquer:{id:1}
        // })
      },
      async getAllProject() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      async searchProject() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      async getProject(id) {
        this.currProjectIndex = id
        const res = await getProject(id)
        this.project = res.data
        this.projectStatusClass = this.project.status === 1 ? 'circle-ing' : this.project.status === 2 ?
          'circle-success' : 'circle-error'
      },
      goBack() {
        this.project = {}
        this.showContainer = true
      },

      async handleFirstClick(tab, event){
        if(tab.index === '1'){
          const res = await getAllTasksOfProject(this.orgId,this.project.id)
          this.taskList = res.data
        }else if(tab.index === '2'){
          console.log(tab.index)
          const res = await getAllTaskMyList(this.orgId,this.project.id)
          this.taskMyList = res.data
        }
      },
      async handleSecondClick(tab, event){
        if(tab.index === '1'){//审核备
          console.log(this.project)
          const res = await getProjectAboutSHB(this.project.id)
          this.shbList = res.data
        }
      },

      async handleOpen(scope){
        const res = await operation(this.project.id,scope.row.id)
        console.log(res)
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
