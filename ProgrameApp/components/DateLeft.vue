<template>
  <div class="data">
    <div class="date-left-top"
         v-if="topBackground"></div>
    <div class="date-left"
         :class="[!!center?'center':'left']">

      <div class="date-left-item"
           v-if="firstTittle!==''&&firstContent!==''">
        <div>
          <p class="date-left-item-tittle">{{firstTittle}}</p>
          <p class="date-left-item-content"
             :class="[bold?'f16':'f14']">{{firstContent}}</p>
        </div>
      </div>
      <div class="date-left-item"
           v-if="secondTittle!==''&&secondContent!==''">
        <div class="date-left-line"></div>
        <div>
          <p class="date-left-item-tittle">{{secondTittle}}</p>
          <div class="date-left-item-content">{{secondContent}}
            <div v-if="herfName!==''"
                 @click.stop="go({name:herfName})">
              <span class="iconfont icon-dizhi1"
                    v-if="icon"
                    style="color:#fff;margin-left:6px"></span>
            </div>

          </div>
        </div>
      </div>
      <div class="date-left-item"
           v-if="thirdTittle!==''&&thirdContent!==''">
        <div class="date-left-line"></div>
        <div>
          <p class="date-left-item-tittle">{{thirdTittle}}</p>
          <p class="date-left-item-content">{{thirdContent}}<slot></slot>
          </p>

        </div>
      </div>

    </div>
    <div class="date-left-bottom"
         v-if="bottomBackground"></div>
  </div>
</template>

<script>
export default {
  name: "DateLeft",
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },
    herfName: {
      type: String,
      default: ""
    },

    /*  query: {
        type: Object,
        default: function (){
          return{id:'',
          herfName:''}
        }
      },*/
    topBackground: {
      type: Boolean,
      default: true,
    },
    bottomBackground: {
      type: Boolean,
      default: true,
    },
    firstTittle: {
      type: String,
      default: ""
    },
    firstContent: {
      type: String,
      default: ""
    },
    secondTittle: {
      type: String,
      default: ""
    },
    secondContent: {
      type: String,
      default: ""
    },
    thirdTittle: {
      type: String,
      default: ""
    },
    thirdContent: {
      type: String,
      default: ""
    },
    center: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    /*linkTO(query){
      this.$router.push({name:"query.herfName",
        query: {
          //  传参
          'id': this.id
        },
        params:{
          item:this.item
        }
      })
    },*/
  },

}
</script>

<style scoped>
.data {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #3a75c5;
}
.date-left {
  box-sizing: border-box;
  display: flex;
  background-color: #3a75c5;
  border: none;
}
.left {
  padding: 0 15px;
}
.center {
  padding: 0 0 0 95px;
}
.date-left-bottom {
  display: flex;
  flex: 1;
  background-color: #3a75c5;
  padding: 10px 0;
}
.date-left-top {
  display: flex;
  flex: 1;
  background-color: #3a75c5;
  padding: 10px 0;
}
.date-left-item {
  display: flex;
}

>>> {
  .iconfont {
    font-size: 16px;
    color: #ffffff;
    margin: 10px;
  }
}
.date-left-line {
  width: 1px;
  height: 15px;
  background-color: #578ace;
  margin: 15px 10px 14px 0;
}
.date-left-item-tittle {
  line-height: 20px;
  color: rgba(186, 207, 235, 100);
  font-size: 12px;
  text-align: left;
  margin-right: 30px;
}
.date-left-item-content {
  display: flex;
  flex-direction: row;
  line-height: 24px;
  color: rgba(255, 255, 255, 100);

  text-align: left;
  margin-right: 30px;
}
.f14 {
  font-size: 14px;
}
.f16 {
  font-size: 16px;
  font-weight: 600;
}
@media (max-width: 359px) {
  .center {
    padding: 0 15px;
  }
}
</style>