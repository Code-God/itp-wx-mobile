<template>
  <SanCard title="出血">
    <SanFormList>
      <div class="san-item">
        <p class="item-title">01. 年龄</p>
        <div class="item-input san-select" @click="openSelect">
          <input name="DiseaseId" v-model="AgeOption" v-validate="'required'" v-show="false" />
          <span>
            {{AgeOptionName}}
          </span>
          <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
        </div>
        <SanTip :disabled="this.errors.has('AgeOption')" :name="AgeOption" :msg="errors.first('AgeOption')" />
      </div>
      <div class="san-item">
        <p class="item-title">02. 皮肤是否出现 瘀点/瘀斑/皮下血肿？</p>
        <input name="Location" type="text" v-model="Location" v-show="false">
        <!-- <div class="item-checkbox">
              <cube-checkbox-group v-model="Loca">
                <cube-checkbox option="1"><i>头面部 <span>✓</span></i></cube-checkbox>
                <cube-checkbox option="2"><i>其他部位 <span>✓</span></i></cube-checkbox>
              </cube-checkbox-group>
            </div> -->
        <div class="flex-two-select">
          <label :class="{'active':Location=='1'}">
            <span @click="choosePosition('1')">无出血</span>
            <input type="radio" value="1" v-model="Location" v-show="false" v-validate="'required'" name="Location">
          </label>
          <label :class="{'active':Location=='2'}">
            <span @click="choosePosition('2')">有出血</span>
            <input type="radio" value="2" v-model="Location" v-show="false" v-validate="'required'" name="Location">
          </label>
        </div>
        <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
          <div class="item-checkbox blood-check" v-show="Location=='2'">
            <p class="tip">请选择出血部位</p>
            <cube-checkbox-group v-model="Loca" class="min_hei">
              <cube-checkbox option="1"><i>头面部 <span>✓</span></i></cube-checkbox>
              <cube-checkbox option="2"><i>其他部位 <span>✓</span></i></cube-checkbox>
            </cube-checkbox-group>
          </div>
        </transition>
        <SanTip :disabled="this.errors.has('Location')" :name="Location" :msg="errors.first('Location')" />
      </div>
      <div class="san-item">
        <p class="item-title">03. 是否出现 鼻衄/牙龈出血/口腔血疱/结膜出血？</p>
        <div class="flex-two-select">
          <label :class="{'active':isSymptomBlood==='1'}">
            <span @click="chooseIsSymptomBlood('1')">无出血</span>
            <input type="radio" value="1" v-model="isSymptomBlood" v-show="false" v-validate="'required'" name="isSymptomBlood">
          </label>
          <label :class="{'active':isSymptomBlood=='2'}">
            <span @click="chooseIsSymptomBlood('2')">有出血</span>
            <input type="radio" value="2" v-model="isSymptomBlood" v-show="false" v-validate="'required'" name="isSymptomBlood">
          </label>
        </div>
        <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
          <div v-show="isSymptomBlood == 2" class="">
          <p class="tip">请选择出血症状</p>
          <div class="select_check">
            <div class="item-input san-select " @click="openSelect('Symptom')">
              <input type="text" v-model="SymptomId" v-show="false" name="SymptomId" >
              <span>
                {{SymptomName}}
              </span>
              <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
            </div>
            <div>
              <cube-checkbox v-model="SymptomLessBlood" >
                伴有贫血 <span>✓</span>
              </cube-checkbox>
            </div>
          </div>
          </div>
        </transition>
        <SanTip :disabled="this.errors.has('isSymptomBlood')" :name="isSymptomBlood" :msg="errors.first('isSymptomBlood')" />
      </div>
      <div class="san-item">
        <p class="item-title">04. 是否存在内脏出血（肺、肠胃道、泌尿生殖系统）？</p>
        <div class="item-input san-select" @click="openSelect('GutSymptom')">
          <input type="text" v-model="GutSymptom" v-show="false" v-validate="'required'" name="GutSymptom">
          <span>
            <b v-if="GutSymptomName">{{GutSymptomName}}</b>
            <b v-else style="color: #ccc">请选择</b>
          </span>
          <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
        </div>
        <SanTip :disabled="this.errors.has('GutSymptom')" :name="GutSymptom" :msg="errors.first('GutSymptom')" />
      </div>
      <div class="san-item">
        <p class="item-title">05. 是否出现中枢系统（大脑、脊髓）出血？</p>
        <div class="item-input san-select" @click="openSelect('CentralSystemBlood')">
          <input type="text" v-model="CentralSystemBlood" v-show="false" v-validate="'required'" name="CentralSystemBlood">
          <span>
            <b v-if="CentralSystemBloodName">{{CentralSystemBloodName}}</b>
            <b v-else style="color: #ccc">请选择</b>
          </span>
          <span class="icon-sel-arrow"><img src="../../../static/svg/sel-arrow.svg" alt=""></span>
        </div>
        <SanTip :disabled="this.errors.has('CentralSystemBlood')" :name="CentralSystemBlood" :msg="errors.first('CentralSystemBlood')" />
      </div>
      <div class="san-item last">
        <cube-button :primary="true" @click="validateBeforeSubmit">开始计算</cube-button>
      </div>
    </SanFormList>
    <cube-popup type="my-popup" ref="myPopup">
      <ITPResult :score="score"></ITPResult>
    </cube-popup>
  </SanCard>
