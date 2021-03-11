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
    <div class="project-body padding0">
       <div class="wl-gantt" id="wl-gantt">
         <!-- 甘特图区 -->
         <el-table
           ref="wl-gantt"
           class="wl-gantt-table"
           :fit="fit"
           :size="size"
           :load="load"
           :lazy="lazy"
           :border="border"
           :data="selfData"
           :stripe="stripe"
           :height="height"
           :row-key="rowKey"
           :row-style="rowStyle"
           :class="dateTypeClass"
           :cell-style="cellStyle"
           :max-height="maxHeight"
           :tree-props="selfProps"
           :current-row-key="rowKey"
           :row-class-name="rowClassName"
           :cell-class-name="cellClassName"
           :expand-row-keys="expandRowKeys"
           :header-row-style="headerRowStyle"
           :header-cell-style="headerCellStyle"
           :default-expand-all="defaultExpandAll"
           :header-row-class-name="headerRowClassName"
           :highlight-current-row="highlightCurrentRow"
           :header-cell-class-name="headerCellClassName"
           @header-contextmenu="handleHeaderContextMenu"
           @selection-change="handleSelectionChange"
           @row-contextmenu="handleRowContextMenu"
           @contextmenu.native="handleContextmenu"
           @current-change="handleCurrentChange"
           @cell-mouse-enter="handleMouseEnter"
           @cell-mouse-leave="handleMouseLeave"
           @expand-change="handleExpandChange"
           @filter-change="handleFilterChange"
           @cell-dblclick="handleCellDbClick"
           @header-click="handleHeaderClick"
           @row-dblclick="handleRowDbClick"
           @sort-change="handleSortChange"
           @cell-click="handleCellClick"
           @select-all="handleSelectAll"
           @row-click="handleRowClick"
           @select="handleSelect"
         >
           <template v-if="!ganttOnly">
             <slot name="prv"></slot>
             <el-table-column
               v-if="useCheckColumn"
               fixed
               type="selection"
               width="55"
               align="center"
             ></el-table-column>
             <el-table-column
               v-if="useIndexColumn"
               fixed
               type="index"
               width="50"
               label="序号"
             ></el-table-column>
             <el-table-column
               fixed
               label="名称"
               min-width="200"
               class-name="name-col"
               :prop="selfProps.name"
               :formatter="nameFormatter"
               :show-overflow-tooltip="name_show_tooltip"
             >
               <template slot-scope="scope">
                 <el-input
                   v-if="self_cell_edit === '_n_m_' + scope.$index"
                   v-model="scope.row[selfProps.name]"
                   @change="nameChange(scope.row)"
                   @blur="nameBlur()"
                   size="medium"
                   class="u-full"
                   ref="wl-name"
                   placeholder="请输入名称"
                 ></el-input>
                 <strong v-else class="h-full">
                   <span @click="cellEdit('_n_m_' + scope.$index, 'wl-name')">
                     {{
                       nameFormatter
                         ? nameFormatter(scope.row, scope.column, scope.treeNode, scope.$index)
                         : scope.row[selfProps.name]
                     }}
                   </span>
                   <span class="name-col-edit">
                     <i
                       class="el-icon-remove-outline name-col-icon task-remove"
                       @click="emitTaskRemove(scope.row)"
                     ></i>
                     <i
                       class="el-icon-circle-plus-outline name-col-icon task-add"
                       @click="emitTaskAdd(scope.row)"
                     ></i>
                   </span>
                 </strong>
               </template>
             </el-table-column>
             <el-table-column
               :resizable="false"
               fixed
               width="160"
               align="center"
               :prop="selfProps.startDate"
               label="开始日期"
             >
               <template slot-scope="scope">
                 <el-date-picker
                   v-if="self_cell_edit === '_s_d_' + scope.$index"
                   v-model="scope.row[selfProps.startDate]"
                   @change="startDateChange(scope.row)"
                   @blur="self_cell_edit = null"
                   type="date"
                   size="medium"
                   class="u-full"
                   :clearable="false"
                   ref="wl-start-date"
                   value-format="yyyy-MM-dd"
                   placeholder="请选择开始日期"
                 ></el-date-picker>
                 <div
                   v-else
                   class="h-full"
                   @click="cellEdit('_s_d_' + scope.$index, 'wl-start-date')"
                 >
                   {{ timeFormat(scope.row[selfProps.startDate]) }}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               fixed
               :resizable="false"
               width="160"
               align="center"
               :prop="selfProps.endDate"
               label="结束日期"
             >
               <template slot-scope="scope">
                 <el-date-picker
                   v-if="self_cell_edit === '_e_d_' + scope.$index"
                   v-model="scope.row[selfProps.endDate]"
                   @change="endDateChange(scope.row)"
                   @blur="self_cell_edit = null"
                   type="date"
                   size="medium"
                   class="u-full"
                   :clearable="false"
                   ref="wl-end-date"
                   value-format="yyyy-MM-dd"
                   placeholder="请选择结束日期"
                 ></el-date-picker>
                 <div
                   v-else
                   class="h-full"
                   @click="cellEdit('_e_d_' + scope.$index, 'wl-end-date')"
                 >
                   {{ timeFormat(scope.row[selfProps.endDate]) }}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               v-if="usePreColumn"
               align="center"
               min-width="140"
               label="前置任务"
               show-overflow-tooltip
               :prop="selfProps.endDate"
             >
               <template slot-scope="scope">
                 <!-- @blur="self_cell_edit = null" @blur="preEditBlur" -->
                 <el-select
                   v-if="self_cell_edit === '_p_t_' + scope.$index"
                   @change="preChange"
                   v-model="scope.row[selfProps.pre]"
                   collapse-tags
                   :multiple="preMultiple"
                   ref="wl-pre-select"
                   placeholder="请选择前置任务"
                 >
                   <el-option
                     v-for="item in pre_options"
                     :key="item[selfProps.id]"
                     :label="item[selfProps.name]"
                     :value="item[selfProps.id]"
                   ></el-option>
                 </el-select>
                 <div
                   v-else
                   class="h-full"
                   @click="preCellEdit(scope.row, '_p_t_' + scope.$index, 'wl-pre-select')"
                 >
                   {{ preFormat(scope.row) }}
                 </div>
               </template>
             </el-table-column>
             <slot></slot>
           </template>
           <!-- year and mouth gantt -->
           <template v-if="self_date_type === 'yearAndMonth'">
             <el-table-column
               :resizable="false"
               v-for="year in ganttTitleDate"
               :label="year.name"
               :key="year.id"
             >
               <el-table-column
                 class-name="wl-gantt-item"
                 v-for="month in year.children"
                 :resizable="false"
                 :key="month.id"
                 :label="month.name"
               >
                 <template slot-scope="scope">
                   <div :class="dayGanttType(scope.row, month.full_date, 'months')"></div>
                   <div
                     v-if="useRealTime"
                     :class="realDayGanttType(scope.row, month.full_date, 'months')"
                   ></div>
                 </template>
               </el-table-column>
             </el-table-column>
           </template>
           <!-- year and week gantt -->
           <template v-else-if="self_date_type === 'yearAndWeek'">
             <el-table-column
               :resizable="false"
               v-for="i in ganttTitleDate"
               :label="i.full_date"
               :key="i.id"
             >
               <el-table-column
                 class-name="wl-gantt-item"
                 v-for="t in i.children"
                 :resizable="false"
                 :key="t.id"
                 :label="t.name"
               >
                 <template slot-scope="scope">
                   <div :class="dayGanttType(scope.row, t.full_date, 'week')"></div>
                   <div
                     v-if="useRealTime"
                     :class="realDayGanttType(scope.row, t.full_date, 'week')"
                   ></div>
                 </template>
               </el-table-column>
             </el-table-column>
           </template>
           <!-- mouth and day gantt -->
           <template v-else>
             <el-table-column
               :resizable="false"
               v-for="i in ganttTitleDate"
               :label="i.full_date"
               :key="i.id"
             >
               <el-table-column
                 class-name="wl-gantt-item"
                 v-for="t in i.children"
                 :resizable="false"
                 :key="t.id"
                 :label="t.name"
               >
                 <template slot-scope="scope">
                   <div :class="dayGanttType(scope.row, t.full_date)"></div>
                   <div
                     v-if="useRealTime"
                     :class="realDayGanttType(scope.row, t.full_date)"
                   ></div>
                 </template>
               </el-table-column>
             </el-table-column>
           </template>
         </el-table>
         <!-- 组件区 -->
         <!-- 右键菜单 -->
         <context-menu
           :visible.sync="contextMenu.show"
           :x="contextMenu.x"
           :y="contextMenu.y"
           :menuList="contextMenu.data"
         ></context-menu>
         <!-- hover 看板 -->
         <div v-show="infoCard.show" class="wl-info-card" :style="infoCardStyle">
           <slot
             name="info-card"
             :row="infoCard.row"
             :column="infoCard.column"
             :cell="infoCard.cell"
             :event="infoCard.event"
           ></slot>
         </div>
       </div>
    </div>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import {
  dateFormatZHymdhm, renderFileSize, renderFileThumb
} from '@/utils/dateutil'
import $ from 'jquery'
import request from '@/utils/request'
import {
  getAllProject,
  getProject,
  getProjectAboutSHB
} from '@/api/project'
import {
  getAllTasksOfProject,
  getAllTaskMyList,
  getTask,
  fileDelete,
  confirmTask
} from '@/api/task'
/* GTT */
import dayjs from "dayjs"; // 导入日期js
const uuidv4 = require("uuid/v4"); // 导入uuid生成插件
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { flattenDeep, getMax, flattenDeepParents, regDeepParents } from "wl-core"; // 导入数组操作函数
import ContextMenu from "./components/wl-contextmenu";
/* GTT end */
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
  components: { ContextMenu },
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


      /* GTT */
      self_start_date: "", // 项目开始时间
      self_end_date: "", // 项目结束时间
      self_data_list: [], // 一维化后的gantt数据
      self_date_type: "", // 自身日期类型
      self_id: 1, // 自增id
      self_cell_edit: null, // 正在编辑的单元格
      self_dependent_store: [], // 自身依赖库
      multipleSelection: [], // 多选数据
      currentRow: null, // 单选数据
      pre_options: [], // 可选前置节点
      name_show_tooltip: true, // 名称列是否开启超出隐藏
      update: true, // 更新视图
      selectionList: [], // 多选选中数据
      contextMenu: {
        show: false, // 显示
        x: 0, // 坐标点
        y: 0, // 坐标点
        data: [] // 整理后要显示的数据
      }, // 右键菜单配置项
      infoCard: {
        show: false,
        x: 0,
        y: 0,
        row: {},
        column: {},
        cell: null,
        event: {},
        timer: null
      } // 看板信息
      /* GTT END*/
    }
  },
  props: {
    useCard: {
      type: Boolean,
      default: false,
    }, // 是否使用hover看板
    /**
     * @name 右键扩展菜单
     * @param {String} label 展示名称
     * @param {String} prop 绑定的字段
     * @param {String} icon 可选 字体图标class
     */
    contextMenuOptions: Array,
    // gantt数据
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 日期类型
    dateType: {
      type: String,
      default: "yearAndMonth", // monthAndDay,yearAndMonth,yearAndWeek
    },
    // 树表配置项
    props: Object,
    // 开始日期
    startDate: {
      type: [String, Object],
      required: true,
    },
    // 结束时间
    endDate: {
      type: [String, Object],
      required: true,
    },
    // 是否使用实际开始时间、实际结束时间
    useRealTime: {
      type: Boolean,
      default: false,
    },
    // 是否检查源数据符合规则，默认开启，如果源数据已遵循project规则，可设置为false以提高性能
    checkSource: {
      type: Boolean,
      default: true,
    },
    // 废弃：反而会因为频繁的判断而影响性能
    // 是否生成自增id并组成parents来满足树链的查询条件，如果数据本身已有自增id，可设置为false以提高性能
    // 如果设置为false，则数据内必须包含自增id字段：identityId，parents字段必须以`,`分割。
    // 字段名可通过props配置，自增id必须唯一并尽可能的短，如1，2，3...，parents应为祖先自增id通过`,`拼接直至父级
    recordParents: {
      type: Boolean,
      default: true,
    },
    // 是否使用id来作为自增id，如果是请保证id本来就简短的数字型而不是较长的字符串或guid
    treatIdAsIdentityId: {
      type: Boolean,
      default: false,
    },
    // 自动变化gantt标题日期模式
    autoGanttDateType: {
      type: Boolean,
      default: true,
    },
    nameFormatter: Function, // 名称列的格式化内容函数
    // 是否使用内置前置任务列
    usePreColumn: {
      type: Boolean,
      default: false,
    },
    // 是否使用复选框列
    useCheckColumn: {
      type: Boolean,
      default: false,
    },
    // 是否使用序号列
    useIndexColumn: {
      type: Boolean,
      default: false,
    },
    // 是否可编辑
    edit: {
      type: Boolean,
      default: true,
    },
    // 复选框是否父子关联
    parentChild: {
      type: Boolean,
      default: true,
    },
    // 是否开启前置任务多选 如果开启多选则pre字段必须是Array，否则可以是Number\String
    preMultiple: {
      type: Boolean,
      default: true,
    },
    preFormatter: Function, // 前置任务列的格式化内容函数
    // 空单元格占位符
    emptyCellText: {
      type: String,
      default: "-",
    },
    // 多选时，是否可以点击行快速选中复选框
    /* quickCheck: {
      type: Boolean,
      default: false
    }, */
    ganttOnly: {
      type: Boolean,
      default: false,
    }, // 是否只显示图形
    // ---------------------------------------------以下为el-table Attributes--------------------------------------------
    defaultExpandAll: {
      type: Boolean,
      default: false,
    }, // 是否全部展开
    rowKey: {
      type: String,
      default: "id",
    }, // 必须指定key来渲染树形数据
    height: [String, Number], // 列表高度
    maxHeight: [String, Number], // 列表最大高度
    stripe: {
      type: Boolean,
      default: false,
    }, // 是否为斑马纹
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    }, // 是否要高亮当前行
    border: {
      type: Boolean,
      default: true,
    }, // 是否带有纵向边框
    fit: {
      type: Boolean,
      default: true,
    }, // 列的宽度是否自撑开
    size: String, // Table 的尺寸
    rowClassName: Function, // 行的 className 的回调方法
    rowStyle: Function, // 行的 style 的回调方法
    cellClassName: Function, // 单元格的 className 的回调方法
    cellStyle: Function, // 单元格的 style 的回调方法
    headerRowClassName: {
      type: [Function, String],
      default: "wl-gantt-header",
    }, // 表头行的 className 的回调方法
    headerRowStyle: [Function, Object], // 表头行的 style 的回调方法
    headerCellClassName: [Function, String], // 表头单元格的 className 的回调方法
    headerCellStyle: [Function, Object], // 表头单元格的 style 的回调方法
    expandRowKeys: Array, // 可以通过该属性设置 Table 目前的展开行
    lazy: {
      type: Boolean,
      default: false,
    }, // 是否懒加载子节点数据
    load: Function, // 加载子节点数据的函数，lazy 为 true 时生效
    // 是否使用一维数据组成树
    /* arrayToTree: {
      type: Boolean,
      default: false
    } */
  },
  computed: {
    routesData() {
      return this.routes
    },
    // 甘特图标题日期分配
    ganttTitleDate() {
      // 分解开始和结束日期
      let start_date_spilt = dayjs(this.self_start_date).format("YYYY-M-D").split("-");
      let end_date_spilt = dayjs(this.self_end_date).format("YYYY-M-D").split("-");
      let start_year = Number(start_date_spilt[0]);
      let start_mouth = Number(start_date_spilt[1]);
      let end_year = Number(end_date_spilt[0]);
      let end_mouth = Number(end_date_spilt[1]);
      // 自动更新日期类型以适应任务时间范围跨度
      if (this.autoGanttDateType) {
        // 计算日期跨度
        let mouth_diff = this.timeDiffTime(
          this.self_start_date,
          this.self_end_date,
          "months"
        );
        if (mouth_diff > 12) {
          // 12个月以上的分到yearAndMouth
          this.setDataType("yearAndMonth");
        } else if (mouth_diff > 2) {
          // 2个月以上的分到yearAndWeek
          this.setDataType("yearAndWeek");
        } else {
          this.setDataType("monthAndDay");
        }
      }
      // 不自动更新日期类型，以dateType固定展示
      if (this.self_date_type === "yearAndWeek") {
        return this.yearAndWeekTitleDate(start_year, start_mouth, end_year, end_mouth);
      } else if (this.self_date_type === "monthAndDay") {
        return this.mouthAndDayTitleDate(start_year, start_mouth, end_year, end_mouth);
      } else {
        return this.yearAndMouthTitleDate(start_year, start_mouth, end_year, end_mouth);
      }
    },
    // 数据
    selfData() {
      let _data = this.data || [];
      // 生成一维数据
      this.setListData();
      // 处理源数据合法性
      this.handleData(_data);
      // 处理前置依赖
      this.handleDependentStore();
      return _data;
    },
    // 树表配置项
    selfProps() {
      return {
        hasChildren: "hasChildren", // 字段来指定哪些行是包含子节点
        children: "children", // children字段来表示有子节点
        name: "name", // 任务名称字段
        id: "id", // id字段
        pid: "pid", // pid字段
        startDate: "startDate", // 开始时间字段
        realStartDate: "realStartDate", // 实际开始时间字段
        endDate: "endDate", // 结束时间字段
        realEndDate: "realEndDate", // 实际结束时间字段
        identityId: "identityId",
        parents: "parents",
        pre: "pre", // 前置任务字段【注意：如果使用recordParents，则pre值应是目标对象的identityId字段(可配置)】
        ...this.props,
      };
    },
    // 根据日期类型改样式
    dateTypeClass() {
      if (this.self_date_type === "yearAndMonth") {
        return "year-and-month";
      } else if (this.self_date_type === "monthAndDay") {
        return "month-and-day";
      } else if (this.self_date_type === "yearAndWeek") {
        return "year-and-week";
      }
      return "";
    },
    // 看板样式
    infoCardStyle() {
      return {
        left: this.infoCard.x + "px",
        top: this.infoCard.y + "px",
      };
    },
  },

  created() {
    this.orgId = this.$store.getters.orgId
    this.orgName = this.$store.getters.orgName
    this.getAllProject(),

    /* GTT */
    this.self_date_type = this.dateType;
    this.self_start_date = this.startDate;
    this.self_end_date = this.endDate;
    /* GTT END */
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
      const res = await getProject(projectId)
      this.project = res.data
      this.showContainer = 3
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
      console.log('开始提交')
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

    /* GTT */
    // 设置dateType
    setDataType(type) {
      this.self_date_type = type;
    },
    // 生成一维数据
    setListData() {
      this.self_data_list = flattenDeep(this.data, this.selfProps.children);
    },
    /**
     * 开始时间改变
     * row: object 当前行数据
     */
    startDateChange(row) {
      // 如果将开始时间后移，结束时间也应后移
      let _delay = this.timeIsBefore(row._oldStartDate, row[this.selfProps.startDate]);
      if (_delay) {
        row[this.selfProps.endDate] = this.timeAdd(
          row[this.selfProps.endDate],
          row._cycle
        );
      }
      // 如果开始早于项目开始，则把项目开始提前
      let _early_project_start = this.timeIsBefore(
        row[this.selfProps.startDate],
        this.self_start_date
      );
      if (_early_project_start) {
        this.self_start_date = row[this.selfProps.startDate];
      }
      this.emitTimeChange(row);
    },
    /**
     * 结束时间改变
     * row: object 当前行数据
     */
    endDateChange(row) {
      this.emitTimeChange(row);
      // 如果开始晚于结束，提示
      /* if (
        this.timeIsBefore(
          row[this.selfProps.endDate],
          row[this.selfProps.startDate]
        )
      ) {
        row[this.selfProps.startDate] = row._oldStartDate;
        this.$message({
          showClose: true,
          message: "开始时间不可以晚于结束时间",
          type: "error"
        });
        return;
      } */
    },
    /**
     * 前置任务改变
     * row: object 当前行数据
     */
    preChange(row) {
      this.emitTimeChange(row);
      this.self_cell_edit = null;
      // 如果开始晚于结束，提示
      /* if (
        this.timeIsBefore(
          row[this.selfProps.endDate],
          row[this.selfProps.startDate]
        )
      ) {
        row[this.selfProps.startDate] = row._oldStartDate;
        this.$message({
          showClose: true,
          message: "开始时间不可以晚于结束时间",
          type: "error"
        });
        return;
      } */
    },
    /**
     * 前置任务内容格式化函数
     * data：[String, Array] 前置任务
     */
    preFormat(row) {
      // 自定义格式化前置任务列函数
      if (this.preFormatter) {
        return this.preFormatter(row);
      }
      let data = row[this.selfProps.pre];
      if (!data) return this.emptyCellText;
      if (Array.isArray(data)) {
        if (data.length === 0) return this.emptyCellText;
        let _pre_text = "";
        data.forEach((i) => {
          let _act = this.self_data_list.find((t) => t[this.selfProps.id] === i);
          if (_act) _pre_text += `${_act[this.selfProps.name]},`;
        });
        return _pre_text;
      }
      let _act = this.self_data_list.find((t) => t[this.selfProps.id] === data);
      return _act ? _act[this.selfProps.name] : this.emptyCellText;
    },
    // 前置下拉框失去焦点事件，change会触发blur，如果不延时则chang失效，如果延时则也只是延迟触发，会造成选一次就关闭无法多选
    /* preEditBlur(){
      setTimeout(()=>{
        this.self_cell_edit = null
      },500)
    }, */
    /**
     * 前置任务编辑
     */
    preCellEdit(row, key, ref) {
      /* let _parents = row._parents.split(","); // 父祖节点不可选
      let _children = row._all_children.map(i => i._identityId); // 子孙节点不可选
      let _self = row[this.selfProps.id]; // 自己不可选
      let _parents_and_children = _children.concat(_parents, [_self]);
      let filter_options = this.self_data_list.filter(
        i => !_parents_and_children.some(t => t == i._identityId)
      );
      this.pre_options = filter_options; */
      if (!this.edit) return;
      this.pre_options = [];
      this.self_data_list.forEach((i) => {
        if (i[this.selfProps.id] !== row[this.selfProps.id]) {
          this.pre_options.push({ ...i, [this.selfProps.children]: null });
        }
      });
      // 再剔除所有前置链涉及到的节点
      this.deepFindToSelf(row);
      // 调用单元格编辑
      this.cellEdit(key, ref);
    },
    /**
     * 找出to为当前元素的form，并将form作为to继续查找
     * item: Object 当前元素
     * targets: Array 需要过滤的数据(废弃)
     */
    deepFindToSelf(item) {
      let _parents = item._parents.split(","); // 父祖节点不可选
      let _children = item._all_children.map((i) => i._identityId); // 子孙节点不可选
      let _parents_and_children = _children.concat(_parents);
      this.pre_options = this.pre_options.filter(
        (i) => !_parents_and_children.some((t) => t == i._identityId)
      );
      this.self_dependent_store.forEach((i) => {
        let _tag = this.preMultiple
          ? i.to.some((t) => t[this.selfProps.id] === item[this.selfProps.id])
          : i.to[this.selfProps.id] === item[this.selfProps.id];
        if (_tag) {
          this.pre_options = this.pre_options.filter(
            (t) => t[this.selfProps.id] !== i.form[this.selfProps.id]
          );
          this.deepFindToSelf(i.form);
        }
      });
    },
    /**
     * 单元格编辑
     * key: string 需要操作的单元格key
     * ref：object 需要获取焦点的dom
     */
    cellEdit(key, ref) {
      if (!this.edit) return;
      if (ref === "wl-name") {
        this.name_show_tooltip = false;
      }
      this.self_cell_edit = key;
      this.$nextTick(() => {
        this.$refs[ref].focus();
      });
    },
    // 名称编辑事件
    nameChange(row) {
      this.self_cell_edit = null;
      this.name_show_tooltip = true;
      this.emitNameChange(row);
    },
    // 名称列编辑输入框blur事件
    nameBlur() {
      this.self_cell_edit = null;
      this.name_show_tooltip = true;
    },
    // 以下是表格-日期-gantt生成函数----------------------------------------生成gantt表格-------------------------------------
    /**
     * 年-月模式gantt标题
     * start_year: 起始年
     * start_mouth：起始月
     * end_year：结束年
     * end_mouth：结束月
     */
    yearAndMouthTitleDate(start_year, start_mouth, end_year, end_mouth) {
      // 日期数据盒子
      let dates = [
        {
          name: `${start_year}年`,
          date: start_year,
          id: uuidv4(),
          children: [],
        },
      ];
      // 处理年份
      let year_diff = end_year - start_year;
      // 年间隔小于一年
      if (year_diff === 0) {
        let isLeap = this.isLeap(start_year); // 是否闰年
        let mouths = this.generationMonths(
          start_year,
          start_mouth,
          end_mouth + 1,
          isLeap,
          false
        ); // 处理月份
        dates[0].children = mouths;
        return dates;
      }
      // 处理开始月份
      let startIsLeap = this.isLeap(start_year);
      let start_mouths = this.generationMonths(
        start_year,
        start_mouth,
        13,
        startIsLeap,
        false
      );
      // 处理结束月份
      let endIsLeap = this.isLeap(end_year);
      let end_mouths = this.generationMonths(
        end_year,
        1,
        end_mouth + 1,
        endIsLeap,
        false
      );
      // 年间隔等于一年
      if (year_diff === 1) {
        dates[0].children = start_mouths;
        dates.push({
          name: `${end_year}年`,
          date: end_year,
          children: end_mouths,
          id: uuidv4(),
        });
        return dates;
      }
      // 年间隔大于1年
      if (year_diff > 1) {
        dates[0].children = start_mouths;
        for (let i = 1; i < year_diff; i++) {
          let item_year = start_year + i;
          let isLeap = this.isLeap(item_year);
          let month_and_day = this.generationMonths(item_year, 1, 13, isLeap, false);
          dates.push({
            name: `${item_year}年`,
            date: item_year,
            id: uuidv4(),
            children: month_and_day,
          });
        }
        dates.push({
          name: `${end_year}年`,
          date: end_year,
          children: end_mouths,
          id: uuidv4(),
        });
        return dates;
      }
    },
    /**
     * 年-周模式gantt标题
     * start_year: 起始年
     * start_mouth：起始月
     * end_year：结束年
     * end_mouth：结束月
     */
    yearAndWeekTitleDate(start_year, start_mouth, end_year, end_mouth) {
      // 处理年份
      let year_diff = end_year - start_year;
      // 只存在同年或前后年的情况
      if (year_diff === 0) {
        // 年间隔为同一年
        let isLeap = this.isLeap(start_year); // 是否闰年
        let mouths = this.generationMonths(
          start_year,
          start_mouth,
          end_mouth + 1,
          isLeap,
          true,
          true
        ); // 处理月份
        return mouths;
      }
      // 处理开始月份
      let startIsLeap = this.isLeap(start_year);
      let start_mouths = this.generationMonths(
        start_year,
        start_mouth,
        13,
        startIsLeap,
        true,
        true
      );
      // 处理结束月份
      let endIsLeap = this.isLeap(end_year);
      let end_mouths = this.generationMonths(
        end_year,
        1,
        end_mouth + 1,
        endIsLeap,
        true,
        true
      );
      return start_mouths.concat(end_mouths);
    },
    /**
     * 月-日模式gantt标题
     * start_year: 起始年
     * start_mouth：起始月
     * end_year：结束年
     * end_mouth：结束月
     */
    mouthAndDayTitleDate(start_year, start_mouth, end_year, end_mouth) {
      // 处理年份
      let year_diff = end_year - start_year;
      // 只存在同年或前后年的情况
      if (year_diff === 0) {
        // 年间隔为同一年
        let isLeap = this.isLeap(start_year); // 是否闰年
        let mouths = this.generationMonths(
          start_year,
          start_mouth,
          end_mouth + 1,
          isLeap
        ); // 处理月份
        return mouths;
      }
      // 处理开始月份
      let startIsLeap = this.isLeap(start_year);
      let start_mouths = this.generationMonths(start_year, start_mouth, 13, startIsLeap);
      // 处理结束月份
      let endIsLeap = this.isLeap(end_year);
      let end_mouths = this.generationMonths(end_year, 1, end_mouth + 1, endIsLeap);
      return start_mouths.concat(end_mouths);
    },
    /**
     * 生成月份函数
     * year: Number 当前年份
     * start_num: Number 开始月分
     * end_num：Number 结束月份
     * isLeap: Boolean 是否闰年
     * insert_days: Boolean 是否需要插入 日
     * week: 是否以周的间隔
     */
    generationMonths(
      year,
      start_num = 1,
      end_num = 13,
      isLeap = false,
      insert_days = true,
      week = false
    ) {
      let months = [];
      if (insert_days) {
        // 无需 日 的模式
        for (let i = start_num; i < end_num; i++) {
          // 需要 日 的模式
          let days = this.generationDays(year, i, isLeap, week);
          months.push({
            name: `${i}月`,
            date: i,
            full_date: `${year}-${i}`,
            children: days,
            id: uuidv4(),
          });
        }
        return months;
      }
      for (let i = start_num; i < end_num; i++) {
        // 需要 日 的模式
        months.push({
          name: `${i}月`,
          date: i,
          full_date: `${year}-${i}`,
          id: uuidv4(),
        });
      }
      return months;
    },
    /**
     * 生成日期函数
     * year: Number 当前年份
     * month: Number 当前月份
     * isLeap: Boolean 是否闰年
     * week: Boolean 是否间隔一周
     */
    generationDays(year, month, isLeap = false, week = false) {
      let big_month = [1, 3, 5, 7, 8, 10, 12].includes(month);
      let small_month = [4, 6, 9, 11].includes(month);
      let dates_num = big_month ? 32 : small_month ? 31 : isLeap ? 30 : 29;
      let days = [];
      if (week) {
        let _day = 1; // 从周日开始
        let _start_day_inweek = this.timeInWeek(`${year}-${month}-1`);
        if (_start_day_inweek !== 0) {
          _day = 8 - _start_day_inweek;
        }
        for (let i = _day; i < dates_num; i += 7) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            full_date: `${year}-${month}-${i}`,
          });
        }
      } else {
        for (let i = 1; i < dates_num; i++) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            full_date: `${year}-${month}-${i}`,
          });
        }
      }
      return days;
    },
    /**
     * 是否闰年函数
     * year: Number 当前年份
     */
    isLeap(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    },
    /**
     * 当前日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    dayGanttType(row, date, unit = "days") {
      let start_date = row[this.selfProps.startDate];
      let end_date = row[this.selfProps.endDate];
      let between = dayjs(date).isBetween(start_date, end_date, unit);
      if (between) {
        return "wl-item-on";
      }
      let start = dayjs(start_date).isSame(date, unit);
      let end = dayjs(end_date).isSame(date, unit);
      if (start && end) {
        return "wl-item-on wl-item-full";
      }
      if (start) {
        return "wl-item-on wl-item-start";
      }
      if (end) {
        return "wl-item-on wl-item-end";
      }
    },
    /**
     * 实际日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    realDayGanttType(row, date, unit = "days") {
      let start_date = row[this.selfProps.realStartDate];
      let end_date = row[this.selfProps.realEndDate];
      let between = dayjs(date).isBetween(start_date, end_date, unit);
      if (between) {
        return "wl-real-on";
      }
      let start = dayjs(start_date).isSame(date, unit);
      let end = dayjs(end_date).isSame(date, unit);
      if (start && end) {
        return "wl-real-on wl-real-full";
      }
      if (start) {
        return "wl-real-on wl-real-start";
      }
      if (end) {
        return "wl-real-on wl-real-end";
      }
    },
    // 以下是时间计算类函数 ------------------------------------------------------时间计算---------------------------------------
    /**
     * 计算时差
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeDiffTime(startDate, endDate, unit = "days") {
      return dayjs(endDate).diff(startDate, unit);
    },
    /**
     * 比较时间，是否之前
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeIsBefore(startDate, endDate, unit = "days") {
      return dayjs(startDate).isBefore(endDate, unit);
    },
    /**
     * 时间加计算函数
     * date：原时间
     * num：需要增加的时间数量
     * nuit：增加时间的单位 day year
     */
    timeAdd(date, num = 1, nuit = "day", format = "YYYY-MM-DD") {
      return dayjs(date).add(num, nuit).format(format);
    },
    /**
     * 时间格式化函数
     * date 需要格式化的数据
     * format 格式化的格式
     */
    timeFormat(date, format = "YYYY-MM-DD") {
      return date ? dayjs(date).format(format) : this.emptyCellText;
    },
    /**
     * 查询时间是周几
     */
    timeInWeek(date) {
      return dayjs(date).day();
    },
    // 以下为输出数据函数 --------------------------------------------------------------输出数据------------------------------------
    // 删除任务
    emitTaskRemove(item) {
      this.$emit("taskRemove", item);
    },
    // 添加任务
    emitTaskAdd(item) {
      this.$emit("taskAdd", item);
    },
    // 任务名称更改
    emitNameChange(item) {
      this.$emit("nameChange", item);
    },
    // 任务时间更改
    emitTimeChange(item) {
      this.$emit("timeChange", item);
      this.$nextTick(() => {
        this.$set(item, "_oldStartDate", item[this.selfProps.startDate]);
        this.$set(item, "_oldEndDate", item[this.selfProps.endDate]);
      });
    },
    /**
     * 前置任务更改
     * item: Object 发生更改的行数据
     * oldval: [String, Array] 修改前数据
     * handle: Boolean true为操作选择框修改 false为源数据不符合规范的修正更改
     */
    emitPreChange(item, oldval, handle = false) {
      this.$emit("preChange", item, oldval, handle);
    },
    // 处理外部数据 ---------------------------------------------------------------原始数据处理-------------------------------------
    handleData(data, parent = null, level = 0) {
      level++;
      data.forEach((i) => {
        this.$set(i, "_parent", parent); // 添加父级字段
        this.$set(i, "_level", level); // 添加层级字段
        if (!i._oldStartDate) {
          this.$set(i, "_oldStartDate", i[this.selfProps.startDate]);
        }
        if (!i._oldEndDate) {
          this.$set(i, "_oldEndDate", i[this.selfProps.endDate]);
        }
        // 当结束时间早于开始时间时，自动处理结束时间为开始时间延后一天
        let _end_early_start = this.timeIsBefore(
          i[this.selfProps.endDate],
          i[this.selfProps.startDate]
        );
        if (_end_early_start) {
          this.$set(i, this.selfProps.endDate, i[this.selfProps.startDate]);
          this.$set(i, "_cycle", 1); // 添加工期字段
          this.emitTimeChange(i); // 将发生时间更新的数据输出
        } else {
          let _time_diff = this.timeDiffTime(
            i[this.selfProps.startDate],
            i[this.selfProps.endDate]
          );
          this.$set(i, "_cycle", _time_diff + 1); // 添加工期字段
        } // 添加工期字段
        // 添加自增id字段及树链组成的parents字段
        this.recordIdentityIdAndParents(i);
        // 处理前置任务
        // this.handlePreTask(i);
        // 如果当前节点的开始时间早于父节点的开始时间，则将开始时间与父节点相同
        this.parentStartDateToChild(i);
        // 校验结束时间是否晚于子节点，如不则将节点结束时间改为最晚子节点
        this.childEndDateToParent(i);
        if (Array.isArray(i[this.selfProps.children])) {
          this.$set(i, "_isLeaf", false); // 添加是否叶子节点字段
          let _all_children = flattenDeep(
            i[this.selfProps.children],
            this.selfProps.children
          );
          this.$set(i, "_all_children", _all_children); // 添加全部子节点字段
          this.handleData(i[this.selfProps.children], i, level);
        } else {
          this.$set(i, "_isLeaf", true); // 添加是否叶子节点字段
          this.$set(i, "_all_children", []); // 添加全部子节点字段
        }
      });
    },
    // 取父节点开始时间给早于父节点开始时间的子节点
    parentStartDateToChild(item) {
      if (!item._parent) return;
      // 如果子节点时间早于父节点，则将子节点开始时间后移至父节点开始时间,并将结束时间平移【即工期不变】
      let _child_early_parent = this.timeIsBefore(
        item[this.selfProps.startDate],
        item._parent[this.selfProps.startDate]
      );
      if (_child_early_parent) {
        // 修正子节点开始时间
        this.$set(item, this.selfProps.startDate, item._parent[this.selfProps.startDate]);
        // 修正子节点结束时间
        let _to_endDate = this.timeAdd(item[this.selfProps.startDate], item._cycle);
        this.$set(item, this.selfProps.endDate, _to_endDate);
        this.emitTimeChange(item); // 将发生时间更新的数据输出
      }
    },
    // 取数组结束时间最大值，如果最大值比父级结束时间大，更新父级结束时间
    childEndDateToParent(item) {
      if (!Array.isArray(item[this.selfProps.children])) return;
      let _child_max = getMax(
        item[this.selfProps.children],
        this.selfProps.endDate,
        true
      ); // 取子节点中最晚的结束时间
      let _parent_end = dayjs(item[this.selfProps.endDate]).valueOf();
      if (_child_max > _parent_end) {
        // 如果子节点结束时间比父节点晚，则将父节点结束时间退后
        this.$set(item, this.selfProps.endDate, this.timeFormat(_child_max));
        this.emitTimeChange(item); // 将发生时间更新的数据输出
      }
    },
    // 处理前置任务节点    /// ---- 此使前置任务校验处理还没开始，因此出错，前置处理后手动调用vue视图更新试试
    handlePreTask(item) {
      // 统一在一维化数据中处理前置任务
      let _pre_target = this.self_dependent_store.find(
        (i) => i.form[this.selfProps.id] === item[this.selfProps.id]
      );
      if (!_pre_target) return;
      let _pre_end_date = this.preMultiple
        ? getMax(_pre_target.to, this.selfProps.endDate, true) // 取前置点中最晚的结束时间
        : _pre_target.to[this.selfProps.endDate];
      /* 在数据循环中处理前置
      let pres = item[this.selfProps.pre];
      if(!pres) return;
      let _pre_target = null, _pre_end_date = null;
      if(this.preMultiple){
        if(!Array.isArray(pres) || pres.length ===0) return;
        _pre_target = this.self_data_list.filter(i => pres.includes(i[this.selfProps.id]));
        _pre_end_date = getMax(_pre_target, this.selfProps.endDate, true);
      }else{
        _pre_target = this.self_data_list.find(i => i[this.selfProps.id] === pres);
        if(!_pre_target) return;
        _pre_end_date = _pre_target[this.selfProps.endDate]
      } */
      // 查看是否需要根据前置时间，如果不符合规则，更新后置时间
      let _start_early_prvend = this.timeIsBefore(
        item[this.selfProps.startDate],
        _pre_end_date
      );
      if (_start_early_prvend) {
        let _cycle = item._cycle - 1;
        let _to_startDate = this.timeAdd(_pre_end_date, 1);
        let _to_endDate = this.timeAdd(_to_startDate, _cycle);
        this.$set(item, this.selfProps.startDate, _to_startDate);
        this.$set(item, this.selfProps.endDate, _to_endDate);
      }
    },
    /**
     * 检查前置任务合法性
     * ！！已废弃：改为从一维数据列收集form、to并校验，不再在递归中检查 -> handleDependentStore
     */
    checkPreTaskValidity(item) {
      // 没有前置任务退出
      if (!item[this.selfProps.pre]) return false;
      // 多前置任务模式
      if (this.preMultiple) {
        let _pres = item[this.selfProps.pre];
        // 不是数组退出
        if (!Array.isArray(_pres)) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, []);
          return false;
        }
        // 数组为空退出
        if (_pres.length === 0) return false;
        // 前置任务有自己时，剔除自己
        let _net_self_pres = _pres.filter((i) => i !== item[this.selfProps.id]);
        if (_net_self_pres.length !== _pres.length) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, _net_self_pres);
        }
        // 剔除前置任务找不到目标数据的元素
        let _pre_exist = _net_self_pres.filter((i) => this.targetInAllData(i));
        if (_pre_exist.length !== _net_self_pres.length) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, _pre_exist);
        }
        let _no_par_chi = []; // 声明非父、祖、子、孙节点的盒子
        for (let i of _pre_exist) {
          let _pre_target = this.self_data_list.find((t) => t[this.selfProps.id] === i);
          if (!_pre_target) continue;
          let _pre_par_chi = this.targetInParentsOrChildren(item, _pre_target);
          _pre_par_chi || _no_par_chi.push(i);
        }
        // 前置任务是自己的父祖或子孙节点, 剔除此前置
        if (_no_par_chi.length !== _pre_exist.length) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, _no_par_chi);
        }
        // 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
        this.targetLinkLoopback(item);
        return true;
      }
      // 单前置任务模式
      if (item[this.selfProps.pre] === item[this.selfProps.id]) {
        this.$set(item, this.selfProps.pre, null);
        return false;
      } // 前置任务是自己退出
      // 找到前置目标节点
      let _pre_target = this.self_data_list.find(
        (i) => i[this.selfProps.id] == item[this.selfProps.pre]
      );
      // 没找到前置任务节点数据退出
      if (!_pre_target) {
        this.$set(item, this.selfProps.pre, null);
        return false;
      }
      // 前置任务是自己的父祖或子孙节点退出
      let is_pre_standard = this.targetInParentsOrChildren(item, _pre_target);
      if (is_pre_standard) {
        this.$set(item, this.selfProps.pre, null);
        return false;
      }
      // 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
      this.targetLinkLoopback(item);
      return true;
    },
    // 处理数据生成自增id和树链parents
    recordIdentityIdAndParents(item) {
      // if (!this.recordParents) return;
      if (this.treatIdAsIdentityId) {
        let _parents = item._parent
          ? item._parent._parents + "," + item._parent[this.selfProps.id]
          : "";
        this.$set(item, "_parents", _parents);
        this.$set(item, "_identityId", item[this.selfProps.id]);
        return;
      }
      // 添加自增id
      this.$set(item, "_identityId", this.self_id);
      this.self_id++;
      // 添加parents字段
      let _parents = item._parent
        ? item._parent._parents + "," + item._parent._identityId
        : "";
      this.$set(item, "_parents", _parents);
    },
    /**
     * 查询目标是否在父级链或者全部子集中
     * item 当前节点
     * pre 前置节点
     */
    targetInParentsOrChildren(item, pre) {
      let _parents = item._parents.split(",");
      let _children = item._all_children.map((i) => i._identityId);
      return _children.concat(_parents).some((i) => i == pre._identityId);
    },
    // 查询目标节点是否在数据中存在,并返回数据
    targetInAllData(target_id) {
      return this.self_data_list.find((i) => i[this.selfProps.id] === target_id);
    },
    /**
     * 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
     * item: Object 当前节点数据
     * pre_tesk: Array 前置链上所有id
     * ！！已废弃：下方尝试改成form to结构收集起来处理，不再循环中反复循环处理 -> terseTargetLinkLoopback
     */
    targetLinkLoopback(item, pre_tesk = []) {
      pre_tesk.push(item[this.selfProps.id]);
      let _pres = item[this.selfProps.pre];
      let _legal_pres = _pres.filter((i) => !pre_tesk.includes(i));
      if (this.preMultiple) {
        if (_legal_pres.length !== _pres.length) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, _legal_pres);
        }
        _legal_pres.forEach((i) => {
          let _pre_target = this.self_data_list.find((t) => t[this.selfProps.id] === i);
          if (
            _pre_target &&
            Array.isArray(_pre_target[this.selfProps.pre]) &&
            _pre_target[this.selfProps.pre].length > 0
          ) {
            this.targetLinkLoopback(_pre_target, pre_tesk);
          }
        });
      } else {
        if (pre_tesk.includes(_pres)) {
          this.emitPreChange(item, item[this.selfProps.pre]);
          this.$set(item, this.selfProps.pre, _legal_pres);
        }
        let _pre_target = this.self_data_list.find(
          (t) => t[this.selfProps.id] === item[this.selfProps.id]
        );
        if (_pre_target) {
          this.targetLinkLoopback(_pre_target, pre_tesk);
        }
      }
    },
    /**
     * 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
     * item: Object 当前节点数据
     * flow_pre_tesk: Array 前置链上所有id
     */
    terseTargetLinkLoopback(item, flow_pre_tesk = []) {
      flow_pre_tesk.push(item.form[this.selfProps.id]);
      if (this.preMultiple) {
        let _legal_pre = [], // 收集合法数据
          _next_form = []; // 收集所有前置的前置
        for (let i of item.to) {
          let _to_id = i[this.selfProps.id];
          if (flow_pre_tesk.includes(_to_id)) continue;
          _legal_pre.push(_to_id);
          flow_pre_tesk.push(_to_id);
          let _store_next_form = this.self_dependent_store.filter(
            (t) => t.form[this.selfProps.id] === _to_id
          );
          _next_form = _next_form.concat(_store_next_form);
        }
        // 剔除不合法前置
        if (_legal_pre.length !== item.to.length) {
          this.emitPreChange(item.form, item.form[this.selfProps.pre]);
          this.$set(item.form, this.selfProps.pre, _legal_pre);
        }
        // 向前置的前置递归
        _next_form.forEach((t) => {
          this.terseTargetLinkLoopback(t, flow_pre_tesk);
        });
      } else {
        let _to_id = item.to[this.selfProps.id];
        if (flow_pre_tesk.includes(_to_id)) {
          this.emitPreChange(item.form, item.form[this.selfProps.pre]);
          this.$set(item.form, this.selfProps.pre, null);
          return;
        }
        let _next_form = this.self_dependent_store.find(
          (t) => t.form[this.selfProps.id] === _to_id
        );
        if (!_next_form) return;
        this.terseTargetLinkLoopback(_next_form, flow_pre_tesk);
      }
    },
    // 简洁处理数据
    terseHandleData(data, parent = null, level = 0) {
      level++;
      data.forEach((i) => {
        this.$set(i, "_parent", parent); // 添加父级字段
        this.$set(i, "_level", level); // 添加层级字段
        let _time_diff = this.timeDiffTime(
          i[this.selfProps.startDate],
          i[this.selfProps.endDate]
        );
        i._cycle = _time_diff + 1;
        if (!i._oldStartDate) {
          // 添加开始时间字段
          this.$set(i, "_oldStartDate", i[this.selfProps.startDate]);
        }
        if (!i._oldEndDate) {
          // 添加结束字段时间
          this.$set(i, "_oldEndDate", i[this.selfProps.endDate]);
        }
        // 添加自增id字段及树链组成的parents字段
        this.recordIdentityIdAndParents(i);
        if (Array.isArray(i[this.selfProps.children])) {
          this.$set(i, "_isLeaf", false); // 添加是否叶子节点字段
          let _all_children = flattenDeep(
            i[this.selfProps.children],
            this.selfProps.children
          );
          this.$set(i, "_all_children", _all_children); // 添加全部子节点字段
          this.terseHandleData(i[this.selfProps.children], i, level);
        } else {
          this.$set(i, "_isLeaf", true); // 添加是否叶子节点字段
        }
        // 处理前置任务
        // this.handlePreTask(i);
      });
    },
    // 生成前置依赖库, 校验前置合法性并剔除不合法数据
    handleDependentStore() {
      this.self_dependent_store = [];
      // 多选前置模式
      if (this.preMultiple) {
        for (let i of this.self_data_list) {
          let _pres = i[this.selfProps.pre];
          if (!_pres) continue;
          // 不是数组退出
          if (!Array.isArray(_pres)) {
            this.emitPreChange(i, i[this.selfProps.pre]);
            this.$set(i, this.selfProps.pre, []);
            continue;
          }
          // 数组为空退出
          if (_pres.length === 0) continue;
          // 查询不到数据的不收集，是父、祖、子、孙节点的不收集
          let _pre_exist_node = [],
            _pre_exist_id = [];
          for (let t of _pres) {
            let target_node = this.targetInAllData(t);
            if (!target_node) continue; // 查询不到数据的不收集
            let in_per_chi = this.targetInParentsOrChildren(i, target_node);
            if (in_per_chi) continue; // 是父、祖、子、孙节点的不收集
            _pre_exist_node.push(target_node);
            _pre_exist_id.push(target_node[this.selfProps.id]);
          }
          if (_pre_exist_node.length !== _pres.length) {
            this.emitPreChange(i, i[this.selfProps.pre]);
            this.$set(i, this.selfProps.pre, _pre_exist_id);
          }
          this.self_dependent_store.push({
            form: i,
            to: _pre_exist_node,
          });
        }
      } else {
        // 单选前置模式
        for (let i of this.self_data_list) {
          if (!i[this.selfProps.pre]) continue;
          let _pre_target = this.targetInAllData(i[this.selfProps.pre]);
          // 处理前置任务找不到的情况
          if (!_pre_target) {
            this.emitPreChange(i, i[this.selfProps.pre]);
            this.$set(i, this.selfProps.pre, null);
            continue;
          }
          // 处理前置任务是父祖子孙节点的情况
          let in_per_chi = this.targetInParentsOrChildren(i, _pre_target);
          if (in_per_chi) {
            this.emitPreChange(i, i[this.selfProps.pre]);
            this.$set(i, this.selfProps.pre, null);
            continue;
          }
          this.self_dependent_store.push({
            form: i,
            to: _pre_target,
          });
        }
      }
      // 处理合格前置任务
      this.self_dependent_store.forEach((i) => {
        this.terseTargetLinkLoopback(i);
      });
      // 处理前置依赖
      this.self_data_list.forEach((i) => {
        this.handlePreTask(i);
      });
      // 暂时强制更新视图
      if (this.update) {
        this.update = false;
        this.selfData.sort();
      }
    },
    // 父子关联
    tableSelect(val, row) {
      if (!this.parentChild) return;
      // 选中
      if (val.some((item) => item[this.selfProps.id] == row[this.selfProps.id])) {
        // 父元素选中全选所有子孙元素
        // for (let item of val) {
        row._all_children.forEach((i) => {
          this.$refs["wl-gantt"].toggleRowSelection(i, true);
        });
        // }
        // 子元素全选向上查找所有满足条件的祖先元素
        regDeepParents(row, "_parent", (parents) => {
          let reg =
            parents &&
            parents[this.selfProps.children].every((item) => {
              return val.some((it) => it[this.selfProps.id] == item[this.selfProps.id]);
            });
          if (reg) this.$refs["wl-gantt"].toggleRowSelection(parents, true);
        });
      } else {
        // 非选中将所有子孙元素及支线上祖先元素清除
        let cancel_data = [...row._all_children, ...flattenDeepParents([row], "_parent")];
        for (let item of cancel_data) {
          this.$refs["wl-gantt"].toggleRowSelection(item, false);
        }
      }
    },
    // el-table事件----------------------------------------------以下为原el-table事件输出------------------------------------------------
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
      this.multipleSelection = val;
    }, // 当选择项发生变化时会触发该事件
    handleCurrentChange(val, oldVal) {
      this.$emit("current-change", val, oldVal);
      this.currentRow = val;
    }, // 当表格的当前行发生变化的时候会触发该事件
    handleSelectAll(val) {
      let is_check = val.length > 0;
      this.self_data_list.forEach((i) => {
        this.$refs["wl-gantt"].toggleRowSelection(i, is_check);
      });
      this.$emit("select-all", val);
    }, // 当用户手动勾选全选 Checkbox 时触发的事件
    handleSelect(selection, row) {
      this.tableSelect(selection, row);
      let _is_add = selection.some((i) => i[this.rowKey] === row[this.rowKey]);
      this.selectionList = selection;
      this.$emit("select", selection, row, _is_add);
    }, // 当用户手动勾选全选 Checkbox 时触发的事件
    handleMouseEnter(row, column, cell, event) {
      if (this.useCard) {
        this.infoCard.show = true;
        this.infoCard.x = event.screenX;
        this.infoCard.y = event.screenY;
        this.infoCard.row = { ...row };
        this.infoCard.column = column;
        this.infoCard.cell = cell;
        this.infoCard.event = event;
        this.infoCard.timer && clearTimeout(this.infoCard.timer);
      }
      this.$emit("cell-mouse-enter", row, column, cell, event);
    }, // 当单元格 hover 进入时会触发该事件
    handleMouseLeave(row, column, cell, event) {
      if (this.useCard) {
        this.infoCard.timer = setTimeout(() => {
          this.infoCard.show = false;
          clearTimeout(this.infoCard.timer);
          this.infoCard.timer = null;
        }, 500);
      }
      this.$emit("cell-mouse-leave", row, column, cell, event);
    }, // 当单元格 hover 退出时会触发该事件
    handleCellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    }, // 当某个单元格被点击时会触发该事件
    handleCellDbClick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    }, // 当某个单元格被双击击时会触发该事件
    handleRowClick(row, column, event) {
      /* if (this.useCheckColumn && this.quickCheck) {
        let is_check = this.selectionList.some(
          i => i[this.rowKey] == row[this.rowKey]
        );
        this.$refs["wl-gantt"].toggleRowSelection(row, !is_check);
        this.$nextTick(() => {
          this.handleSelect(this.selectionList, row, !is_check);
        });
      } */
      this.$emit("row-click", row, column, event);
    }, // 当某一行被点击时会触发该事件
    handleRowContextMenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
      // 处理右键菜单浮窗
      if (!Array.isArray(this.contextMenuOptions)) return;
      this.contextMenu.data = [];
      this.contextMenuOptions.forEach((i) => {
        let _item = {
          label: i.label,
          icon: i.icon,
          value: row[i.prop],
        };
        this.contextMenu.data.push(_item);
      });
      this.contextMenu.x = event.x;
      this.contextMenu.y = event.y;
      this.contextMenu.show = true;
    }, // 当某一行被鼠标右键点击时会触发该事件
    handleContextmenu() {
      event.preventDefault();
      event.stopPropagation();
    }, // 右键菜单事件
    handleRowDbClick(row, column, event) {
      this.$emit("row-dblclick", row, column, event);
    }, // 当某一行被双击时会触发该事件
    handleHeaderClick(column, event) {
      this.$emit("header-click", column, event);
    }, // 当某一列的表头被点击时会触发该事件
    handleHeaderContextMenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    }, // 当某一列的表头被鼠标右键点击时触发该事件
    handleSortChange(e) {
      this.$emit("sort-change", e);
    }, // 当表格的排序条件发生变化的时候会触发该事件
    handleFilterChange(filters) {
      this.$emit("filter-change", filters);
    }, // 当表格的筛选条件发生变化的时候会触发该事件
    handleExpandChange(row, expanded) {
      this.$emit("expand-change", row, expanded);
    }, // 当表格的筛选条件发生变化的时候会触发该事件
    // ------------------------------------------- 以下为提供方法 ------------------------------------
    /**
     * 手动调用树表懒加载
     * row 要展开的行信息
     */
    loadTree(row) {
      this.$refs["tableRef"].store.loadOrToggle(row);
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要添加的节点list
     */
    loadTreeAdd(id, list) {
      let _children = this.$refs["wl-gantt"].store.states.lazyTreeNodeMap[id] || [];
      this.$set(
        this.$refs["wl-gantt"].store.states.lazyTreeNodeMap,
        id,
        list.concat(_children)
      );
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要删掉的字节的rowKey
     */
    loadTreeRemove(id, key) {
      let _children = this.$refs["wl-gantt"].store.states.lazyTreeNodeMap[id];
      let _new_children = _children.filter((i) => i[this.rowKey] != key);
      this.$set(this.$refs["wl-gantt"].store.states.lazyTreeNodeMap, id, _new_children);
    },
  },

  beforeDestroy() {
    if (this.infoCard.timer) {
      clearTimeout(this.infoCard.timer);
      this.infoCard.timer = null;
    }
  },
  /* GTT END*/
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
</style>
<style lang="scss">
@import "./css/index.min.css";
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
