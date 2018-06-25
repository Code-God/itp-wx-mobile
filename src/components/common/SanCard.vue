<template>
  <div class="san-card">
    <div class="title">{{title}}</div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "SanCard",
  props: {
    title: {
      required: true,
      type: String
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.san-card {
  & .title {
    height: 44px;
    background: #ecefef;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #263038;
    line-height: 44px;
    padding-left: 12px;
    text-align: left;
    font-weight: bold;
  }
}
</style>
