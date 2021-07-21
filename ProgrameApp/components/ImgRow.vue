<template>
  <div class="img">
    <div class="img-tittle"
         v-if="tittleText!==''">{{tittleText}}</div>
    <div class="img-picture">
        <div v-if="lableText==undefined ||lableText==''||lableText.length==0 " style="margin:0 auto;">
            <van-empty description="暂无上传"></van-empty>
        </div>
        <div v-else class="loadingDiv" :style="isCenter?'margin:0 auto;':'margin:0;'">
            <img :src="iteam.fileUrl" :class="isMore?'':'isloading'"
         v-for="(iteam,index) in lableText"
         :key="index" v-lazy="iteam.fileUrl" align="center" alt=""
         onerror="this.src='/img/error/empty-image-error.png'">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgRow",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    tittleText: {
      type: String,
      default: ""
    },
    lableText: {
      type: Array,
      default: function () {
        return []
      }
    },
    isCenter:{
        type: Boolean,
        default: function () {
          return true
        }
    },
    isMore:{
        type: Boolean,
        default: function () {
          return true
        }
    }

  }
}
</script>

<style scoped>
.img {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}
.img-tittle {
  display: flex;
  flex: 1;
  padding: 24px 15px 0 15px;
  line-height: 17px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: left;
}
.img-picture {
  display: flex;
  flex: 1;
  padding: 9px;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;
}
.img-picture img {
  margin: 6px;
  width: 106px;
  height: 106px;
  border-radius: 5px;
  background-color: transparent;
  /*  background-color: rgba(255, 255, 255, 100);*/
}

.loadingDiv {
    position: relative;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
}
.isloading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    background-color: transparent !important;
}
</style>