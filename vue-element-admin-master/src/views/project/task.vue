<template>

<el-row>
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

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
        orgAllId: "",
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
          sOrgIds += ',' + s.id
        }
        this.orgAllId = sOrgIds != '' ? sOrgIds.slice(1) : 0;
        this.joiners = res.data.joiners
        this.dialogAddFormVisible = true;
      },
      async visibleRangeChange() {
        if (this.addform.visibleRange != '' && this.addform.visibleRange != 0) {
          const res = await getJoiners(this.addform.visibleRange);
          this.joiners = res.data
        } else {
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
      },
      async adTask() {

      }


      //
    }
  }
</script>
<style lang="scss" scoped>

  .app-container {
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);

  }
</style>
