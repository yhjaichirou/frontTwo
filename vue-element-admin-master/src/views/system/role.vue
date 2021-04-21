<template>
  <div class="app-container">
    <div class="container-header">
      <el-button type="primary" @click="handleAddRole">新增角色</el-button>
    </div>
    <div class="project-body">
      <el-table :data="rolesList" border>
        <el-table-column align="center" label="ID" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="角色描述">
          <template slot-scope="scope">
            {{ scope.row.roleDescribe }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
            <!-- <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.roleDescribe"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="菜单栏">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="currMenus"
            class="permission-tree"
            @check="checkClick"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
// import { menu } from '@/utils/menu'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  id: '',
  roleName: '',
  menus: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      currMenus: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: true, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false : 关联
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      // var serviceRoutes = menu(res.data)
      this.routes = res.data
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
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
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.currMenus = []
      console.log(this.currMenus, this.checkStrictly)
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.role = deepClone(scope.row)
      var menus = this.role.menus
      menus = menus === null || menus === '' ? [] : menus.split(',')
      var _currMenus = menus.map(Number)
      this.currMenus = _currMenus
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(_currMenus)
      })
      // this.$nextTick(() => {
      //   this.$refs.tree.setCheckedNodes(this.role.menus)
      //   // set checked state of a node not affects its father and child nodes
      //   this.checkStrictly = false
      // })
    },
    setCheckedKeys(keys, leafOnly) {
      console.log('设置：', keys, leafOnly)
      this.currMenus = []
    },
    checkClick(e) {
      this.checkStrictly = false
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
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
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const finishChecked = checkedKeys.concat(hafCheckedKeys)
      // this.routes = this.generateTree(deepClone(this.routes), '/', checkedKeys)
      this.currMenus = finishChecked
      if (finishChecked.length > 0) {
        this.role.menus = finishChecked.join(',')
        console.log('选择tree', this.role.menus)
      }

      if (isEdit) {
        await updateRole(this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.id = data
        this.rolesList.push(this.role)
      }

      const { roleName } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>${roleName},已更新！</div>
          `,
        type: 'success'
      })
      this.checkStrictly = true
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
