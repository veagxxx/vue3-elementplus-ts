<template>
  <div class="maps">
    <div class="map-header">
      <!-- 地图类型选择 -->
      <div class="map-type">
        <span>地图类型：</span>
        <el-select v-model="mapType" placeholder="Select" @change="mapTypeChange">
          <el-option
            v-for="item in mapTypes"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 城市选择 -->
      <div v-show="mapType == '1'" class="city-select">
        <span>选择城市：</span>
        <el-select v-model="city" placeholder="Select" @change="cityChange">
          <el-option
            v-for="item in citys"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 导航方式 -->
      <div v-show="mapType == '1'" class="route-plan">
        <el-select v-model="routeType" placeholder="Select">
          <el-option
            v-for="item in routeTypes"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span>&nbsp;路线规划</span>
      </div>
      <!-- 导航起始点 -->
      <div v-show="mapType == '1'" class="navigation-point">
        <span>起始点：</span>
        <el-input v-model="startPoint" style="flex: 1" placeholder="Please input" />
        <span>&nbsp;-&nbsp;</span>
        <el-input v-model="endPoint" style="flex: 1" placeholder="Please input" />
        <el-button type="primary" @click="handleNavigate">导航</el-button>
      </div>
    </div>
    <!-- 地图 -->
    <div class="map-chart" id="bd_map_d" :style="{ height: height + 'px' }"></div>
  </div>
</template>
<script lang='ts' setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
onMounted(() => {
  window.addEventListener('resize', resizeMapHeight)
  nextTick(() => {
    initMap(mapType.value, city.value, startPoint.value, endPoint.value)
  })
})
const { mapTypes, citys, routeTypes } = reactive({
  mapTypes: [
    { label: '城市地图', value: '1' },
    { label: '地球', value: '2' },
  ],
  citys: [
    { label: '广州市', value: '广州市' },
    { label: '北京市', value: '北京市' },
    { label: '深圳市', value: '深圳市' },
    { label: '上海市', value: '上海市' },
  ],
  routeTypes: [
    { label: '步行', value: '步行' },
    { label: '骑行', value: '骑行' },
    { label: '驾车', value: '驾车' },
  ]
})
// 地图类型
let mapType = ref<string>("1")
// 城市
let city = ref<string>('广州市')
// 导航方式
let routeType = ref<string>('步行')
// 起点
let startPoint = ref<string>('')
// 终点
let endPoint = ref<string>('')
// 切换地图类型
const mapTypeChange = (val: string) => {
  nextTick(() => {
    initMap(val, city.value, startPoint.value, endPoint.value)
  })
}
// 切换城市
const cityChange = (val: string) => {
  nextTick(() => {
    initMap(mapType.value, val, startPoint.value, endPoint.value)
  })
}
// 导航
const handleNavigate = () => {
  nextTick(() => {
    initMap(mapType.value, city.value, startPoint.value, endPoint.value)
  })
}
// 初始化地图
const initMap = (type: string, city: string, startPoint: string, endPoint: string): void => {
  const map = new BMapGL.Map("bd_map_d")
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  map.setHeading(64.5);
  map.setTilt(73);
  if (type == "1") {
    map.centerAndZoom(city, 12); // 初始化地图,设置中心点坐标和地图级别
    // 创建定位控件
    let locationControl = new BMapGL.LocationControl({
      // 控件的停靠位置（可选，默认左上角）
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      // 控件基于停靠位置的偏移量（可选）
      offset: new BMapGL.Size(20, 20)
    });
    // 将控件添加到地图上
    map.addControl(locationControl);
    let walking = new BMapGL.WalkingRoute(
      map, 
      { renderOptions: { map: map, panel: "r-result", autoViewport: true } }
    );
    walking.search(startPoint, endPoint);
  }
  else if (type == "2") {
    map.centerAndZoom(city, 1);
    map.setMapType(BMAP_EARTH_MAP);
  }
}
const height = ref<number>(innerHeight - 42 - 80)
// 自适应地图高度
const resizeMapHeight = () => {
  height.value = innerHeight - 42 - 80
}
// 移除 resize 事件
onUnmounted(() => {
  window.removeEventListener('resize', resizeMapHeight)
})
</script>
<style lang='scss' scoped>
  .map-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-around;
  }
  .map-type, .city-select {
    .el-select {
      width: 120px;
    }
  }
  .maps {
    .map-chart {
      width: 100%;
    }
  }
  .route-plan {
    .el-select {
      width: 80px;
    }
  }
  .navigation-point {
    display: flex;
    align-items: center;
    .el-button {
      margin-left: 5px;
    }
  }
</style>