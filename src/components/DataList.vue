<template>
  <div v-for="(item, index) in dataSource.list" :key="index">
    <slot :data="item"></slot>
  </div>
  <div class="pagination">
    <el-pagination
      v-if="dataSource.pageTotal > 1"
      background
      :total="dataSource.totalCount"
      v-model:current-page="dataSource.pageNo"
      layout="prev,pager,next"
      @current-change="handlePageNochange"
      style="text-align: right"
    >
    </el-pagination>
  </div>
</template>

<script setup>
const props = defineProps({
  dataSource: {
    type: Object,
  },
});

const emit = defineEmits("loadData");
const handlePageNochange = (pageNo) => {
  props.dataSource.pageNo = pageNo;
  emit("loadData");
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 5px 0px 5px 10px;
}
</style>
