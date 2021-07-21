<template>
        <div class="loadingDiv" styl="width:auto;height:auto;">
                <img  onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="" class="isloading" v-lazy="loadgImgFile" />
        </div>
</template>

<script>
    export default {
        name: "loadImg",
        props: {
            imgcode: {
                type: String,
                default: function() {
                    return '';
                }
            },
        },
        data() {
            return {
                errorImg: this.$errorImgUrl + "empty-image-error.png"
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
.loadingDiv {
    position: relative;
    width: 80px;
    height: 80px;
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
