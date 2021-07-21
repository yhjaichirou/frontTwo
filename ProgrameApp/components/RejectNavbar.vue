<template>
<div class="reject">
  <div class="reject-tittle"> {{tittleText}}</div>
  <div class="reject-statue" v-if="!!statueText">
    <div class="reject-statue-name">状态</div>
    <div class="reject-statue-statue">{{statueText}}</div>
  </div>

</div>
</template>

<script>
export default {
  name: "Reject",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    tittleText: {
      type: String,
      default: ''
    },
    statueText: {
      type: String,
      default: ''
    },
  },
  data(){
    return {

      date: '',
      show: false,
    }
  },
}
</script>

<style scoped>
.reject{
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 30px 20px 0 20px;
  background-color: #FFFFFF;
}
.reject-tittle{
  display: flex;
  line-height: 21px;
  color: rgba(16, 16, 16, 100);
  font-size: 18px;
  text-align: left;
}
.reject-statue{
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
}
.reject-statue-name{
  line-height: 58px;
  color: rgba(82, 78, 78, 100);
  font-size: 14px;
  text-align: left;

}
.reject-statue-statue{
  line-height: 58px;
  font-size: 14px;
  text-align: left;
  color: rgba(13, 207, 83, 100);
}

</style>