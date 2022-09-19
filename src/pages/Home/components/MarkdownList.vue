<template>
  <div class="markdown-list" v-show="props.markdownList.length">
    <div class="lists">
      <el-scrollbar>
        <MarkdownItem 
          v-for="(item, index) in props.markdownList"
          :key="item.blogId"
          :markdown="item"
          :msg="props.msg"
        />
      </el-scrollbar> 
    </div>
  </div>
  <el-empty v-show="!props.markdownList.length" :image-size="200" />
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import MarkdownItem from './MarkdownItem.vue'
import { IMarkdown } from '@/api/markdownApi';
interface IProps {
  markdownList: IMarkdown[];
  msg: string;
}
// markdown html 字符串
// const { markdownList } = defineProps<IProps>()
const props = defineProps<IProps>()

</script>
<style lang='scss' scoped>
  .lists {
    height: calc( 100vh - 60px - 40px - 40px - 50px );
    overflow-y: auto;
  }
</style>