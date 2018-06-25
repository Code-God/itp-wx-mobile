<template>
  <div class="sans-container-page ITP">
    <SanCard title="评测意义">
      <div class="content">ITP是出血性疾病, 出血是最常见的症状, ITP出血评分可以帮助您认识出血的危险性, 建议您定期评估, 了解自身身体状况。</div>
    </SanCard>
    <ITPFormList></ITPFormList>
    <ITPHistoryPic :list="listBy" :show="show"></ITPHistoryPic>
    <SanCard title="历史纪录">
      <SanHistory :list="list" type="itp"></SanHistory>
    </SanCard>
    <router-link :to="{name: 'Register', query: {formurl: 'http://itp.jsure.com/wx/#/123123'} }">123</router-link>
  </div>
</template>

<script>
import SanCard from "../components/common/SanCard";
import SanHistory from "../components/common/SanHistory";
import ITPFormList from "../components/ITP/ITPFormList";
import ITPHistoryPic from "../components/ITP/ITPHistoryPic";
import eventHub from "../plugins/eventHub";
import {getCustomBleedHistory, delCustomBleedHistory} from "../api";
import mix from "../common/mix";

export default {
  name: "Register",
  created: function () {
    eventHub.$off("delete");
    eventHub.$off("add");
    eventHub.$on("delete", p => {
      delCustomBleedHistory(p).then(data => {
        this.showToastTime("删除成功");
        // this.refreshList(1);
        this.getList({
          pageIndex: 1
        })
      });
    });
    eventHub.$on("add", p => {
      this.getList({
        pageIndex: 1
      });
    });
  },
  data() {
    return {
      list: {},
      listBy: {},
      show: false
    };
  },
  mixins: [mix],
  components: {
    ITPFormList,
    SanHistory,
    ITPHistoryPic,
    SanCard
  },
  methods: {
    // TODO: 暂时未做分页,可以考虑滚动加载
    getList({pageSize, pageIndex}) {
      const promiseList = new Promise((resolve, reject) => {
        getCustomBleedHistory({pageIndex: pageIndex, pageSize: 100}).then(data => {
          resolve(data);
        });
      });
      const promiseSortList = new Promise((resolve, reject) => {
        getCustomBleedHistory({pageIndex: pageIndex, pageSize: 100, SortDire: "asc"}).then(
          data => {
            resolve(data);
          }
        );
      });

      Promise.all([promiseList, promiseSortList]).then((values) => {
        values[0].Items.forEach(item => {
          item.showDetail = false;
        });
        this.list = values[0];
        this.active = true;
        if (values[1].Items.length >= 2) {
          this.show = true;
        } else {
          this.show = false;
        }
        this.listBy = values[1];
        eventHub.$emit('loading', false);
      });
    }
  },
  beforeMount() {
    this.getList({
      pageIndex: 1
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../../static/css/variable.css");

  .ITP {
    @apply --tabStyle;
    & .content {
      background: #ffffff;
      padding: 14px;
      text-align: left;
      font-size: 15px;
      color: #4e5d6b;
      line-height: 24px;
      font-family: PingFangSC-Regular;
    }
  }
</style>
