<template>
  <div class="header">
    <div class="header-left">
      <div class="icon-item" @click="handleFoldSidebar">
        <el-icon v-show="!isFold"><fold /></el-icon>
        <el-icon v-show="isFold"><expand /></el-icon>
      </div>
    </div>
    <div class="header-right">
      <el-tooltip place="bottom-start" content="消息通知">
        <div class="icon-item">
          <el-icon><bell-filled /></el-icon>
        </div>
      </el-tooltip>
      <div class="icon-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="UserFilled">个人中心</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, computed } from 'vue';
import { SwitchButton, UserFilled, Fold, Expand } from "@element-plus/icons-vue"
import { Store, useStore } from 'vuex';
import { SET_SIDEBAR_SHOW } from '@/store/actionTypes';
const store: Store<any> = useStore()
let isFold = computed(() => {
  return store.state.showSidebar
})
const handleFoldSidebar = () => {
  store.dispatch(SET_SIDEBAR_SHOW, !isFold.value)
}
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    // background: hotpink;
    .header-left {
      display: flex;
      align-items: center;
    }
    .header-right {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      height: 100%;
      line-height: 60px;
      user-select: none;
    }
    .icon-item {
      display: flex;
      align-items: center;
      font-size: 20px;
      margin: 0px 10px;
      cursor: pointer;
    }
  }
</style>