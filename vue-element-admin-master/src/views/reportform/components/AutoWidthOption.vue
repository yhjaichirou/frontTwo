<template>
  <div style="display:inline-block;">
    <label class="radio-label">状态: </label>
    <el-radio-group v-model="searchValue">
      <el-radio :label="0" >
        全部
      </el-radio>
      <el-radio :label="7" >
        新创建
      </el-radio>
      <el-radio :label="1" >
        正在进行中
      </el-radio>
      <el-radio :label="2" >
        已完成
      </el-radio>
      <el-radio :label="3" >
        已延期
      </el-radio>
      <el-radio :label="4" >
        已逾期
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "1"
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .el-radio--medium.is-bordered {
    border: none;
    margin-right: 0px;
  }
</style>
