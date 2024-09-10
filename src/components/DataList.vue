<template>
  <div
    v-if="!loading && dataSource.list != null && dataSource.list.length == 0"
  >
    <NoData :msg="noDataMsg"></NoData>
  </div>
  <div class="skeleton" v-if="loading">
    <el-skeleton :row="2" animated></el-skeleton>
  </div>

  <template v-if="!loading">
    <div v-for="(item, index) in dataSource.list" :key="index">
      <slot :data="item"></slot>
    </div>
  </template>

  <div class="pagination">
    <el-pagination
      v-if="dataSource.pageTotal > 1"
      background
      :total="dataSource.totalCount"
      v-model:current-page="dataSource.pageNo"
      layout="prev,pager,next"
      @current-change="handlePageNochange"
      style="text-align: right"
      :page-size="15"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import NoData from "./NoData.vue";

const props = defineProps({
  dataSource: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
  noDataMsg: {
    type: String,
    default: "空空如也",
  },
});

const emit = defineEmits(["loadData"]);
const handlePageNochange = (pageNo) => {
  props.dataSource.pageNo = pageNo;
  emit("loadData");
};
</script>

<style lang="scss" scoped>
.pagination {
  padding: 10px 0px 10px 10px;
}

.skeleton {
  padding: 15px;
}
</style>
