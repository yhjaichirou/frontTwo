<template>
  <div class="menu">
    <div class="aaa"
         v-if="line">
      <div class="list-row-line">
      </div>
    </div>
    <div class="menu-tittle"
         v-if="tittleText!==''">{{tittleText}}</div>
    <div class="menu-row">
      <div class="menu-row-cos"
       v-for="(item,index) in list"
       :key="index"
           @click.stop="clickgo(item)">
        <img :src="item.img"
             v-if="!!item.img">
        <p>{{item.text}}</p>
      </div>
      <!-- <div class="menu-row-cos"
           @click.stop="go({path:secondLink})">
        <img :src="secondUrlImg"
             v-if="secondUrlImg!==''">
        <p>{{secondnameText}}</p>
      </div>
      <div class="menu-row-cos"
           @click.stop="go({path:thirdLink})">
        <img :src="thirdUrlImg"
             v-if="thirdUrlImg!==''">
        <p>{{thirdnameText}}</p>
      </div>
      <div class="menu-row-cos"
           @click.stop="go({path:fouthLink})">
        <img :src="fouthUrlImg"
             v-if="fouthUrlImg!==''">
        <p>{{fouthnameText}}</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    list:{
      type:Array,
      default:function(){
        return []
      }
    },
    tittleText:{
      type:String,
      default:''
    },
    line: {
      type: Boolean,
      default: false
    },
  },
  methods:{
    clickgo(e){
      this.$emit("myClick",e)
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: #ffffff;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.menu-tittle {
  display: flex;
  /* flex: ; */
  padding: 22px 10px 24px 10px;
  line-height: 17px;
  color: black;
  font-size: 14px;
  text-align: left;
}
.menu-row {
  padding-bottom: 24px;
  display: flex;
  flex: 1;
  flex-direction: row;
}
.menu-row-cos {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 60px;
  align-items: center;
}
.menu-row-cos img {
  width: 30px;
  height: 30px;
}
.menu-row-cos p {
  width: 103px;
  line-height: 22px;
  color: rgba(82, 78, 78, 100);
  font-size: 14px;
  text-align: center;
}
.aaa {
  display: flex;
  background-color: #ffffff;
}
.list-row-line {
  margin: 0 10px;
  flex: 1;
  height: 1px;
  background-color: #edeeee;
}
</style>