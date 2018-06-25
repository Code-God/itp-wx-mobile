<template>
  <div id="app">
    <nav class="nav-list" v-show="show">
      <router-link tag="span" to="/ITP" active-class="active" class="blood "><span class="icon bloodicon ignore"></span><b>出血评分</b>
      </router-link>
      <router-link tag="span" to="/pharmacy" active-class="active" class="medicine"><span
        class="icon medicineicon ignore"></span><b>用药情况</b></router-link>
      <router-link tag="span" to="/hospital" active-class="active" class="hospital"><span
        class="icon hospitalicon ignore"></span><b>就诊情况</b></router-link>
    </nav>
    <router-view/>
    <cube-popup type="my-popup" :visible="visible" :mask="false">
      <cube-loading :size="40"></cube-loading>
    </cube-popup>
  </div>
</template>

<script>
import eventHub from './plugins/eventHub';

export default {
  name: "App",
  created() {
    eventHub.$on('loading', p => {
      this.visible = p;
    })
  },
  data() {
    return {
      show: false,
      visible: true
    };
  },
  watch: {
    $route() {
      this.routerChange();
    }
  },
  methods: {
    routerChange() {
      // TODO: 优化路径
      if (
        this.$route.path === "/register" ||
        this.$route.path === "/registerResult" ||
        this.$route.path === "/updateInfo" ||
        this.$route.path === "/putRegister"
      ) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  beforeMount() {
    this.routerChange();
  }
};
</script>

<style>
  @import url("../static/css/reset.css");
  @import url("../static/css/index.css");
  @import url("../static/css/animate.css");
  /* @import url("../static/css/mintui.css"); */
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: var(--mainBgColor);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    z-index: -1;
    flex-direction: column;
    justify-content: start;
    & .sans-container-page {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 40px;
      position: relative;
      z-index: 0;
    }
    & .nav-list {
      height: 44px;
      display: flex;
      position: relative;
      z-index: 1;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 #e4ebf0;
      & > span {
        justify-content: center;
        display: flex;
        width: 33%;
        height: 44px;
        align-items: center;
        line-height: 44px;
      }
      & .icon {
        width: 12px;
        height: 100%;
        margin-right: 4px;
        margin-top: -1px;
        display: inline-block;
        background-size: 12px 12px;
        line-height: 44px;
        height: 44px;
      }
      & b {
        transform: translateY(1px);
        display: inline-block;
        line-height: 44px;
        height: 44px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4e5d6b;
        letter-spacing: 0;
        overflow: hidden;
      }
      & .blood span {
        background: url("../static/svg/blood.svg") no-repeat center;
      }
      & .medicine span {
        background: url("../static/svg/medicine.svg") no-repeat center;
      }
      & .hospital span {
        background: url("../static/svg/hospital.svg") no-repeat center;
      }
      & span.active b {
        color: #2196f3;
      }
      & .active .bloodicon {
        background: url("../static/svg/b-act.svg") no-repeat center;
      }
      & .active .medicineicon {
        background: url("../static/svg/m-act.svg") no-repeat center;
      }
      & .active .hospitalicon {
        background: url("../static/svg/h-act.svg") no-repeat center;
      }
    }
  }
</style>
