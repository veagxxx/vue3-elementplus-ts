
<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { ref } from 'vue';
let locale = ref(zhCn)
</script>

<style lang="scss" scoped>

</style>
