<template>
<div class="list-row">
  <div class="aaa" v-if="line">
  <div class="list-row-line" ></div>
  </div>
  <div class="bbb" v-if="freshTime==''">

    <div class="list-row-left">
      <!-- <img :src="urlImg"/> -->
      <span class="iconfont iconTag" :class="[iconclass]"></span>
    </div>
    <div class="list-row-center">{{rowTittle}}</div>

    <div class="list-row-right" v-if="contentText!=''&&phoneText==''">{{contentText}}</div>
    <div class="list-row-right" v-if="contentText==''&&phoneText!=''">
      <div class="list-row-right-phone">
      <p>{{phoneText}}</p>
      <span class="iconfont icon-dianhua"></span>
      </div>
    </div>
    <div class="list-row-rights" v-if="contentText!=''&&phoneText!=''">
      <p class="list-row-rights-content">{{contentText}}</p>
      <div class="list-row-right-phone">
      <p>{{phoneText}}</p>
      <span class="iconfont icon-dianhua"></span>
      </div>
    </div>
    <div class="content-cos-row" v-if="freshTime!==''">
      <p class="content-cos-row-time" v-if="freshTime!==''">上报时间：{{freshTime}}</p>
    </div>
    <slot class="list-row-right" v-if="select">请选择</slot>
  </div>
  <div class="content-cos-row" v-if="freshTime!==''">
    <p class="content-cos-row-time" v-if="freshTime!==''">上报时间：{{freshTime}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: "ListRow",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    urlImg: {
      type: String,
      default: ""
    },
    rowTittle: {
      type: String,
      default: ""
    },
    phoneText: {
      type: String,
      default: ""
    },
    contentText: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    freshTime: {
      type: String,
      default: ""
    },
    iconclass:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped>
.list-row{
  background-color: #FFFFFF;

}
.aaa{
  display: flex;
  background-color: #FFFFFF;
}
.bbb{
  background-color: #FFFFFF;
  display: flex;
  flex: 1;
  justify-content: flex-start;
}
.list-row-line{
  margin-left: 45px;
  flex: 1;

  height: 1px;
  /*background-color: #EDEEEE;*/
  background-color: #EDEEEE;
}
.list-row-left{
  margin:18px 0 18px 15px;
}
.list-row-left img{
  width: 22px;
  height: 22px;
  background-color: rgba(31, 31, 31, 100);
 }
.list-row-center{
  margin: 18px 12px;
  line-height: 22px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: left;


}
.list-row-right{
  display: flex;
  flex: 1;
  justify-content: flex-end;

  margin: 18px 15px;
  line-height: 22px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: right;
  flex-shrink: 1;
  }
.list-row-rights{
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
 /*  width: 279px;*/
   flex-shrink: 1;
}
.list-row-rights-content{
  margin: 18px 0 6px 0;
  line-height: 22px;
  font-size: 14px;
  color: rgba(16, 16, 16, 100);
 }
.list-row-right-phone{
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: space-between;

}
.list-row-right-phone p{
  line-height: 22px;
  color: rgba(82, 78, 78, 100);
  font-size: 14px;
  text-align: left;
  margin-bottom: 17px;
}
.iconfont {

  height: 14px;
  width: 14px;
  margin: 0 3px 17px 0;
}
.content-cos-row-time{
  padding: 20px 12px;
  line-height: 20px;
  color: rgba(82, 78, 78, 100);
  font-size: 12px;
  text-align: left;

}
.iconTag{
     color: #fff;
    border-radius: 3px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    display: inline-block;
    text-align: center;
    margin:0;
}
.smallicon{
  font-size: 12px;
}
.smallicon::before{
  transform: scale(.7);
  display: inline-block;
}
</style>