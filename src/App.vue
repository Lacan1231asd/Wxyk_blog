<template>
  <el-config-provider :locale="locale" :message="config">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { reactive } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import { zhCn } from "element-plus/es/locale";

const locale = zhCn;
const config = reactive({
  max: 1,
});
</script>

<style scoped>
</style>
