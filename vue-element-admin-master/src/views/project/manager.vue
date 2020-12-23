<template>
  <div class="app-container">
    <div class="project-body">
      <div class="left-project">

        <div class="header header--hidden">
          <div class="card-header-title"><span class="ng-star-inserted"> 项目 </span></div>
          <div>
            <i class="el-icon-plus" @click="addProjectEvent" style="margin-right: 20px;"></i>
            <i class="el-icon-finished"></i>
          </div>
        </div>

        <input type="text" v-model="searchContent" autocomplete="off" class="el-input__inner" placeholder="搜索项目"
          v-on:input="searchProject" />
        <el-radio-group v-model="searchStatus" size="mini" @change="searchProject">
          <el-radio-button label="0" value="0">全部</el-radio-button>
          <el-radio-button label="1" value="1">未完成</el-radio-button>
          <el-radio-button label="2" value="2">已完成</el-radio-button>
        </el-radio-group>
        <ul>
          <li class="ng-star-inserted" v-for="item in projectList" :key="item.id" @click="clickProject(item.id)">
            <a class="section-item" href="#">
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
                    {{thisProject.name}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">产业类型:</span>
                    {{thisProject.categoryName}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                    {{thisProject.startDateStr}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目结束时间:</span>
                    {{thisProject.completeDateStr}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目编码:</span><span class="text-muted">XG-nmg123123</span>
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管部门:</span>
                    {{thisProject.orgName}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管负责人:</span>
                    {{thisProject.proManager}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">主管人联系电话:</span>
                    {{thisProject.proManagerMobile}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name project-basic-property-item-name">项目成熟度:</span>
                    {{thisProject.maturity}}
                  </div>

                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头单位:</span>
                    {{thisProject.leadenter}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头领导:</span>
                    {{thisProject.leader}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">对接时间:</span>
                    {{thisProject.dockingDateStr}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">协调负责人:</span>
                    {{thisProject.coordinate}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人:</span>
                    {{thisProject.enterManager}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人电话:</span>
                    {{thisProject.enterManagerMobile}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目建设阶段:</span>
                    {{thisProject.stage=="1"?"无所属":thisProject.stage=="2"?"立项阶段":thisProject.stage=="3"?"执行阶段":"完成阶段"}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">预计完成时间:</span>
                    {{thisProject.expectedDateStr}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property align-items-start">
                    <span class="project-property-item-name project-basic-property-item-name">项目描述:</span>
                    {{thisProject.content}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property align-items-start" style="display:flex;align-items: center;">
                    <span class="project-property-item-name project-basic-property-item-name">当前状态:</span>
                    <div class="flex-se1">
                      <span class="circle" v-bind:class="projectStatusClass"></span>
                      <span class="ml-1">{{thisProject.status==1?"进行中":thisProject.status==2?"已完成":thisProject.status==3?"逾期":thisProject.status==7?"新建":thisProject.status==8?"提交审批中":thisProject.status==9?"审批失败":"审批通过"}}</span>
                      <el-button type="primary" size="mini" round @click="clickUpdateStatus">更新</el-button>
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
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目参与人员:</span>
                    {{thisProject.joiners}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">投资情况:</span>
                    {{thisProject.invest}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目审批监管平台代码:</span>
                    {{thisProject.approveCode}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">备注:</span>
                    {{thisProject.remarks}}
                  </div>
                </div>
                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">其他需要解决的手续问题:</span>
                    {{thisProject.otherBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">存在的困难和问题:</span>
                    {{thisProject.diffAndProblem}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否完成审核备:</span>
                    {{thisProject.lxIsComapprove}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级:</span>
                    {{thisProject.lxHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门:</span>
                    {{thisProject.lxIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成建设用地规划许可证:</span>
                    {{thisProject.ydcardIsHascard}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级:</span>
                    {{thisProject.ydcardHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门:</span>
                    {{thisProject.ydcardIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成节能审查：</span>
                    {{thisProject.energyIsCensor}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.energyHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.energyIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成林地草地征占手续：</span>
                    {{thisProject.lcIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.lcHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.lcIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">建设用地批准书或国有土地证、登记证：</span>
                    {{thisProject.tdIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.tdHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.tdIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成环境影响评价审批文件、登记证：</span>
                    {{thisProject.envirIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.envirHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.envirIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成建设工程施工许可证：</span>
                    {{thisProject.sgIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.sgHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.sgIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成消防许可证：</span>
                    {{thisProject.xfIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.xfHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.xfIsSendappdepart}}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">是否办理完成人防许可证：</span>
                    {{thisProject.rfIsBl}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{thisProject.rfHandleLevel}}
                  </div>
                  <div class="project-basic-property project-basic-property-border"></div>
                  <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{thisProject.rfIsSendappdepart}}
                  </div>
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




    <!-- add form -->
    <el-dialog title="新增项目" :visible.sync="dialogAddFormVisible">
      <el-form :model="addform" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addform.name" autocomplete="off" placeholder="请输入项目名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目编号" prop="number" :label-width="formLabelWidth">
                <el-input v-model="addform.number" autocomplete="off" placeholder="请输入项目编号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="产业类型" prop="industryCategory" :label-width="formLabelWidth">
                <el-select v-model="addform.industryCategory" placeholder="请选择产业类型">
                  <el-option :label="item.categoryName" :value="index" v-for="(item,index) in categoryList"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目成熟度" prop="maturity" :label-width="formLabelWidth">
                <el-select v-model="addform.maturity" placeholder="请选择项目成熟度">
                  <el-option :label="item.name" :value="item.id" v-for="item in maturity"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="项目描述" prop="content" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="addform.content" placeholder="请输入项目描述信息"></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="对接日期" prop="dockingDate" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="addform.dockingDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="牵头领导" prop="leader" :label-width="formLabelWidth">
                <el-select v-model="addform.leader" placeholder="请选择牵头领导">
                  <el-option :label="item.name" :value="item.id" v-for="item in peopleList"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="牵头单位" prop="leadenter" :label-width="formLabelWidth">
                <el-select v-model="addform.leadenter"  placeholder="请选择可见组织范围">
                  <el-option v-for="item in orgList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="协调负责人" prop="coordinate" :label-width="formLabelWidth">
                <el-select v-model="addform.coordinate" placeholder="请选择协调负责人">
                  <el-option :label="item.name" :value="item.id" v-for="item in peopleList"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目代号" prop="taskPrefix" :label-width="formLabelWidth">
                <el-input v-model="addform.taskPrefix" autocomplete="off" placeholder="例如:LY-2020(林业2020项目)"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="可见范围" prop="visibleRange" :label-width="formLabelWidth">
                <el-select v-model="addform.visibleRange" multiple  placeholder="请选择可见组织范围" @change="visibleRangeChange">
                  <el-option label="选择所有" :value="orgAllId"></el-option>
                  <el-option v-for="item in orgList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="参与人员" prop="joiners" :label-width="formLabelWidth">
                <el-select v-model="addform.joiners" multiple  placeholder="请选择参与人员">
                  <el-option label="选择所有" value="all"></el-option>
                  <el-option v-for="item in joiners" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="addform.remarks" autocomplete="off" placeholder="请输入备注信息"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="投资情况" :label-width="formLabelWidth">
                <el-input v-model="addform.invest" autocomplete="off" placeholder="请输入投资情况"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="预计完成时间" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="addform.expectedDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目审批监管平台代码" :label-width="formLabelWidth">
                <el-input v-model="addform.approveCode" autocomplete="off" placeholder="请输入项目审批监管平台代码"></el-input>
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

  </div>
</template>

<script>
  import path from 'path'
  import {
    deepClone
  } from '@/utils'
  import md5 from "js-md5"
  import {
    getAllProject,
    getProject,
    getAllFormParam,
    getJoiners,
    clickUpdateStatus,
    addProject,
    updateProject,
    deleteProject
  } from '@/api/project'

  const defaultUser = {
    id: '',
    userName: '',
    account: '',
    password: ''
  }

  export default {
    data() {
      return {
        orgId: "",
        activeName: 'second',
        projectList: [],
        thisProject: {},
        projectStatusClass: "",
        searchContent: "",
        searchStatus: "0",

        dialogAddFormVisible: false,
        addform: {
          id: "",
          name: "",
          industryCategory: "",
          content: "",
          number: "",
          maturity: "",
          dockingDate: "",
          leader: "",
          leadenter: "",
          coordinate: "",
          taskPrefix: "",
          visibleRange: "",
          joiners: "",
          process: "",
          remarks: "",
          invest: "",
          expectedDate: "",
          startDate: "",
          approveCode: "",

          lxIsComapprove: "",
          lxHandleLevel: "",
          lxIsSendappdepart: "",
          ydcardIsHascard: "",
          ydcardHandleLevel: "",
          ydcardIsSendappdepart: "",
          energyIsCensor: "",
          energyHandleLevel: "",
          energyIsSendappdepart: "",
          lcIsBl: "",
          lcHandleLevel: "",
          lcIsSendappdepart: "",
          tdIsBl: "",
          tdHandleLevel: "",
          tdIsSendappdepart: "",
          envirIsBl: "",
          envirHandleLevel: "",
          envirIsSendappdepart: "",
          sgIsBl: "",
          sgHandleLevel: "",
          sgIsSendappdepart: "",
          xfIsBl: "",
          xfHandleLevel: "",
          xfIsSendappdepart: "",
          rfIsBl: "",
          rfHandleLevel: "",
          rfIsSendappdepart: "",

          otherBl: "",
          diffAndProblem: "",
          proManager: "",
          proManagerMobile: "",
          enterManager: "",
          enterManagerMobile: "",
          stage: "",
          status: "",
          completeDate: "",
          orgId: "",
        },
        categoryList: [],
        peopleList: [],
        orgAllId:"",
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
          content: [{
              required: true,
              message: '请输入项目描述',
              trigger: 'blur'
          }],
          industryCategory: [{
            required: true,
            message: '请选择产业类型',
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
            type: 'date',
            required: true,
            message: '请选择对接日期',
            trigger: 'change'
          }],
          expectedDate: [{
            type: 'date',
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
          }]
        },
        formLabelWidth: '90px'
      }
    },
    watch: {
      orgList: function(val, oldval) {
        let newindex = val.indexOf('all'),
          oldindex = oldval.indexOf('all'); //获取val和oldval里all的索引,如果没有则返回-1
        if (newindex != -1 && oldindex == -1 && val.length > 1) //如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
          this.orgList = ['all'];
        else if (newindex != -1 && oldindex != -1 && val.length > 1) //如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
          this.orgList.splice(val.indexOf('all'), 1)
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
      this.getProjectList()
    },
    methods: {
      async getProjectList() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async searchProject() {
        const res = await getAllProject(this.orgId, this.searchContent, this.searchStatus)
        this.projectList = res.data
        console.log(this.projectList)
      },
      async clickProject(id) {
        const res = await getProject(id)
        this.thisProject = res.data
        this.projectStatusClass = this.thisProject.status == 1 ? 'circle-ing' : this.thisProject.status == 2 ?
          'circle-success' : 'circle-error'
      },
      async addProjectEvent(id) {
        const res = await getAllFormParam(this.orgId);
        this.categoryList = res.data.categorys
        this.peopleList = res.data.peoples
        this.orgList = res.data.orgs
        var sOrgIds = "";
        for (let s of this.orgList) {
          sOrgIds+=','+s.id
        }
         this.orgAllId = sOrgIds!=''?sOrgIds.slice(1):0;
        this.joiners = res.data.joiners
        this.dialogAddFormVisible = true;
      },
      async visibleRangeChange() {
        if(this.addform.visibleRange !='' && this.addform.visibleRange != 0){
          const res = await getJoiners(this.addform.visibleRange);
          this.joiners = res.data
        }else{
          this.joiners = []
        }
      },

      async addProject(formName) {
        const isEdit = this.dialogType === 'edit'
        var isGo = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            isGo = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        if (isGo) {
          if (isEdit) {
            await updateProject(this.thisProject.key, this.thisProject)
            for (let index = 0; index < this.rolesList.length; index++) {
              if (this.projectList[index].id === this.thisProject.id) {
                this.projectList.splice(index, 1, Object.assign({}, this.thisProject))
                break
              }
            }
          } else {
            const {
              data
            } = await addProject(this.thisProject)

            this.thisProject.id = data.id
            this.projectList.push(this.thisProject)
          }
          this.dialogAddFormVisible = false;
        }

      },
      async clickUpdateStatus() {
        const res = await clickUpdateStatus(this.thisProject.id)
        this.$message({
          type: 'success',
          message: '更新成功！'
        })
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
      paddding-left: 0;
      border-right: 2px solid #3A71A8;
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
  }
</style>
