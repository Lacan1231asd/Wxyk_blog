<template>
  <div class="comment-item">
    <Avatar :userId="commentData.userId" :width="50"></Avatar>
    <div class="comment-info">
      <div class="nick-name">
        <span class="name">{{ commentData.nickName }}</span>
        <span class="tag-author" v-if="commentData.userId == articleUserId"
          >作者</span
        >
      </div>
      <div class="comment-content">
        <span v-html="commentData.content"></span>
      </div>
      <div class="op-panel">
        <div class="time">
          <span>{{ commentData.postTime }}</span>
          <span class="address"
            >&nbsp;·&nbsp;{{ commentData.userIpAddress }}</span
          >
        </div>
        <div class="iconfont icon-good">
          {{ commentData.goodCount > 0 ? commentData.goodCount : "点赞" }}
        </div>
        <div class="iconfont icon-comment" @click="showReplyPanel(commentData)">
          回复
        </div>
        <el-dropdown v-if="articleUserId == currentUserId">
          <div class="iconfont icon-more"></div>
          <template #dropdown>
            <el-dropdown-item>
              {{ commentData.topType == 0 ? "设为置顶" : "取消置顶" }}
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
      <div class="reply-info" v-if="commentData.showReply">
        <PostComment
          :articleId="articleId"
          :pCommentId="pCommentId"
          :replyUserId="replyUserId"
          :avatarWidth="30"
          :userId="currentUserId"
          :showInsertImg="false"
          @hiddenAllReply="hiddenAllReplyHandler"
        ></PostComment>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();

import PostComment from "./PostComment.vue";
const props = defineProps({
  articleId: {
    type: String,
  },
  commentData: {
    type: Object,
  },
  articleUserId: {
    type: String,
  },
  currentUserId: {
    type: String,
  },
});

const emit = defineEmits(["hiddenAllReply"]);
//显示评论框
const pCommentId = ref(0);
const replyUserId = ref(null);
const showReplyPanel = (curData) => {
  const haveShow = curData.showReply == undefined ? false : curData.showReply;
  emit("hiddenAllReply");
  curData.showReply = !haveShow;
  pCommentId.value = curData.commentId;
};

const postCommentFinish = (resultData) => {
  const children = props.commentData.children || [];
  children.unshift(resultData);
};
</script>

<style lang="scss" >
.comment-item {
  display: flex;
  padding-top: 15px;
  .comment-info {
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    .nick-name {
      .name {
        font-size: 14px;
        color: var(--text2);
        margin-right: 10px;
        cursor: pointer;
      }
      .tag-author {
        background: var(--pink);
        color: #fff;
        font-size: 12px;
        border-radius: 2px;
      }
    }
    .comment-content {
      margin-top: 5px;
      font-size: 15px;
      line-height: 22px;
    }
    .op-panel {
      display: flex;
      align-items: center;
      margin-top: 5px;
      font-size: 13px;
      color: var(--text2);
      .time {
        margin-right: 20px;
      }
      .iconfont {
        margin-right: 15px;
        font-size: 14px;
        color: var(--icon);
        cursor: pointer;
      }
      .iconfont::before {
        margin-right: 3px;
      }
    }
    .reply-info {
      margin-top: 15px;
    }
  }
}
</style>
