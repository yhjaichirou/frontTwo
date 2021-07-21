<template>
  <div :class="['box',type=='card'?'card':'']"
       @click="action">
    <div :class="[!!underLine?'underLine':'',labelText.length>0?'moreTitle':'']">
      <div v-if="isNeedPic">
        <!-- <lazy-component name=""> -->
        <img class="img"
             onerror="this.src='/img/error/empty-image-error.png'"
             align="center"
             alt=""
             v-lazy="imgSrc||loadgImgFile" />
        <!-- </lazy-component>   -->
      </div>
      <div class="title flex flex-align-cen flex-jus-between"
           :class="!!imgSrc?'imgTitle':''">
        <span v-if="!!icon"
              class="iconfont icon"
              :class="[!!icon?icon:'']"></span>
        <div class="text"
             :class="[titleStyle=='normal'?'normal':'small']">{{titleText}}</div>
        <van-tag :class="[!!statusClass?statusClass:'blue']"
                 v-if="statusStyle=='tag'&&!!statusText"
                 plain
                 type="primary">{{statusText}}</van-tag>
        <span :class="[!!statusClass?statusClass:'','f12']"
              v-if="statusStyle=='text'&&!!statusText"
              plain
              type="primary">{{statusText}}</span>
        <span v-if="!!more"
              class="iconfont icon-you"
              :class="isInspect?'isInspect':''"></span>
      </div>
      <template v-if="labelStyle=='tag'">
        <div class="labeltags"
             v-if="labelText.length>0">
          <van-tag class="label"
                   :class="[labelClass]"
                   v-for="(item,index) in labelText"
                   :key="index"
                   type="primary"
                   size="medium">{{item}}</van-tag>
        </div>
      </template>
      <template v-if="labelStyle=='text'">
        <p class="labelText"
           :class="[labelClass,imgSrc?'imgLabel':'']"
           v-for="(item,index) in labelText"
           :key="index">{{item}}</p>
      </template>

    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "ListItem",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    isInspect: {
      type: Boolean,
      default: false
    },

    isNeedPic: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "card"
    },
    icon: {
      type: String,
      default: ""
    },
    underLine: {
      type: Boolean,
      default: true
    },
    statusClass: {
      type: String,
      default: ""
    }, // 对应状态的class名字  样式在组件中统一定义
    statusText: {
      type: String,
      default: ""
    },
    titleText: {
      type: String,
      default: ""
    },
    statusStyle: {
      type: String,
      default: "tag" //标记风格 tag/text
    },
    labelText: {
      type: Array,
      default: () => {
        return []
      }
    }, // 标签
    labelClass: {
      type: String,
      default: ""
    },
    labelStyle: {
      type: String,
      default: "tag"
    },
    titleStyle: {
      type: String,
      default: "normal" //title字体风格 small/normal
    },
    imgcode: {
      type: String,
      default: function () {
        return null;
      }
    },
    imgSrc: {
      type: String,
      default: ''
    }

  },
  data () {
    return {

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // watch:{
  //     imgPromise:function(value){
  //         if(value){
  //               value.then(res=>{
  //             this.imgSrc = res;
  //         })
  //         }
  //     }
  // },
  methods: {
    action () {
      this.$emit("itemClick", this.data)
    },

  }
}
</script>
<style lang='stylus' scoped>
.box {
  background-color: white;
  padding: 0 10px;
}

.img {
  width: 62px;
  height: 62px;
  margin-top: 7px;
  margin-right: 8px;
  float: left;
  border-radius: 5px;
}

.imgTitle {
  margin-bottom: 20px;
}

.card {
  margin: 10px;
  border-radius: 5px;
}

.underLine {
  border-bottom: 1px solid rgba(237, 238, 238, 100);
}

.title {
  height: 46px;
  line-height: 22px;
  // padding:0 5px
  color: rgba(31, 31, 31, 100);
  font-size: 16px;

  .text {
    flex: 1;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .normal {
    line-height: 18px;
    font-size: 16px;
    color: #101010;
  }

  .small {
    height: 22px;
    font-size: 12px;
    color: rgba(163, 165, 168, 100);
  }

  .icon {
    margin-right: 15px;
  }

  .icon-you {
    font-size: 20px;
  }
}

.list {
  line-height: 22px;
}

.moreTitle {
  // padding-top:16px;
  .title {
    height: auto;
    line-height: 24px;
  }

  .iconfont {
    font-size: 14px;
  }
}

.labeltags {
  height: 40px;
}

.label {
  margin-top: 6px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 2.5px 10px;
  line-height: 17px;
  border-radius: 3px;
  background-color: rgba(92, 141, 232, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 12px;
  text-align: center;
  font-family: Arial;
  border: 1px solid rgba(255, 255, 255, 100);
}

.labelText {
  color: #524E4E;
  font-size: 14px;
  margin-bottom: 12px;
}

.imgLabel {
  padding-left: 70px;
}

.lightlabel {
  color: rgba(163, 165, 168, 100);
  font-size: 12px;
}

.iconfont {
  color: rgba(163, 165, 168, 100) !important;
  font-size: 28px;
  margin-right: 5px;
}

.body {
}

.body >div {
  width: 100%;
}

.f12 {
  color: #38B03F;
}

.blue {
  margin-right: 5px;
  padding: 2.5px 10px;
  line-height: 17px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(25, 93, 221, 100);
  font-size: 12px;
  text-align: center;
}

.color-gray {
  color: #ccc;
}

.blue {
  color: #3A75C5;
}

.isInspect {
  position: relative;
  top: 10px;
}
</style>
