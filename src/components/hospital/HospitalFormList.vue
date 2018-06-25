<template>
<SanFormList>
  <div class="san-item">
    <p class="item-title">确诊时间</p>
    <div class="item-input" @click="openTimerPicker">
      <input name="VisitTime" v-model="VisitTime" v-validate="'required'" v-show="false" />
      <span>{{VisitTime}}</span>
      <span class="icon-date"><img src="../../../static/svg/date.svg" alt=""></span>
    </div>
    <SanTip :disabled="this.errors.has('VisitTime')" :name="VisitTime" :msg="errors.first('VisitTime')" />
  </div>
  <div class="san-item select">
    <p class="item-title">就诊医院</p>
    <div class="item-input" @click="openSearchPopup">
      <input name="HospitalId" v-model="HospitalId" v-validate="'required'" v-show="false" />
      <p class="hospitalName">
        <b v-if="HospitalName">{{HospitalName}}</b>
        <b v-else style="color: #ccc">请选择医院</b>
      </p>
    </div>
    <SanTip :disabled="this.errors.has('HospitalId')" :name="HospitalId" :msg="errors.first('HospitalId')" />
  </div>
  <div class="san-item">
    <p class="item-title">就诊类型</p>
    <div class="flex-three-select">
      <label :class="{'active':VisitType=='1'}">
                    <span @click="chooseType('1')">门诊</span>
                      <input type="radio" value="1" v-model="VisitType" v-show="false" v-validate="'required'" name="VisitType  ">
                  </label>
      <label :class="{'active':VisitType=='2'}">
                    <span @click="chooseType('2')">病房</span>
                    <input type="radio" value="2" v-model="VisitType" v-show="false" v-validate="'required'" name="VisitType">
                  </label>
      <label :class="{'active':VisitType=='3'}">
              <span @click="chooseType('3')">急诊</span>
              <input type="radio" value="3" v-model="VisitType" v-show="false" v-validate="'required'" name="VisitType">
            </label>
    </div>
    <SanTip :disabled="this.errors.has('VisitType')" :name="VisitType" :msg="errors.first('VisitType')" />
  </div>
  <div class="san-item last">
    <cube-button :primary="true" @click="validateBeforeSubmit">确定</cube-button>
  </div>
  <transition name="slide" enter-active-class="slideInDown" leave-active-class="slideOutUp">
    <div class="popup-search" v-if="showPopupSearch">
      <div class="mask" @click="closeSearchPopup"></div>
      <div class="container">
        <div class="top">
          <div class="hostpital-address">
            <div class="item-input san-select" @click="openSelect('provinceId')">
              <input name="provinceId" v-model="provinceId" v-show="false" />
              <span class="ellipsis">
                    {{provinceName}}
                  </span>
              <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
            </div>
            <div class="item-input san-select" @click="openSelect('cityId')">
              <input name="cityId" v-model="cityId" v-show="false" />
              <span class="ellipsis">
                    {{cityName}}
                  </span>
              <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
            </div>
            <div class="item-input">
              <input type="text" name="HospitalSelect" v-model="HospitalSelect" placeholder="请输入医院名称" :disabled="provinceId=='' || cityId==''" />
              <b></b>
              <!-- <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span> -->
            </div>
          </div>
        </div>
        <ul class="content">
          <li v-for="(item,index) in HospitalList" :key="index" @click="selectHospital(item)" :class="{active: item.ID == HospitalSelectObject.ID}">
            {{item.Name}}
          </li>
        </ul>
        <div class="bottom">
          <span @click="closeSearchPopup">取消</span>
          <span @click="submitSearchPopup">确定</span>
        </div>
      </div>
    </div>
  </transition>
</SanFormList>
</template>

