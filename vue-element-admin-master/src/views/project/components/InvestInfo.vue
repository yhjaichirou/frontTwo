<template>
  <div>

      <el-form :inline="true" :model="item" >
        <el-form-item class="form-item" prop="investType" label="" :rules="[{required: true, message: '请选择资金来源', trigger: 'change' }]">
          <!-- <el-input v-model="item.investType"  placeholder="请输入投资类型"></el-input> -->
          <el-select v-model="item.investType" placeholder="请选择资金来源" >
            <el-option label="政府资金" value="政府资金" />
            <el-option label="企业自有资金" value="企业自有资金" />
            <el-option label="银行贷款" value="银行贷款" />
            <el-option label="专项债券" value="专项债券" />
            <el-option label="其他" value="其他" />
          </el-select>
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
