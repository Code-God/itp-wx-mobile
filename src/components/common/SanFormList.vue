<template>
  <div class="san-form-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SanFormList"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../../static/css/variable.css");
.san-form-list {
  & .san-button-group {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 50%;
      height: 40px;
      line-height: 40px;
      color: #0084fb;
      font-size: 16px;
    }
  }
  & .san-item {
    position: relative;
    padding: 12px 12px 0 12px;
    border: 1px solid transparent;
    border-bottom: 1px solid #e4ebf0;
    border-image-source: svg(1px-border param(--color #e4ebf0));
    border-image-slice: 0 0 2 0;
    border-image-width: 2;
    border-image-repeat: stretch;
  }
  & .san-tip {
    min-height: 12px;
  }
  & .san-item:last-child {
    border: 0 none;
  }
  & .san-item.last {
    border: 0 none;
    padding-bottom: 12px;
    margin: 12px 0;
    & .cube-btn {
      height: 44px;
      line-height: 44px;
      padding: 0;
      border: 1px solid #0084fb;
      border-radius: 5px;
    }
  }
  & .item-title {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #263038;
    letter-spacing: 0;
    text-align: left;
    margin-bottom: 8px;
  }
  /* 输入框样式控制 */
  & .item-input {
    @apply --inputType;
    font-size: 14px;
    color: #4e5d6b;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0 2px 4px 0 #e4ebf0;
    & > input {
      flex: 1;
      font-size: 14px;
      color: var(--mainFontColor);
      height: 70%;
    }
    & > p {
      display: inline-block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > b {
      margin-left: 10px;
      font-size: 14px;
      color: #c7cfdb;
      letter-spacing: 0;
    }
  }
  & .san-select {
    background-image: linear-gradient(-180deg, #ffffff 0%, #f7f7f7 96%);
    box-shadow: none;
  }
  & .flex-two-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > label {
      @apply --inputType;
      width: 48%;
      color: var(--mainFontColor);
      & span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    & > label.active {
      background: var(--activeColor);
      border-color: var(--activeColor);
      color: #fff;
    }
  }
  & .flex-three-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > label {
      @apply --inputType;
      width: 30.1%;
      color: var(--mainFontColor);
      & span {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    & > label.active {
      background: var(--activeColor);
      color: #fff;
      border-color: var(--activeColor);
    }
  }
  & .tel {
    border: none;
    display: flex;
    justify-content: space-between;
    background: transparent;
    padding: 0;
    & > div {
      @apply --inputType;
      flex: 1;
      margin-right: 8px;
      & > input {
        padding: 0 10px;
        font-size: 14px;
        width: 100%;
        color: var(--mainFontColor);
      }
    }
    & .cube-btn {
      width: 26.7%;
      padding: 0;
      height: 40px;
      line-height: 40px;
      border: 1px solid transparent;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  & .icon-date {
    width: 16px;
    height: 16px;
    display: flex;
    & img {
      width: 100%;
    }
  }
  & .icon-sel-arrow {
    width: 12px;
    height: 12px;
    display: flex;
    & img {
      width: 100%;
    }
  }
  & .item-checkbox {
    & .cube-checkbox-group {
      height: 40px;
      background: #f5f7f7;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border: none;
      & > div {
        width: 48%;
      }
    }
  }
  & .select_check {
    display: flex;
    & > div:nth-of-type(1) {
      width: 65%;
    }
    & > div:nth-of-type(2) {
      width: 35%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      & .cube-checkbox {
        width: 90%;
        padding: 0 12px;
        height: 40px;
        overflow: hidden;
      }
    }
  }
}
</style>
