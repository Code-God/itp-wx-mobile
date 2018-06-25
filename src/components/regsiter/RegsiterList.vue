<template>
  <SanFormList>
    <div class="san-item">
      <p class="item-title">姓名</p>
      <div class="item-input">
        <input name="FullName" v-validate="{required:true, min:2 , isChinese: true}" data-vv-as="姓名" type="text" placeholder="姓名" v-model="FullName">
      </div>
      <SanTip :disabled="errors.has('FullName')" :name="FullName" :msg="errors.first('FullName')" />
    </div>
    <div class="san-item">
      <p class="item-title">性别</p>
      <div class="flex-two-select">
        <label :class="{'active':Sex=='1'}">
          <span @click="choose('1')">男</span>
          <input type="radio" value="1" v-model="Sex" v-show="false" v-validate="'required'" name="Sex">
        </label>
        <label :class="{'active':Sex=='2'}">
          <span @click="choose('2')">女</span>
          <input type="radio" value="2" v-model="Sex" v-show="false" v-validate="'required'" name="Sex">
        </label>
      </div>
      <SanTip :disabled="this.errors.has('Sex')" :name="Sex" :msg="errors.first('Sex')" />
    </div>
    <div class="san-item date-picker">
      <p class="item-title">生日</p>
      <div class="item-input" @click="openBirthdayPicker">
        <span>{{Birthday}}</span>
        <span class="icon-date"><img src="../../../static/svg/date.svg" alt=""></span>
      </div>
      <SanTip :disabled="this.errors.has('Birthday')" :name="Birthday" :msg="errors.first('Birthday')" />
    </div>
    <div class="san-item">
      <p class="item-title">疾病</p>
      <div class="item-input san-select" @click="openSelect">
        <input name="DiseaseId" v-model="DiseaseId" v-validate="'required'" v-show="false"  />
        <span>
          {{DiseaseValue}}
        </span>
        <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
      </div>
      <SanTip :disabled="this.errors.has('DiseaseId')" :name="DiseaseId" :msg="errors.first('DiseaseId')" />
    </div>
    <div class="san-item">
      <p class="item-title">手机号</p>
      <div class="item-input tel">
        <div>
          <input type="number" name="Mobile" v-validate="'required|isTel'" v-model="Mobile">
        </div>
        <cube-button :primary="true" @click="getCode" :disabled="errors.has('Mobile') || Mobile ==='' || isGetCode">{{codeText}}</cube-button>
      </div>
      <SanTip :disabled="this.errors.has('Mobile')" :name="Mobile" :msg="errors.first('Mobile')" />
    </div>
    <div class="san-item">
      <p class="item-title">验证码</p>
      <div class="item-input">
        <input name="Code" type="number" v-validate="{required:true,digits: 6}" v-model="Code">
      </div>
      <SanTip :disabled="this.errors.has('Code')" :name="Code" :msg="errors.first('Code')" />
    </div>
    <div class="san-item last">
      <cube-button :primary="true" @click="validateBeforeSubmit">注册</cube-button>
    </div>
  </SanFormList>
</template>

<script>
import SanFormList from "../common/SanFormList";
import SanTip from "../common/SanTip";
import { register, MobileVerifyCode } from "../../api";
import constant from "../../config/constant";
import mix from "../../common/mix";
export default {
  name: "RegisterList",
  components: {
    SanFormList,
    SanTip
  },
  created() {
    // 获取url，
    const dict = {
      custom: {
        FullName: {
          required: field => "请输入" + field
        },
        Birthday: {
          required: () => "请选择您的出生日期"
        },
        DiseaseId: {
          required: () => "请选择您的疾病"
        },
        Mobile: {
          required: field => "请输入手机号"
        },
        Code: {
          required: () => "请输入验证码",
          digits: () => "请输入正确的验证码"
        },
        Sex: {
          required: field => "请选择性别"
        }
      }
    };
    this.$validator.localize("zh", dict);
  },
  data() {
    return {
      // 表单
      FullName: "",
      Birthday: "",
      DiseaseId: "",
      Mobile: "",
      Code: "",
      Sex: "",
      // 验证码
      DiseaseValue: "",
      DselectedIndex: [],
      codeText: "获取验证码",
      codeNumber: 60,
      codeTime: null,
      isGetCode: false
    };
  },
  computed: {},
  mixins: [mix],
  methods: {
    openBirthdayPicker() {
      this.datePicker.show();
    },
    openSelect() {
      this.picker.show();
    },
    choose(p) {
      this.Sex = p;
    },
    postData() {
      const p = {
        FullName: this.FullName,
        Birthday: this.Birthday,
        DiseaseId: this.DiseaseId,
        Mobile: this.Mobile,
        Code: this.Code,
        Sex: this.Sex
      };
      register(p)
        .then(data => {
          this.$router.push("/registerResult");
        })
        .catch(error => {
          this.showToastTime(error.response.data);
        });
    },
    getCode() {
      this.isGetCode = true;
      MobileVerifyCode({
        Mobile: this.Mobile
      });
      if (this.isGetCode) {
        clearInterval(this.codeTime);
        this.codeText = `${this.codeNumber}S`;
        this.codeTime = setInterval(() => {
          this.codeNumber--;
          this.codeText = `${this.codeNumber}S`;
          if (this.codeNumber <= 0) {
            this.codeText = `获取验证码`;
            this.codeNumber = 60;
            this.isGetCode = false;
            clearInterval(this.codeTime);
          }
        }, 1000);
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // 提交
          this.postData();
        } else {
          this.showToastTime("信息还没填完整哦！");
        }
      });
    }
  },
  beforeMount() {
    // 组装数据
    this.datePicker = this.$createDatePicker({
      title: "出生日期",
      min: [1920, 1, 1],
      max: [2020, 12, 31],
      selectedIndex: [30, 0, 0],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.Birthday = `${selectedVal[0]}-${selectedVal[1]}-${selectedVal[2]}`;
      }
    });
    this.picker = this.$createPicker({
      title: "疾病",
      swipeTime: 1000,
      data: [constant.disease],
      alias: {
        value: "Id",
        text: "Name"
      },
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        if (selectedVal[0]) {
          this.DiseaseId = selectedVal[0];
          this.DiseaseValue = constant.disease[selectedIndex[0]].Name;
        }
      }
    });
  }
};
</script>
