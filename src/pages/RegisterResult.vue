<template>
<div class="sans-container-page">
  <div class="registers-success">
    <div alt="1" class="right-svg"></div>
    <p>{{txt}}</p>
  </div>
</div>
</template>

<script>
import eventHub from '../plugins/eventHub';
export default {
  name: "RegisterResult",
  created() {
    eventHub.$emit('loading', false);
  },
  data() {
    return {
      txt: "注册成功"
    };
  },
  mounted() {
    if (this.$route.query.ok) {
      this.txt = "修改成功";
    } else {
      if (localStorage.getItem("sanFormUrl")) {
        const fromUrl = JSON.parse(localStorage.getItem("sanFormUrl"));
        setTimeout(() => {
          this.$router.push(fromUrl);
          localStorage.removeItem("sanFormUrl");
        }, 2000);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../static/css/variable.css");
.registers-success {
  width: 100%;
  height: 100%;
  @apply --columnCentered;
  & .right-svg {
    width: 64px;
    height: 64px;
    background: url("../../static/svg/success.svg") no-repeat;
    background-size: cover;
  }
  &>p {
    margin-top: 8px;
    font-size: 18px;
    color: #62cd75;
    letter-spacing: 0;
  }
}
</style>
