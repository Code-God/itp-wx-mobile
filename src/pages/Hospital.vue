<template>
  <div class="sans-container-page hospital">
    <SanCard title="就诊情况">
      <HospitalFormList></HospitalFormList>
    </SanCard>
    <SanCard title="历史纪录">
      <SanHistory :list="list" type="hospital"></SanHistory>
    </SanCard>
  </div>
</template>

<script>
import HospitalFormList from "../components/hospital/HospitalFormList";
import SanHistory from "../components/common/SanHistory";
import SanCard from "../components/common/SanCard";
import eventHub from "../plugins/eventHub";
import {getCustomVisitHistory, delCustomVisitHistory} from "../api";
import http from "../common/http.js";
import mix from "../common/mix";

export default {
  name: "Hospital",
  created: function () {
    eventHub.$off("delete");
    eventHub.$off("add");
    eventHub.$on("delete", p => {
      delCustomVisitHistory(p).then(data => {
        this.showToastTime("删除成功");
        this.refreshList({
          pageIndex: 1
        });
      });
    });
    eventHub.$on("add", p => {
      this.refreshList({
        pageIndex: 1
      });
    });
  },
  data() {
    return {
      list: {},
      pageIndex: 1,
      listAddData: {},
      listItem: []
    };
  },
  mixins: [mix],
  components: {
    HospitalFormList,
    SanHistory,
    SanCard
  },
  methods: {
    refreshList({pageIndex}) {
      getCustomVisitHistory({pageIndex: pageIndex, pageSize: 100}).then(
        data => {
          this.list = data;
          eventHub.$emit('loading', false);
        });
    },
    logout(pageIndex) {
      http.post("weixin/logout").then(data => alert("推出"));
    }
  },
  beforeMount() {
    this.refreshList({
      pageIndex: 1
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../../static/css/variable.css");

  .hospital {
    @apply --tabStyle;
    & > div:nth-of-type(1) {
      min-height: 430px;
    }
    & > div:nth-of-type(2) {
      min-height: 123px;
    }
  }
</style>
