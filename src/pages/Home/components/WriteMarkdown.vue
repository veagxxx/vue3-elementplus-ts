<template>
  <div class="write-markdown">
    <div class="title">
      <el-input v-model="title" placeholder="Please input title" clearable>
        <template #prepend>标题</template>
      </el-input>
      <el-button plain @click="handleClear">清空</el-button>
      <el-button type="warning" @click="saveDraft">存草稿</el-button>
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </div>
    <MdEditor 
      v-model="content" 
      @onHtmlChanged="handleChange"
      @onUploadImg="onUploadImg"
      :marked-heading="markedHeading"
      :marked-heading-id="markedHeadingID"
      @onSave="save"
    ></MdEditor>
  </div>
</template>
<script lang='ts' setup>
import moment from 'moment'
import MdEditor from 'md-editor-v3'
import { ref, watch } from 'vue'
import { IMarkdown, saveMarkdown, updateMarkdown, uploadImage } from '@/api/markdownApi'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { SET_SAVE_STATUS } from '@/store/actionTypes';
import Europa from 'europa'
const emit = defineEmits(['handleRefresh'])
const store = useStore()
// html 转 markdown 
const europa = new Europa()
// 内容
let content = ref<string>('')
// 标题
let title = ref<string>('')
// html 字符串
let markdownHTML = ref<string>('')
// 监听是否编辑草稿
watch(() => store.state.isEditDraft, (newVal) => {
  if (newVal) {
    content.value = europa.convert(store.state.markdown.content)
    // content.value = store.state.markdown.content
    title.value = store.state.markdown.title
  } else {
    content.value = ''
    title.value = ''
  }
})
// 获取编辑器内容 html 字符串
const handleChange = (val: string) => {
  markdownHTML.value = val
}
const markedHeading = (text: string, level: number, raw: string) => {
  return `<h${level}>${text}</h${level}>`
}
const markedHeadingID = (text: string, level: number) => {
  return `<h${level}>${text}</h${level}>`
}
const save = (val: string) => {
  console.log(val);
}
// 存草稿
const saveDraft = async () => {
  let markdown: IMarkdown = {
    sortId: 1,
    title: title.value,
    content: content.value,
    createTime: moment().format("YYYY-MM-DD HH:mm"),
    updateTime: moment().format("YYYY-MM-DD HH:mm"),
    status: 0,
  }
  if (store.state.isEditDraft) {
    markdown.createTime = store.state.markdown.createTime
    markdown.blogId = store.state.markdown.blogId
  }
  const res = await saveMarkdown(markdown)
  if (res.code == 200) {
    ElMessage({ message: '保存成功', type: "success" })
    // 设置保存状态
    store.dispatch(SET_SAVE_STATUS, true)
    // 刷新
    emit('handleRefresh')
  } else {
    ElMessage({ message: '保存失败', type: "error" })
  }
}
// 发布
const handlePublish = async () => {
  if (!title.value) {
    return ElMessage({ message: '标题不能为空', type: "warning" })
  }
  if (!markdownHTML.value) {
    return ElMessage({ message: '内容不能为空', type: "warning" })
  }
  // 接口入参
  let markdown: IMarkdown = {
    sortId: 1,
    title: title.value,
    content: markdownHTML.value,
    createTime: moment().format("YYYY-MM-DD HH:mm"),
    updateTime: moment().format("YYYY-MM-DD HH:mm"),
    status: 1,
  }
  if (store.state.isEditDraft) {
    markdown.createTime = store.state.markdown.createTime
    markdown.blogId = store.state.markdown.blogId
  }
  const res = store.state.isEditDraft ? await updateMarkdown(markdown) : await saveMarkdown(markdown)
  if (res.code == 200) {
    ElMessage({ message: '保存成功', type: "success" })
    // 设置保存状态
    store.dispatch(SET_SAVE_STATUS, true)
    // 刷新
    emit('handleRefresh')
  } else {
    ElMessage({ message: '保存失败', type: "error" })
  }
}
// 清空
const handleClear = () => {
  // console.log(val)
  title.value = ''
  content.value = ''
  markdownHTML.value = ''
}
// 上传图片
const onUploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    files.map(async (file: File) => {
      const form = new FormData()
      form.append('file', file)
      const data: any = await uploadImage(form, { headers: { 'Content-Type': 'multipart/form-data' } })
      return data.data
    })
  ) as string[]
  callback(res)
}

</script>
<style lang='scss' scoped>
  .write-markdown {
    height: calc( 100vh - 60px - 40px - 40px - 18px );
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    #md-editor-v3 {
      flex: 1;
    }
  }
  .title {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    .el-input {
      margin-right: 10px;
    }
  }
</style>