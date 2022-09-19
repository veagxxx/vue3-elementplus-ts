<template>
  <el-card shadow="hover"> 
    <template #header>
      <div class="card-header">
        <span 
          class="item-title" 
          @click="handleToDetails(markdown)"
          v-html="formatTitle(markdown.title as string)"
        >
        </span>
        <span class="create-time">
          {{ markdown.createTime }}
        </span>
      </div>
    </template>
    <div class="item-content" v-html="formatHTML(markdown.content as string)"></div>
  </el-card>
</template>
<script lang='ts' setup>
import { IMarkdown } from '@/api/markdownApi';
import { inject, Ref, toRefs } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SET_MARKDOWN_ITEM } from '@/store/actionTypes';
interface IProps {
  markdown: IMarkdown;
  msg: string;
}
// 获取 provide 值
const searchMsg = <Ref<string>>inject('searchMsg')
const router: Router = useRouter()
const store = useStore()
// 获取 props 值，直接解构会失去响应式
const props = defineProps<IProps>()
const { markdown, msg } = toRefs(props)
// 格式化 html 内容，当内容只有图片时，将图片替换为 [图片] 文字
const formatHTML = (content: string) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i
  content = content.replace(reg, '[图片]')
  return content
}
// 格式化标题，实现搜索关键字高亮
const formatTitle = (title: string) => {
  if (msg.value.length && store.state.isSearch) {
    const hl_reg = new RegExp(msg.value, 'gi')
    const highlightText = `<span class="highlightText">${msg.value}</span>`
    title = title.replace(hl_reg, highlightText) 
  }
  return title
}
const handleToDetails = (item: IMarkdown) => {
  store.dispatch(SET_MARKDOWN_ITEM, item)
  router.push({ path: `/markdown/details/${item.blogId}` })
}
</script>
<style lang='scss' scoped>
  .el-card {
    margin-top: 5px;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-title {
      &:hover{
        text-decoration: underline;
      }
      cursor: pointer;
      :deep(a) {
        text-decoration: none;
        color: black;
      }
    }
    .create-time {
      font-size: 13px;
      color: gray;
    }
    .item-content {
      font-size: 13px;
      color: gray;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;				//溢出内容隐藏
      text-overflow: ellipsis;		//文本溢出部分用省略号表示
      display: -webkit-box;			//特别显示模式
      -webkit-line-clamp: 1;			//行数
      line-clamp: 1;					
      -webkit-box-orient: vertical;	//盒子中内容竖直排列
      :deep(a) {
        text-decoration: none;
        cursor: default;
        pointer-events: none;
        color: black;
      }
    }
    :deep(.highlightText)  {
      background-color: hotpink;
    }
  }
</style>