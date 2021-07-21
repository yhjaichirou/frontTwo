<template>
    <div class="img" :style="isNoHiden?'display:none;':''">
        <p class="img-tittle" v-if="tittleText!==''">{{tittleText}}</p>
        <div class="img-img" :style="urlImg==undefined || urlImg==''?'justify-content: center;align-items: center;':''">
            
            <div v-if="urlImg" class="loadingDiv">
                <img :src="urlImg"  v-lazy="urlImg" onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="" class="isloading" >
            </div>
        </div>
        <div class="img-img" v-if="urlImgList!==''">
            <van-swipe class="w100" :autoplay="3000">
                <van-swipe-item v-for="(image, index) in urlImgList" :key="index">
                    <div class="loadingDiv">
                        <img class="w100 h100 isloading"
                        :src="image.fileUrl" alt="" v-lazy="image.fileUrl"
                        onerror="this.src='/img/error/empty-image-error.png'" align="center">
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="img-img" v-if="imgcode!==''">
            <van-swipe class="w100" :autoplay="3000">
                <van-swipe-item v-for="(image, index) in imgcode.split(',')" :key="index">
                    <loadImg class="w100 h100" :imgcode="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <p class="img-content" v-if="contentText!==''">{{contentText}}</p>
    </div>
</template>

<script>
    export default {
        name: "ImgNavbar",
        props: {
            data: {
                type: [Array, Object, String, Boolean, Number],
                default: () => {
                    return {}
                }
            },
			isNoHiden: {
                type: Boolean,
                default: false
            },
            urlImg: {
                type: String,
                default: ""
            },
            urlImgList: {
                type: Array,
                default: function() {
                    return []
                }
            },
            contentText: {
                type: String,
                default: ""
            },
            tittleText: {
                type: String,
                default: ""
            },
            imgcode: {
                type: String,
                default: function() {
                    return '';
                }
            },
        },

    }
</script>

<style scoped>
    .img {
        background-color: #FFFFFF;

    }

    .img-tittle {
        padding: 22px 15px 0 15px;
        line-height: 17px;
        color: rgba(163, 165, 168, 100);
        font-size: 14px;
        text-align: left;

    }

    .img-img {
        display: flex;
        padding: 10px 10px 12px 10px;
        background-color: #FFFFFF;
    }

    .img-img img {
        background-color: black;
        flex: 1;
        height: 190px;
        border-radius: 5px;
    }

    .img-content {
        display: flex;
        padding: 0 15px 21px 15px;
        background-color: #FFFFFF;
        color: rgba(31, 31, 31, 100);
        font-size: 14px;
        text-align: left;

    }
    
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
