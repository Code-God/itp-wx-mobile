<template>
  <div class="san-tip">
    <div class="san-tip">
      <div class="san-tip-content" :class="{'rightBg':(!disabled) && name!==''}">
        <p class="right" v-if="!disabled && name!=='' "></p>
      </div>
      <div class="san-tip-content" :class="{'errorBg':disabled}">
        <p class="error" v-if="disabled">{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SanTip",
  data() {
    return {};
  },
  props: {
    disabled: {
      required: true,
      type: Boolean
    },
    name: {
      required: true
    },
    msg: {
      required: true
    }
  },
  components: {},
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.san-tip {
  min-height: 12px;
  overflow: hidden;
  /* 校验规则 */
  & .san-tip-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > p {
      font-size: 12px;
      height: 36px;
      overflow: hidden;
      line-height: 39px;
    }
    & .right {
      color: #62cd75;
      margin-left: 16px;
    }
    & .error {
      margin-left: 16px;
      color: #f5a623;
    }
  }
  & .rightBg {
    height: 36px;
    background: url("../../../static/svg/right.svg") left center no-repeat;
    background-size: 12px 12px;
    line-height: 36px;

  }
  & .errorBg {
    height: 36px;
    background: url("../../../static/svg/error.svg") left center no-repeat;
    background-size: 12px 12px;
    line-height: 36px;
    vertical-align: -1px
  }
}
</style>
