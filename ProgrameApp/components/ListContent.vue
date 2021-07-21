<template>
<div class="content">

  <div class="aaa" v-if="line">
    <div class="list-row-line" >
    </div>
  </div>
  <div class="nav-tittle" v-if="tittle!==''">
    <div class="nav-tittle-tittle" >{{tittle}}</div>
  </div>
  <div class="content-cos">
  <div class="content-cos-row" >
    <p class="content-cos-row-tittle" :class="blod?'blod':''">{{leftTitttle?leftTitttle:'--'}}</p>
    <p class="content-cos-row-content" :class="[!!greenFontLeft?'green':'black']">{{leftContent?leftContent:"--"}}</p>

  </div>
  <div class="content-cos-row" >
    <p class="content-cos-row-tittle" :class="blod?'blod':''">{{rightTitttle?rightTitttle:'--'}}</p>
    <p class="content-cos-row-content" :class="[!!greenFontRight?'green':'black']">{{rightContent?rightContent:'--'}}</p>
  </div>
    <div class="content-cos-row" v-if="Object.keys(path).length>0&&rightTitttle!==''&&rightHref!==''">
      <p class="content-cos-row-tittle" :class="blod?'blod':''">{{rightTitttle}}</p>
      <router-link class="content-cos-row-content" style="color: #195DDD" :to="path" :href="rightHref">{{rightHref}}
      <span class="iconfont icon-dizhi" style="color: #195DDD">{{timeText}}</span>
      </router-link>
    </div>
  <div class="content-cos-row" v-if="freshTime!==''">
    <p class="content-cos-row-time" v-if="freshTime!==''">上传时间：{{freshTime}}</p>
  </div>


</div>
</div>
</template>

<script>
export default {
  name: "ListContent",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    leftTitttle: {
      type: String,
      default: ""
    },
    leftContent: {
      type:  [String,Number],
      default: ""
    },
    rightTitttle: {
      type: String,
      default: ""
    },
    rightContent: {
      type: [String,Number],
      default: ""
    },
    rightHref: {
      type: String,
      default: ""
    },
    freshTime: {
      type: String,
      default: ""
    },
    greenFontRight: {
      type: Boolean,
      default: false
    },
    greenFontLeft: {
      type: Boolean,
      default: false
    },
    width: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    timeText:{
      type:String,
      default:''
    },
    tittle: {
      type: String,
      default: ""
    },
    path:{
      type:Object,
      default:function(){
        return {}
      }
    },
    blod:{
      type:Boolean,
      default:false
    }
  },
}
</script>

<style scoped>
.content{
  background-color: #FFFFFF ;
  display: flex;
  flex-direction: column;
}
.nav-tittle{
  display: flex;
    flex: 1;
  padding: 20px 15px 0 15px;
  background-color: #FFFFFF;
}
.nav-tittle-tittle{

  font-weight: 700;
  line-height: 20px;
  color: rgba(31, 31, 31, 100);
  font-size: 16px;
  text-align: left;

}
.content-cos{
  background-color: #FFFFFF ;
  padding: 17px 15px 13px 15px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.aaa{
  display: flex;

  background-color: #FFFFFF;
}
.list-row-line{
  margin-left: 15px;
  flex: 1;
  height: 1px;
/*  background-color: #EDEEEE;*/
  background-color: #EDEEEE;
}
.content-cos-row{
  background-color: #FFFFFF ;
  flex: 1;
}


.content-cos-row-tittle{
  height: 18px;
  margin:3px 0;
  line-height: 20px;
  color: rgba(163, 165, 168, 100);
  font-size: 12px;
  text-align: left;

}
.content-cos-row-tittle.blod{
  color: rgba(51, 51, 51, 100);
font-size: 14px;
font-weight: 600;
margin-bottom: 10px;
}
.content-cos-row-content{
  line-height: 22px;
  font-size: 14px;
  text-align: left;
 }
.content-cos-row-time{
  line-height: 20px;
  color: rgba(82, 78, 78, 100);
  font-size: 12px;
  text-align: left;

}
.black{
  color: rgba(16, 16, 16, 100);
}
.green{
  color: green;
}
</style>