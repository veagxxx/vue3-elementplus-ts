<template>
  <div class="home">
    <div class="header">
      <el-tabs 
        type="border-card" 
        class="home-tabs" 
        v-model="activeTab"
        :before-leave="handleLeave"
       >
        <el-tab-pane class="published-list" name="published">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><list /></el-icon>
              <span>已发布</span>
            </span>
          </template>
          <el-input 
            v-model="searchMsg" 
            placeholder="Please input search message" 
            clearable
            @keyup.enter="handleSearch"
            @clear="handleClear"
          >
            <template #prepend>输入搜索信息</template>
            <template #append>
              <el-button :icon="Search" @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
          <!-- 文章列表 -->
          <MarkdownList 
            :markdownList="markdownList" 
            :msg="searchMsg"
          />
        </el-tab-pane> 
        <el-tab-pane name="write">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><edit /></el-icon>
              <span>写文章</span>
            </span>
          </template>
          <WriteMarkdown @handleRefresh="handleSearch"/>
        </el-tab-pane>
        <el-tab-pane name="draft">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>草稿箱</span>
            </span>
          </template>
          <DraftList 
            :draftList="draftList" 
            @editDraft="editDraft" 
            @handleRefresh="handleSearch"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { Calendar, List, Edit, Search } from '@element-plus/icons-vue'
import { ref, onMounted, provide } from 'vue'
import WriteMarkdown from './components/WriteMarkdown.vue'
import MarkdownList from './components/MarkdownList.vue'
import DraftList from './components/DraftList.vue';
import { IMarkdown, queryAllMarkdowns } from '@/api/markdownApi'
import { useStore } from 'vuex';
import { SET_IS_EDIT_DRAFT, SET_IS_SEARCH, SET_LOADING, SET_SAVE_STATUS } from '@/store/actionTypes';
import { ElMessageBox } from 'element-plus';
const store = useStore()
// 查询内容
let searchMsg = ref<string>('')
// 爷孙传值
provide('searchMsg', searchMsg)
// markdown html 字符串
let markdownList = ref<IMarkdown[] | any>([])
let draftList = ref<IMarkdown[] | any>([])
let activeTab = ref<string>('published')
// 查询数据
const handleSearch = async () => {
  store.dispatch(SET_LOADING, true)
  if (searchMsg.value) {
    store.dispatch(SET_IS_SEARCH, true)
  }
  const res = await queryAllMarkdowns(searchMsg.value);
  markdownList.value = res.data?.filter((item: IMarkdown, index: number) => item.status == 1)
  draftList.value = res.data?.filter((item: IMarkdown, index: number) => item.status == 0)
  let timmer = setTimeout(() => {
    store.dispatch(SET_LOADING, false)
    clearTimeout(timmer)
  }, 500);
}
// tabs 离开之前
const handleLeave = (activeName: string, oldActiveName: string) => {
  return new Promise(async (resolve, reject) => {
    if (activeName == oldActiveName) { // 相同 tab
      reject(false)
    } 
    if (!store.state.haveSave && oldActiveName == 'write') {
      const res  = await ElMessageBox.confirm(
      '文章数据尚未保存，你确定要放弃编辑吗？',
      '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        store.dispatch(SET_SAVE_STATUS, true)
        store.dispatch(SET_IS_EDIT_DRAFT, false)
        return true
      })
      .catch(() => {
        return false
      })
      res ? resolve(res) : reject(res)
    } else {
      resolve(true)
    }
  })
}
// 编辑草稿
const editDraft = () => {
  activeTab.value = 'write'
}
// 清除搜索
const handleClear = () => {
  store.dispatch(SET_IS_SEARCH, false)
} 
onMounted(() => {
  handleSearch()
  store.dispatch(SET_IS_SEARCH, false)
})
</script>
<style lang="scss" scoped>
  .home-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .home-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
</style>