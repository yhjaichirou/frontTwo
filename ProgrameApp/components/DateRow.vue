<template>
  <div class="date-background">
    <div class="date-line"
         v-if="line"></div>
    <div class="date-title"
         v-if="titleText!==''">
      <p>{{titleText}}</p>
    </div>
    <div class="date-content">
      <div class="date-left"
           v-if="leftTittle!==''&&leftContent!==''">
        <p class="date-left-tittle">{{leftTittle}}</p>
        <p class="date-left-content">{{leftContent}}</p>
      </div>
      <div class="date-left"
           v-if="rightTittle!==''&&rightContent!==''">
        <p class="date-right-tittle">{{rightTittle}}</p>
        <p class="date-right-content">{{rightContent}}</p>
      </div>
    </div>
    <div class="date-bottom"
         v-if="bottom"></div>
  </div>

</template>

<script>
export default {
  name: "DateRow",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default:
        () => {
          return {}
        }
    },
    leftTittle: {
      type: String,
      default: ""
    },
    leftContent: {
      type: String,
      default: ""
    },
    rightTittle: {
      type: String,
      default: ""
    },
    rightContent: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: ""
    },
    bottom: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style scoped>
.date-background {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #3a75c5;
  padding: 0 15px;
}
.date-line {
  display: flex;
  margin: 0 5px;
  height: 1px;
  background-color: #4e83cb;
}

.date-title {
  margin: 13px 0 0 0;
  display: flex;
  flex: 1;
}
.date-title p {
  margin: 7px;
  line-height: 24px;
  color: rgba(255, 255, 255, 100);
  font-size: 20px;
  text-align: left;
}
.date-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 7px;
}
.date-left {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.date-left-tittle {
  line-height: 20px;
  color: rgba(186, 207, 235, 100);
  font-size: 12px;
  text-align: left;
}
.date-left-content {
  line-height: 24px;
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: left;
}

.date-right-tittle {
  line-height: 20px;
  color: rgba(186, 207, 235, 100);
  font-size: 12px;
  text-align: right;
}
.date-right-content {
  line-height: 24px;
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: right;
}
.date-bottom {
  display: flex;
  flex: 1;
  background-color: #3a75c5;
  padding: 6px;
}
</style>