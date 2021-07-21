<template>
<div class="card-background">
  <div class="card-content">
    <div class="card-content-span">
      <p class="card-content-span-name">{{nameText}}</p>
      <p class="card-content-span-post">{{postText}}</p>
    </div>
    <p class="card-content-company">{{companyText}}</p>
    <div class="card-content-buttons">
      <button class="card-content-button" v-for="(item,index) in lableText" :key="index">{{item}}</button>
    </div>
  </div>
  <div class="card-span">
     <p class="card-span-surname">{{surname}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: "CardNavbar",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },

    nameText: {
      type: String,
      default: ""
    },
    postText: {
      type: String,
      default: ""
    },
    lableText: {
      type: Array,
      default: function () {
        return []
      }
    },

    companyText: {
      type: String,
      default: ""
    },
    surname: {
      type: String,
      default: ""
    },
  }
}
</script>

<style scoped>
.card-background{
  background-color: #3A75C5;
  display: flex;
  padding: 21px 18px 40px 20px;
  flex: 1;
  justify-content: space-between;
}
.card-content{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.card-content-span{
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
}
.card-content-span-name{
  line-height: 32px;
  color: rgba(255, 255, 255, 100);
  font-size: 28px;
  text-align: left;

}
.card-content-span-post{
  margin-left: 10px;
  line-height: 17px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: left;

}
.card-content-company{
  margin-top: 8px;
  margin-bottom: 13px;
  line-height: 17px;
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: left;

}

.card-content-buttons{
  display: flex;
  justify-content: flex-start;
}
.card-content-button{
  margin-top: 8px;
  margin-right: 10px;
  padding: 0 10px;
  line-height: 24px;
  border-radius: 3px;
  background-color: rgba(151, 182, 240, 100);
  color: rgba(1, 82, 147, 100);
  font-size: 12px;
  text-align: center;
  border: none;
}
.card-span{

  width: 65px;
  height: 65px;
  line-height: 65px;
  border-radius: 7px;
  background-color: rgba(92, 141, 232, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 36px;
  text-align: center;

}
.card-span-surname{}
</style>