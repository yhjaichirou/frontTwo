<template>

  <div class="app-container">
    <div class="project-body">
      <div class="left-project">
        <div class="header header--hidden">
          <div class="card-header-title"><span class="ng-star-inserted"> 项目概况 </span></div>

        </div>
        <div style="padding: 10px;">
          <panel-group
            :all-pro-count="allMsg.allProject"
            :all-com-pro-count="allMsg.allComProject"
            :all-invest="allMsg.allInvest"
            :all-people="allMsg.allPeople"
            xs="24"
            sm="24"
            lg="24"
            @handleSetLineChartData="handleSetLineChartData"
          />
        </div>
      </div>
      <div class="right-project">
        <el-container style="height: 100%;">
          <el-header>
            <div>
              <svg-icon icon-class="project2" />
              <span class="card-header-title"> 项目 </span>
            </div>
            <div>
              <i class="el-icon-plus" style="margin-right: 20px;" @click="addProjectEvent(null)" />
              <i class="el-icon-finished" />
            </div>
          </el-header>
          <el-main style="height: 100%;padding-top:10px;">
            <input v-model="searchContent" type="text" autocomplete="off" class="el-input__inner" placeholder="搜索项目" @input="searchProject">
            <el-radio-group v-model="searchStatus" size="mini" @change="searchProject">
              <el-radio-button label="0" value="0">全部</el-radio-button>
              <el-radio-button label="1" value="1">未完成</el-radio-button>
              <el-radio-button label="2" value="2">已完成</el-radio-button>
            </el-radio-group>
            <el-table
              :data="projectList"
              style="width: 100%"

              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="id"
                label="ID"
                width="80"
              />
              <el-table-column
                prop="startDate"
                label="日期"
                width="180"
              />
              <el-table-column
                prop="name"
                label="姓名"
              />
              <el-table-column
                prop="address"
                label="地址"
                width="220"
              />
              <el-table-column
                fixed="right"
                label="操作"
                width="200"
              >
                <template #default="scope">
                  <el-button type="text" size="small" class="c_watch" @click="clickProject(scope.row.id)">查看</el-button>
                  <el-button v-if="scope.row.status!=7 && scope.row.status!=8 && scope.row.status!=9" type="text" size="small" class="c_edit" @click="addProjectEvent(scope.row.id)">修改</el-button>
                  <el-button type="text" size="small" class="c_del" @click="deleteProject(scope.row.id)">删除</el-button>
                  <el-button v-if="scope.row.status==7" type="text" size="small" @click="authProject(scope.row.id)">审核</el-button>
                  <el-button v-if="scope.row.status==1" type="text" size="small" @click="dispatchProject(scope.row.id)">调度</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="dataMap.pn"
              :page-sizes="[20, 50, 100]"
              :page-size="dataMap.ps"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataMap.total"
              @size-change="handleProPageSizeChange"
              @current-change="handleProPageCurrentChange"
            />

          </el-main>
        </el-container>
      </div>
    </div>

    <!-- 查看详情 -->
    <el-dialog id="yhj-detail-form" title="项目详情" :visible.sync="dialogProjectDetail">
      <div class="yhj-detail-content" style="position: relative;">
        <div v-if="addShbObj !== ''" class="right-btns" @click="handleSHB">
          <div style="display: flex;align-items: center;justify-content: center;font-size: 14px;">
            <i class="el-icon-circle-plus" style="font-size: 16px;margin-right: 5px;" />前期手续办理情况
          </div>

        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="项目概览" name="1">
            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer" />
                <div>基本信息</div>
              </div>
              <div class="manager-card-content">
                <div class="d-flex">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目名称:</span>
                          <span class="project-property-item-cono">{{ thisProject.name }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">报送地区:</span>
                          <span class="project-property-item-cono">{{ thisProject.submitted }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">审批监管平台代码:</span>
                          <span class="project-property-item-cono">{{ thisProject.approveCode }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目业主单位:</span>
                          <span class="project-property-item-cono">{{ thisProject.proEnterName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">建设内容及规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.content }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">投资类型:</span>
                          <span class="project-property-item-cono">{{ thisProject.investType }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">立项类型:</span>
                          <span class="project-property-item-cono">{{ thisProject.lxType }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">建设地点:</span>
                          <span class="project-property-item-cono">{{ thisProject.buildAddress }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">总投资:</span>
                          <span class="project-property-item-cono">{{ thisProject.invest }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">{{ planInvertMoney }}:</span>
                          <span class="project-property-item-cono">{{ thisProject.investThisyear }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">{{ overInvertMoney }}:</span>
                          <span class="project-property-item-cono">{{ thisProject.investCom }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">{{ planOpenTime }}:</span>
                          <span class="project-property-item-cono">{{ thisProject.thisyearOpentimeStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">{{ isOpen }}:</span>
                          <span class="project-property-item-cono">{{ thisProject.isOpen }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">整体用地规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.ydArea }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">涉及林地规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.ydAreaLd }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">涉及草地规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.ydAreaCd }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">涉及草地规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.ydAreaCy }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">整体能耗规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.energyArea }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">整体用水规模:</span>
                          <span class="project-property-item-cono">{{ thisProject.energyWaterArea }}</span>
                        </div>
                      </div>
                    </el-col>

                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">行业类型:</span>
                          <span class="project-property-item-cono">{{ thisProject.categoryName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目开始时间:</span>
                          <span class="project-property-item-cono">{{ thisProject.startDateStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目预计完成时间:</span>
                          <span class="project-property-item-cono">{{ thisProject.completeDateStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目编码:</span>
                          <span class="project-property-item-cono">{{ thisProject.number }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">部门名称:</span>
                          <span class="project-property-item-cono">{{ thisProject.orgName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目负责人:</span>
                          <span class="project-property-item-cono">{{ thisProject.proManagerName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">负责人电话:</span>
                          <span class="project-property-item-cono">{{ thisProject.proManagerMobile }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目性质:</span>
                          <span class="project-property-item-cono">{{ thisProject.maturityStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头单位:</span>
                          <span class="project-property-item-cono">{{ thisProject.leadenterName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">牵头领导:</span>
                          <span class="project-property-item-cono">{{ thisProject.leaderName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">对接时间:</span>
                          <span class="project-property-item-cono">{{ thisProject.dockingDateStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">协调负责人:</span>
                          <span class="project-property-item-cono">{{ thisProject.coordinateName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人:</span>
                          <span class="project-property-item-cono">{{ thisProject.enterManagerName }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">企业联系人电话:</span>
                          <span class="project-property-item-cono">{{ thisProject.enterManagerMobile }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">项目阶段:</span>
                          <span class="project-property-item-cono">{{ thisProject.stage=="1"?"无所属":thisProject.stage=="2"?"立项阶段":thisProject.stage=="3"?"执行阶段":"完成阶段" }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">预计完成时间:</span>
                          <span class="project-property-item-cono">{{ thisProject.completeDateStr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">困难和问题:</span>
                          <span class="project-property-item-cono">{{ thisProject.diffAndProblem }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property"><span class="project-property-item-name project-basic-property-item-name">其他需办理手续:</span>
                          <span class="project-property-item-cono">{{ thisProject.otherBl }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>

                </div>

              </div>
            </div>
            <span class="project-basic-property-line" />
            <div class="manager-card">
              <div class="manager-header">
                <div class="manager-bluer" />
                <div>其他信息</div>
              </div>
              <div class="manager-card-content detailShb">
                <div class="d-flex">
                  <div class="shbTile">立项阶段</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.lxIsComapprove }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.lxHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.lxIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.lxBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.lxBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">用地预审和规划选址意见书</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.ydcardIsHascard }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.ydcardHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.ydcardIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.ydBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.ydBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">节能审查</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.energyIsCensor }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.energyHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.energyIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.energyBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.energyBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">林草地征占手续</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.lcIsBl }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.lcHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.lcIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.lcBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.lcBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">新增建设用地审批</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.tdIsBl }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.tdHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.tdIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.tdBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.tdBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">环境影响评价手续</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.envirIsBl }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.envirHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.envirIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.envirBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.envirBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="d-flex">
                  <div class="shbTile">施工许可证</div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成：</span>
                          <span class="project-property-item-cono">{{ thisProject.sgIsBl }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                          <span class="project-property-item-cono">{{ thisProject.sgHandleLevel }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                          <span class="project-property-item-cono">{{ thisProject.sgIsSendappdepart }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">审批、转报部门意见：</span>
                          <span class="project-property-item-cono">{{ thisProject.sgBao }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">不同意办理或不同意转报原因：</span>
                          <span class="project-property-item-cono">{{ thisProject.sgBaoNoMsg }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <!-- <div class="d-flex">
                  <div class="shbTile">用地预审和规划选址意见书</div>
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
                  <div class="shbTile">用地预审和规划选址意见书</div>
                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">是否办理完成人防许可证：</span>
                    {{ thisProject.rfIsBl }}
                  </div>
                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">办理层级：</span>
                    {{ thisProject.rfHandleLevel }}
                  </div>
                  <div class="project-basic-property property-text property-oo"><span class="project-property-item-name project-basic-property-item-name">组件是否报送到最终审批部门：</span>
                    {{ thisProject.rfIsSendappdepart }}
                  </div>
                </div> -->
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

              <el-card class="box-card" style="box-shadow:none;">
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
              <el-pagination
                :current-page="fileMap.pn"
                :page-sizes="[20, 50, 100]"
                :page-size="fileMap.ps"
                layout="total, sizes, prev, pager, next, jumper"
                :total="fileMap.total"
                @size-change="handlePageSizeChange"
                @current-change="handlePageCurrentChange"
              />
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>

    <!-- add projectform -->
    <el-dialog :visible.sync="dialogAddFormVisible" :title="dialogType==='edit'?'修改项目':'新建项目'">
      <el-form ref="ruleForm" :model="addform" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addform.name" autocomplete="off" placeholder="请输入项目名称" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="报送地区" prop="submitted" :label-width="formLabelWidth">
                <el-input v-model="addform.submitted" autocomplete="off" placeholder="请输入项目报送地区(乌兰察布市+部门)" value="乌兰察布市-" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审批监管平台代码" prop="approveCode" :label-width="formLabelWidth">
                <el-input v-model="addform.approveCode" autocomplete="off" placeholder="请输入项目审批监管平台代码" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="行业主管厅局" prop="proManagerTing" :label-width="formLabelWidth">
                <el-input v-model="addform.proManagerTing" autocomplete="off" placeholder="请输入行业主管厅局" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="行业主管单位" prop="proEnter" :label-width="formLabelWidth">
                <el-select v-model="addform.proEnter" placeholder="请选择牵头单位" @change="changeProEnter">
                  <el-option v-for="item in departList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="重大项目编号" prop="number" :label-width="formLabelWidth">
                <el-input v-model="addform.number" autocomplete="off" placeholder="请输入重大项目编号" />
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
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="建设内容及规模" prop="content" :label-width="formLabelWidth">
                <el-input v-model="addform.content" type="textarea" placeholder="请输入项目建设内容及规模" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="投资类型" prop="investType" :label-width="formLabelWidth">
                <el-select v-model="addform.investType" placeholder="请选择投资类型">
                  <el-option label="政府投资" value="政府投资" />
                  <el-option label="企业投资" value="企业投资" />
                  <el-option label="政企合投" value="政企合投" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="立项类型" prop="lxType" :label-width="formLabelWidth">
                <el-select v-model="addform.lxType" placeholder="请选择立项类型">
                  <el-option label="审批" value="审批" />
                  <el-option label="核准" value="核准" />
                  <el-option label="备案" value="备案" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目性质" prop="maturity" :label-width="formLabelWidth">
                <el-select v-model="addform.maturity" placeholder="请选择项目成熟度">
                  <el-option v-for="item in maturity" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="建设地点(旗县区)" prop="buildAddress" :label-width="formLabelWidth">
                <el-input v-model="addform.buildAddress" autocomplete="off" placeholder="请输入建设地点(旗县区)" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="总投资" prop="invest" :label-width="formLabelWidth">
                <el-input v-model="addform.invest" autocomplete="off" placeholder="**请输入投资总金额(单位:万元)" suffix-icon="iconfont icon-jinbi" @input="investChange" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24" :class="visibleInvest">
            <el-form-item label="投资明细" prop="investInfos" :label-width="formLabelWidth">
              <div style="position: relative;top: -7px;">
                <div class="grid-content bg-purple" style="margin-right:10px;display: inline-block;width: 180px;min-height: 40px;height: 40px;line-height: 22px;">投资类型</div>
                <div class="grid-content bg-purple" style="margin-right:10px;display: inline-block;width: 180px;min-height: 40px;height: 40px;line-height: 22px;">投资金额</div>
                <div class="grid-content bg-purple" style="display: inline-block;width: 180px;min-height: 40px;height: 40px;line-height: 22px;">投资时间</div>
                <!-- <el-row :gutter="10">
                  <el-col :span="7" style="min-height: 40px;height: 40px;">

                  </el-col>
                  <el-col :span="7" style="min-height: 40px;height: 40px;">
                    <div class="grid-content bg-purple" style="line-height: 22px;">投资金额</div>
                  </el-col>
                  <el-col :span="7" style="min-height: 40px;height: 40px;">
                    <div class="grid-content bg-purple" style="line-height: 22px;">投资时间</div>
                  </el-col>
                </el-row> -->
                <InvestInfo v-for="(item,index) in addform.investInfos" :key="index" :index="index" :item="item" @delete="deleteInvestInfo" />
              </div>
              <el-button size="mini" type="primary" @click="addInvestInfo">添 加</el-button>
              <span style="line-height: 36px;color: burlywood;font-size: 12px;margin-left: 20px;">注：投资明细的类型选择不能重复</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item :label="planInvertMoney" prop="invest" :label-width="formLabelWidth">
                <el-input v-model="addform.investThisyear" autocomplete="off" placeholder="**请输入当年计划完成投资(单位:万元)" suffix-icon="iconfont icon-jinbi" @input="investChange" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item :label="overInvertMoney" prop="invest" :label-width="formLabelWidth">
                <el-input v-model="addform.investCom" autocomplete="off" placeholder="**请输入当年已完成投资(单位:万元)" suffix-icon="iconfont icon-jinbi" @input="investChange" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item :label="planOpenTime" prop="thisyearOpentime" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addform.thisyearOpentime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item :label="isOpen" prop="isOpen" :label-width="formLabelWidth">
                <el-switch
                  v-model="addform.isOpen"
                  active-text="是"
                  inactive-text="否"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="预计完工时间" prop="expectedDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addform.expectedDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="整体用地规模" prop="ydArea" :label-width="formLabelWidth">
                <el-input v-model="addform.ydArea" placeholder="请输入整体用地规模（亩）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="涉及林地规模" :label-width="formLabelWidth">
                <el-input v-model="addform.ydAreaLd" placeholder="请输入涉及林地规模（亩）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="涉及草地规模" :label-width="formLabelWidth">
                <el-input v-model="addform.ydAreaCd" placeholder="请输入涉及草地规模（亩）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="涉及占用草原面积" :label-width="formLabelWidth">
                <el-input v-model="addform.ydAreaCy" placeholder="请输入涉及占用地中占用基本草原面积（亩）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple" style="line-height: 36px;color:burlywood;font-size: 12px;">
              注：涉及占用地中占用基本草原面积（不占用无需填写）
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="整体用能规模" prop="energyArea" :label-width="formLabelWidth">
                <el-input v-model="addform.energyArea" placeholder="请输入项目建成后整体用能规模（等价值）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="整体用水规模" prop="energyWaterArea" :label-width="formLabelWidth">
                <el-input v-model="addform.energyWaterArea" placeholder="请输入项目建成后整体用水规模（立方米）" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="其他手续办理情况" :label-width="formLabelWidth">
                <el-input v-model="addform.otherBl" type="textarea" placeholder="请输入其他前期手续办理情况（可使用文字详细表述）" />
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
          <!-- 主管部门负责人 -->
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目联系人" prop="proManager" :label-width="formLabelWidth">
                <el-input v-model="addform.proManager" placeholder="请输入项目联系人" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目联系人电话" prop="proManagerMobile" :label-width="formLabelWidth">
                <el-input v-model="addform.proManagerMobile" autocomplete="off" placeholder="请输入项目联系人电话" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目备用联系人" prop="proManager2" :label-width="formLabelWidth">
                <el-input v-model="addform.proManager2" placeholder="请输入项目备用联系人" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目备用联系人电话" prop="proManagerMobile2" :label-width="formLabelWidth">
                <el-input v-model="addform.proManagerMobile2" autocomplete="off" placeholder="请输入项目备用联系人电话" />
              </el-form-item>
            </div>
          </el-col>

          <!-- <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="进展明细" prop="buildAddress" :label-width="formLabelWidth">
                <el-input v-model="addform.processCondition" autocomplete="off" placeholder="请输入进展明细" />
              </el-form-item>
            </div>
          </el-col> -->

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

          <!-- <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="对接时间" prop="dockingDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addform.dockingDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  :picker-options="endTime"
                />
              </el-form-item>
            </div>
          </el-col>
 -->
          <!-- <el-col :span="12">
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
              <el-form-item label="企业联系人" prop="enterManager" :label-width="formLabelWidth">
                <el-select v-model="addform.enterManager" placeholder="请选择" @change="enterManagerChange">
                  <el-option v-for="item in enterList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业联系电话" prop="enterManagerMobile" :label-width="formLabelWidth">
                <el-input v-model="addform.enterManagerMobile" autocomplete="off" placeholder="请输入" />
              </el-form-item>
            </div>
          </el-col> -->

          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="可见范围" prop="visibleRange" :label-width="formLabelWidth">
                <el-select v-model="addform.visibleRange" multiple placeholder="请选择可见组织范围" @change="visibleRangeChange">
                  <el-option label="选择所有" value="0" />
                  <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="参与人员" prop="joiners" :label-width="formLabelWidth">
                <el-select v-model="addform.joiners" multiple placeholder="请选择参与人员" @change="joinerChange">
                  <el-option label="选择所有" value="0" />
                  <el-option v-for="item in joiners" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <!-- <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目代号" prop="taskPrefix" :label-width="formLabelWidth">
                <el-input v-model="addform.taskPrefix" autocomplete="off" placeholder="例如:LY-2020(林业2020项目)" />
              </el-form-item>
            </div>
          </el-col> -->
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="项目包含阶段" :label-width="formLabelWidth">
                <el-select v-model="addform.stage" multiple placeholder="请选择项目包含的阶段">
                  <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id" />
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
              <el-form-item label="项目封面" :label-width="formLabelWidth">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :before-upload="beforeAvatarUpload"
                  limit="1"
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download" />
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5Mb</div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addProject('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- add SHB form -->
    <el-dialog id="yhj-shb-form" :visible.sync="dialogAddSHBFormVisible" title="更新前期办理手续">
      <el-form ref="ruleSHBForm" :model="addShbObj" :rules="ruleSHB">

        <el-container>
          <el-header>立项阶段</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.lxIsComapprove" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.lxHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.lxIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.lxBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.lxBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>用地预审和规划选址意见书</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.ydcardIsHascard" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.ydcardHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.ydcardIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.ydBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.ydBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>新增建设用地审批</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.tdIsBl" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-model="addShbObj.tdHandleLevel" :label="shbOption2[0]['option']" :value="shbOption2[0]['option']" /></el-radio>
                    <el-radio v-model="addShbObj.tdHandleLevel" :label="shbOption2[1]['option']" :value="shbOption2[1]['option']" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.tdIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.tdBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.tdBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="供地阶段进展情况" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.tdProvide" type="textarea" placeholder="请输入供地阶段进展情况" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>节能审查</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.energyIsCensor" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.energyHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.energyIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.energyBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.energyBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>林草地征占手续</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.lcIsBl" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.lcHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.lcIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.lcBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.lcBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>环境影响评价手续</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.envirIsBl" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.envirHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.envirIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.envirBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.envirBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>施工许可证</el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否办理完成" prop="title" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption1" :key="item.option" v-model="addShbObj.sgIsBl" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="办理层级" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption2" :key="item.option" v-model="addShbObj.sgHandleLevel" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="组件是否报送到最终审批部分" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption3" :key="item.option" v-model="addShbObj.sgIsSendappdepart" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="审批、转报部门意见" prop="stageId" :label-width="formLabelWidth">
                    <el-radio v-for="item in shbOption4" :key="item.option" v-model="addShbObj.sgBao" :label="item.option" :value="item.option" /></el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="不同意办理或不同意转报原因" prop="stageId" :label-width="formLabelWidth">
                    <el-input v-model="addShbObj.sgBaoNoMsg" type="textarea" placeholder="请输入不同意办理或不同意转报原因" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogAddSHBFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addSHBSubmit('ruleSHBForm')">确 定</el-button>
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
                <el-select v-model="addTaskObj.stageId" placeholder="请选择所属阶段" @change="handleChangeStage">
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
                <el-date-picker
                  v-model="addTaskObj.startDate"
                  type="date"
                  placeholder="选择开始日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="结束日期" prop="endDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addTaskObj.endDate"
                  type="date"
                  placeholder="选择结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="归属上级" prop="pid" :label-width="formLabelWidth">
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

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="是否前期手续办理任务" prop="isShb" :label-width="formLabelWidth">
                <el-radio v-model="addTaskObj.isShb" label="是" :disabled="addTaskObj.executOrg === 2 ?'disabled':'none'" /></el-radio>
                <el-radio v-model="addTaskObj.isShb" label="否" :disabled="addTaskObj.executOrg === 2 ?'disabled':'none'" /></el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="addTaskObj.isShb === '是'" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="前期手续办理类型" prop="shb" :label-width="formLabelWidth">
                <el-select v-model="addTaskObj.shb" placeholder="请选择前期手续办理类型">
                  <el-option v-for="item in shbList" :key="item.number" :label="item.name" :value="item.number" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTaskFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addTask('ruleTaskForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更新状态 -->
    <el-dialog id="yhj-updatestatus-form" title="更新状态" :visible.sync="dialogFormVisible">
      <el-radio v-model="updateProStatus" label="1">未完成</el-radio>
      <el-radio v-model="updateProStatus" label="2">已完成</el-radio>
      <el-radio v-model="updateProStatus" label="3">已延期</el-radio>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickUpdateStatus">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 调度 -->
    <el-dialog id="yhj-updatestatus-form" title="调度" :visible.sync="dispatchVis">
      <el-form-item label="调度部门">
        <el-select v-model="form.region" placeholder="请选择调度部门">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="调度人员">
        <el-select v-model="form.region" placeholder="请选择调度人员">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dispatchVis = false">取 消</el-button>
        <el-button type="primary" @click="clickUpdateStatus">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import CountTo from 'vue-count-to'
import {
  importXls,

  getSHBOption,
  getTzqkList,
  getAllMsg,
  getAllProject,
  getProject,
  getAllFormParam,
  getAllOrgs,
  getAllDeparts,
  getJoiners,
  getLeadersOfOrgId,
  getProManagersOfProEnterId,
  clickUpdateStatus,
  addProject,
  updateProject,
  updateProjectSHB,
  deleteProject,
  authProject,
  dispatchProject,
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
const baseURL = process.env.VUE_APP_BASE_API
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
  proManager2: '',
  proManagerMobile2: '',
  enterManager: '',
  enterManagerMobile: '',
  stage: '',
  status: '',
  completeDate: '',
  orgId: '',
  investInfos: [{}],
  typeArr: []

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

      keyName: [{
        'chinaName': '单位名称',
        'enName': 'name'
      }, {
        'chinaName': '单位负责人',
        'enName': 'manager'
      }, {
        'chinaName': '单位负责人电话',
        'enName': 'managerMobile'
      }, {
        'chinaName': '类型',
        'enName': 'property'
      }, {
        'chinaName': '所在位置',
        'enName': 'position'
      }, {
        'chinaName': '隶属单位ID',
        'enName': 'pid'
      }],
      xlsMustField: ['单位名称', '单位负责人', '单位负责人电话', '类型'],
      tranferFiled: {
        'property': [{
          'id': 1,
          'value': '市发改委'
        }, {
          'id': 2,
          'value': '各级发改委'
        }, {
          'id': 3,
          'value': '职能部门'
        }, {
          'id': 4,
          'value': '企业'
        }]
      },
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      dialogFormVisible: false,
      dispatchVis: false,
      updateProStatus: '',
      dialogProjectDetail: false,

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
      typeList: [],
      allMsg: {},
      endTime: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      dialogType: '',
      dialogAddFormVisible: false,
      dialogAddSHBFormVisible: false,
      visibleInvest: 'hiden',
      dialogType_Task: '',
      dialogTaskFormVisible: false,
      addform: Object.assign({}, defaultProject),
      addTaskObj: Object.assign({}, defaultTask),

      categoryList: [],
      leaderList: [],
      proManagerList: [],
      peopleList: [],
      enterList: [],
      orgAllId: '',
      peopleAllId: '',
      planInvertMoney: new Date().getFullYear() + '年计划完成投资',
      planOpenTime: new Date().getFullYear() + '年计划开复时间',
      overInvertMoney: new Date().getFullYear() + '年已完成投资',
      isOpen: new Date().getFullYear() + '年是否开复工',
      departList: [],
      orgList: [],
      joiners: [],
      maturity: [{
        id: 1,
        name: '新建'
      }, {
        id: 2,
        name: '续建'
      }],
      stageList: [{
        id: 1,
        name: '无所属'
      }, {
        id: 2,
        name: '前期手续办理'
      }, {
        id: 3,
        name: '建设阶段'
      }, {
        id: 4,
        name: '竣工验收阶段'
      }],
      addShbObj: '',
      shbOption: [],
      shbOption1: [],
      shbOption2: [],
      shbOption3: [],
      shbOption4: [],
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
        submitted: [{
          required: true,
          message: '请输入报送地区',
          trigger: 'blur'
        }],
        // proManagerTing: [{
        //   required: true,
        //   message: '请输入主管厅局',
        //   trigger: 'blur'
        // }],
        // proEnter: [{
        //   required: true,
        //   message: '请选择主管单位',
        //   trigger: 'change'
        // }],
        approveCode: [{
          required: true,
          message: '请输入项目平台代码',
          trigger: 'blur'
        }],
        proManager: [{
          required: true,
          message: '请选择项目联系人',
          trigger: 'change'
        }],
        proManagerMobile: [{
          // validator: val_mobil,
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        // enterManager: [{
        //   required: true,
        //   message: '请选择企业负责人',
        //   trigger: 'change'
        // }],
        // enterManagerMobile: [{
        //   validator: val_mobil,
        //   trigger: 'blur'
        // }],
        content: [{
          required: true,
          message: '请输入项目建设内容',
          trigger: 'blur'
        }],
        lxType: [{
          required: true,
          message: '请选择立项类型',
          trigger: 'change'
        }],
        investType: [{
          required: true,
          message: '请选择投资类型',
          trigger: 'change'
        }],
        typeArr: [{
          required: true,
          message: '请选择行业类型',
          trigger: 'change'
        }],
        // number: [{
        //   required: true,
        //   message: '请输入项目编号',
        //   trigger: 'change'
        // }],
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
        planInvertMoney: [{
          required: true,
          message: '请输入当年计划完成投资',
          trigger: 'blur'
        }],
        thisyearOpentime: [{
          required: true,
          message: '请选择当年计划开复工时间',
          trigger: 'change'
        }],
        isOpen: [{
          required: true,
          trigger: 'change'
        }],
        overInvertMoney: [{
          required: true,
          message: '请输入当年已完成投资',
          trigger: 'blur'
        }],
        expectedDate: [{
          // type: 'date',
          required: true,
          message: '请选择预计完成事件时间',
          trigger: 'change'
        }],
        ydArea: [{
          required: true,
          message: '请输入项目整体规模',
          trigger: 'blur'
        }],
        energyArea: [{
          required: true,
          message: '请输入项目整体用能规模',
          trigger: 'blur'
        }],
        energyWaterArea: [{
          required: true,
          message: '请输入项目整体用水规模',
          trigger: 'blur'
        }],

        // leader: [{
        //   required: true,
        //   message: '请选择牵头领导',
        //   trigger: 'change'
        // }],
        // leadenter: [{
        //   required: true,
        //   message: '请选择牵头单位',
        //   trigger: 'change'
        // }],
        // coordinate: [{
        //   required: true,
        //   message: '请选择协调负责人',
        //   trigger: 'change'
        // }],
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
      shbList: [],
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
      ruleSHB: {
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
        ]
      },
      ruleTasks: {
        title: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在 2 到 50 个字符',
          trigger: 'blur'
        }
        ],
        pid: [{
          required: true,
          message: '请选择所属上级',
          trigger: 'change'
        }],
        stageId: [{
          required: true,
          message: '请选择所属阶段',
          trigger: 'change'
        }],
        shb: [{
          required: true,
          message: '请选择审核备类型',
          trigger: 'change'
        }],
        remark: [{
          required: true,
          message: '请输入项目描述',
          trigger: 'blur'
        }, {
          min: 1,
          max: 300,
          message: '长度在 1 到 300 个字符',
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
    this.getAllDeparts()
    this.getAllMsg()
    this.getOrgtypes()
    this.getSHBOption()
  },
  // inject: ['reload'],
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 导表
    async xlsSuccess(xlsValues) {
      var res = await importXls({
        'orgId': this.orgId,
        'data': xlsValues
      })
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.msg || '操作成功'
        })
      }
    },
    xlsBeforeUpload(rt) {
      console.log('导表qian返回', rt)
      return true
    },
    async handleProPageSizeChange(val) {
      this.getProjectList(this.dataMap.pn, val)
    },
    async handleProPageCurrentChange(val) {
      this.getProjectList(val, this.dataMap.ps)
    },
    leRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    handleDownload(file) {
      console.log(file)
    },
    // 上传
    submitUpload() {
      var formData = new FormData()// new一个formData事件
      formData.append('file', this.addform.fileInfos[0].inputFile) // 将file属性添加到formData里
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
          if (res.code === 200) {
            that.$message({
              type: 'success',
              message: '上传成功!'
            })
            // 更新路径
            that.addform.image = res.data
            return true
          } else {
            that.$message({
              type: 'error',
              message: '上传失败!' + res.msg
            })
            return false
          }
        }
      })
    },
    // fresh() {
    //   this.reload()
    // },
    async getOrgtypes() {
      console.log(this.orgId)
      const res = await getOrgtypes(this.orgId)
      this.typeList = res.data
    },
    async getSHBOption() {
      const res = await getSHBOption()
      this.shbOption = res.data
      this.shbOption1 = res.data.filter((item, index, arr) => {
        return item.step === 1
      })
      this.shbOption2 = res.data.filter((item, index, arr) => {
        return item.step === 2
      })
      this.shbOption3 = res.data.filter((item, index, arr) => {
        return item.step === 3
      })
      this.shbOption4 = res.data.filter((item, index, arr) => {
        return item.step === 4
      })
    },

    // 切换项目内容项
    handleClick(tab, event) {
      if (tab.index === '1') {
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
    async getAllDeparts() {
      const res = await getAllDeparts()
      this.departList = res.data
    },
    async getProjectList() {
      console.log(this.searchContent, this.searchStatus)
      const res = await getAllProject({
        'roleId': this.$store.getters.roleId,
        'orgId': this.orgId,
        'search': this.searchContent,
        'searchStatus': this.searchStatus,
        'pn': this.dataMap.pn,
        'ps': this.dataMap.ps
      })
      this.projectList = res.data.list
      this.dataMap.total = res.data.total
    },
    async searchProject() {
      this.getProjectList()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async clickProject(id) {
      this.currProjectIndex = id
      const res = await getProject(id)
      this.thisProject = res.data
      this.thisProject.invest = Number(this.thisProject.invest)
      this.addShbObj = res.data
      this.dialogProjectDetail = true
      this.projectStatusClass = this.thisProject.status === 1 ? 'circle-ing' : this.thisProject.status === 2
        ? 'circle-success' : 'circle-error'
    },

    async authProject(id) {
      this.$confirm('请确认项目及任务无误，提交后将无法修改，确定提交吗？', '提交审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
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
    async dispatchProject(id) {
      this.$alert(`<strong>这是 <i>HTML</i> 片段</strong>
      <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

      `, '选择调度组织和人员', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        dispatchProject(id)
        this.$message({
          type: 'success',
          message: '已提交成功!'
        })
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
        this.visibleInvest = this.addform.invest.trim() !== '' && this.addform.invest !== '0' ? '' : 'hiden'
        const res3 = await getJoiners(this.addform.visibleRange)
        this.joiners = res3.data
        this.addform.joiners = this.addform.joiners != null ? JSON.parse(this.addform.joiners) : ''
        this.addform.stage = this.addform.stage != null ? JSON.parse(this.addform.stage) : ''
      } else {
        this.visibleInvest = 'hiden'
        this.addform = Object.assign({}, defaultProject)
      }
      this.dialogAddFormVisible = true
    },
    // 添加审核备
    handleSHB() {
      this.dialogAddSHBFormVisible = true
    },

    deleteProject(id, $index) {
      console.log(id, $index)
      this.$confirm('确定要删除该项目吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
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
      if (op.indexOf('0') !== -1) {
        var allOrgids = []
        for (const s of this.orgList) {
          allOrgids.push(s.id)
        }
        this.addform.visibleRange = allOrgids
      }
      this.joiners = []
      if (this.addform.visibleRange !== '' && this.addform.visibleRange !== 0) {
        const res = await getJoiners(this.addform.visibleRange.join(','))
        this.joiners = res.data
      }
    },
    joinerChange(op) {
      if (op.indexOf('0') !== -1) {
        var allpeoids = []
        for (const s of this.orgList) {
          allpeoids.push(s.id)
        }
        this.addform.joiners = allpeoids
        console.error(this.addform.joiners)
      }
    },
    // 牵头单位 改变
    async changeLeadenter() {
      this.leaderList = []
      if (this.addform.leadenter !== '' && this.addform.leadenter !== 0) {
        const res = await getLeadersOfOrgId(this.addform.leadenter)
        this.leaderList = res.data
      }
    },
    // 主管单位 改变
    async changeProEnter() {
      this.proManagerList = []
      if (this.addform.proEnter !== '' && this.addform.proEnter !== 0) {
        const res = await getProManagersOfProEnterId(this.addform.proEnter)
        this.proManagerList = res.data
      }
    },
    investChange() {
      this.visibleInvest = this.addform.invest.trim() !== '' && this.addform.invest !== '0' ? '' : 'hiden'
    },
    deleteInvestInfo(index) {
      if (index !== 0) {
        this.addform.investInfos.splice(index, 1)
      }
    },
    addInvestInfo() {
      this.addform.investInfos.push({})
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
        this.addform.isOpen = this.addform.isOpen ? 1 : 0
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
    async addSHBSubmit(formName) {
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
        const res = await updateProjectSHB(this.addShbObj)
        this.clickProject(res.data)
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogAddSHBFormVisible = false
      }
    },
    async clickUpdateStatus() {
      await clickUpdateStatus(this.thisProject.id, this.updateProStatus)
      this.dialogFormVisible = false
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
      this.shbList = res.data.shbList
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
    handleChangeStage(v) {
      if (v === 2) {
        this.addTaskObj.isShb = '是'
      } else {
        this.addTaskObj.isShb = '否'
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
      if (isGo) {
        if (isEdit) {
          await updateTask(this.addTaskObj)
          for (let index = 0; index < this.taskList.length; index++) {
            console.log(this.taskList)
            console.log(this.taskList[index].value)
            for (let index2 = 0; index2 < this.taskList[index].value.length; index++) {
              console.log(this.taskList[index].value.[index2])
              if (this.taskList[index].value.[index2].id === this.addTaskObj.id) {
                this.taskList[index].value.[index2].splice(index2, 1, Object.assign({}, this.addTaskObj))
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
        // 重载table
        this.getTaskList(10)

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

  ::v-deep .el-dialog {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: auto !important;
    margin: 0px auto !important;
    height: 80% !important;
  }

  ::v-deep .el-dialog .el-dialog__body {
    height: calc(100% - 102.4px) !important;
    overflow: auto !important;
  }
  ::v-deep .el-dialog__footer{
    padding: 10px !important;
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

    .project-body {
      width: 100%;
      background-color: white;
      display: flex;
      border: 1px solid #eee;
      padding: 0;
      height: 100%;
      overflow: hidden;
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
        height: 60px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        color: #333;
        background-color: rgba(0, 206, 209,0.2);
      }

    }

    .right-project {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      overflow: hidden;
      overflow-wrap: break-word;
      width: 100%;
      position: relative;
      height:100%;
      .el-header{
        background-color: rgba(0, 206, 209,0.2);
      }
      .el-tabs--card{
        height:100%;

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
            margin: 10px auto;
            background: #eef1f6;
            border-bottom: 1px solid #eee;
            line-height:40px;
            .shbTile{
              background-color: cadetblue;
              text-align: center;
              color: white;
              font-weight: bold;
            }
            .project-basic-property {
              margin-right:10px;
              font-size: 13px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              border-bottom: 1px solid #88bcf4;
              margin-bottom: 5px;

              .project-property-item-name {
                color: #667ab7;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 10px;
                border-left: solid 3px #88bcf4;
                padding: 12px;
                border-top-right-radius:10px;
                background-color:#c5dcf0;
                font-size: 14px;
                height: 100%;
                line-height: 40px;
              }
              .project-property-item-cono{
                line-height: 40px;
                float: right;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: calc(100% - 170px);
                text-align: right;
                padding-right: 10px;
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
          }

          .project-basic-property-line {
            display: block;
            margin: 30px 0;
            border-bottom: solid 1px #f3f3f3;
          }
        }
        .detailShb {
          .d-flex {
            .el-row{
              margin-top: 5px !important;
            }
            .project-property-item-cono{
              width: calc(100% - 240px) !important;
            }
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
    }

    .el-radio-group {
      margin: 5px 10px !important;
    }
    .el-select {
        width: 100%;
    }
    .el-cascader {
        width: 100%;
    }

  }

  /* 添加审核备表单样式 */
  #yhj-shb-form {
    ::v-deep .el-dialog {
      width: 80% !important;
    }
    .el-header{
      background-color: #b3c0d1;
      color: #333;
      line-height: 60px;
      text-align: center;
    }
    .el-main{
      background-color: #e9eef3;
      color: #333;
      text-align: left;
    }
  }
  #yhj-updatestatus-form{
    ::v-deep .el-dialog {
      height: auto !important;
    }
  }

  #yhj-detail-form{
    ::v-deep .el-dialog {
      height: 80% !important;
    }

  }
  .yhj-detail-content{
    position: relative;
    margin: -30px -20px;
  }
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    margin: 0px 10px;
    width: 250px;
    padding: 2px 10px;
    font-size: 14px;
    margin: 0px;
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
    font-size:14px;
  }
  .right-btns {
    position: absolute;
    right: 8px;
    top: 12px;
    z-index: 2;
    cursor: pointer;
  }

  .right-btns:hover {
    color: #4e8afa;
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
  }
  .manager-card-content {
      .d-flex {
        margin: 10px auto;
        background: #eef1f6;
        border-bottom: 1px solid #eee;
        line-height:40px;
        .shbTile{
          background-color: cadetblue;
          text-align: center;
          color: white;
          font-weight: bold;
        }
        .project-basic-property {
          margin-right:10px;
          font-size: 13px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          border-bottom: 1px solid #88bcf4;
          margin-bottom: 5px;

          .project-property-item-name {
            color: #667ab7;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 10px;
            border-left: solid 3px #88bcf4;
            padding: 12px;
            border-top-right-radius:10px;
            background-color:#c5dcf0;
            font-size: 14px;
            height: 100%;
            line-height: 40px;
          }
          .project-property-item-cono{
            line-height: 40px;
            float: right;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: calc(100% - 170px);
            text-align: right;
            padding-right: 10px;
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
      }

      .project-basic-property-line {
        display: block;
        margin: 30px 0;
        border-bottom: solid 1px #f3f3f3;
      }
    }
    .detailShb {
      .d-flex {
        .el-row{
          margin-top: 5px !important;
        }
        .project-property-item-cono{
          width: calc(100% - 240px) !important;
        }
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

</style>
<style>
  .el-radio-button--mini .el-radio-button__inner {
    padding: 5px 10px;
    font-size: 14px;
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

  .el-tabs__content {
    overflow:auto !important;
    height:calc(100% - 41px) !important;
  }
</style>
