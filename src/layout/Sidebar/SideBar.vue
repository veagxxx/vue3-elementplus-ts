<template>
  <div class="sidebar" :style="{ height: height + 'px' }">
    <el-menu
      class="el-menu-vertical-demo"
      style="height: 100%;"
      :collapse="!isFold"
      :collapse-transition="false"
      :unique-opened="true"
      :router="true"
      :default-active="$route.path"
    >
      <el-menu-item index="/markdown">
        <el-icon><icon-menu /></el-icon>
        <span>富文本</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><picture-filled /></el-icon>
          <span>图表</span>
        </template>
        <el-menu-item index="/charts/map">
          <el-icon><compass /></el-icon>
          <span>百度地图</span>
        </el-menu-item>
        <el-menu-item index="/charts/line-chart">
          <el-icon><trend-charts /></el-icon>
          <span>折线图</span>
        </el-menu-item>
        <el-menu-item index="/charts/line-chart">
          <el-icon><histogram /></el-icon>
          <span>柱状图</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/chat-room">
        <el-icon><Setting /></el-icon>
        <span>聊天室</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang='ts' setup>
import { Menu as IconMenu, PictureFilled, Histogram, Setting, Compass, TrendCharts } from '@element-plus/icons-vue'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const isFold = computed(() => {
  return store.state.showSidebar
})
const height = ref<number>(innerHeight - 62)
// 添加 resize 事件
onMounted(() => {
  window.addEventListener('resize', resizeSidebar)
})
// 自适应 Sidebar 高度
const resizeSidebar = () => {
  height.value = innerHeight - 62
}
// 移除 resize 事件
onUnmounted(() => {
  window.removeEventListener('resize', resizeSidebar)
})
</script>
<style lang='scss' scoped>
  .sidebar {
    margin-top: 2px;
  }
</style>