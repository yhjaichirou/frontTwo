<template>
  <div>

      <el-form :inline="true" :model="item" >
        <el-form-item class="form-item" prop="investType" label="" :rules="[{ required: true, message: '请输入投资类型', trigger: 'blur' }]">
          <el-input v-model="item.investType"  placeholder="请输入投资类型"></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="investMoney" label="" :rules="[{ required: true, message: '请输入投资金额', trigger: 'blur' }]">
          <el-input v-model="item.investMoney" style="width:100%;" suffix-icon="iconfont icon-jinbi" placeholder="请输入投资金额"></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="investMoney" label="">
          <el-date-picker
            v-model="item.investDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          />
          <el-button @click="deleteRow">删除</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  // import {
  //   getTask,
  //   taskDb
  // } from '@/api/task'
  // const defaultInvestInfo = {
  //   id: '',
  //   proId:'',
  //   investDate: '',
  //   investType:'',
  //   investMoney:''
  // }
export default {
  name: 'InvestInfo',
  props: ['index','item'],
  data() {
    return {

      // currInvestInfo: Object.assign({}, defaultInvestInfo),
      // currInvestInfoIndex: '',
      // fileInfo: '',


    }
  },
  methods: {
    deleteRow() {
      this.$emit("delete",this.index)
    }
  }

}
</script>
<style lang="scss" scoped>
  .form-item{
    width: 32%;
  }
  .form-item>div{
    width: 100% !important;
  }
  .form-item .el-form-item__content {
    width: 100% !important;
  }
  .el-form-item--medium .el-form-item__content {
     width: 100% !important;
  }
</style>
