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
        <div class="menu-panel"></div>

        <!-- 登录 注册 用户信息 -->
        <div class="user-info-panel">
          <div class="op-btn">
            <el-button type="primary" class="op-btn">
              发帖<span class="iconfont icon-add"></span>
            </el-button>
            <el-button type="primary" class="op-btn">
              搜索<span class="iconfont icon-search"></span>
            </el-button>
          </div>
          <el-button-group :style="{ 'margin-left': '10px' }">
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

    <div>
      <router-view />
    </div>
    <!-- 登录 注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import { buttonGroupContextKey, colorPickerContextKey } from "element-plus";
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

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
});
</script>

<style lang="scss" scoped>
.header {
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
    }

    .user-info-panel {
      width: 300px;
      display: flex;

      .op-btn {
        .inconfont {
          margin-left: 5px;
        }

        .el-button + .el-button {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
