<template>
  <SanFormList>
    <div class="san-item date-picker">
      <p class="item-title">就诊日期</p>
      <div class="item-input" @click="openTimerPicker">
        <input name="VisitTime" v-model="VisitTime" v-validate="'required'" v-show="false"/>
        <span>{{VisitTime}}</span>
        <span class="icon-date"><img src="../../../static/svg/date.svg" alt=""></span>
      </div>
      <SanTip :disabled="this.errors.has('VisitTime')" :name="VisitTime" :msg="errors.first('VisitTime')"/>
    </div>
    <div class="san-item">
      <p class="item-title">血小板计数</p>
      <div class="item-input">
        <input type="number" name="BloodCellsCount" v-model="BloodCellsCount"
               v-validate="{required:true,min_value:0,max_value:1000,isDig:true}" placeholder="请输入">
        <b>×10^9/L</b>
      </div>
      <p class="tip">血小板计数为100×10^9/L通常称为10万血小板</p>
      <SanTip :disabled="this.errors.has('BloodCellsCount')" :name="BloodCellsCount"
              :msg="errors.first('BloodCellsCount')"/>
    </div>
    <div class="san-item">
      <p class="item-title">是否切脾</p>
      <div class="flex-two-select">
        <label :class="{'active':IsCut==='yes'}">
          <span @click="choose('yes')">是</span>
          <input type="radio" value="yes" v-model="IsCut" v-show="false" v-validate="'required'" name="IsCut">
        </label>
        <label :class="{'active':IsCut=='no'}">
          <span @click="choose('no')">否</span>
          <input type="radio" value="no" v-model="IsCut" v-show="false" v-validate="'required'" name="IsCut">
        </label>
      </div>
      <SanTip :disabled="this.errors.has('IsCut')" :name="IsCut" :msg="errors.first('IsCut')"/>
    </div>
    <div class="san-item">
      <p class="item-title">是否用药</p>
      <div class="flex-two-select">
        <label :class="{'active':IsUseMedicine==='yes'}">
          <span @click="chooseMedicne('yes')">是</span>
          <input type="radio" value="yes" v-model="IsUseMedicine" v-show="false" v-validate="'required'"
                 name="IsUseMedicine">
        </label>
        <label :class="{'active':IsUseMedicine==='no'}">
          <span @click="chooseMedicne('no')">否</span>
          <input type="radio" value="no" v-model="IsUseMedicine" v-show="false" v-validate="'required'"
                 name="IsUseMedicine">
        </label>
      </div>
      <SanTip :disabled="this.errors.has('IsUseMedicine')" :name="IsUseMedicine" :msg="errors.first('IsUseMedicine')"/>
    </div>
    <div>
    </div>

    <transition name="bounce"
                enter-active-class="bounceInLeft"
                leave-active-class="bounceOutRight">
      <div v-if="IsUseMedicine==='yes'" class="useME">
        <cube-checkbox-group class="useMedicine" v-model="MedicineIds">
          <cube-checkbox v-for="item in MedicineIdsOptions" :key="item.value" :option="item.value"><i>{{item.label}} <span>✓</span></i>
          </cube-checkbox>
        </cube-checkbox-group>
        <div class="other item-input">
          <input type="text" placeholder="其他" class="other" v-model="OtherMedicine">
        </div>
      </div>
    </transition>
    <div class="san-item last">
      <cube-button :primary="true" @click="validateBeforeSubmit">确定</cube-button>
    </div>
  </SanFormList>
</template>

<script>
import SanFormList from "../common/SanFormList";
import SanTip from "../common/SanTip";
import {medicine} from "../../api";
import eventHub from "../../plugins/eventHub";
import constant from "../../config/constant";
import mix from "../../common/mix";
import {getDateArr, getDefaultSelect} from '../../plugins/until'
export default {
  name: "PharmacyFormList",
  created() {
    const dict = {
      custom: {
        VisitTime: {
          required: () => "请选择就诊日期"
        },
        BloodCellsCount: {
          required: () => "请输入血小板计数",
          min_value: () => "不得低于0",
          max_value: () => "不得超过1000"
        },
        IsCut: {
          required: () => "请选择是否切脾"
        },
        IsUseMedicine: {
          required: () => "请选择是否用药"
        }
      }
    };
    this.$validator.localize("zh", dict);
  },
  data() {
    return {
      MedicineIdsOptions: constant.MedicineIds,
      MedicineIds: [],
      // DselectedIndex: [],
      VisitTime: getDefaultSelect(),
      BloodCellsCount: "",
      IsCut: "",
      IsUseMedicine: "",
      OtherMedicine: ""
    };
  },
  components: {
    SanFormList,
    SanTip
  },
  mixins: [mix],
  watch: {
    BloodCellsCount: function () {
      if (this.BloodCellsCount != "") {
        this.$validator.paused = false;
      }
    }
  },
  methods: {
    openTimerPicker() {
      this.datePicker.show();
    },
    openSelect() {
      this.picker.show();
    },
    choose(p) {
      this.IsCut = p;
    },
    chooseMedicne(p) {
      this.IsUseMedicine = p;
    },
    postData() {
      const p = {
        VisitTime: this.VisitTime,
        IsCut: this.IsCut === "yes" ? "true" : "false",
        BloodCellsCount: this.BloodCellsCount,
        IsUseMedicine: this.IsUseMedicine === "yes" ? "true" : "false",
        MedicineIds: this.MedicineIds,
        OtherMedicine: this.OtherMedicine
      };
      medicine(p).then(data => {
        this.showToastTime("您已成功提交！");
        this.$validator.paused = true;
        this.MedicineIds = [];
        this.BloodCellsCount = "";
        this.IsCut = "";
        this.IsUseMedicine = "";
        this.OtherMedicine = "";
        this.VisitTime = getDefaultSelect();
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
        eventHub.$emit("add");
      });
      // eventHub.$emit("change", 'history');
    },
    validateBeforeSubmit() {
      this.$validator.paused = false;
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // 提交
          if (this.IsUseMedicine === "yes") {
            if (this.MedicineIds.length <= 0 && this.OtherMedicine === "") {
              this.showToastTime("请至少选择一种药物");
              return;
            }
          }
          this.postData();
        } else {
          this.showToastTime("请填写完整哦！");
        }
      });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip {
    font-family: PingFangSC-Regular;
    text-align: left;
    line-height: 20px;
    font-size: 12px;
    color: #838f9a;
    letter-spacing: 0;
  }

  .useMedicine {
    padding-top: 12px;
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f5;
    justify-content: space-between;
    & > div {
      margin: 8px 0;
      width: 48%;
    }
    & .cube-checkbox {
      padding: 0;
    }
  }

  .useME {
    padding: 0 12px;
    .other {
      display: flex;
      justify-content: center;
      align-item: center;
      color: #333;
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
      & > input {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
