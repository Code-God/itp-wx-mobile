<template>
  <div>
    <div class="scorll-content" v-if="show">
      <ul v-if="type==='itp'" class="san-history itp">
        <li class="history-item" v-for="(item,index) in list.Items" :key="index">
          <div class="title">
            <span class="dateTime">{{item.CreateTimeFormat}}</span>
            <span class="dengji" :class="{
              serious: item.Result==5,
              high: item.Result==4,
              normal: item.Result==3,
              low: item.Result==2,
              no: item.Result==1,
            }">{{getTxt(item.Result)}}</span>
            <span class="more" @click="showDetail(item)">{{item.showDetail?'收起详情':'展开详情'}}<img src="../../../static/svg/arrow03.svg" alt="" :class="{
                      active:item.showDetail
                    }"></span>
            <span class="delete" @click="deleteId(item.ID)"></span>
          </div>
          <!-- <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOutUp"> -->
          <ul class="content" v-show="item.showDetail">
            <li>
              <h3><span>01.</span>年龄</h3>
              <p>{{item.AgeOptionString}}</p>
            </li>
            <li>
              <h3><span>02.</span>皮肤是否出现 瘀点/瘀斑/皮下血肿?</h3>
              <p>{{item.BleedLocation}}</p>
            </li>
            <li>
              <h3><span>03.</span>是否出现 鼻衄/牙龈出血/口腔血疱／结膜出血?</h3>
              <p>{{item.SymptomString}}{{item.SymptomString=="无出血"?'/':''}}{{item.SymptomLessBloodString}}</p>
            </li>
            <li>
              <h3><span>04.</span>是否存在内脏出血？</h3>
              <p>{{item.GutSymptomString?item.GutSymptomString:'请选择'}}</p>
            </li>
            <li>
              <h3><span>05.</span>是否出现中枢系统出血？</h3>
              <p>{{item.CentralSystemBloodString}}</p>
            </li>
          </ul>
          <!-- </transition> -->
        </li>
      </ul>
      <ul v-if="type === 'pharmacy'" class="san-history ">
        <li class="history-item" v-for="(item,index) in list.Items" :key="index">
          <div class="title hor-flex">
            <span class="dateTime">{{item.VisitTime}}</span>
            <span class="delete" @click="deleteId(item.ID)"></span>
          </div>
          <div class="content">
            <div class=" hor-content flex-three ">
              <div>
                <h3>血小板计数</h3>
                <p>{{item.BloodCellsCount}}×10^9/L</p>
              </div>
              <div>
                <h3>是否切脾</h3>
                <p>{{item.IsCutString}}</p>
              </div>
              <div>
                <h3>目前是否用药</h3>
                <p>{{item.IsUseMedicineString}}</p>
              </div>
            </div>
            <div class="content-bottom" v-if="item.MedicineNames && item.MedicineNames.length>0">
              <h3>所用药物</h3>
              <div>
                <span v-for="(meItem,index) in item.MedicineNames" :key="index">{{meItem}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="type==='hospital'" class="san-history hospital">
        <li class="history-item" v-for="(item,index) in list.Items" :key="index">
          <div class="title hor-flex">
            <span class="dateTime">{{item.VisitTime}}</span>
            <span class="delete" @click="deleteId(item.ID)"></span>
          </div>
          <div class="content hor-content flex-two">
            <div>
              <h3>就诊医院</h3>
              <p>{{item.HospitalName}}</p>
            </div>
            <div>
              <h3>就诊类型</h3>
              <p>{{item.VisitTypeName}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-if="!show">
      <img src="../../../static/svg/noData.svg" alt="">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import eventHub from "../../plugins/eventHub";
export default {
  name: "SanHistory",
  data() {
    return {
      show: true
    };
  },
  components: {},
  computed: {},
  props: {
    list: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: String
    }
  },
  watch: {
    list: function() {
      if (this.list.Items.length > 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    getTxt(s) {
      if (s === 5) {
        return "严重出血（5级）";
      } else if (s === 4) {
        return "大量出血（4级）";
      } else if (s === 3) {
        return "中度出血（3级）";
      } else if (s === 2) {
        return "轻度出血（2级）";
      } else {
        return "无出血（1级）";
      }
    },
    deleteId(id) {
      this.$createDialog({
        type: "alert",
        title: "确定要删除？",
        icon: "cubeic-warn",
        showClose: true,
        onConfirm: function() {
          eventHub.$emit("delete", id);
        }
      }).show();
    },
    showDetail(p) {
      p.showDetail = !p.showDetail;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scorll-content {
  overflow: hidden;
}
.cube-dialog-icon i {
  padding: 0 !important;
}
.san-history {
  & .history-item {
    min-height: 60px;
    padding: 0 12px;
    & .hor-flex {
      justify-content: space-between !important;
    }
    & > div:nth-of-type(1) {
      min-height: 60px;
      align-items: center;
      display: flex;
      justify-content: flex-start;
      & .dateTime {
        font-family: DIN-Bold;
        font-size: 14px;
        color: #4e5d6b;
        letter-spacing: 0;
        margin-right: 25px;
        font-weight: bold;
      }
      & .dengji {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        letter-spacing: 0;
        flex: 1;
        text-align: left;
      }
      & .more {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4e5d6b;
        letter-spacing: 0;
        display: flex;
        align-items: center;
        & img.active {
          transform: rotateZ(180deg);
        }
      }
      & .delete {
        margin-left: 4%;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../static/svg/delete.svg") no-repeat center;
      }
      & .serious {
        color: #e4462c;
      }
      & .high {
        color: #f57f23;
      }
      & .normal {
        color: #f5ae23;
      }
      & .low {
        color: #62cdc9;
      }
      & .no {
        color: #62cd75;
      }
    }
    & .content {
      border: 1px solid #e4ebf0;
      border-radius: 4px;
      & li {
        overflow: hidden;
        height: 68px;
        border-bottom: 1px solid #e4ebf0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 17px;
      }
      & li:last-child {
        border-bottom: none;
      }
      & li > h3 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4e5d6b;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 4px;
        line-height: 1.5;
        & > span {
          font-family: DIN-Medium;
          display: inline-block;
          width: 22px;
        }
      }
      & li > p {
        padding-left: 22px;
        line-height: 1.5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #0084fb;
        letter-spacing: 0;
        text-align: left;
      }
    }
    & .hor-content {
      display: flex;
      height: 80px;
      & > div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-right: 1px solid #e4ebf0;
        & h3 {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #4e5d6b;
          letter-spacing: 0;
          text-align: center;
          margin-bottom: 12px;
        }
        & p {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #0084fb;
          letter-spacing: 0;
          text-align: center;
        }
      }
      & > div:last-child {
        border-right: none;
      }
    }
    & .flex-two {
      & > div:nth-of-type(1) {
        flex: 1;
      }
      & > div:nth-of-type(2) {
        width: 27%;
      }
    }
    & .flex-three {

      & > div {
        flex: 1;
      }
    }
    & .content-bottom {
      border-top: 1px solid #e4ebf0;
      padding: 0 20px 10px 20px;
      & > h3 {
        margin: 15px 0;
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #4e5d6b;
        letter-spacing: 0;
      }
      & > div {
        display: flex;
        flex-wrap: wrap;
        & > span {
          ont-family: PingFangSC-Regular;
          font-size: 14px;
          margin-bottom: 10px;
          color: #0084fb;
          letter-spacing: 0;
          padding: 0 16px;
          background: url("../../../static/svg/medicine-his.svg") left center
            no-repeat;
          background-size: 12px 12px;
        }
      }
    }
  }
}
.no-data {
  padding: 40px 0;
  & p {
    font-size: 14px;
    color: #d8d8d8;
  }
}
</style>
