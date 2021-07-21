<template>
  <div class="Statistics-background">
  <div class="Statistics">
    <div class="Statistics-row">
      <div class="Statistics-row-cos">
        <p class="Statistics-row-cos-tittle">{{firstTittle}}</p>
        <p class="Statistics-row-cos-content c101010">{{firstContent}}</p>
      </div>
      <div class="Statistics-row-cos">
        <p class="Statistics-row-cos-tittle">{{secondTittle}}</p>
        <p class="Statistics-row-cos-content c101010">{{ secondContent }}</p>
      </div>
    </div>
    <div class="Statistics-row">
      <div class="Statistics-row-cos">
        <p class="Statistics-row-cos-tittle">{{thirdTittle}}</p>
        <p class="Statistics-row-cos-content cgreen">{{thirdContent}}</p>
      </div>
      <div class="Statistics-row-cos">
        <p class="Statistics-row-cos-tittle">{{fourthTittle}}</p>
        <p class="Statistics-row-cos-content cred">{{fourthContent}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    firstTittle: {
      type: String,
      default: ""
    },
    firstContent: {
      type: Number,
      default: null
    },
   secondTittle: {
      type: String,
      default: ""
    },
    secondContent: {
      type: Number,
      default: null
    },
    thirdTittle: {
      type: String,
      default: ""
    },
    thirdContent: {
      type: Number,
      default: null
    },
    fourthTittle: {
      type: String,
      default: ""
    },
    fourthContent: {
      type: Number,
      default:null
    },

  },

}
</script>

<style lang='stylus' scoped>
.Statistics-background{
  display: flex;
  background-color: #F2F2F2;

}
.Statistics{

  display: flex;
  flex: 1;
  overflow: hidden;
  border-radius: 5px;
  flex-direction: column;
  margin-right: 9px;
  margin-left: 10px
}
.Statistics-row{
  display: flex;

  flex-direction: row;
  background-color: #FFFFFF;
}
>>>{
.el-input__inner{
  display: flex;
  flex: 1;
  height: 44px;
  line-height: 23px;
  border-radius: 3px;
  color: rgba(163, 165, 168, 100);
  font-size: 16px;
  text-align: left;

  border: 1px solid rgba(237, 238, 238, 100);
}
}
.Statistics-row-cos{
  padding: 23px 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid #F2F2F2;
  border-right: 1px solid #F2F2F2;


}
.Statistics-row-cos-tittle{

  line-height: 14px;
  opacity: 0.8;
  color: rgba(51, 51, 51, 100);
  font-size: 12px;
  text-align: center;
  margin: 1px;

}
.Statistics-row-cos-content{

  line-height: 28px;
  font-size: 20px;
  text-align: center;

}

</style>