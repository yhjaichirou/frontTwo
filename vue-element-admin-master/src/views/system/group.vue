<template>
  <div class="app-container">
    <div class="container-header">
      <el-button type="primary" @click="addGroupEvent">新建分组</el-button>
    </div>
    <div class="project-body">
      <el-table :data="groupList" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分组名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.groupName }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="分组描述">
          <template slot-scope="scope">
            {{ scope.row.groupDecript }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="dataMap.pn"
        :page-sizes="[20, 50, 100]"
        :page-size="dataMap.ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataMap.total"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改分组':'新建分组'">
      <el-form :model="group" label-width="80px" label-position="left">
        <el-form-item label="分组名称">
          <el-input v-model="group.groupName" placeholder="请输入分组名称" />
        </el-form-item>
        <el-form-item label="分组描述">
          <el-input
            v-model="group.groupDecript"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入分组描述"
          />
        </el-form-item>
        <!--    <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmGroup">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getGroup, addGroup, updateGroup, deleteGroup } from '@/api/group'

const defaultRole = {
  key: '',
  name: '',
  description: ''
}

export default {
  data() {
    return {
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },
      group: Object.assign({}, defaultRole),
      groupList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
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
    this.getGroup()
  },
  methods: {
    // async getRoutes() {
    //   const res = await getRoutes()
    //   this.serviceRoutes = res.data
    //   this.routes = this.generateRoutes(res.data)
    // },
    async handlePageSizeChange(val) {
      this.getGroup(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.getGroup(val, this.dataMap.ps)
    },
    async getGroup() {
      const res = await getGroup({
        'pn': this.dataMap.pn,
        'ps': this.dataMap.ps,
        'orgId': this.$store.getters.orgId
      })
      this.groupList = res.data.list
      this.dataMap.total = res.data.total
    },

    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    addGroupEvent() {
      // this.role = Object.assign({}, defaultRole)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.group = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该分组吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteGroup(row.id)
          this.groupList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmGroup() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateGroup(this.group)
        for (let index = 0; index < this.groupList.length; index++) {
          if (this.groupList[index].id === this.group.id) {
            this.groupList.splice(index, 1, Object.assign({}, this.group))
            break
          }
        }
      } else {
        var orgId = this.$store.getters.orgId
        this.group.orgId = orgId
        const { data } = await addGroup(this.group)
        this.group.id = data
        this.groupList.push(this.group)
      }

      const { groupDecript, id, groupName } = this.group
      this.dialogVisible = false
      this.$notify({
        title: '提交成功！',
        dangerouslyUseHTMLString: true,
        message: `
            <div>ID: ${id}</div>
            <div>Name: ${groupName}</div>
            <div>Description: ${groupDecript}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
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
}
</style>
