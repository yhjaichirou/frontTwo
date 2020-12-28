<template>
  <div>
    <div>我输局部组件---{{ valuea }}</div>
    <el-table
      :data="taskList"
      style="width: 100%"
    >
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.status }}</span>
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
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="executor" label="负责人" width="120" />
      <el-table-column prop="executorMobile" label="负责人电话" width="180" />
      <el-table-column prop="startDateStr" label="开始时间" width="120" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, taskList)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'MyLocalBtn',
  props: ['valuea', 'taskList'],
  data() {
    return {

    }
  },
  methods: {
    deleteRow({ $index, row }) {
      this.$confirm('确定要删除该分组吗？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteGroup(row.id)
          this.taskList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    }
  }

}

</script>
