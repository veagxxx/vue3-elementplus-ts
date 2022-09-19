<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Sidebar></Sidebar>
        </el-aside>
        <el-main v-loading="loading">
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts' setup>
import Header from './Header/Header.vue'
import Sidebar from './Sidebar/SideBar.vue'
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
const store = useStore()
// 是否折叠
const isFold = computed<boolean>(() => {
  return store.state.showSidebar
})
// 侧边菜单宽度
const width = computed<string>(() => {
  return !isFold.value ? '65px' : '220px'
})
// 加载状态
const loading = computed<boolean>(() => {
  return store.state.loading
})
</script>
<style lang="scss" scoped>
  .common-layout {
    .el-header {
      padding: 0;
    }
    .el-aside {
      width: v-bind(width);
      transition: all 0.3s linear;
    }
    .el-main {
      transition: all 0.3s linear;
      padding: 10px;
      height: calc( 100vh - 60px );
      // overflow-y: auto;
    }
  }
</style>