</template>

<script>
import SanCard from "../common/SanCard";
import SanFormList from "../common/SanFormList";
import ITPResult from "../../components/ITP/ITPResult";
import SanTip from "../common/SanTip";
import { compute, getCustom } from "../../api";
import eventHub from "../../plugins/eventHub";
import constant from "../../config/constant";
import mix from "../../common/mix";
let component;
export default {
  name: "ITPFormList",
  created() {
    eventHub.$off("close");
    eventHub.$on("close", () => this.closePo());
    const dict = {
      custom: {
        AgeOption: {
          required: () => "请选择年龄"
        },
        Location: {
          required: () => "请选择皮肤出血位置"
        },
        isSymptomBlood: {
          required: () => "请选择症状出血程度"
        },
        GutSymptom: {
          required: () => "请选择内脏出血程度"
        },
        CentralSystemBlood: {
          required: () => "请选择是否出现中枢系统（大脑、脊髓）出血"
        }
      }
    };
    this.$validator.localize("zh", dict);
  },
  data() {
    return {
      SymptomLessBlood: false,
      AgeOption: "",
      AgeOptionName: "",
      CentralSystemBlood: "",
      CentralSystemBloodName: "",
      Location: "",
      Loca: [],
      isSymptomBlood: "",
      SymptomId: "",
      GutSymptom: "",
      SymptomName: "",
      GutSymptomName: "",
      symptomSelect: false,
      GutSymptomSelect: false,
      LocationHeadFace: false,
      LocationOther: false,
      score: 0
    };
  },
  components: {
    SanFormList,
    SanTip,
    SanCard,
    ITPResult
  },
  mixins: [mix],
  computed: {},
  watch: {
    Location: function() {
      if (this.Location === "1") {
        this.Loca = [];
      }
    },
    isSymptomBlood: function() {
      if (this.isSymptomBlood == 2) {
        this.SymptomLessBlood = false;
      }
    }
  },
  methods: {
    // 弹出窗 操作事件
    openSelect(p) {
      if (p === "Symptom") {
        this.sickPicker.show();
      } else if (p === "GutSymptom") {
        this.bloodPicker.show();
      } else if (p === "CentralSystemBlood") {
        this.CentralSystemBloodPicker.show();
      } else {
        this.agePicker.show();
      }
    },
    closePo() {
      component.hide();
      this.$validator.paused = true;
      this.SymptomLessBlood = false;
      this.CentralSystemBlood = "";
      this.CentralSystemBloodName = "";
      this.Location = "";
      this.Loca = [];
      this.SymptomId = "";
      this.GutSymptom = "";
      this.SymptomName = "";
      this.GutSymptomName = "";
      this.symptomSelect = false;
      this.GutSymptomSelect = false;
      this.LocationHeadFace = false;
      this.LocationOther = false;
      this.score = 0;
      this.isSymptomBlood = "";
    },
    chooseIsSymptomBlood(p) {
      this.isSymptomBlood = p;
    },
    choosePosition(p) {
      this.Location = p;
    },
    postData() {
      if (this.Location == 2) {
        this.Loca.forEach(element => {
          if (element == 1) {
            this.LocationHeadFace = true;
          } else if (element == 2) {
            this.LocationOther = true;
          }
        });
      }
      const p = {
        AgeOption: this.AgeOption,
        LocationHeadFace: this.LocationHeadFace,
        LocationOther: this.LocationOther,
        Symptom:
          this.isSymptomBlood == 1 ? Number(this.isSymptomBlood) : this.SymptomId,
        GutSymptom: this.GutSymptom,
        CentralSystemBlood: Number(this.CentralSystemBlood),
        SymptomLessBlood: this.SymptomLessBlood
      };
      console.log(p);
      compute(p).then(data => {
        this.score = data;
        component.show();
      });
    },
    validateBeforeSubmit() {
      this.$validator.paused = false;
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // 提交
          if (this.Location == 2 && this.Loca.length <= 0) {
            this.showToastTime("请选择出血部位");
            return;
          }
          if (this.isSymptomBlood == 2 && this.SymptomId == "") {
            this.showToastTime("请选择出血症状");
            return;
          }
          this.postData();
        } else {
          this.showToastTime("请填写完整哦！");
        }
      });
    }
  },
  beforeMount() {
    getCustom()
      .then(({ Age }) => {
        let a = 0;
        if (Age < 65) {
          this.AgeOption = 1;
          a = 1;
        } else if (Age >= 75) {
          this.AgeOption = 3;
          a = 3;
        } else {
          this.AgeOption = 2;
          a = 2;
        }
        this.AgeOptionName = constant.age[this.AgeOption - 1].Name;
        this.agePicker = this.$createPicker({
          title: "",
          data: [constant.age],
          swipeTime: 1000,
          alias: {
            value: "Id",
            text: "Name"
          },
          selectedIndex: [a - 1],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            if (selectedVal[0]) {
              this.AgeOption = selectedVal[0];
              this.AgeOptionName = constant.age[selectedIndex[0]].Name;
            }
          }
        });
      })
      .catch(error => {
        console.log(error);
        this.agePicker = this.$createPicker({
          title: "",
          swipeTime: 1000,
          data: [constant.age],
          alias: {
            value: "Id",
            text: "Name"
          },
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            if (selectedVal[0]) {
              this.AgeOption = selectedVal[0];
              this.AgeOptionName = constant.age[selectedIndex[0]].Name;
            }
          }
        });
      });
    this.sickPicker = this.$createPicker({
      title: "",
      data: [constant.bloodSymptom],
      alias: {
        value: "Id",
        text: "Name"
      },
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        if (selectedVal[0]) {
          this.SymptomId = selectedVal[0];
          this.SymptomName = constant.bloodSymptom[selectedIndex[0]].Name;
        }
      }
    });
    this.bloodPicker = this.$createPicker({
      title: "",
      swipeTime: 1000,
      data: [constant.gutSymptom],
      alias: {
        value: "Id",
        text: "Name"
      },
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        if (selectedVal[0]) {
          this.GutSymptom = selectedVal[0];
          this.GutSymptomName = constant.gutSymptom[selectedIndex[0]].Name;
        }
      }
    });
    this.CentralSystemBloodPicker = this.$createPicker({
      title: "",
      swipeTime: 1000,
      data: [constant.centralSystemBlood],
      alias: {
        value: "Id",
        text: "Name"
      },
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        if (selectedVal[0]) {
          this.CentralSystemBlood = selectedVal[0];
          this.CentralSystemBloodName = constant.centralSystemBlood[selectedIndex[0]].Name;
        }
      }
    });
  },
  mounted() {
    component = this.$refs["myPopup"];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tip {
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  text-align: left;
  line-height: 20px;
  font-size: 14px;
  color: #838f9a;
  letter-spacing: 0;
}
.cube-checkbox {
  height: 40px;
}
</style>
