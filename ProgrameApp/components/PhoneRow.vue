<template>
  <div class="phone-row">
    <div class="phone-row-cos">
      <div class="phone-row-cos-left">
        <p class="phone-row-cos-left-tittle">{{tittleText}}</p>
        <p class="phone-row-cos-left-content">{{contentText}}</p>
      </div>
      <div class="phone-row-cos-right">
        <!-- <router-link class="phone-row-cos-right-router-link" :to="{path:'herfUrl'}" v-if="herfUrl!==''"> -->
        <span class="iconfont icon-shouji01"
              v-if="herfUrl!==''"></span>
        <!-- </router-link> -->

      </div>
    </div>
    <div class="aaa"
         v-if="line">
      <div class="list-row-line">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneRow",
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
    contentText: {
      type: String,
      default: ""
    },
    herfUrl: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
.phone-row {
  display: flex;
  flex-direction: column;
  /*padding:13px 0 5px 0;*/
  background-color: #ffffff;
}
.phone-row-cos {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: 12px 18px 11px 20px;
  background-color: #ffffff;
}
.phone-row-cos-left {
  display: flex;
  flex-direction: column;
}
.phone-row-cos-left-tittle {
  line-height: 17px;
  color: rgba(163, 165, 168, 100);
  font-size: 14px;
  text-align: left;
}
.phone-row-cos-left-content {
  line-height: 17px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: left;
}
.phone-row-cos-right {
  display: flex;
}
.phone-row-cos-right-router-link {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.iconfont {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: #3a75c5;
}
.aaa {
  display: flex;
  flex: 1;
  background-color: #ffffff;
}
.list-row-line {
  margin: 0 15px;
  display: flex;
  flex: 1;
  height: 1px;
  background-color: #edeeee;
}
</style>