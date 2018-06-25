<template>
  <div class="score-content">
    <h3>{{time}}</h3>
    <p :class="{
      serious: score==5,
      high: score==4,
      normal: score==3,
      low: score==2,
      no: score==1,
    }">
      <b>{{txt}}</b>
      <span style="text-align: left; line-height: 1.5;padding: 0 10px;font-size: 16px">{{tip}}</span>
    </p>
    <div @click="close">关闭</div>
  </div>
</template>

<script>
import eventHub from "../../plugins/eventHub";
export default {
  name: "ITPResult",
  methods: {
    close() {
      eventHub.$emit("close");
      eventHub.$emit("add");
    }
  },
  computed: {
    time: function() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() * 1 +
        1}-${date.getDate()}`;
    },
    txt: function() {
      if (this.score == 5) {
        return "严重出血（5级）";
      } else if (this.score == 4) {
        return "大量出血（4级）";
      } else if (this.score == 3) {
        return "中度出血（3级）";
      } else if (this.score == 2) {
        return "轻度出血（2级）";
      } else {
        return "无出血（1级）";
      }
    },
    tip: function() {
      if (this.score == 5) {
        return "重症患者建议立即住院治疗！";
      } else if (this.score == 4) {
        return "重症患者建议立即住院治疗！";
      } else if (this.score == 3) {
        return "注意观察出血征象，如出血不止，或因出血量较多，出现面色苍白、脉搏快而弱或者其他身体不适状况时，建议立即到医院治疗。";
      } else if (this.score == 2) {
        return "少量鼻出血可用棉球压迫止血，牙龈渗血时冷水漱口，局部用药，建议必要时候到医院就诊。";
      } else {
        return "请注意预防感冒，避免引起出血的危险因素。";
      }
    }
  },
  props: {
    score: {
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../../static/css/variable.css");
.score-content {
  background: #ffffff;
  padding: 12px;
  & h3 {
    font-family: DIN-Bold;
    font-size: 24px;
    color: #c7cfdb;
    letter-spacing: 0;
  }
  & p {
    width: 240px;
    height: 200px;
    margin: 0 auto;
    background: #ffffff;
    @apply --columnCentered;
    & > b {
      font-family: DIN-Bold;
      font-size: 24px;
      display: inline-block;
      margin-bottom: 16px;
      letter-spacing: 0;
      text-align: center;
    }
    & > span {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      letter-spacing: 0;
      text-align: center;
    }
  }
  & .serious {
    & b {
      color: #e4462c;
    }

  }
  & .high {
    & b {
      color: #f57f23;
    }

  }
  & .normal {
    & b {
      color: #f5ae23;
    }

  }
  & .low {
    & b {
      color: #62cdc9;
    }

  }
  & .no {
    & b {
      color: #62cd75;
    }

  }
}
</style>
