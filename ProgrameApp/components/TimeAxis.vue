<template>
<div class="warp"> 
  <div class="box" v-for="(item,index) in data" :key="index">
    <div class="top">
    <div class="span"></div>
    <div class="time">
      {{item.optTime}}
    </div>
    </div>
    <div class="buttom">
    <div class="name" v-if="item.optUserName?true:false">{{item.optUserName}}</div>
    <div class="type" v-if="item.statusName?true:false">{{item.statusName}}</div>
    <div class="company" v-if="item.optCompanyName?true:false">{{item.optCompanyName}}</div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "TimeAxis",
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
  }
}
</script>

<style scoped>
.warp{
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
  background-color: #F2F2F6;
}
.warp::after{
  position: absolute;
  top: 22px;
  left: 24px;
  content: '';
  width: 1px;
  z-index:1;
  bottom:20px;
  background-color: #4E83CB;
}
.box{

  display: flex;
  flex-direction: column;

}
.top{
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
}
.span{

  border-radius: 50%;

  z-index: 2;

  width: 9px;
  height: 9px;

  background-color: rgba(78, 131, 203, 100);
  text-align: center;
}
.time{
  display: flex;
  flex: 1;
  text-align: left;
  margin-left: 10px;


  line-height: 14px;
  color: rgba(82, 78, 78, 100);
  font-size: 12px;


}
.buttom{
  margin-top: 5px;
  margin-bottom: 8px;
  margin-left: 20px;
  /* display: flex; */
  flex-direction: row;
}
.name{
  padding-right: 10px;
  line-height: 17px;
  color: rgba(78, 131, 203, 100);
  font-size: 14px;
  text-align: left;
  /* min-width: 45px; */
  display: inline;
}
.type{
  padding-right: 10px;
  line-height: 17px;
  color: black;
  font-size: 14px;
  text-align: left;
  /* min-width: 30px; */
  display: inline;
}
.company{
  /* padding-right: 10px; */
  line-height: 17px;
  color: rgba(78, 131, 203, 100);
  font-size: 14px;
  text-align: left;
  display: inline;
}
</style>