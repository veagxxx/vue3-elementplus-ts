<template>
  <div id="bd_map_d"></div>
</template>
<script lang='ts' setup>
import { onMounted, nextTick } from 'vue'
onMounted(() => {
  nextTick(() => {
    initMap()
  })
})
const initMap = () => {
  // 百度地图API功能
	// const map = new BMap.Map("bd_map_d");    // 创建Map实例
	// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别 
	// map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	// map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}
</script>
<style lang='scss' scoped>
  #bd_map_d {
    width: 100%;
    height: 500px;
  }
</style>