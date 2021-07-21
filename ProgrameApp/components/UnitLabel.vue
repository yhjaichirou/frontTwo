<template>
<div class="unitbox flex flex-wrap">
                <div class="minw50 flex flex-align-cen item" :class="[item.class]" v-for="(item,index) in list" :key="index">
                  <span v-if="item.icon" class="iconfont " :class="!!item.icon?item.icon:''"></span>
                  <div>
                    <p class="unitlabel" v-if="item.label">{{item.label}}</p>
                    <p class="text">{{item.text}}</p>
                  </div>
                </div>

              </div>
</template>

<script>
export default {
    name:"UnitLabel",
    props:{
        list:{
            type:Array,
            default:function(){
                return[]
            }
        }
    },
    data() {
        return {

        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
}
</script>
<style lang='stylus' scoped>
.iconfont{
    font-size 10px
    margin-right:5px;
  }
  .f16{
    font-size 16px;
  }
 .minw50{
   min-width 50%;
 }
.unitlabel{
  color #A3A5A8;
  font-size 12px;
}
.text{
  color #1F1F1F;
  font-size 14px;
}
.item{
    margin:14px 0;
}
 .mt0{
    margin-top 0;
  }
	
.icon-quyu{
   border-radius 50%;
   padding: 3px;
}
</style>