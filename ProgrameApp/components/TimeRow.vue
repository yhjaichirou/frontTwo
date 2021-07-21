<template>
  <div class="flex flex1 bgfff" :class="[top?'top':'buttom']" >
  <div class="aaa" >
    <div class="list-row-line" >
    </div>
  </div>
  <div class="box-calendar">
    <div class="box-tittle">接受时间</div>
    <div class="box-content">
    <van-cell title="" :value="date" @click="show = true" />

    <span class="iconfont icon-below-s">
      <van-calendar v-model="show" type="range" @confirm="onConfirm" />
    </span>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: "TimeRow",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    top: {
      type: Boolean,
      default: false
    },

    line: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {

      date: '',
      show: false,
    }
  },
  methods :{
    changeList(index){
      this.n = index;//this指向app
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },

}
</script>

<style lang='stylus' scoped>
.top{
  flex-direction:column;
}
.buttom{
  flex-direction:column-reverse;
}
.aaa{
  display: flex;
  flex: 1;
  background-color: #FFFFFF;
}
.list-row-line{
  margin: 0 20px;
  flex: 1;
  height: 1px;
  background-color: #EDEEEE;
}
.box-calendar{
  padding:0 25px;
  display:flex;
  flex:1;
  flex-direction:row;
  justify-content space-between
  background-color: #FFFFFF;
.iconfont{

  line-height: 58px;
  width: 22px;
  height: 22px;
  text-align: center;
}
}
.box-tittle{
  display:flex;
  flex:1;
  line-height: 58px;
  color: rgba(82, 78, 78, 100);
  font-size: 14px;
  text-align: left;

}
.box-content{
  display: flex;
  flex: 1;
  height: 58px;

}
>>{
.van-cell{

  height: 58px;
  color: rgba(82, 78, 78, 100);
  font-size: 14px;
  text-align: left;

}
}
</style>