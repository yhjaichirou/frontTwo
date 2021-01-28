<template>
  <div class="app-container">
    <div class="container-header">
      <el-button type="primary" @click="addDepartEvent">新建部门</el-button>
      <div class="search">
        <el-input v-model="searchContent" style="width: 50%;" placeholder="请输入内容" @input="searchProject">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-radio-group
          v-model="searchStatus"
          class="yhj-el-radio-group2"
          style=""
          placeholder="搜索项目"
          @change="searchProject"
        >
          <el-radio-button label="0" value="0">全部任务</el-radio-button>
          <el-radio-button label="1" value="1">我负责的任务</el-radio-button>
        </el-radio-group>
      </div>

    </div>
    <div class="project-body">
      <el-table :data="departList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="单位名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="负责人">
          <template slot-scope="scope">
            {{ scope.row.manager }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="负责人电话">
          <template slot-scope="scope">
            {{ scope.row.managerMobile }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="属性">
          <template slot-scope="scope">
            {{ scope.row.propertyStr }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="行业类型">
          <template slot-scope="scope">
            {{ scope.row.typeStr }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pn"
        :page-sizes="[20, 50, 100]"
        :page-size="ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      />

      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改单位':'新建单位'">
        <el-form ref="ruleForm" :model="depart" :rules="rule">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="单位名称" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="depart.name" autocomplete="off" placeholder="请输入单位名称" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="所在地点" :label-width="formLabelWidth">
                  <el-input v-model="depart.position" autocomplete="off" placeholder="请输入所在地点" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="单位负责人" prop="manager" :label-width="formLabelWidth">
                  <el-input v-model="depart.manager" autocomplete="off" placeholder="请输入单位负责人" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="负责人电话" prop="managerMobile" :label-width="formLabelWidth">
                  <el-input v-model="depart.managerMobile" autocomplete="off" placeholder="请输入负责人电话" />
                </el-form-item>
              </div>
            </el-col>
            <el-col v-if="currProperty" :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="单位性质" prop="property" :label-width="formLabelWidth">
                  <el-select v-model="depart.property" placeholder="请选择单位性质">
                    <el-option label="政府机构" value="3" />
                    <el-option label="企业" value="4" />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="所属行业" prop="type" :label-width="formLabelWidth">
                  <el-cascader
                    v-model="depart.typeArr"
                    :options="typeList"
                    :props="{ expandTrigger: 'hover' }"
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmDepart">提交</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
  </div>

</template>

<script>
import path from 'path'
import {
  deepClone
} from '@/utils'
import {
  getOrgtypes,
  getDepartList,
  addDepart,
  updateDepart,
  deleteDepart
} from '@/api/depart'

const defaultDepart = {
  id: '',
  name: '',
  position: '',
  manager: '',
  managerMobile: '',
  status: '',
  capacityValue: '',
  level: '',
  pid: '',
  property: '',
  type: '',
  typeName: '',
  typeArr: []
}

export default {
  data() {
    var val_mobil = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入负责人电话！'))
      } else if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      typevalue: [],
      orgId: '',
      typeList: [],
      searchContent: '',
      searchStatus: '',
      currProperty: true,
      depart: Object.assign({}, defaultDepart),
      departList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      formLabelWidth: '90px',
      pn: 1,
      ps: 20,
      total: 0,
      rules: {
        name: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在 2 到 50 个字符',
          trigger: 'blur'
        }],
        manager: [{
          required: true,
          message: '请输入负责人',
          trigger: 'blur'
        }],
        managerMobile: [{
          validator: val_mobil,
          trigger: 'blur'
        }],
        property: [{
          required: true,
          message: '请选择单位性质',
          trigger: 'change'
        }],
        type: [{
          required: true,
          message: '请选择行业',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    // routesData() {
    //   return this.routes
    // }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.orgId = this.$store.getters.orgId
    this.currProperty = this.$store.getters.property === 2
    this.getDepartList()
    this.getOrgtypes()
  },
  methods: {
    async getOrgtypes() {
      console.log(this.orgId)
      const res = await getOrgtypes(this.orgId)
      this.typeList = res.data
    },
    async searchProject() {
      // const res = await getDepartList(this.orgId, this.pn, this.ps,this.searchContent, this.searchStatus,)
      // this.departList = res.data
    },
    async getDepartList() {
      const res = await getDepartList(this.orgId, this.pn, this.ps, this.searchContent, this.searchStatus)
      // const res = await getDepartList({ orgId: this.orgId, pn: this.pn, ps: this.ps, searchContent: this.searchContent, searchStatus: this.searchStatus })
      this.departList = res.data
    },
    async addDepartEvent() {
      this.depart = Object.assign({}, defaultDepart)
      this.dialogType = 'new'
      this.dialogVisible = true
      // const res = await getOrgtypes()
      // this.typeList = res.data
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.depart = deepClone(scope.row)
      this.depart.property = this.depart.property + ''
      console.log(this.depart)
    },
    handleDelete({
      $index,
      row
    }) {
      this.$confirm('确定要删除吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteDepart(row.id)
          this.departList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async confirmDepart() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateDepart(this.depart)
        for (let index = 0; index < this.departList.length; index++) {
          if (this.departList[index].id === this.depart.id) {
            this.departList.splice(index, 1, Object.assign({}, this.depart))
            break
          }
        }
      } else {
        var orgId = this.$store.getters.orgId
        this.depart.orgId = orgId
        console.log(this.depart.type)
        const {
          data
        } = await addDepart(this.depart)
        this.depart.id = data
        this.departList.push(this.depart)
      }

      const {
        id,
        name,
        managerName
      } = this.depart
      this.dialogVisible = false
      this.$notify({
        title: '提交成功！',
        dangerouslyUseHTMLString: true,
        message: `
            <div>组织ID: ${id}</div>
            <div>组织名称: ${name}</div>
            <div>负责人: ${managerName}</div>
          `,
        type: 'success'
      })
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
      .yhj-el-radio-group2{
        margin-left: 20px;
      }
      .search{
        display: flex;
        flex: 1;
        justify-content: right;
      }
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
      border: 1px solid #eee;
      overflow-x: hidden;
      overflow-y: auto;
      .el-table{
        margin-top: 0px !important;
      }
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
    }
  }
</style>
<style>
  .el-pagination {
      margin-top: 20px;
  }
</style>