<script>
import SanFormList from "../common/SanFormList";
import SanTip from "../common/SanTip";
import {
  getDefaultSelect,
  getDateArr
} from '../../plugins/until';
import {
  getBaseList,
  getHospitalList,
  toHospital
} from "../../api";
import eventHub from "../../plugins/eventHub";
import mix from "../../common/mix";
export default {
  name: "HospitalFormList",
  created() {
    const dict = {
      custom: {
        VisitTime: {
          required: () => "请选择到诊日期"
        },
        HospitalId: {
          required: () => "请选择医院"
        },
        VisitType: {
          required: () => "请选择就诊类型"
        }
      }
    };
    this.$validator.localize("zh", dict);
  },
  data() {
    return {
      VisitTime: getDefaultSelect(),
      VisitType: "",
      provinceId: "",
      provinceName: "省份",
      cityId: "",
      cityName: "城市",
      HospitalId: "",
      HospitalName: "",
      HospitalSelect: "",
      HospitalSelectObject: {},
      HospitalList: [],
      showPopupSearch: false
    };
  },
  components: {
    SanFormList,
    SanTip
  },
  mixins: [mix],
  methods: {
    openTimerPicker() {
      this.datePicker.show();
    },
    openSearchPopup() {
      document.querySelector(".nav-list").style.display = "none";
      // document.querySelector(".sans-container-page").style.paddingTop = "44px";
      this.showPopupSearch = true;
    },
    closeSearchPopup() {
      this.showPopupSearch = false;
      document.querySelector(".nav-list").style.display = "flex";
      // document.querySelector(".sans-container-page").style.paddingTop = "0px";
    },
    submitSearchPopup() {
      this.closeSearchPopup();
      this.HospitalId = this.HospitalSelectObject.ID;
      this.HospitalName = this.HospitalSelectObject.Name;
    },
    selectHospital(p) {
      this.HospitalSelectObject = p;
      this.HospitalSelect = p.Name;
    },
    openSelect(p) {
      if (p === "provinceId") {
        this.provincePicker.show();
      } else if (p === "cityId" && this.provinceId !== "") {
        this.cityPicker.show();
      }
    },
    chooseType(p) {
      this.VisitType = p;
    },
    postData() {
      // 就诊
      const p = {
        VisitTime: this.VisitTime,
        HospitalId: this.HospitalId,
        VisitType: this.VisitType
      };
      toHospital(p).then(data => {
        this.$validator.paused = true;
        this.showToastTime("您已提交成功");
        eventHub.$emit("add");
        this.VisitTime = getDefaultSelect();
        this.VisitType = "";
        this.provinceId = "";
        this.provinceName = "请选择省份";
        this.cityId = "";
        this.cityName = "请选择城市";
        this.HospitalId = "";
        this.HospitalName = "";
        this.HospitalSelect = "";
        this.HospitalSelectObject = {};
        this.HospitalList = [];
        this.showPopupSearch = false;

        this.datePicker = this.$createDatePicker({
          title: "就诊日期",
          min: [2000, 1, 1],
          max: this.VisitTime.split('-'),
          selectedIndex: getDateArr(),
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.VisitTime = `${selectedVal[0]}-${selectedVal[1]}-${
              selectedVal[2]
            }`;
          }
        });
      });
    },
    validateBeforeSubmit() {
      this.$validator.paused = false;
      this.$validator.validateAll().then(result => {
        if (result) {
          // 提交
          this.postData();
        } else {
          this.showToastTime("请填写完整哦！");
        }
      });
    }
  },
  watch: {
    HospitalSelect: function() {
      if (this.provinceId && this.cityId) {
        getHospitalList({
          provinceId: this.provinceId,
          cityId: this.cityId,
          name: this.HospitalSelect
        }).then(data => {
          this.HospitalList = data;
        });
      }
    }
  },
  beforeMount() {
    this.datePicker = this.$createDatePicker({
      title: "就诊日期",
      min: [2000, 1, 1],
      max: this.VisitTime.split('-'),
      selectedIndex: getDateArr(),
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.VisitTime = `${selectedVal[0]}-${selectedVal[1]}-${
          selectedVal[2]
        }`;
      }
    });
    getBaseList({
      type: 1
    }).then(data => {
      this.provincePicker = this.$createPicker({
        title: "省份",
        data: [data],
        swipeTime: 1000,
        alias: {
          value: "Id",
          text: "Name"
        },
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          if (selectedVal[0]) {
            this.provinceId = selectedVal[0];
            this.provinceName = data[selectedIndex[0]].Name;
          }
        },
        onValueChange: (selectedVal, selectedIndex, selectedText) => {
          this.cityId = "";
          this.cityName = "";
          this.HospitalList = [];
          this.HospitalId = "";
          this.HospitalName = "";
          this.HospitalSelect = "";
          this.HospitalSelectObject = {};
          getBaseList({
            type: 2,
            parentId: this.provinceId
          }).then(data => {
            this.cityId = data[0].Id;
            this.cityName = data[0].Name;
            getHospitalList({
              provinceId: this.provinceId,
              cityId: this.cityId
            }).then(data => {
              this.HospitalList = data;
            });
            this.cityPicker = this.$createPicker({
              title: "城市",
              data: [data],
              alias: {
                value: "Id",
                text: "Name"
              },
              onSelect: (selectedVal, selectedIndex, selectedText) => {
                if (selectedVal[0]) {
                  this.cityId = selectedVal[0];
                  this.cityName = data[selectedIndex[0]].Name;
                }
              },
              onValueChange: (selectedVal, selectedIndex, selectedText) => {
                this.HospitalId = "";
                this.HospitalName = "";
                this.HospitalList = [];
                this.HospitalSelect = "";
                this.HospitalSelectObject = {};
                getHospitalList({
                  provinceId: this.provinceId,
                  cityId: this.cityId
                }).then(data => {
                  this.HospitalList = data;
                });
              }
            });
          });
        }
      });
    });
  },
  destroyed() {
    document.querySelector(".nav-list").style.display = "flex";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hostpital-address {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & .item-input:nth-of-type(1) {
    width: 35%;
  }
  & .item-input:nth-of-type(2) {
    width: 60%;
  }
  & .item-input:nth-of-type(3) {
    width: 100%;
    margin-top: 7px;
    & b {
      width: 16px;
      height: 16px;
      background: url("../../../static/svg/search.svg") center no-repeat;
      background-size: 100%;
    }
  }
}

.hospitalName {
  text-align: left;
}

.popup-search {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 99999;
  padding-bottom: 12px;
  display: flex;
  & .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  &>.mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #25262d;
    opacity: 0.4;
  }
  &>.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background: #f5f7f7;
    flex: 1;
    margin: 20px;
    &>div {
      padding: 0 12px;
    }
    & .top {
      padding-top: 12px;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 #e4ebf0;
      position: relative;
      z-index: 1;
      padding-bottom: 12px;
    }
    & .content {
      flex: 1;
      position: relative;
      z-index: 0;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 20px;
      & li {
        line-height: 1.2;
        padding: 16px 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #838f9a;
        letter-spacing: 0;
        border-bottom: 1px solid #e4ebf0;
        text-align: left;
      }
      & li.active {
        color: #0084fb;
      }
    }
    & .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      &>span {
        width: 45.9%;
        height: 44px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        padding: 0;
        border-radius: 4px;
        background: #0084fb;
        border-radius: 4px;
        line-height: 44px;
      }
      &>span:first-child {
        margin-right: 7px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #838f9a;
        letter-spacing: 0;
        text-align: center;
        background: #ffffff;
      }
    }
  }
}
</style>
