<template>
  <div style="display:inline-block;">
    <label class="radio-label" style="padding-left:0;">项目名称: </label>
    <el-input v-model="filename" placeholder="请输入搜索的项目名称" style="width:200px;" prefix-icon="el-icon-document" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filename: {
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
