<template>
  <el-result title="404 资源不存在" sub-title="请不要访问奇奇怪怪的路径">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="router.go(-1)">Back</el-button>
    </template>
  </el-result>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>
<style lang='scss' scoped>
  .el-result {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>