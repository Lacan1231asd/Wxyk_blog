<template>
  <div class="edit-post">
    <el-form
      class="post-panel"
      :model="formData"
      :rules="rules"
      ref="formDataRef"
      label-width="60px"
      @submit.prevent
    >
      <div class="post-editor">
        <el-card :body-style="{ padding: '5px' }">
          <template #header>
            <span>正文</span>
          </template>
          <EditorMarkdown></EditorMarkdown>
        </el-card>
      </div>
      <div class="post-setting">
        <el-card :body-style="{ padding: '5px' }">
          <template #header>
            <span>设置</span>
          </template>
          <!--input输入-->
          <el-form-item label="标题" prop="title">
            <el-input
              clearable
              placeholder="提示信息"
              v-model.trim="formData.title"
            ></el-input>
          </el-form-item>

          <el-form-item label="板块" prop="boardIds">
            <el-cascader
              placeholder="请选择板块"
              :options="boardList"
              :props="boardProps"
              clearable
              v-model="formData.bardIds"
              :style="{ width: '100%' }"
            />
          </el-form-item>

          <el-form-item label="封面" prop="cover">
            <el-cascader
              placeholder="请选择板块"
              :options="boardList"
              :props="boardProps"
              clearable
              v-model="formData.bardIds"
              :style="{ width: '100%' }"
            />
          </el-form-item>

          <!--textarea输入-->
          <el-form-item label="摘要" prop="summary">
            <el-input
              clearable
              placeholder="提示信息"
              type="textarea"
              :rows="5"
              :maxlength="150"
              resize="none"
              show-word-limit
              v-model="formData.summary"
            ></el-input>
          </el-form-item>

          <el-form-item label="附件" prop="cover">
            <el-cascader
              placeholder="请选择板块"
              :options="boardList"
              :props="boardProps"
              clearable
              v-model="formData.bardIds"
              :style="{ width: '100%' }"
            />
          </el-form-item>

          <!--input输入-->
          <el-form-item label="" prop="">
            <el-button type="primary" :style="{ width: '100%' }"
              >保存</el-button
            >
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import EditorMarkdown from "@/components/EditorMarkdown.vue";
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};
</script>

<style lang="scss">
.edit-post {
  .post-panel {
    display: flex;
    .el-card__header {
      padding: 10px;
    }
    .post-editor {
      flex: 1;
    }
    .post-setting {
      margin-left: 10px;
      width: 450px;
    }
  }
}
</style>
