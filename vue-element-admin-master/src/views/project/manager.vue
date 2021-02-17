<template>
  <div class="app-container">
    <div class="project-body">
      <div class="left-project">

        <div class="header header--hidden">
          <div class="card-header-title"><span class="ng-star-inserted"> 项目 </span></div>
          <div>
            <i class="el-icon-plus" style="margin-right: 20px;" @click="addProjectEvent(null)" />
            <i class="el-icon-finished" />
          </div>
        </div>

        <input v-model="searchContent" type="text" autocomplete="off" class="el-input__inner" placeholder="搜索项目" @input="searchProject">
        <el-radio-group v-model="searchStatus" size="mini" @change="searchProject">
          <el-radio-button label="0" value="0">全部</el-radio-button>
          <el-radio-button label="1" value="1">未完成</el-radio-button>
          <el-radio-button label="2" value="2">已完成</el-radio-button>
        </el-radio-group>
        <ul>
          <li v-for="(item,index) in projectList" :key="item.id" class="ng-star-inserted" :class="currProjectIndex==item.id?'active':''"
            @click.prevent="clickProject(item.id)">
            <a class="section-item" href="#">
              <svg-icon icon-class="project2" />{{ item.name }}</a>
            <div class="ng-star-inserted-btn">
              <a v-if="item.status==7" class="section-item" href="#" title="提交审批" @click.prevent="authProject(item.id)">
                <svg-icon icon-class="sp" /></a>
              <a v-if="item.status==7" class="section-item" href="#" title="修改" @click.prevent="addProjectEvent(item.id)">
                <svg-icon icon-class="update" /></a>
              <a v-if="item.status==7" class="section-item" href="#" title="删除" @click.prevent="deleteProject(item.id,index)">
                <svg-icon icon-class="del" /></a>
            </div>
          </li>
        </ul>

      </div>
      <div class="right-project">
        <div class="right-btns">
          <div style="display: flex;align-items: center;justify-content: center;">
            <svg-icon icon-class="setting" style="width: 1.5em;height: 1.5em;" />设置
          </div>

        </div>
        <el-tabs v-if="isHasThisProject" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="项目概览" name="1">

            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer" />
                <div>基本信息</div>
              </div>

              <div class="manager-card-content">

                <div class="d-flex">

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">项目名称:</span>
                    {{ thisProject.name }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">产业类型:</span>
                    {{ thisProject.categoryName }}
                  </div>

                  <div class="project-basic-property property-text align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目编码:</span><span class="text-muted">XG-nmg123123</span>
                  </div>
                </div>
                <div class="d-flex">

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                    {{ thisProject.startDateStr }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                    {{ thisProject.completeDateStr }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">主管部门:</span>
                    {{ thisProject.orgName }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">主管负责人:</span>
                    {{ thisProject.proManagerName }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">主管人联系电话:</span>
                    {{ thisProject.proManagerMobile }}
                  </div>

                  <div class="project-basic-property property-text align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name project-basic-property-item-name">项目成熟度:</span>
                    {{ thisProject.maturityStr }}
                  </div>

                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">牵头单位:</span>
                    {{ thisProject.leadenterName }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">牵头领导:</span>
                    {{ thisProject.leaderName }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">对接时间:</span>
                    {{ thisProject.dockingDateStr }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">协调负责人:</span>
                    {{ thisProject.coordinateName }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">企业联系人:</span>
                    {{ thisProject.enterManagerName }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">企业联系人电话:</span>
                    {{ thisProject.enterManagerMobile }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">项目建设阶段:</span>
                    {{ thisProject.stage=="1"?"无所属":thisProject.stage=="2"?"立项阶段":thisProject.stage=="3"?"执行阶段":"完成阶段" }}
                  </div>

                  <div class="project-basic-property property-text"><span class="project-property-item-name project-basic-property-item-name">预计完成时间:</span>
                    {{ thisProject.expectedDateStr }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目描述:</span>
                    {{ thisProject.content }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text align-items-start" style="display:flex;align-items: center;">
                    <span class="project-property-item-name project-basic-property-item-name">当前状态:</span>
                    <div class="flex-se1">
                      <span class="circle" :class="projectStatusClass" />
                      <span class="ml-1">{{ thisProject.status==1?"进行中":thisProject.status==2?"已完成":thisProject.status==3?"逾期":thisProject.status==7?"新建":thisProject.status==8?"提交审批中":thisProject.status==9?"审批失败":"审批通过" }}</span>
                      <el-button type="primary" size="mini" round @click="clickUpdateStatus">更新</el-button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
            <span class="project-basic-property-line" />

            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer" />
                <div>其他信息</div>
              </div>

              <div class="manager-card-content">
                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">项目参与人员:</span>
                    {{ thisProject.joinersStr }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">投资情况:</span>
                    {{ thisProject.invest }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">项目审批监管平台代码:</span>
                    {{ thisProject.approveCode }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">备注:</span>
                    {{ thisProject.remarks }}
                  </div>
                </div>
                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">其他需要解决的手续问题:</span>
                    {{ thisProject.otherBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">存在的困难和问题:</span>
                    {{ thisProject.diffAndProblem }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否完成审核备:</span>
                    {{ thisProject.lxIsComapprove }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级:</span>
                    {{ thisProject.lxHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门:</span>
                    {{ thisProject.lxIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成建设用地规划许可证:</span>
                    {{ thisProject.ydcardIsHascard }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级:</span>
                    {{ thisProject.ydcardHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门:</span>
                    {{ thisProject.ydcardIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成节能审查：</span>
                    {{ thisProject.energyIsCensor }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.energyHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.energyIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成林地草地征占手续：</span>
                    {{ thisProject.lcIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.lcHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.lcIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">建设用地批准书或国有土地证、登记证：</span>
                    {{ thisProject.tdIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.tdHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.tdIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成环境影响评价审批文件、登记证：</span>
                    {{ thisProject.envirIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.envirHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.envirIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成建设工程施工许可证：</span>
                    {{ thisProject.sgIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.sgHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.sgIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成消防许可证：</span>
                    {{ thisProject.xfIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.xfHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.xfIsSendappdepart }}
                  </div>
                </div>

                <div class="d-flex">

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成人防许可证：</span>
                    {{ thisProject.rfIsBl }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.rfHandleLevel }}
                  </div>

                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.rfIsSendappdepart }}
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="投资情况" name="2">
            <div class="manager-card">
              <div class="el-alert el-alert--success is-light">
                <!---->
                <div class="el-alert__content"><span class="el-alert__title">项目总投资金额：</span>
                  <span class="el-alert__m">
                    <count-to :start-val="0" :end-val="thisProject.invest" :duration="2600" class="card-panel-num" /></span>
                  <!---->
                  <!----><i class="el-alert__closebtn el-icon-close" style="display: none;" /></div>
              </div>

              <el-table :data="tzqkList" style="width: 100%">
                <el-table-column prop="investDateStr" label="日期" width="180" />
                <el-table-column prop="investType" label="投资源" />
                <el-table-column prop="investMoney" label="投资资金" width="280" />
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务配置" name="3">
            <div class="task-list-type">
              <div class="task-list-type-left">
                <ul>
                  <li :class="taskTypeStatus==10?'active':''" @click="getTaskSearch(10)"><a>全部({{ allCountMap.ALL }})</a></li>
                  <li :class="taskTypeStatus===0?'active':''" @click="getTaskSearch(0)"><a>未分配的任务({{ allCountMap.NOMACK }})</a></li>
                  <li :class="taskTypeStatus===5?'active':''" @click="getTaskSearch(5)"><a>未开始的任务({{ allCountMap.YESMACK }})</a></li>
                  <li :class="taskTypeStatus===1?'active':''" @click="getTaskSearch(1)"><a>未完成的任务({{ allCountMap.NOCOM }})</a></li>
                  <li :class="taskTypeStatus===2?'active':''" @click="getTaskSearch(2)"><a>已完成的任务({{ allCountMap.COMPLETE }})</a></li>
                  <li :class="taskTypeStatus===3?'active':''" @click="getTaskSearch(3)"><a>已延期的任务({{ allCountMap.DELAY }})</a></li>
                  <li :class="taskTypeStatus===4?'active':''" @click="getTaskSearch(4)"><a>已逾期的任务({{ allCountMap.OVERDUE }})</a></li>
                </ul>
              </div>
              <div class="task-list-type-right">
                <ul>
                  <li><a class="add-task-origin nav-link ng-star-inserted" href="javascript:;" @click="openAddTask(null)">
                      <i class="el-icon-circle-plus" />
                      新建
                    </a></li>
                  <!-- <li> <a class="add-task-origin nav-link ng-star-inserted" href="javascript:;" thynavlink="">
                      <i class="wtf wtf-circle-plus text-primary"></i>
                      新建
                    </a></li> -->
                </ul>
              </div>
            </div>
            <div class="task-list-body">

              <el-card class="box-card">
                <el-collapse v-model="activeNamesTask">
                  <el-collapse-item v-for="item in taskList" :key="item.id" :title="item.name" :name="item.id">
                    <yhj-task-table :task-list="item.value" @updateTask="updateTask" />
                  </el-collapse-item>
                </el-collapse>
              </el-card>

              <!-- <my-table-tasks task-list="tableData" /> -->

            </div>

          </el-tab-pane>
          <el-tab-pane label="项目文件" name="4">

            <div class="manager-card">
              <div class="el-alert el-alert--success is-light">
                <!---->
                <div class="el-alert__content"><span class="el-alert__title">项目总文件数：</span>
                  <span class="el-alert__m">
                    <count-to :start-val="0" :end-val="fileMap.total" :duration="2600" class="card-panel-num" /></span>
                  <!---->
                  <!----><i class="el-alert__closebtn el-icon-close" style="display: none;" /></div>
              </div>

              <el-table :data="fileMap.list" style="width: 100%">
                <el-table-column prop="thumb" label="类型" width="150">
                  <template slot-scope="scope">
                    <svg-icon class="fj-svg" :icon-class="scope.row.thumb" />
                  </template>
                </el-table-column>
                <el-table-column prop="fileName" label="文件名" />
                <el-table-column prop="taskName" label="所属任务" />
                <el-table-column prop="date" label="上传时间" width="280" />
                <el-table-column fixed="right" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">
                      <a class="mr-3 btn btn-icon" :href="scope.row.url ==''?'javascript:;':scope.row.url">下载</a>
                    </el-button>

                  </template>
                </el-table-column>
              </el-table>
              <el-pagination :current-page="fileMap.pn" :page-sizes="[20, 50, 100]" :page-size="fileMap.ps" layout="total, sizes, prev, pager, next, jumper"
                :total="fileMap.total" @size-change="handlePageSizeChange" @current-change="handlePageCurrentChange" />
            </div>

          </el-tab-pane>
        </el-tabs>
        <el-tabs v-else v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="项目概览" name="1">
            <div style="padding: 10px;">
              <panel-group :all-pro-count="allMsg.allProject" :all-com-pro-count="allMsg.allComProject" :all-invest="allMsg.allInvest"
                :all-people="allMsg.allPeople" @handleSetLineChartData="handleSetLineChartData" />
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- add projectform -->
    <el-dialog :visible.sync="dialogAddFormVisible" :title="dialogType==='edit'?'修改项目':'新建项目'">
      <el-form ref="ruleForm" :model="addform" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addform.name" autocomplete="off" placeholder="请输入项目名称" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目编号" prop="number" :label-width="formLabelWidth">
                <el-input v-model="addform.number" autocomplete="off" placeholder="请输入项目编号" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <!-- <el-form-item label="产业类型" prop="industryCategory" :label-width="formLabelWidth">
                <el-select v-model="addform.industryCategory" placeholder="请选择产业类型">
                  <el-option v-for="(item,index) in categoryList" :key="item.id" :label="item.categoryName" :value="index" />
                </el-select>
              </el-form-item> -->
              <el-form-item label="所属行业" prop="typeArr" :label-width="formLabelWidth">
                <el-cascader
                  v-model="addform.typeArr"
                  :options="typeList"
                  :props="{ expandTrigger: 'hover' }"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目成熟度" prop="maturity" :label-width="formLabelWidth">
                <el-select v-model="addform.maturity" placeholder="请选择项目成熟度">
                  <el-option v-for="item in maturity" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="项目描述" prop="content" :label-width="formLabelWidth">
                <el-input v-model="addform.content" type="textarea" placeholder="请输入项目描述信息" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="牵头单位" prop="leadenter" :label-width="formLabelWidth">
                <el-select v-model="addform.leadenter" placeholder="请选择牵头单位" @change="changeLeadenter">
                  <!--  @change="executorChange" -->
                  <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="牵头领导" prop="leader" :label-width="formLabelWidth">
                <el-select v-model="addform.leader" placeholder="请选择牵头领导">
                  <el-option v-for="item in leaderList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="主管部门负责人" prop="proManager" :label-width="formLabelWidth">
                <el-select v-model="addform.proManager" placeholder="请选择" @change="proManagerChange">
                  <el-option v-for="item in peopleList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业联系人" prop="enterManager" :label-width="formLabelWidth">
                <el-select v-model="addform.enterManager" placeholder="请选择" @change="enterManagerChange">
                  <el-option v-for="item in enterList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="主管部门负责人电话" prop="proManagerMobile" :label-width="formLabelWidth">
                <el-input v-model="addform.proManagerMobile" autocomplete="off" placeholder="请输入" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业联系电话" prop="enterManagerMobile" :label-width="formLabelWidth">
                <el-input v-model="addform.enterManagerMobile" autocomplete="off" placeholder="请输入" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="对接日期" prop="dockingDate" :label-width="formLabelWidth">
                <el-date-picker v-model="addform.dockingDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                  style="width: 100%;" :picker-options="endTime"/>
              </el-form-item>
            </div>
          </el-col>


          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="协调负责人" prop="coordinate" :label-width="formLabelWidth">
                <el-select v-model="addform.coordinate" placeholder="请选择协调负责人">
                  <el-option v-for="item in peopleList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目代号" prop="taskPrefix" :label-width="formLabelWidth">
                <el-input v-model="addform.taskPrefix" autocomplete="off" placeholder="例如:LY-2020(林业2020项目)" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="可见范围" prop="visibleRange" :label-width="formLabelWidth">
                <el-select v-model="addform.visibleRange" multiple placeholder="请选择可见组织范围" @change="visibleRangeChange">
                  <el-option label="选择所有" value="0" />
                  <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="参与人员" prop="joiners" :label-width="formLabelWidth">
                <el-select v-model="addform.joiners" multiple placeholder="请选择参与人员" @change="joinerChange">
                  <el-option label="选择所有" value="0" />
                  <el-option v-for="item in joiners" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="addform.remarks" autocomplete="off" placeholder="请输入备注信息" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="投资情况" prop="invest" :label-width="formLabelWidth">
                <el-input v-model="addform.invest" autocomplete="off" placeholder="**请输入投资总金额" @input="investChange" suffix-icon="iconfont icon-jinbi"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24" :class="visibleInvest" >
            <el-form-item label="投资明细" prop="investInfos" :label-width="formLabelWidth">
              <div>
                <el-row >
                  <el-col :span="8" style="min-height: 40px;height: 40px;">
                    <div class="grid-content bg-purple" style="line-height: 22px;">投资类型</div>
                  </el-col>
                  <el-col :span="8" style="min-height: 40px;height: 40px;">
                    <div class="grid-content bg-purple" style="line-height: 22px;">投资金额</div>
                  </el-col>
                  <el-col :span="8" style="min-height: 40px;height: 40px;">
                    <div class="grid-content bg-purple" style="line-height: 22px;">投资时间</div>
                  </el-col>
                </el-row>
                <InvestInfo v-for="(item,index) in addform.investInfos" :key="index" :index="index" :item="item" @delete="deleteInvestInfo"></InvestInfo>

              </div>
              <el-button size="mini" type="primary" @click="addInvestInfo">添 加</el-button>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="预计完成时间" prop="expectedDate" :label-width="formLabelWidth">
                <el-date-picker v-model="addform.expectedDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                  style="width: 100%;" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目审批监管平台代码" :label-width="formLabelWidth">
                <el-input v-model="addform.approveCode" autocomplete="off" placeholder="请输入项目审批监管平台代码" />

              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目包含阶段" :label-width="formLabelWidth">
                <el-select v-model="addform.stage" multiple placeholder="请选择项目包含的阶段">
                  <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="存在的困难和问题" :label-width="formLabelWidth">
                <el-input v-model="addform.diffAndProblem" type="textarea" placeholder="请输入存在的困难和问题" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="项目封面" :label-width="formLabelWidth">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- add task form -->
    <el-dialog :visible.sync="dialogTaskFormVisible" :title="dialogType_Task==='edit'?'修改任务':'新建任务'">
      <el-form ref="ruleTaskForm" :model="addTaskObj" :rules="ruleTasks">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="任务名称" prop="title" :label-width="formLabelWidth">
                <el-input v-model="addTaskObj.title" autocomplete="off" placeholder="请输入任务名称" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="所属阶段" prop="stageId" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.stageId" placeholder="请选择所属阶段">
                  <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="任务描述" prop="remark" :label-width="formLabelWidth">
                <el-input v-model="addTaskObj.remark" type="textarea" placeholder="请输入任务描述" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="开始日期" prop="startDate" :label-width="formLabelWidth">
                <el-date-picker v-model="addTaskObj.startDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"
                  style="width: 100%;" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="结束日期" prop="endDate" :label-width="formLabelWidth">
                <el-date-picker v-model="addTaskObj.endDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"
                  style="width: 100%;" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="归属上级" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.pid" placeholder="请选择所属上级任务">
                  <el-option v-for="item in preTaskList" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="优先级" prop="priority" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.priority" placeholder="请选择优先级">
                  <el-option v-for="item in priorityList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="执行组织" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.executOrg" placeholder="请选择组织" @change="executOrgChange">
                  <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="任务执行人" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.executor" placeholder="请选择执行人" @change="executorChange">
                  <el-option v-for="item in executorList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTaskFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask('ruleTaskForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import {
    getTzqkList,
    getAllMsg,
    getAllProject,
    getProject,
    getAllFormParam,
    getAllOrgs,
    getJoiners,
    getLeadersOfOrgId,
    clickUpdateStatus,
    addProject,
    updateProject,
    deleteProject,
    authProject,
    // 任务请求
    getAllTaskList,
    getAllCountMap,
    getAllTaskFormParam,
    getExecutorList,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    getFileList
  } from '@/api/project'
  import { getOrgtypes } from '@/api/depart'
  import yhjTaskTable from './components/tableTasks.vue'
  import PanelGroup from './components/PanelGroup'
  import InvestInfo from './components/InvestInfo'
  const defaultProject = {
    id: '',
    name: '',
    industryCategory: '',
    content: '',
    number: '',
    maturity: '',
    dockingDate: '',
    leader: '',
    leadenter: '',
    coordinate: '',
    taskPrefix: '',
    visibleRange: '',
    joiners: '',
    process: '',
    remarks: '',
    invest: '',
    expectedDate: '',
    startDate: '',
    approveCode: '',

    otherBl: '',
    diffAndProblem: '',
    proManager: '',
    proManagerMobile: '',
    enterManager: '',
    enterManagerMobile: '',
    stage: '',
    status: '',
    completeDate: '',
    orgId: '',
    investInfos:[{}],
    typeArr:[]

  }
  const defaultTask = {
    id: '',
    pid: '',
    proId: '',
    title: '',
    executor: '',
    executorMobile: '',
    stageId: '',
    startDate: '',
    endDate: '',
    priority: '',
    status: '',
    remark: '',
    annex: '',
    preTasks: '',
    orgId: ''
  }
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    components: {
      'yhj-task-table': yhjTaskTable,
      PanelGroup,
      CountTo,
      InvestInfo
    },
    data() {
      var val_mobil = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入主管部门联系人电话！'))
        } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
          callback(new Error('手机号格式不正确！'))
        } else {
          callback()
        }
      }
      var val_task_mobil = (rule, value, callback) => {
        if (value === '') {
          callback()
        } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
          callback(new Error('手机号格式不正确！'))
        } else {
          callback()
        }
      }
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        tzqkList: [],
        orgId: '',
        activeName: '1',
        activeNamesTask: ['1'],
        projectList: [],
        thisProject: {},
        currProjectIndex: '',
        projectStatusClass: '',
        searchContent: '',
        searchStatus: '0',
        typeList:[],
        allMsg: {},
        endTime: {
            disabledDate: time => {
              return time.getTime() > Date.now()
            }
        },
        dialogType: '',
        dialogAddFormVisible: false,
        visibleInvest: 'hiden',
        dialogType_Task: '',
        dialogTaskFormVisible: false,
        addform: Object.assign({}, defaultProject),
        addTaskObj: Object.assign({}, defaultTask),

        categoryList: [],
        leaderList: [],
        peopleList: [],
        enterList: [],
        orgAllId: '',
        peopleAllId: '',
        orgList: [],
        joiners: [],
        maturity: [{
          id: 1,
          name: '加快前期'
        }, {
          id: 2,
          name: '新开工'
        }, {
          id: 3,
          name: '续建'
        }, {
          id: 4,
          name: '竣工'
        }],
        stageList: [{
          id: 1,
          name: '无所属'
        }, {
          id: 2,
          name: '立项阶段'
        }, {
          id: 3,
          name: '执行阶段'
        }, {
          id: 4,
          name: '验收阶段'
        }],
        rules: {
          name: [{
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 50,
              message: '长度在 3 到 50 个字符',
              trigger: 'blur'
            }
          ],
          proManager: [{
            required: true,
            message: '请选择主管部门负责人',
            trigger: 'change'
          }],
          proManagerMobile: [{
            validator: val_mobil,
            trigger: 'blur'
          }],
          enterManager: [{
            required: true,
            message: '请选择企业负责人',
            trigger: 'change'
          }],
          enterManagerMobile: [{
            validator: val_mobil,
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入项目描述',
            trigger: 'blur'
          }],
          typeArr: [{
            required: true,
            message: '请选择行业类型',
            trigger: 'change'
          }],
          number: [{
            required: true,
            message: '请输入项目编号',
            trigger: 'change'
          }],
          maturity: [{
            required: true,
            message: '请选择项目成熟度',
            trigger: 'change'
          }],
          dockingDate: [{
            // type: 'date',
            required: true,
            message: '请选择对接日期',
            trigger: 'change'
          }],
          expectedDate: [{
            // type: 'date',
            required: true,
            message: '请选择预计完成事件时间',
            trigger: 'change'
          }],
          leader: [{
            required: true,
            message: '请选择牵头领导',
            trigger: 'change'
          }],
          leadenter: [{
            required: true,
            message: '请选择牵头单位',
            trigger: 'change'
          }],
          coordinate: [{
            required: true,
            message: '请选择协调负责人',
            trigger: 'change'
          }],
          visibleRange: [{
            required: true,
            message: '请选择可见范围',
            trigger: 'change'
          }],
          joiners: [{
            required: true,
            message: '请选择参与人员',
            trigger: 'change'
          }],
          invest: [{
            required: true,
            message: '请输入投资金额',
            trigger: 'blur'
          }]
        },
        formLabelWidth: '90px',

        // 任务添加  获取前置任务
        taskTypeStatus: 10,
        preTaskList: [],
        executorList: [],
        priorityList: [{
          id: 1,
          name: '一级'
        }, {
          id: 2,
          name: '二级'
        }, {
          id: 3,
          name: '三级'
        }],
        ruleTasks: {
          name: [{
              required: true,
              message: '请输入任务名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 50,
              message: '长度在 3 到 50 个字符',
              trigger: 'blur'
            }
          ],
          stageId: [{
            required: true,
            message: '请选择所属阶段',
            trigger: 'change'
          }],
          remark: [{
            required: true,
            message: '请输入项目描述',
            trigger: 'blur'
          }],
          startDate: [{
            // type: 'date',
            required: true,
            message: '请选择开始日期',
            trigger: 'change'
          }],
          endDate: [{
            // type: 'date',
            required: true,
            message: '请选择结束日期',
            trigger: 'change'
          }],
          priority: [{
            required: true,
            message: '请选择优先级',
            trigger: 'change'
          }],
          executorMobile: [{
            validator: val_task_mobil,
            trigger: 'blur'
          }]
        },
        // 任务列表
        taskList: [],
        allCountMap: {
          'ALL': 0,
          'NOMACK': 0,
          'NOCOM': 0,
          'COMPLETE': 0,
          'DELAY': 0,
          'OVERDUE': 0
        },
        // 总概况
        isHasThisProject: false,
        lineChartData: lineChartData.newVisitis,

        // 项目文件
        fileMap: {
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
    // watch: {
    //   orgList: function(val, oldval) {
    //     const newindex = val.indexOf('all')
    //     const oldindex = oldval.indexOf('all') // 获取val和oldval里all的索引,如果没有则返回-1
    //     if (newindex != -1 && oldindex == -1 && val.length > 1) // 如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
    //     {
    //       this.orgList = ['all']
    //     } else if (newindex != -1 && oldindex != -1 && val.length > 1) // 如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
    //     {
    //       this.orgList.splice(val.indexOf('all'), 1)
    //     }
    //   },
    //   preTaskList: function(val, oldval) {
    //     const newindex = val.indexOf('all')
    //     const oldindex = oldval.indexOf('all') // 获取val和oldval里all的索引,如果没有则返回-1
    //     if (newindex != -1 && oldindex == -1 && val.length > 1) // 如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
    //     {
    //       this.preTaskList = ['all']
    //     } else if (newindex != -1 && oldindex != -1 && val.length > 1) // 如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
    //     {
    //       this.preTaskList.splice(val.indexOf('all'), 1)
    //     }
    //   }
    // },
    created() {
      this.orgId = this.$store.getters.orgId
      this.orgName = this.$store.getters.orgName
      this.getProjectList()
      this.getAllOrgs()
      this.getAllMsg()
      this.getOrgtypes()
    },
    // inject: ['reload'],
    methods: {
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload(file) {
        console.log(file)
      },
      // 上传
      submitUpload() {
        var formData = new FormData()// new一个formData事件
        formData.append('file', this.addform.fileInfos[$index].inputFile) // 将file属性添加到formData里
        var that = this
        var isUpload = false
        $.ajax({
          url: 'http://localhost:8886/project/project/uploadFJ',
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
              that.addform.image = res.data
              isUpload = true
            } else {
              isUpload = false
            }
          }
        })
        return isUpload
      },
      // fresh() {
      //   this.reload()
      // },
      async getOrgtypes() {
        console.log(this.orgId)
        const res = await getOrgtypes(this.orgId)
        this.typeList = res.data
      },
      // 切换项目内容项
      handleClick(tab, event) {
        if (tab.index === '0') {

        } else if (tab.index === '1') {
          this.getTzqkList()
        } else if (tab.index === '2') {
          this.getAllTaskList()
        } else if (tab.index === '3') { // 项目文件
          this.getFileList(this.fileMap.pn, this.fileMap.ps)
        }
        console.log(tab, event)
      },
      async getTzqkList() {
        const res = await getTzqkList(this.orgId, this.thisProject.id)
        this.tzqkList = res.data
      },
      async getAllMsg() {
        const res = await getAllMsg(this.orgId)
        this.allMsg = res.data
      },
      async getAllOrgs() {
        const res = await getAllOrgs()
        this.orgList = res.data
      },
      async getProjectList() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
      },

      async searchProject() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      async clickProject(id) {
        this.currProjectIndex = id
        const res = await getProject(id)
        this.thisProject = res.data
        this.isHasThisProject = true
        this.projectStatusClass = this.thisProject.status === 1 ? 'circle-ing' : this.thisProject.status === 2 ?
          'circle-success' : 'circle-error'
      },
      async authProject(id) {
        this.$confirm('请确认项目及任务无误，提交后将无法修改，确定提交吗？', '提交审核', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async () => {
            await authProject(id)
            this.$message({
              type: 'success',
              message: '已提交成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async addProjectEvent(id) {
        // 表单固定值填充
        const res = await getAllFormParam(this.orgId)
        this.categoryList = res.data.categorys
        this.peopleList = res.data.peoples
        this.enterList = res.data.qys
        this.orgList = res.data.orgs
        var sOrgIds = []
        for (const s of this.orgList) {
          sOrgIds.push(s.id)
        }
        this.orgAllId = JSON.stringify(sOrgIds)
        // 编辑获取
        if (id != null) {
          this.dialogType = 'edit'
          const res2 = await getProject(id)
          this.addform = res2.data
          this.addform.id = id
          console.log(this.addform.invest)
          this.addform.visibleRange = res2.data.visibleRange != null ? JSON.parse(res2.data.visibleRange) : ''
          this.visibleInvest = this.addform.invest.trim() !== '' && this.addform.invest !== "0" ? "":"hiden";
          const res3 = await getJoiners(this.addform.visibleRange)
          this.joiners = res3.data
          this.addform.joiners = this.addform.joiners != null ? JSON.parse(this.addform.joiners) : ''
          this.addform.stage = this.addform.stage != null ? JSON.parse(this.addform.stage) : ''
        } else {
          this.visibleInvest = "hiden"
          this.addform = Object.assign({}, defaultProject)
        }
        this.dialogAddFormVisible = true
      },
      deleteProject(id, $index) {
        console.log(id, $index)
        this.$confirm('确定要删除该项目吗？', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async () => {
            await deleteProject(id)
            this.projectList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async visibleRangeChange(op) {
        if (op.indexOf("0") !== -1) {
          var allOrgids = []
          for (const s of this.orgList) {
            allOrgids.push(s.id)
          }
          this.addform.visibleRange = allOrgids
        }
        this.joiners = []
        if (this.addform.visibleRange !== '' && this.addform.visibleRange !== 0) {
          const res = await getJoiners(this.addform.visibleRange.join(","))
          this.joiners = res.data
        }
      },
      joinerChange(op){
        if (op.indexOf("0") !== -1) {
          var allpeoids = []
          for (const s of this.orgList) {
            allpeoids.push(s.id)
          }
          this.addform.joiners = allpeoids
          console.error(this.addform.joiners)
        }
      },
      async changeLeadenter() {
        this.leaderList = []
        if (this.addform.leadenter !== '' && this.addform.leadenter !== 0) {
          const res = await getLeadersOfOrgId(this.addform.leadenter)
          this.leaderList = res.data
        }
      },
      investChange() {
         this.visibleInvest = this.addform.invest.trim() !== '' && this.addform.invest !== "0" ? "" : "hiden"
      },
      deleteInvestInfo(index) {
        if (index !== 0) {
          this.addform.investInfos.splice(index , 1);
        }
      },
      addInvestInfo() {
        this.addform.investInfos.push({});
      },
      proManagerChange() {
        var cPRO = this.addform.proManager
        if (cPRO !== '' && cPRO !== 0) {
          for (var op of this.peopleList) {
            if (op.id === cPRO) {
              this.addform.proManagerMobile = op.mobile
            }
          }
        }
      },
      enterManagerChange() {
        var cPRO = this.addform.enterManager
        if (cPRO !== '' && cPRO !== 0) {
          for (var op of this.enterList) {
            if (op.id === cPRO) {
              this.addform.enterManagerMobile = op.mobile
            }
          }
        }
      },

      async addProject(formName) {
        console.log(this.addform.joiners)
        console.log(this.addform.visibleRange)
        console.log(JSON.stringify(this.addform.investInfos))
        const isEdit = this.dialogType === 'edit'
        var isGo = false

        this.$refs[formName].validate((valid) => {
          if (valid) {
            isGo = true
          } else {
            this.$message.error('提交信息错误！')
            return false
          }
        })

        if (isGo) {
          if (isEdit) {
            this.addform.id = this.thisProject.id
            const dd = await updateProject(this.addform)
            this.thisProject = dd
          } else {
            this.addform.orgId = this.orgId
            const {
              data
            } = await addProject(this.addform)
            this.addform.id = data
            this.projectList.push(this.addform)
          }
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          this.dialogAddFormVisible = false
        }
      },
      async clickUpdateStatus() {
        await clickUpdateStatus(this.thisProject.id)
        this.$message({
          type: 'success',
          message: '更新成功！'
        })
      },

      // 任务
      async getTaskList(typeId) {
        this.taskTypeStatus = typeId
        const res = await getAllTaskList(this.thisProject.id, this.taskTypeStatus)
        this.taskList = res.data.list
        this.activeNamesTask = res.data.activeNamesTask
        const res2 = await getAllCountMap(this.thisProject.id)
        this.allCountMap = res2.data
        console.log(this.activeNamesTask)
      },
      async getAllTaskList() {
        this.getTaskList(10)
      },
      async getTaskSearch(typeId) {
        this.getTaskList(typeId)
      },
      async openAddTask(id) {
        // 表单固定值填充
        const res = await getAllTaskFormParam(this.thisProject.id)
        this.preTaskList = res.data.preTasks
        this.stageList = res.data.stages
        // 编辑获取
        if (id != null) {
          const res = await getTask(id)
          this.addTaskObj = res.data
          this.dialogType_Task = 'edit'
          if (this.addTaskObj.executOrg !== '' && this.addTaskObj.executOrg !== 0) {
            const res = await getExecutorList(this.addTaskObj.executOrg)
            this.executorList = res.data
          }
        } else {
          this.dialogType_Task = 'new'
          this.addTaskObj = defaultTask
        }
        this.dialogTaskFormVisible = true
      },
      async executOrgChange() {
        this.executorList = []
        if (this.addTaskObj.executOrg !== '' && this.addTaskObj.executOrg !== 0) {
          const res = await getExecutorList(this.addTaskObj.executOrg)
          this.executorList = res.data
        }
      },
      executorChange() {
        var cPRO = this.addTaskObj.executor
        console.log(cPRO)
        if (cPRO !== '' && cPRO !== 0) {
          for (var op of this.peopleList) {
            if (op.id === cPRO) {
              console.log(op.id)
              this.addTaskObj.executorMobile = op.mobile
            }
          }
        }
      },
      async addTask(formName) {
        const isEdit = this.dialogType_Task === 'edit'
        var isGo = false
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            isGo = true
          } else {
            this.$message.error('提交信息错误！')
            return false
          }
        })
        console.log(this.addTaskObj)
        if (isGo) {
          if (isEdit) {
            await updateTask(this.addTaskObj)
            for (let index = 0; index < this.taskList.length; index++) {
              console.log(this.taskList)
              console.log(this.taskList[index].value)
              for (let index2 = 0; index2 < this.taskList[index].value.length; index++) {
                console.log(this.taskList[index].value. [index2])
                if (this.taskList[index].value. [index2].id === this.addTaskObj.id) {
                  this.taskList[index].value. [index2].splice(index2, 1, Object.assign({}, this.addTaskObj))
                  break
                }
              }
            }
          } else {
            this.addTaskObj.orgId = this.orgId
            this.addTaskObj.proId = this.thisProject.id
            const {
              data
            } = await addTask(this.addTaskObj)
            this.addTaskObj.id = data
            for (var stageTask of this.taskList) {
              if (this.addTaskObj.stageId === stageTask.id) {
                stageTask.value.push(this.addTaskObj)
              }
            }
          }
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          // this.fresh()
          this.handleClick({
            index: '1'
          })
          this.dialogTaskFormVisible = false
        }
      },
      async updateTask($index, id) {
        // 表单固定值填充
        this.openAddTask(id)
      },
      async deleteTask($index, id) {
        // 表单固定值填充
        alert('哈哈：' + id)
        await deleteTask(id)
        this.taskList.splice($index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      },

      // 项目文件
      async getFileList(pn, ps) {
        const res = await getFileList(this.thisProject.id, this.fileMap.pn, this.fileMap.ps)
        this.fileMap = res.data
        console.log('文件', res.data)
      },
      async handlePageSizeChange(val) {
        this.getFileList(this.fileMap.pn, val)
      },
      async handlePageCurrentChange(val) {
        this.getFileList(val, this.fileMap.ps)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .hiden {
    display: none;
  }

  .el-dialog {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: auto !important;
    margin: 0px auto !important;
    height: 80% !important;
  }

  .el-dialog .el-dialog__body {
    height: 80% !important;
    overflow: auto !important;
  }


  i {
    transition: color .15s linear;
    color: #4e8afa;
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
    padding: 10px;
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
      paddding-left: 0;
      border-right: 2px solid #3A71A8;
      width: 300px;

      ul {
        padding-left: 0;
        height: calc(100% - 140px);
        overflow: auto;
      }

      ul li.active {
        background-color: aliceblue;
      }

      ul li {
        border-bottom: 1px #eee solid;
        list-style-type: none;
        -webkit-transition: -webkit-box-shadow .2s;
        transition: -webkit-box-shadow .2s;
        transition: box-shadow .2s;
        transition: box-shadow .2s, -webkit-box-shadow .2s;
        position: relative;

        .ng-star-inserted-btn {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: right;
          min-height: 25px;

          .section-item {

            padding: 3px;
            -webkit-transition: -webkit-box-shadow .2s;
            transition: -webkit-box-shadow .2s;
            transition: box-shadow .2s;
            transition: box-shadow .2s, -webkit-box-shadow .2s;
          }

          .section-item:hover {
            color: #4e8afa;

          }
        }
      }

      ul li:hover {
        box-shadow: 0 1px 10px 1px #eee;
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
        padding: 8px 8px 0px 8px;
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

      .el-tabs__content {
        background-color: aliceblue;
      }

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

        .fj-svg {
          width: 2em;
          height: 2em;
        }

        .manager-card-content {
          padding: 10px 20px 20px;

          .d-flex {
            display: flex !important;
            margin: 10px auto;
            background: #eef1f6;
            padding: 10px 0;
            justify-content: space-between;

            .property-text {
              width: 25%;
            }

            .project-basic-property {
              display: flex;
              margin: 0 3px;
              align-items: center;
              justify-content: space-between;

              .project-property-item-name {
                color: #9c9c9c;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 10px;
                border-left: solid 2px #0e76e5;
                padding-left: 5px;
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

            .property-oo {
              width: 33%;
            }
          }

          .project-basic-property-line {
            display: block;
            margin: 30px 0;
            border-bottom: solid 1px #f3f3f3;
          }
        }

        //投资情况
        .el-alert--success.is-light {
          background-color: #e7faf0;
          color: #13ce66;
          padding: 8px 16px;
          border-radius: 4px;
          overflow: hidden;
          opacity: 1;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-transition: opacity .2s;
          transition: opacity .2s;
        }

        .el-alert__content {
          display: table-cell;
          padding: 0 8px;
        }

        .el-alert__title {
          font-size: 13px;
          line-height: 18px;
        }
      }

      .task-list-type {
        color: #888;
        display: flex;
        flex: auto;
        font-size: 14px;
        padding: 0 5px;
        justify-content: space-between;
        background-color: white;

        .task-list-type-left {}

        .task-list-type-left {
          ul {
            li.active {
              color: #4e8afa;
            }
          }
        }

        .task-list-type-right {
          display: flex;
          align-items: center;
        }

        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 5px 8px;

          li {
            padding: 5px;
            border-right: 3px solid white;
          }

          li:nth-last-child {
            border-right: none;
          }
        }

        a {
          cursor: pointer;
        }

        a:hover {
          color: #4e8afa;
        }

      }

      .task-list-body {

        //阶段划分 上下线条
        .el-collapse {
          border: none;
        }

        .el-collapse-item {}

        .el-collapse-item__wrap {
          border-bottom: none !important;
        }
      }

      .el-collapse-item__wrap {
        border-bottom: none !important;
      }

    }

    .el-radio-group {
      margin: 10px !important;
    }
    .el-select {
        width: 100%;
    }
    .el-cascader {
        width: 100%;
    }

  }
</style>
<style>
  .el-radio-button--mini .el-radio-button__inner {
    padding: 5px 10px;
    font-size: 11px;
    border-radius: 0;
  }

  .el-tabs__header {
    margin: 0px;
  }

  .el-form-item--medium .el-form-item__label {
    line-height: 22px;
  }

  .el-form .el-col {
    min-height: 66px;
  }

  .el-collapse-item__header {
    border-bottom: 1px solid #44cfe6;
    text-align: center;
  }

  .el-collapse-item__wrap {
    border-bottom: none !important;
  }
</style>
