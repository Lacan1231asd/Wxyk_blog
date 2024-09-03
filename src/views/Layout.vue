<template>
  <div>
    <div class="header" v-if="showHeader">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }"
      >
        <!-- logo -->
        <router-link to="/" class="logo">
          <span
            v-for="(item, index) in logoInfo"
            :key="index"
            :style="{ color: item.color }"
            >{{ item.letter }}</span
          >
        </router-link>

        <!-- 模块信息 -->
        <div class="menu-panel">
          <router-link
            :class="[
              'menu-item home',
              activePboardId == undefined ? 'active' : '',
            ]"
            to="/"
            >首页</router-link
          >
          <template v-for="(board, index) in boardList" :key="index">
            <el-popover
              placement="bottom-start"
              :width="300"
              trigger="hover"
              v-if="board.children.length > 0"
            >
              <template #reference>
                <span
                  :class="[
                    'menu-item',
                    board.boardId == activePboardId ? 'active' : '',
                  ]"
                  @click="boardClickHandler(board)"
                  >{{ board.boardName }}</span
                >
              </template>

              <div class="sub-board-list">
                <span
                  :class="[
                    'sub-board',
                    subBoard.boardId == activeBoardId ? 'active' : '',
                  ]"
                  v-for="(subBoard, index) in board.children"
                  :key="index"
                  @click="subBoardClickHandler(subBoard)"
                  >{{ subBoard.boardName }}</span
                >
              </div>
            </el-popover>
            <span
              :class="[
                'menu-item',
                board.boardId == activePboardId ? 'active' : '',
              ]"
              v-else
              @click="boardClickHandler(board)"
              >{{ board.boardName }}</span
            >
          </template>
        </div>

        <!-- 登录 注册 用户信息 -->
        <div class="user-info-panel">
          <div class="op-btn">
            <el-button type="primary" class="op-btn" @click="newPost">
              发帖<span class="iconfont icon-add"></span>
            </el-button>
            <el-button type="primary" class="op-btn">
              搜索<span class="iconfont icon-search"></span>
            </el-button>
          </div>

          <!-- 显示用户信息 -->
          <template v-if="userInfo.userId">
            <div class="message-info">
              <el-dropdown>
                <el-badge :value="12" class="item">
                  <div class="iconfont icon-message"></div>
                </el-badge>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="gotoMessage('reply')"
                      >回复我的</el-dropdown-item
                    >
                    <el-dropdown-item @click="gotoMessage('likePost')"
                      >赞了我的文章</el-dropdown-item
                    >
                    <el-dropdown-item @click="gotoMessage('downloadAttachment')"
                      >下载了我的附件</el-dropdown-item
                    >
                    <el-dropdown-item @click="gotoMessage('likeComment')"
                      >赞了我的评论</el-dropdown-item
                    >
                    <el-dropdown-item @click="gotoMessage('sys')"
                      >系统消息</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>

            <div class="user-info">
              <el-dropdown>
                <avatar :userId="userInfo.userId" :width="50"></avatar>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>我的主页</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>

          <el-button-group :style="{ 'margin-left': '10px' }" v-else>
            <el-button type="primary" plain @click="loginAndRegister(1)"
              >登录</el-button
            >
            <el-button type="primary" plain @click="loginAndRegister(0)"
              >注册</el-button
            >
          </el-button-group>
        </div>
      </div>
    </div>

    <div class="body-content">
      <router-view />
    </div>
    <!-- 登录 注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import {
  buttonGroupContextKey,
  colorPickerContextKey,
  useFocusController,
} from "element-plus";
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const router = useRouter();
const store = useStore();

const api = {
  getUserInfo: "/getUserInfo",
  loadBoard: "/board/loadBoard",
};

const logoInfo = ref([
  {
    letter: "E",
    color: "#3285FF",
  },
  {
    letter: "a",
    color: "#FB3624",
  },
  {
    letter: "s",
    color: "#FFBA02",
  },
  {
    letter: "y",
    color: "#3285FF",
  },
  {
    letter: "b",
    color: "#25B24E",
  },
  {
    letter: "b",
    color: "#FD3224",
  },
  {
    letter: "s",
    color: "#FFBA02",
  },
]);

const showHeader = ref(true);

