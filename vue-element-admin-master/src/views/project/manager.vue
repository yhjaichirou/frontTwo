<template>
  <div class="app-container">
    <div class="project-body">
      <div class="left-project">

        <div class="header header--hidden">
          <div class="card-header-title"><span class="ng-star-inserted"> 项目 </span></div>
          <div>
            <i class="el-icon-finished"></i>
          </div>
        </div>

        <input type="text" v-model="searchContent" autocomplete="off" class="el-input__inner" placeholder="搜索项目" v-on:input="searchProject"/>
        <el-radio-group v-model="searchStatus" size="mini" @change="searchProject">
              <el-radio-button label="" value="0">全部</el-radio-button>
              <el-radio-button label="1" value="1">未完成</el-radio-button>
              <el-radio-button label="2" value="2">已完成</el-radio-button>
        </el-radio-group>
        <ul>
          <li class="ng-star-inserted"  v-for="item in projectList" :key="item.id" @click="clickProject(item.id)">
            <a class="section-item" routerlinkactive="active" skiplocationchange="true" href="/mission/work-timeline">
              <svg-icon icon-class="project2" />{{item.name}}</a>
          </li>
        </ul>

      </div>
      <div class="right-project">
        <div class="right-btns">
          <div style="display: flex;align-items: center;justify-content: center;">
            <svg-icon icon-class="setting" style="width: 1.5em;height: 1.5em;" />设置
          </div>

        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="项目概览" name="first">

            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer"></div>
                <div>基本信息</div>
              </div>

              <div class="manager-card-content">

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目名称:</span>
                    ass
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目:</span>
                    2020-12-20
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                    --
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目编码:</span><span class="text-muted">XG-nmg123123</span>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">负责人:</span>
                    ass
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                    2020-12-20
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                    --
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目编码:</span><span class="text-muted">XG-nmg123123</span>
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管部门:</span>
                    发改委
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管负责人:</span>
                    2020-12-20
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管人联系电话:</span>
                    18247407227
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目成熟度:</span><span class="text-muted">续建</span>
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头单位:</span>
                    发改委
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头领导:</span>
                    张国
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">对接时间:</span>
                    2020-12-20
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">协调负责人:</span>
                    张国时
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人:</span>
                    发改委
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人电话:</span>
                    16645641222
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目建设阶段:</span>
                    执行阶段
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">完成时间:</span>
                    2020-12-20
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目描述:</span><span class="text-muted">暂无</span>
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property align-items-start" style="display:flex;align-items: center;">
                    <span class="project-property-item-name project-basic-property-item-name">当前状态:</span>
                    <div class="flex-se1">
                      <span class="circle circle-success"></span>
                      <span class="ml-1">正常</span>
                      <el-button type="primary" size="mini" round>更新</el-button>
                    </div>
                  </div>

                </div>

              </div>


            </div>
            <span class="project-basic-property-line"></span>

            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer"></div>
                <div>其他信息</div>
              </div>

              <div class="manager-card-content">
                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">产业类型:</span>
                    能源行业
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                    2020-12-20
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                    --
                  </div>
                </div>

                <div class="project-basic-property align-items-start"><span class="project-property-item-name project-basic-property-item-name">项目描述:</span><span
                    class="text-muted">暂无</span>
                </div>

                <span class="project-basic-property-line"></span>

                <div class="project-basic-property align-items-start"><span class="project-property-item-name project-basic-property-item-name">项目描述:</span><span
                    class="text-muted">暂无</span>
                </div>

              </div>
            </div>


          </el-tab-pane>
          <el-tab-pane label="任务展示" name="second">任务展示</el-tab-pane>
          <el-tab-pane label="甘特图" name="third">甘特图</el-tab-pane>
          <el-tab-pane label="项目文件" name="fourth">项目文件</el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
  import path from 'path'
  import { deepClone } from '@/utils'
  import md5 from "js-md5"
  import { getAllProject, getProject, addProject, updateProject, deleteProject } from '@/api/project'

  const defaultUser = {
    id: '',
    userName: '',
    account: '',
    password: ''
  }

  export default {
    data() {
      return {
        orgId:"",
        activeName: 'second',
        projectList:[],
        thisProject:{},
        searchContent:"",
        searchStatus:1,
        user: Object.assign({}, defaultUser),
        usersList: [],
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false

      }
    },
    computed: {
      routesData() {
        return this.routes
      }
    },
    created() {
      // this.getProjectList()
      this.orgId = this.$store.getters.orgId
    },
    methods: {
      async getProjectList(){
        const res = await getAllProject(this.orgId,this.searchContent,this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async searchProject(){
        const res = await getAllProject(this.orgId,this.searchContent,this.searchStatus)
        this.projectList = res.data
         console.log(this.projectList)
      },
      async clickProject(id){
        console.log("项目ID:",id);
        const res = await getProject(id);
        this.thisProject = res.data;
         console.log("项目ID:",this.thisProject)
      }
    }
  }
</script>
<style lang="scss" scoped>
  i {
    transition: color .15s linear;
  }

  i:hover {
    color: #5cb6ff;
  }
  .app-container .left-project .el-radio-button__inner {
          padding: 6px 10px !important;
          font-size: 11px;
          border-radius: 0;
          border: none;
      }
  .app-container {
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);

    .project-body {
      width: 100%;
      background-color: white;
      display: flex;
      border: 1px solid #eee;
    }

    svg {
      margin-right: 7px;
    }

    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }

    .left-project {
      paddding-left:0;
      border-right:2px solid #3A71A8;
      width: 200px;
      ul {
        padding-left: 0;
      }
      ul li {
        list-style-type: none;
      }
      .el-radio-button__inner {
          padding: 6px 10px !important;
          font-size: 11px;
          border-radius: 0;
          border: none;
      }
      .header {
        height: 50px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;
        color: #333;
      }

      .el-input__inner {
        height: 28px;
        line-height: 28px;
        margin: 0px 10px;
        width: 150px;
        padding: 2px 10px;
        font-size: 11px;
      }

      .toc-search-area {
        padding: 0 20px 10px;

      }

      .section-item {
        padding: 8px 8px 15px 8px;
        color: #666;
        display: block;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-transition: -webkit-box-shadow .2s;
        transition: -webkit-box-shadow .2s;
        transition: box-shadow .2s;
        transition: box-shadow .2s, -webkit-box-shadow .2s;
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
      width: 100%;
      position: relative;

      .right-btns {
        position: absolute;
        right: 8px;
        top: 7px;
        z-index: 2;
        cursor: pointer;
      }

      .right-btns:hover {
        color: #4e8afa;
      }

      .project-basic-property-line {
        display: block;
        margin: 10px 0;
        border-bottom: solid 1px #f3f3f3;
      }

      .manager-card {
        padding: 5px 10px;
        color: #666;

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
                color: #888;
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
  }
</style>
