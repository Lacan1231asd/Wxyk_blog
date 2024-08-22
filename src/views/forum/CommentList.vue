<template>
  <div class="comment-body">
    <div class="comment-title">
      <div class="title">评论<span class="count">0</span></div>
      <div class="tab">
        <span>热榜</span>
        <el-divider direction="vertical" />
        <span>最新</span>
      </div>
    </div>
    <!-- 发送评论 -->
    <div class="comment-form-panel">
      <Avatar :width="50" :userId="currentUserInfo.userId"></Avatar>
      <div class="comment-form">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          @submit.prevent
        >
          <!--textarea输入-->
          <el-form-item prop="content">
            <el-input
              clearable
              placeholder="请文明发言，做一个帮帮的程序员"
              type="textarea"
              :maxlength="150"
              resize="none"
              show-word-limit
              v-model.trim="formData.content"
            ></el-input>

            <div class="insert-img" v-if="currentUserInfo.userId">
              <el-upload
                name="file"
                :show-file-list="false"
                accept=".png,.PNG,.jpg,.JPG,.jpeg,.JPEG,.gif,.GIF,.bmp,.BMP"
                :multiple="false"
                :http-request="selectImg"
              >
                <span class="iconfont icon-image"></span>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="send-btn">发表</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();

const props = defineProps({
  articleId: {
    type: String,
  },
  articleUserId: {
    type: String,
  },
});

//form信息
const formData = ref({});
const formDataRef = ref();
const rules = {
  content: [{ required: true, message: "请输入评论内容" }],
};

//选择图片
const selectImg = () => {};

//当前用户信息
const currentUserInfo = ref({});
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    currentUserInfo.value = newVal || {};
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" >
.comment-body {
  .comment-title {
    display: flex;
    align-items: center;
    .title {
      font-size: 20px;
      .count {
        font-size: 14px;
        padding: 0px 10px;
      }
    }
  }
  .comment-form-panel {
    margin-top: 20px;
    display: flex;
    align-items: top;
    .comment-form {
      flex: 1;
      margin: 0px 10px;
      .el-textarea__inner {
        height: 60px;
      }
      .insert-img {
        line-height: normal;
        .iconfont {
          margin-top: 3px;
          font-size: 20px;
        }
      }
    }
    .send-btn {
      width: 60px;
      height: 60px;
      background: var(--link);
      color: #fff;
      text-align: center;
      line-height: 60px;
      border-radius: 5px;
    }
  }
}
</style>
