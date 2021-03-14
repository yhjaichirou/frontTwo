<template>
  <div v-if="showContainer==0" class="app-container">
    <div class="container-header">
      <el-input v-model="searchContent" style="width: 20%;" placeholder="请输入内容" @input="searchProject">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>

      <el-radio-group
        v-model="searchStatus"
        class="yhj-el-radio-group"
        style="margin-bottom: 30px;"
        placeholder="搜索项目"
        @change="searchProject"
      >
        <el-radio-button label="0" value="0">全部任务</el-radio-button>
        <el-radio-button label="1" value="1">我负责的任务</el-radio-button>
        <el-radio-button label="2" value="2">进行中的任务</el-radio-button>
        <el-radio-button label="3" value="3">已完成的任务</el-radio-button>
      </el-radio-group>
    </div>
    <div class="project-body">
      <el-row :gutter="20">
        <el-col v-for="item in projectList" :span="4">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div class="yhj-task-card-text">
              <span>{{ item.name }}</span>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目负责人</span><span class="yhj-card-span-v">{{ item.proManagerName }}</span>
              </div>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目开始时间</span><span class="yhj-card-span-v">{{ item.startDateStr }}</span>
              </div>
              <div class="yhj-card-row">
                <span class="yhj-card-span">项目状态</span><span class="yhj-card-span-v">
                  <i :class="item.status==2?statusColor2:item.status==3?statusColor3:item.status==4?statusColor4:item.status==7?statusColor7:statusColor1" />{{ item.proManagerName }}</span>
              </div>
              <div class="bottom clearfix">
                <time class="time" />
                <el-button type="text" class="button" @click="openGTT(item.id)">甘特图</el-button>
                <el-button type="text" class="button" @click="openReportFrom(item.id)">查看报表</el-button>
                <el-button type="text" class="button">
                  <svg-icon icon-class="browse" @click="openThisTask(item.id)" />
                </el-button>

              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" />
        </el-col>
      </el-row>

    </div>
  </div>
  <div v-else-if="showContainer===1" class="app-container">
    <div class="container-header">
      <el-page-header content="详情页面" @back="goBack" />
    </div>
    <div class="project-body padding0">
      <el-tabs v-model="activeFirst" type="border-card" class="width100" @tab-click="tabFirstClick">
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-date" />项目概况</span>
          <el-tabs v-model="activeSecond" @tab-click="tabSecondClick">
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
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="审核备" name="2">
              <div class="tabs-second-container">
                <div v-for="item in shbList" class="el-steps-list">
                  <div class="el-steps-list-title">{{ item.name }}</div>
                  <div class="el-steps-list-con">
                    <el-steps :active="item.index" finish-status="success" simple>
                      <el-step :title="item.setp1" />
                      <el-step :title="item.setp2" />
                      <el-step :title="item.setp3" />
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
            <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleTaskDetail(scope)" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane name="3">
          <span slot="label"><i class="el-icon-date" />我的任务</span>
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
            <el-table-column fixed="right" align="header-center" label="状态" width="150">
              <template slot-scope="scope">
                {{ scope.row.statusStr }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleOpen(scope)">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>

    <el-dialog :visible.sync="zxdialogVisible" :title="this.currtask.isEdit?'执行任务':'任务详情'">
      <el-form :model="currtask" label-width="80px" label-position="left">
        <div class="list-li">
          <div class="list-li-title">
            {{ currtask.title }}
          </div>
        </div>
        <div class="list-li">
          <div class="list-li-row">
            <div class="list-li-row-icon" :style="{color: currtask.status===2?'#27d8bc':'brown'}">
              <i class="el-icon-remove" />
            </div>
            <div class="list-li-row-right">
              <div class="list-li-row-name">{{ currtask.statusStr }}</div>
              <div class="list-li-row-status">当前状态</div>
            </div>
          </div>
          <div class="list-li-row">
            <div class="list-li-row-icon">
              <div class="avatar-default" style="background-color: rgb(132, 225, 126);"><span>{{ currtask.executorName ===''?'': currtask.executorName.slice(1) }}</span></div>
            </div>
            <div class="list-li-row-right">
              <div class="list-li-row-name">{{ currtask.executorName }}</div>
              <div class="list-li-row-status">负责人</div>
            </div>
          </div>
          <div class="list-li-row">
            <div class="list-li-row-icon" style="color:#27d8bc;">
              <i class="el-icon-date" />
            </div>
            <div class="list-li-row-right">
              <div class="list-li-row-name">{{ currtask.startDateStr }}</div>
              <div class="list-li-row-status">开始日期</div>
            </div>
          </div>
          <div class="list-li-row">
            <div class="list-li-row-icon" style="color:brown;">
              <i class="el-icon-date" />
            </div>
            <div class="list-li-row-right">
              <div class="list-li-row-name">{{ currtask.endDateStr }}</div>
              <div class="list-li-row-status">结束日期</div>
            </div>
          </div>
        </div>
        <div class="list-li">
          <el-tabs v-model="zxActiveName" @tab-click="tabZXClick">
            <el-tab-pane name="1">
              <span slot="label"><i class="el-icon-date" style="margin-right: 6px;"/> 任务信息</span>
              <div class="list-li-msg-k">
                <div class="list-li-msg">
                  <div class="list-li-msg-title">项目名称：</div>
                  <div class="list-li-msg-con">{{ currtask.projectName }}</div>
                </div>
                <div class="list-li-msg">
                  <div class="list-li-msg-title">任务类型：</div>
                  <div class="list-li-msg-con">{{ currtask.shb==null || currtask.shb==0 ? "非审核备": currtask.shbName }}</div>
                </div>
                <div class="list-li-msg">
                  <div class="list-li-msg-title">所属阶段：</div>
                  <div class="list-li-msg-con">{{ currtask.stageStr }}</div>
                </div>
              </div>
              <div class="list-li-msg-k">
                <div class="list-li-msg">
                  <div class="list-li-msg-title">任务介绍：</div>
                  <div class="list-li-msg-con">{{ currtask.remark }}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label"><i class="el-icon-c-scale-to-original" style="margin-right: 6px;"/>依赖关系</span>
              <dl class="list-li-fj-li">
                <div v-if="currtask.childTask === null || currtask.childTask.length === 0">
                  <div class="fj-nofile">
                    <div style="margin-top: 10px;text-align: center;">暂无子任务</div>
                  </div>
                </div>
                <div v-else style="padding: 10px;border-bottom: 1px #eee solid;">
                  <dd v-for="(child,index) in currtask.childTask" :key="child.id" class="item d-flex ng-star-inserted">
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                      <div class="thumb"><svg-icon icon-class="childTask" style="width:2.5em;height:2.5em;"/></div>
                      <div >{{ child.title }}</div>
                      <div :style="{color: child.status===2?'#27d8bc':'brown'}">{{ child.statusStr }}</div>
                      <div >{{ child.startDateStr }}</div>
                      <div ><span>负责人: <span>{{ child.executorName }}</span></span></div>
                    </div>
                  </dd>
                </div>
              </dl>
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label"><i class="el-icon-wallet" style="margin-right: 6px;"/> 附件</span>
              <div class="list-li-body">
                <div class="head d-flex">
                  <div class="text-desc">共 <span class="text-body">{{currtask.fileInfos.length}}</span> 个附件</div>
                  <div v-if="currtask.isEdit" class="ml-auto">
                    <a href="javascript:;" @click="addFj(currtask.id)"><i class="el-icon-plus" />添加附件 </a>
                    <input id="openfj" ref="openfj" type="file" style="display:none;" @change="getFile($event,currtask.id)">
                  </div>
                </div>
                <dl class="list-li-fj-li">
                  <div v-if="currtask.fileInfos===null || currtask.fileInfos.length===0">
                    <div class="fj-nofile">
                      <svg-icon class="fj-svg" icon-class="nofile" />
                      <div style="margin-top: 10px;">暂无附件</div>
                    </div>
                  </div>
                  <div v-else>
                    <dd v-for="(fileInfo,index) in currtask.fileInfos" :key="fileInfo.id" class="item d-flex ng-star-inserted">
                      <div style="display: flex;">
                        <div class="thumb"><svg-icon class="fj-svg" :icon-class="fileInfo.thumb" /></div>
                        <div class="content">
                          <div class="title">{{ fileInfo.fileName }}</div>
                          <div class="meta">
                            <span>{{ fileInfo.fileSize }}</span><span>来自 <span>{{ fileInfo.userName }}</span></span><span>|</span><span>{{ fileInfo.date }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="operation">
                        <a class="mr-3 btn btn-icon" title="预览" href="javascript:;" @click="preView(fileInfo.url ==''?'javascript:;':fileInfo.url)"><i class="el-icon-view" /></a>
                        <a class="mr-3 btn btn-icon" title="下载" :href="fileInfo.url ==''?'javascript:;':fileInfo.url"><i class="el-icon-download" /></a>
                        <a v-if="currtask.isEdit" class="mr-3 btn btn-icon" title="上传" href="javascript:;" @click="submitUpload(index,currtask.id)"><i class="el-icon-upload2" /></a>
                        <a v-if="currtask.isEdit" class="mr-3 btn btn-icon" title="删除" href="javascript:;" @click="fileDelete(index,currtask.id,fileInfo.id)"><i class="el-icon-delete" /></a>
                      </div>
                    </dd>
                  </div>

                </dl>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="list-li">
          <div class="list-li-msg-k" style="width: 100%;">
            <div class="list-li-msg" style="width: 100%;">
              <div class="list-li-msg-title">任务记录：</div>
              <div class="list-li-msg-con">
                <div v-if="currtask.isEdit">
                  <el-input v-model="currtask.comContent" type="textarea" :rows="3" placeholder="请输入执行任务备注" />
                </div>
                <div v-else>
                  {{ currtask.comContent }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>

      <div v-if="currtask.isEdit" style="text-align:right;">
        <el-button type="danger" size="small" @click="zxdialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" @click="confirmTask(currtask.id)">完成</el-button>
      </div>
    </el-dialog>
  </div>

  <div v-else-if="showContainer===2" class="app-container">
    <div class="container-header">
      <el-page-header content="项目报表" @back="goBack" />
    </div>
    <div class="project-body padding0">
      asdasdas
    </div>
  </div>

  <div v-else-if="showContainer===3" class="app-container">
    <div class="container-header">
      <el-page-header content="甘特图" @back="goBack" />
    </div>
    <div class="project-body padding0 gantt-body">
      <div class="container-header">
        <el-radio-group
          v-model="querystatus"
          class="yhj-el-radio-group"
          style="margin-bottom: 30px;"
          placeholder="搜索项目"
          @change="searchTask"
        >
          <el-radio-button label="10" value="10">全部</el-radio-button>
          <el-radio-button label="0" value="0">未分配</el-radio-button>
          <el-radio-button label="1" value="1">未完成</el-radio-button>
          <el-radio-button label="2" value="2">已完成</el-radio-button>
          <el-radio-button label="3" value="3">已延期</el-radio-button>
          <el-radio-button label="4" value="4">已超期</el-radio-button>
        </el-radio-group>
      </div>
       <component :is="ganttComponent" :data="data"  :startDate="project.startDateStr"
        :endDate="project.completeDateStr" :row-style="aa" :cell-style="bb" />
    </div>

  </div>
</template>

<script>
import gantt from '@/components/Gantt/gantt.vue'
import { getToken } from '@/utils/auth'
import {
  dateFormatZHymdhm, renderFileSize, renderFileThumb
} from '@/utils/dateutil'
import $ from 'jquery'
import request from '@/utils/request'
import {
  getAllProject,
  getProject,
  getProjectAboutSHB,
  getProjectGanttData
} from '@/api/project'
import {
  getAllTasksOfProject,
  getAllTaskMyList,
  getTask,
  fileDelete,
  confirmTask
} from '@/api/task'

const baseURL = process.env.VUE_APP_BASE_API
const defaultTask = {
  id: '',
  pid:'',
  title: '',
  annex: '',
  code: '',
  comDate: '',
  comDateStr: '',
  createDate: '',
  endDate: '',childTask:[],
  endDateStr: '', executOrg: '', comContent: '',
  executOrgName: '', executor: '', executorMobile: '', executorName: '',
  fileInfos: [], remark: '', shb: '', shbName: '', stageId: '', stageStr: '', status: '',
  number: '', orgId: '', orgName: '', preTasks: '', priority: '', priorityStr: '', proId: '', projectName: '',
  isEdit: false
}
export default {
  name: "WlGantt",
  components: {
    gantt
  },
  data() {
    return {
      orgId: '',
      orgName: '',
      showContainer: 0,
      tabPosition: '0',
      searchContent: '',
      searchStatus: '0',
      projectList: [],
      project: {},
      projectStatusClass: '',
      taskList: [],
      taskMyList: [],
      statusColor1: 'statusColor1 yhj-i',
      statusColor2: 'el-icon-circle-check',
      statusColor3: 'statusColor3 yhj-i',
      statusColor4: 'statusColor4 yhj-i',
      statusColor7: 'statusColor7 yhj-i',

      activeFirst: '1',
      activeSecond: '1',
      shbList: [],

      zxActiveName: '1',
      zxdialogVisible: false,
      currtask: Object.assign({}, defaultTask),
      currtaskIndex: '',
      fileInfo: '',

      /* Gantt */
      ganttComponent: 'gantt',
      proStartDate: '',
      proEndDate: '',
      querystatus: 10, //10 表示全部
      dataPage: 1,
      dataSize: 20,
      ganttProperData: {
        startDate: '2021-01-01',
        endDate: '2021-12-09'
      },
      data: [{
        id: '1',
        pid: '0',
        data: ['2021-01-09', '2021-12-10'],
        name: '旅行',
        startDate: '2021-01-10',
        realStartDate: '2021-01-12',
        endDate: '2021-01-31',
        realEndDate: '2021-01-23',
        children: [{
          id: '1-1',
          pid: '1',
          name: '云台之间',
          startDate: '2021-01-03',
          realStartDate: '2021-01-04',
          endDate: '2021-01-06',
          realEndDate: '2021-01-07',
          children: [{
            id: '1-1-1',
            pid: '1-1',
            name: '日落云巅',
            startDate: '2019-09-10',
            endDate: '2019-09-13'
          }]
        },
        {
          id: '',
          pid: '2',
          name: '天空之镜',
          startDate: '2019-09-17',
          endDate: '2019-09-22'
        },
        {
          id: '1-3',
          name: '蓬莱之岛',
          pid: '1',
          startDate: '2019-09-25',
          endDate: '2019-09-30'
        },
        {
          id: '1-4',
          pid: '1',
          name: '西塘之南',
          startDate: '2019-10-03',
          endDate: '2019-10-07'
        },
        {
          pid: '1',
          id: '1-5',
          name: '凤凰之缘',
          startDate: '2019-10-11',
          endDate: '2019-10-19'
        }
        ]
      },
      {
        id: '2',
        name: '租房子',
        startDate: '2019-09-20',
        endDate: '2019-10-31'
      }
      ], // 数据
      selected: [], // 选中数据
      contextMenuOptions: [{
        label: '任务名称',
        prop: 'name'
      },
      {
        label: '开始时间',
        prop: 'startDate'
      },
      {
        label: '结束时间',
        prop: 'endDate'
      }
      ],
      columns: [{
        type: 'name',
        minWidth: 200,
        colType: 'expand'
      }] // 可通过此参数配置列。其中内置有名称name、开始日期startDate、结束日期endDate、前置任务preTask，如果cloumns中有type等于这四个且slot为false时，将使用内置代码，当然除了内容使用内置代码，其他字段你还拥有配置权。另外如果不是为了配置内置列参数，slot中的prv和default仍可以用来自定义列
      /* Gantt end */

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
      this.showContainer = 1
    },
    async openReportFrom(projectId) {
      const res = await getProject(projectId)
      this.project = res.data
      this.showContainer = 2
    },
    async openGTT(projectId) {
      const res2 = await getProject(projectId)
      this.project = res2.data
      const res = await getProjectGanttData(projectId, this.querystatus, this.dataPage, this.dataSize)
      console.log(res.data)
      this.data = res.data.list
      this.showContainer = 3
    },
    async getAllProject() {
      const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
      this.projectList = res.data
    },
    async searchProject() {
      const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
      this.projectList = res.data
    },
    async searchTask() {
      const res = await getProjectGanttData(this.project.id, this.querystatus, this.dataPage, this.dataSize)
      this.data = res.data.list
    },
    async getProject(id) {
      this.currProjectIndex = id
      const res = await getProject(id)
      this.project = res.data
      this.projectStatusClass = this.project.status === 1 ? 'circle-ing' : this.project.status === 2
        ? 'circle-success' : 'circle-error'
    },
    goBack() {
      this.project = {}
      this.showContainer = 0
    },

    async tabFirstClick(tab, event) {
      if (tab.index === '1') {
        const res = await getAllTasksOfProject(this.orgId, this.project.id)
        this.taskList = res.data
      } else if (tab.index === '2') {
        const res = await getAllTaskMyList(this.orgId, this.project.id)
        this.taskMyList = res.data
      }
    },
    async tabSecondClick(tab, event) {
      if (tab.index === '1') { // 审核备
        const res = await getProjectAboutSHB(this.project.id)
        this.shbList = res.data
      }
    },

    async handleTaskDetail(scope){
      const res = await getTask(scope.row.id)
      this.currtask = res.data
      this.currtask.isEdit = false
      this.zxdialogVisible = true
      this.currtaskIndex = scope.$index
      console.log(this.currtask)
    },

    // 执行任务
    tabZXClick() {

    },
    async handleOpen(scope) {
      const res = await getTask(scope.row.id)
      this.currtask = res.data
      this.currtask.isEdit = true
      this.zxdialogVisible = true

      this.currtaskIndex = scope.$index
      console.log("查看",this.currtask)
      // const res = await operation(this.project.id, scope.row.id)
    },
    // 上传附件
    async addFj(currtaskId) {
      this.$refs.openfj.dispatchEvent(new MouseEvent('click'))
    },
    getFile($event, currtaskId) {
      // var that = this
      const inputFile = this.$refs.openfj.files[0]
      if (inputFile) {
        // if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
        //   alert('不是有效的图片文件！')
        //   return
        // }
        this.fileInfo = ''
        this.fileInfo = Object.assign({}, this.fileInfo, {
          fileName: inputFile.name,
          fileSize: renderFileSize(inputFile.size),
          date: dateFormatZHymdhm(new Date()),
          userName: this.$store.getters.name,
          userId: this.$store.getters.userId,
          taskId: currtaskId,
          thumb: renderFileThumb(inputFile.name),
          inputFile: $event.target.files[0],
          path: ''
          // lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
        })
        this.currtask.fileInfos.push(this.fileInfo)
        console.log('文件对象集合：', this.currtask.fileInfos)
        // const reader = new FileReader()
        // reader.readAsDataURL(inputFile)
        // reader.onload = function(e) {
        //   that.imgSrc = this.result
        // }
      } else {
        return
      }
    },
    async fileDelete($index, taskId, fileId) {
      if (fileId === undefined) { // 新加的内容
        this.currtask.fileInfos.splice($index, 1)
      } else { // 服务器请求回来的附件删除
        await fileDelete(taskId, fileId)
        this.currtask.fileInfos.splice($index, 1)
      }
    },
    // 执行上传
    submitUpload($index, taskId) {
      var formData = new FormData()// new一个formData事件
      formData.append('file', this.currtask.fileInfos[$index].inputFile) // 将file属性添加到formData里
      var that = this
      var isUpload = false
      $.ajax({
        url: baseURL+'project/uploadFJ',
        method: 'post',
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        async: false,
        headers: {
          'X-Token': getToken(), // 值得注意的是，这个地方一定要把请求头更改一下
          'agentId': that.$store.getters.userId
        },
        success: function(res) {
          if (res.code === 200) {
            that.$message({
              type: 'success',
              message: '上传成功!'
            })
            // 更新路径
            that.currtask.fileInfos[$index].path = res.data
            isUpload = true
          } else {
            isUpload = false
          }
        }
      })
      return isUpload
      //  无法使用框架上传  使用同步无效
      // const res = request({
      //   url: `/project/uploadFJ`,
      //   method: 'post',
      //   data: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data' // 值得注意的是，这个地方一定要把请求头更改一下
      //   }
      // })
      // console.log(res) // 使用 同步 就 等待状态： panding
      // if (res.code === 200) {
      //   this.$message({
      //     type: 'success',
      //     message: '上传成功!'
      //   })
      //   // 更新路径
      //   this.currtask.fileInfos[$index].path = res.data
      //   return true
      // } else {
      //   return false
      // }
    },

    // 执行任务
    async confirmTask(taskId) {
      //首先判断子任务是否完成
      if(this.currtask.childTask!==null && this.currtask.childTask.length !==0 ){
        for(var ta of this.currtask.childTask){
          if(ta.status === 1){
            this.$message.error('请先完成子项任务！')
            return
          }
        }
      }
      if (this.currtask.comContent === null || this.currtask.comContent === '') {
        this.$message.error('任务记录信息不能为空！')
        return
      }
      var isSubmit = true
      for (var i = 0; i < this.currtask.fileInfos.length; i++) {
        console.log('woceshi', this.currtask.fileInfos)
        if (this.currtask.fileInfos[i].path === '') { // 有未上传的文件 先上传文件
          var isSucc = this.submitUpload(i, this.currtask.id)
          console.log(isSucc)
          if (!isSucc) {
            isSubmit = false
            this.$message.error('上传失败！')
            return
          }
        }
      }
      if (isSubmit) {
        this.currtask.orgId = this.orgId
        this.currtask.proId = this.project.id
        // 由于异步原因 上传数据path 不显示
        console.log('提交数据：', this.currtask)

        const res = await confirmTask(this.currtask)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '任务已完成!'
          })
          this.zxdialogVisible = false
          this.taskMyList.splice(this.currtaskIndex, 1)
        }
      }
    },

    /* gantt*/
    aa({ row, rowIndex }) {
      console.log('aa:', row)
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    bb(row) {
      // console.log('bb:', row)
    },


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

        .el-steps-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .el-steps-list-title {
            width: 120px;
          }

          .el-steps-list-con {
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
        height: 110px;
      }

    }

    //执行弹框
    .list-li {
      margin-bottom: 26px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .list-li-title {
        font-size: 24px;
        word-wrap: break-word;
      }

      .list-li-row {
        display: flex;
        flex-direction: row;

        .list-li-row-icon {
          font-size: 30px;
          width: 30px;
          height: 30px;
          .avatar-default{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            line-height: 30px;
            font-size: 12px;
            vertical-align: middle;
            text-align: center;
            color: white;
          }
        }

        .list-li-row-right {
          display: flex;
          flex-direction: column;
          max-width: 100px;
          margin-left: 10px;
          position: relative;

          .list-li-row-name {
            font-size: 16px;
          }

          .list-li-row-status {
            color: #aaa;
            font-size: .75rem;
          }
        }
      }

      .list-li-body {
        margin-top: 20px !important;

        .d-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .content{
            margin-left: 30px;
            .title{
              color: #333;
            }
            .meta{
              margin-top: 10px;
              span{
                margin-right: 10px;
              }
            }
          }
          .operation{
            margin-left: 30px;
            min-width: 102px;
            .btn-icon{
              margin-right: 20px;
            }
            .btn-icon:hover{
              color: #4e8afa;
            }
          }
          .ml-auto {
            color: #4e8afa;

            a:hover {
              color: #4e8afa;
              outline: 0;
            }
          }
        }
        .list-li-fj-li{
          .fj-nofile{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .el-tabs {
        color: #aaa;
        width: 100%;

        .el-tabs__item {
          color: #aaa;
        }
      }

      .list-li-msg-k {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }

      .list-li-msg {
        display: flex;
        flex-direction: column;

        .list-li-msg-title {
          margin-bottom: 10px;
        }

        .list-li-msg-con {
          color: #333;
        }
      }
      .fj-svg{
        width:3em;
        height: 3em;
      }

    }//执行弹框

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

  /* gantt */
  .gantt-body{
    flex-direction:column;
  }
  ::v-deep .gantt-body .el-table__fixed{
    // width: 100% !important;
  }
</style>
<style lang="scss">
@import "./css/index.css";
</style>
<style>
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }

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
