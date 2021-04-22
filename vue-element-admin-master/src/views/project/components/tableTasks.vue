<template>
  <div>
    <!-- <div>我输局部组件---{{ valuea }}</div> -->
    <el-table
      :data="taskList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.statusStr }}</span>
            </el-form-item>
            <el-form-item label="指派组织">
              <span>{{ props.row.executOrgName }}</span>
            </el-form-item>
            <el-form-item label="负责人">
              <span>{{ props.row.executor }}</span>
            </el-form-item>
            <el-form-item label="负责人电话">
              <span>{{ props.row.executorMobile }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.startDateStr }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="statusStr" label="状态" width="120" />
      <el-table-column prop="executOrgName" label="指派组织" width="220" />
      <el-table-column prop="executorName" label="负责人" width="100" />
      <el-table-column prop="startDateStr" label="开始时间" width="150" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="text" size="small" @click.native.prevent="updateRow(scope.$index, scope)">
            修改
          </el-button>
          <el-button v-if="scope.row.del" type="text" size="small" style="color:#f56c6c" @click.native.prevent="deleteRow(scope.$index, scope)">
            移除
          </el-button>

          <el-button type="text" size="small" @click.native.prevent="handleTaskDetail(scope)">查看</el-button>
          <el-button type="text" size="small" style="color:#e6a23c" @click.native.prevent="dbRow(scope)">督办</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="zxdialogVisible" :title="currtask.isEdit?'执行任务':'任务详情'">
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
              <span slot="label"><i class="el-icon-date" style="margin-right: 6px;" /> 任务信息</span>
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
              <span slot="label"><i class="el-icon-c-scale-to-original" style="margin-right: 6px;" />依赖关系</span>
              <dl class="list-li-fj-li">
                <div v-if="currtask.childTask === null || currtask.childTask.length === 0">
                  <div class="fj-nofile">
                    <div style="margin-top: 10px;text-align: center;">暂无子任务</div>
                  </div>
                </div>
                <div v-else style="padding: 10px;border-bottom: 1px #eee solid;">
                  <dd v-for="child in currtask.childTask" :key="child.id" class="item d-flex ng-star-inserted">
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                      <div class="thumb"><svg-icon icon-class="childTask" style="width:2.5em;height:2.5em;" /></div>
                      <div>{{ child.title }}</div>
                      <div :style="{color: child.status===2?'#27d8bc':'brown'}">{{ child.statusStr }}</div>
                      <div>{{ child.startDateStr }}</div>
                      <div><span>负责人: <span>{{ child.executorName }}</span></span></div>
                    </div>
                  </dd>
                </div>
              </dl>
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label"><i class="el-icon-wallet" style="margin-right: 6px;" /> 附件</span>
              <div class="list-li-body">
                <div class="head d-flex">
                  <div class="text-desc">共 <span class="text-body">{{ currtask.fileInfos.length }}</span> 个附件</div>
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
                    <dd v-for="(tfileInfo,index) in currtask.fileInfos" :key="tfileInfo.id" class="item d-flex ng-star-inserted">
                      <div style="display: flex;">
                        <div class="thumb"><svg-icon class="fj-svg" :icon-class="tfileInfo.thumb" /></div>
                        <div class="content">
                          <div class="title">{{ tfileInfo.fileName }}</div>
                          <div class="meta">
                            <span>{{ tfileInfo.fileSize }}</span><span>来自 <span>{{ tfileInfo.userName }}</span></span><span>|</span><span>{{ tfileInfo.date }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="operation">
                        <a class="mr-3 btn btn-icon" title="预览" href="javascript:;" @click="preView(tfileInfo.url ==''?'javascript:;':tfileInfo.url)"><i class="el-icon-view" /></a>
                        <a class="mr-3 btn btn-icon" title="下载" :href="tfileInfo.url ==''?'javascript:;':tfileInfo.url"><i class="el-icon-download" /></a>
                        <a v-if="currtask.isEdit" class="mr-3 btn btn-icon" title="上传" href="javascript:;" @click="submitUpload(index,currtask.id)"><i class="el-icon-upload2" /></a>
                        <a v-if="currtask.isEdit" class="mr-3 btn btn-icon" title="删除" href="javascript:;" @click="fileDelete(index,currtask.id,tfileInfo.id)"><i class="el-icon-delete" /></a>
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

</template>

<script>
import {
  getTask,
  taskDb
} from '@/api/task'
const defaultTask = {
  id: '',
  title: '',
  annex: '',
  code: '',
  comDate: '',
  comDateStr: '',
  createDate: '',
  endDate: '', childTask: [],
  endDateStr: '', executOrg: '', comContent: '',
  executOrgName: '', executor: '', executorMobile: '', executorName: '',
  fileInfos: [], remark: '', shb: '', shbName: '', stageId: '', stageStr: '', status: '',
  number: '', orgId: '', orgName: '', preTasks: '', priority: '', priorityStr: '', proId: '', projectName: '',
  isEdit: false
}
export default {
  name: 'MyLocalBtn',
  props: {
    'taskList':
    {
      type: Array, // 类型
      default: null // 默认值
    }
  },
  data() {
    return {
      zxActiveName: '1',
      zxdialogVisible: false,
      currtask: Object.assign({}, defaultTask),
      currtaskIndex: '',
      fileInfo: ''

    }
  },
  methods: {
    updateRow($index, scope) {
      this.$emit('updateTask', $index, scope.row.id)
      // await deleteGroup(scope.row.id)
      // this.taskList.splice($index, 1)
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // })
    },
    deleteRow($index, scope) {
      this.$confirm('确定要删除吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.$emit('deleteTask', $index, scope.row.id)
        })
        .catch(err => { console.error(err) })
    },
    // 执行任务
    tabZXClick() {

    },
    async handleTaskDetail(scope) {
      const res = await getTask(scope.row.id)
      this.currtask = res.data
      this.currtask.isEdit = false
      this.zxdialogVisible = true
      this.currtaskIndex = scope.$index
      console.log(this.currtask)
    },
    async dbRow(scope) {
      const res = await taskDb(scope.row.id)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }
    },

    load(tree, treeNode, resolve) {
      console.log('数节点：', tree, treeNode)
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }

}

</script>
<style lang="scss" scoped>
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
</style>
