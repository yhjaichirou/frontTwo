<template>
    <div class="detail-background">
        <div class="nav-left" v-if="navLeft&&UrlImg!==''">
            <div class="loadingDiv">
                <img :src="UrlImg" v-lazy="UrlImg" class="isloading" onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="">
            </div>
        </div>
        <div class="nav-left" v-if="navLeft&&imgcode!=''">
            <div class="loadingDiv">
                <img :src="loadgImgFile" v-lazy="loadgImgFile" class="isloading" onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="">
            </div>
        </div>
        <div class="nav-content">
            <p class="nav-content-title">{{titleText}}</p>
            <P class="nav-content-time" v-if="timeText!=''">{{timeText}}</P>
            <p class="nav-content-content" v-if="contentText!=''">{{contentText}}</p>
            <div class="nav-content-buttons">
                <button class="nav-content-button" v-for="(item,index) in lableText" :key="index">{{item}}</button>
            </div>

        </div>
        <div class="nav-statue" v-if="statueText!=''">
            <div class="nav-statue-statue">{{statueText}}</div>
        </div>
        <div class="nav-right" v-if="navRight&&UrlImg!=''">
            <div class="loadingDiv" style="width: 45px;height: 45px;">
                <img :src="UrlImg" v-lazy="UrlImg" class="isloading" onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="">
            </div>
        </div>
        <div class="nav-right" v-if="navRight&&imgcode!=''">
            <div class="loadingDiv">
                <img :src="loadgImgFile" v-lazy="loadgImgFile" class="isloading" onerror="this.src='/img/error/empty-image-error.png'" align="center" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailNavbar",
        props: {
            data: {
                type: [Array, Object, String, Boolean, Number],
                default: () => {
                    return {}
                }
            },
            navLeft: {
                type: Boolean,
                default: false
            },
            UrlImg: {
                type: String,
                default: ""
            },
            titleStyle: {
                type: String,
                default: "p31"
            },

            lableText: {
                type: Array,
                default: function() {
                    return []
                }
            },

            titleText: {
                type: String,
                default: ""
            },
            contentText: {
                type: String,
                default: ""
            },

            statueText: {
                type: String,
                default: ""
            },
            timeText: {
                type: String,
                default: ""
            },
            navRight: {
                type: Boolean,
                default: false
            },

            imgcode: {
                type: String,
                default: function() {
                    return '';
                }
            },

        },
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .loadingDiv {
        width: 70px;
        height: 70px;
    }

    .detail-background {
        background-color: #3A75C5;
        display: flex;
        flex: 1;
        border: none;
        padding: 20px 15px;
    }

    .nav-left {
        /* background-color: #101010; */
        background-color: #88ABDB;
        border-radius: 3px;
        margin-right: 10px;
        width: 70px;
        height: 70px;
    }

    .nav-left img {
        width: 70px;
        height: 70px;
    }

    .nav-content {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .nav-content-title {
        font-weight: 600;
        line-height: 24px;
        color: rgba(255, 255, 255, 100);
        font-size: 18px;
        text-align: left;
    }

    .nav-content-time {

        margin-bottom: 4px;
        line-height: 14px;
        color: #BACFEB;
        font-size: 12px;
        text-align: left;

    }

    .nav-content-buttons {
        display: flex;
        justify-content: flex-start;
    }

    .nav-content-button {
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

    .nav-content-content {
        display: flex;
        align-items: flex-end;
        line-height: 20px;
        color: rgba(206, 220, 240, 100);
        font-size: 12px;
        text-align: left;
    }

    .nav-statue {
        margin-right: 3px;
        display: flex;

        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;


    }

    .nav-statue-statue {
        padding: 0 10px;
        line-height: 24px;
        border-radius: 3px;
        color: #CEDCF0;
        font-size: 12px;
        text-align: center;
        border: 1px solid #CEDCF0;
    }


    .nav-right {
        width: 45px;
        height: 45px;
        border-radius: 5px;
        border: 2px solid rgba(255, 255, 255, 100);

    }

    .nav-right img {
        width: 45px;
        height: 45px;
    }

    .loadingDiv {
        position: relative;
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

    @media(max-width:359px) {
        .nav-left {
            background-color: #88ABDB;
            border-radius: 3px;
            margin-right: 10px;
            width: 45px;
            height: 45px;
        }
        .loadingDiv {
            width: 45px;
            height: 45px;
        }
        .nav-left img {
            width: 45px;
            height: 45px;
        }
    }
</style>
