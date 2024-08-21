<template>
  <div class="image-viewer">
    <el-image-viewer
      :initial-index="previewImgIndex"
      hide-on-click-modal
      :url-list="imageList"
      @close="closeImgViewer"
      v-if="previewImgIndex != null"
    ></el-image-viewer>
  </div>
</template>

<script setup>
import { ref } from "vue";
const prosp = defineProps({
  imageList: {
    type: Array,
  },
});
const previewImgIndex = ref(null);

const show = (index) => {
  previewImgIndex.value = index;
};

defineExpose({ show });

const closeImgViewer = () => {};
</script>

<style lang="scss" scoped>
</style>
