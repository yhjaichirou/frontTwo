<template>
  <div class='container'>
    <van-search v-if="isHeader"
                class="flex1 headSearch"
                left-icon=""
                right-icon="search"
                v-model="searchKey"
                placeholder="请输入航标名称" />
    <div id="map"
         style="width: 100%;height: 100%">

    </div>
    <div class="pop"
         v-if="list.length>0||detailSlot">
      <slot name="detail"></slot>
      <p v-for="(item,index) in list"
         :key="index">{{item}}</p>
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>
// addPath
import { addSeaMapLayer, addPath, isCustomShipLayerVisible, addCustomShips } from "@/js/map.js"
export default {
  name: "Map",
  props: {
    config: {
      type: Object,
      default: function () {
        return window.mapConfig
      }
    },
    lat: {
      default: 31.22
    },
    lng: {
      default: 121.57
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return ['xxx', 'xxx', 'xxx', 'xxx']
      }
    }
  },
  watch: {
    config: function (nval) {
      this.config = Object.assign({}, window.mapConfig, nval)
    }
  },
  methods: {
    isslot (name) {
      return this.$slots[name] ? true : false;
    },
    addPath (path) {
      addPath(path);
    }
  },
  data () {
    return {
      detailSlot: false
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    if (this.$slots.detail) {
      this.detailSlot = true;
    }
    let map = window.map = new window.MapView(document.getElementById("map"), window.mapConfig);
    // console.log(map)
    // 设置地图级别和中心点
    map.setCenter(this.lng, this.lat);
    map.setMapLevel(10);
    // console.log(addSeaMapLayer)
    addSeaMapLayer(map);
    // addPath()
    addCustomShips()
    // console.log(isCustomShipLayerVisible,addPath)
    isCustomShipLayerVisible()
    // addSateMapLayer()

  }
}
</script>
<style lang='stylus' scoped>
.headSearch {
  position: fixed;
  top: 16px;
  left: 10px;
  right: 10px;
  z-index: 100;
  padding: 0;
  border-radius: 3px;
  background-color: rgba(87, 138, 206, 0.802);
  color: rgba(229, 229, 229, 100);
  font-size: 14px;
}

.pop {
  position: fixed;
  bottom: 50px;
  left: 40px;
  width: 100px;
  height: 200px;
  background-color: white;
  border: 1px solid #999;
  padding: 10px;
}

>>> {
  button {
    margin-top: 10px;
  }

  .van-search__content {
    background-color: transparent;
  }
}
</style>