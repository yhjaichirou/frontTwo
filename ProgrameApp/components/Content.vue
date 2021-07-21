<template>
  <div>
    <div class="content">

      <div class="content-card"
           v-if="cardName!==''">
        <img :src="urlImg" />
        <div class="content-card-content">
          <p class="content-card-name">{{cardName}}</p>
          <p class="content-card-p">记录人</p>
        </div>
        <span>{{cardStaue}}</span>
      </div>
      <p class="content-tittle"
         v-if="tittleText!==''">{{tittleText}}</p>
      <p class="content-content"
         v-if="contentText!==''">{{contentText}}</p>
      <div class="content-time"
           v-if="timeText!==''">
        <span class="iconfont icon-shijian">{{timeText}}</span>
        <button v-if="buttonStatue!==''"
                @click="btnClick()">{{buttonStatue}}</button>
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
  name: "Conent",
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
    timeText: {
      type: String,
      default: ""
    },
    cardStaue: {
      type: String,
      default: ""
    },
    cardName: {
      type: String,
      default: ""
    },
    urlImg: {
      type: String,
      default: ""
    },
    buttonStatue: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    btnClick () {
      // this.$emit('btnClick', index)
    }
  }
}
</script>

<style scoped>
.content {
  background-color: #ffffff;
  padding-bottom: 25px;
}
.aaa {
  display: flex;
  background-color: #ffffff;
}
.list-row-line {
  margin: 0 15px;
  display: flex;
  flex: 1;
  height: 1px;
  background-color: #edeeee;
}
.content-card {
  display: flex;
  padding: 21px 15px 16px 15px;
}
.content-card img {
  width: 34px;
  height: 34px;
  border-radius: 3px;
  background-color: rgba(92, 141, 232, 100);
  text-align: center;
}
.content-card-content {
  padding: 0 15px;
}
.content-card-name {
  width: 80px;
  line-height: 17px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: left;
}
.content-card-p {
  width: 80px;
  line-height: 12px;
  color: rgba(163, 165, 168, 100);
  font-size: 10px;
  text-align: left;
}
.content-card span {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  line-height: 14px;
  color: rgba(193, 27, 27, 100);
  font-size: 12px;
  text-align: left;
}
.content-tittle {
  display: flex;
  padding: 16px 15px 12px 15px;
  line-height: 24px;
  color: rgba(163, 165, 168, 100);
  font-size: 14px;
  text-align: left;
}

.content-content {
  display: flex;
  padding: 0 45px 0 15px;
  line-height: 24px;
  color: rgba(31, 31, 31, 100);
  font-size: 14px;
  text-align: left;
}
.content-time {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  line-height: 14px;
  color: rgba(163, 165, 168, 100);
  font-size: 12px;
  text-align: left;
}
.content-time button {
  display: flex;

  padding: 2.5px 10px;
  line-height: 17px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(58, 117, 197, 100);
  font-size: 12px;
  text-align: center;
  border: 1px solid rgba(58, 117, 197, 100);
}
.iconfont {
}
</style>