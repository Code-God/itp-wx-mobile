<template>
  <div class="sans-container-page pharmacy">
    <SanCard title="用药情况">
      <PharmacyFormList></PharmacyFormList>
    </SanCard>
    <SanCard title="历史纪录">
      <SanHistory :list="list" type="pharmacy"></SanHistory>
    </SanCard>
  </div>
</template>

<script>
import PharmacyFormList from "../components/pharmacy/PharmacyFormList";
import SanHistory from "../components/common/SanHistory";
import SanCard from "../components/common/SanCard";
import eventHub from "../plugins/eventHub";
import {getMedicineHistory, delMedicineHistory} from "../api";

export default {
  name: "Register",
  created: function () {
    eventHub.$off("delete");
    eventHub.$off("add");
    eventHub.$on("delete", id => {
      delMedicineHistory(id).then(data => {
        const toast = this.$createToast({
          time: 1000,
          txt: "删除成功",
          type: "warn"
        });
        toast.show();
        this.refreshList(1);
      });
    });
    eventHub.$on("add", id => {
      this.refreshList(1);
    });
  },
  data() {
    return {
      list: {}
    };
  },
  components: {
    PharmacyFormList,
    SanHistory,
    SanCard
  },
  methods: {
    // 刷新
    refreshList(pageIndex) {
      getMedicineHistory({
        pageIndex: pageIndex,
        pageSize: 100
      }).then(data => {
        data.Items.forEach(item => {
          if (item.MedicineNames) {
            item.MedicineNames = item.MedicineNames.split(",");
          }
        });
        this.list = data;
        eventHub.$emit('loading', false)
      });
    }
  },
  beforeMount() {
    this.refreshList(1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../../static/css/variable.css");

  .pharmacy {
    @apply --tabStyle;
    & > div:nth-of-type(1) {
      min-height: 430px;
    }
    & .mint-tab-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      z-index: 1;
    }
  }
</style>
