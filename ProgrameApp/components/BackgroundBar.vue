<template>
<div class="background-bar" :class="[wide?'h12':'h6']">

</div>
</template>

<script>
export default {
  name: "BackgroundBar",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    wide: {
      type: Boolean,
      default: false
    },
    urlImg: {
      type: String,
      default: ""
    },
  }
}
</script>

<style scoped>
.background-bar{
  display: flex;
  width: 100%;
 /* background-color: #F2F2F6;*/
  background-color: #F2F2F2;

}
.h12{
  height: 12px;
}
.h6{
  height: 6px;
}
</style>