<template>
  <div class="markdown">
    <el-page-header :icon="ArrowLeft" content="详情" @back="router.go(-1)"/>
    <div class="title">{{ markdown?.title }}</div>
    <div class="sub-title">
      <span class="time">创建时间：{{ markdown?.createTime }}</span>
      <span class="time">更新时间：{{ markdown?.updateTime }}</span>
    </div>
    <MdEditor
      preview-only
      :model-value="markdown?.content"
    ></MdEditor>
  </div>
</template>
<script lang='ts' setup>
import { IMarkdown } from '@/api/markdownApi';
import { onMounted, ref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MdEditor from 'md-editor-v3'
import { ArrowLeft } from '@element-plus/icons-vue'
const router: Router = useRouter()
const store = useStore()
let markdown = ref<IMarkdown | null>({})
onMounted(() => {
  markdown.value = store.state.markdown
  // console.log(markdown.value);
  
})
</script>
<style lang='scss' scoped>
  .markdown {
    height: calc( 100vh - 60px - 20px );
    .title {
      font-size: 30px;
      font-weight: bold;
      text-align: center;
    }
    .sub-title {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 10px;
      .time {
        font-size: 13px;
        color: gray;
      }
    }
  }
  ::v-deep() a {
    text-decoration: none;
    cursor: default;
    pointer-events: none;
    color: black;
  }
</style>