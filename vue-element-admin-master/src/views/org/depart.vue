<template>
  <div class="app-container">
    <el-button type="primary" @click="addDepartEvent">新建部门</el-button>

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
          {{ scope.row.managerName }}
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
                  <el-option label="政府机构" value="2" />
                  <el-option label="企业" value="3" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="所属行业" prop="type" :label-width="formLabelWidth">
                <el-cascader
                    v-model="depart.type"
                    :options="typeList"
                    :props="{ expandTrigger: 'hover' }"></el-cascader>
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
</template>

<script>
  import path from 'path'
  import {
    deepClone
  } from '@/utils'
  import {
    getOrgtypes,
    getDepart,
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
    type: []
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
        typevalue:[],
        orgId: '',
        typeList: [],
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
      this.currProperty = this.$store.getters.property == 1 ? true : false
      console.log(this.$store.getters,this.currProperty)
      this.getDepart()

    },
    methods: {
      async getOrgtypes() {
        const res = await getOrgtypes(orgId)
        this.departList = res.data
      },
      async getDepart() {
        var orgId = this.$store.getters.orgId
        const res = await getDepart(orgId)
        this.departList = res.data
      },
      async addDepartEvent() {
        // this.role = Object.assign({}, defaultRole)
        this.dialogType = 'new'
        this.dialogVisible = true
        const res = await getOrgtypes()
        this.typeList = res.data
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.checkStrictly = true
        this.depart = deepClone(scope.row)

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
          .then(async () => {
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
          var orgId = this.$store.getters.orgId;
          this.depart.orgId = orgId;
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
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }

    .el-form-item__content{
      margin-left: 90px !important;
    }
  }
</style>
