<template>
  <el-scrollbar>
    <div class="draft-list">
      <el-table 
        :data="draftList" 
        style="width: 100%"
        :max-height="height"
        :height="height"
        show-overflow-tooltip
        stripe 
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag>{{ scope.row.status == 0 ? '草稿' : '已发布' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" size="small" @click="editDraft(scope.row)">Edit</el-button>
            <el-button type="text" size="small" @click="handleDeleteDraft(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-scrollbar>
</template>
<script lang='ts' setup>
import { deleteDraft, IMarkdown } from '@/api/markdownApi';
import { SET_IS_EDIT_DRAFT, SET_MARKDOWN_ITEM, SET_SAVE_STATUS } from '@/store/actionTypes';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
interface IProps {
  draftList: IMarkdown[];
}
onMounted(() => {
  window.addEventListener('resize', resizeTable)
})
const height = ref<number>(innerHeight - 160)
const { draftList } = defineProps<IProps>() 
const emit = defineEmits(['editDraft', 'handleRefresh'])
const store = useStore()
const editDraft = (draft: IMarkdown) => {
  store.dispatch(SET_IS_EDIT_DRAFT, true)
  store.dispatch(SET_SAVE_STATUS, false)
  store.dispatch(SET_MARKDOWN_ITEM, draft)
  emit('editDraft')
}
const handleDeleteDraft = (draft: IMarkdown) => {
  // console.log(draft)
  ElMessageBox.confirm(
    '确定删除该草稿吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const res = await deleteDraft(draft)
    if (res.code == 200) {
      ElMessage({ message: '删除成功', type: 'success' })
      emit('handleRefresh')
    }
  }).catch(() => {
    // ElMessage({ message: '已取消', type: 'info' })
  })
}
const handleSelectionChange = (data: IMarkdown[]) => {
  console.log(data)
}
const resizeTable = ():void => {
  height.value = innerHeight - 160
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeTable)
})
</script>
<style lang='scss' scoped>
  .draft-list {
    height: calc( 100vh - 158px );
  }
</style>