<template>
<div class='DetailSwipe flex flex-jus-cen flex-align-cen'>
    <span v-for="(item,index) in size" :key="index" :class="index==active?'active':''" ></span>
 </div>
</template>

<script>
export default {
    name:"DetailSwipe",
    props:{
        active:{
            type:Number,
            default:0
        },
        size:{
            type: Number,
            default:2
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
.DetailSwipe{
    height 50px
    line-height 50px
    text-align center;
    background-color #eee;
    span{
        width 10px
        height 6px;
        background-color #9CA5A5A5;
        display inline-block
        margin:0 2.5px
        border-radius 10px
        transition all 0.5s ease 0s
    }
    .active{
        background-color rgba(58, 117, 197, 100);
        width 20px
        
    }
}

</style>