//获取滚动条的高度
const getScrollTop = () => {
  let scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return scrollTop;
};
const initScroll = () => {
  let initScrollTop = getScrollTop();
  let scrollType = 0;
  window.addEventListener("scroll", () => {
    let currentScrollTop = getScrollTop();
    if (currentScrollTop > initScrollTop) {
      //往下滚动
      scrollType = 1;
    } else {
      //往上滚动
      scrollType = 0;
    }
    // console.log(scrollType);

    initScrollTop = currentScrollTop;
    // console.log(currentScrollTop);
    if (scrollType == 1 && currentScrollTop > 100) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
  });
};

//登录注册
const loginRegisterRef = ref();
const loginAndRegister = (type) => {
  loginRegisterRef.value.showPanel(type);
};

onMounted(() => {
  initScroll();
  getUserInfo();
});

//获取用户信息
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo,
  });
  if (!result) {
    return;
  }
  store.commit("updateLoginUserInfo", result.data);
};

//获取板块信息
const boardList = ref({});
const loadBoard = async () => {
  let result = await proxy.Request({
    url: api.loadBoard,
  });
  if (!result) {
    return;
  }
  boardList.value = result.data;
  store.commit("saveBoardList", result.data);
};
loadBoard();

//监听 登录用户信息
const userInfo = ref({});
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    if (newVal != undefined && newVal != null) {
      userInfo.value = newVal;
    } else {
      userInfo.value = {};
    }
  },
  { immediate: true, deep: true }
);

//监听是否展示登录框
watch(
  () => store.state.showLogin,
  (newVal, oldVal) => {
    if (newVal) {
      loginAndRegister(1);
    }
  },
  { immediate: true, deep: true }
);

//板块点击
const boardClickHandler = (board) => {
  router.push(`/forum/${board.boardId}`);
};

//二级板块
const subBoardClickHandler = (subBoard) => {
  router.push(`/forum/${subBoard.pBoardId}/${subBoard.boardId}`);
};

//当前选中的板块
const activePboardId = ref(0);
watch(
  () => store.state.activePboardId,
  (newVal, oldVal) => {
    if (newVal != 0) {
      activePboardId.value = newVal;
    }
  },
  { immediate: true, deep: true }
);

const activeBoardId = ref(0);
watch(
  () => store.state.activeBoardId,
  (newVal, oldVal) => {
    activeBoardId.value = newVal;
  },
  { immediate: true, deep: true }
);

//发帖
const newPost = () => {
  if (!store.getters.getLoginUserInfo) {
    loginAndRegister(1);
  } else {
    router.push("newPost");
  }
};

//消息相关
const gotoMessage = (type) => {
  router.push(`/user/message/${type}`);
};
</script>

<style lang="scss" scoped>
.header {
  top: 0px;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px #ddd;

  z-index: 1000;
  background: #fff;

  .header-content {
    margin: 0px auto;
    align-items: center;
    height: 60px;
    display: flex;
    align-items: center;

    .logo {
      display: block;
      text-decoration: none;
      margin-right: 5px;

      span {
        font-size: 35px;
      }
    }

    .menu-panel {
      flex: 1;

      .menu-item {
        margin-left: 20px;
        cursor: pointer;
      }
      .home {
        text-decoration: none;
        color: #000;
      }
      .active {
        color: var(--link);
      }
      // .router-link-exact-active {
      //   color: var(--link);
      // }
    }

    .user-info-panel {
      width: 300px;
      display: flex;

      align-items: center;

      .op-btn {
        .iconfont {
          margin-left: 5px;
        }

        .el-button + .el-button {
          margin-left: 5px;
        }
      }

      .message-info {
        margin-left: 5px;
        margin-right: 25px;
        cursor: pointer;
        .icon-message {
          font-size: 25px;
          color: rgb(147, 147, 147);
        }
      }
    }
  }
}

.sub-board-list {
  display: flex;
  flex-wrap: wrap;
  .sub-board {
    padding: 0px 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: rgb(239, 239, 239);
    border: 1px solid #ddd;
    color: rgb(119, 118, 118);
    margin-top: 10px;
    cursor: pointer;
  }

  .sub-board:hover {
    color: var(--link);
  }
  .active {
    background: var(--link);
    color: #fff;
  }
  .active:hover {
    color: #fff;
  }
}

.body-content {
  margin-top: 60px;
  position: relative;
}
</style>
