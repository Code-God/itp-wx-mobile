<template>
  <div class="san-tab">
    <div class="tab-native">
      <div v-for="(item , index) in actives" :key="index" :class="{'active': active ===`${item.key}`}" @click="activeChange(item.key)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import eventHub from "../../plugins/eventHub";
export default {
  name: "SanTab",
  data: () => ({}),
  computed: {},
  props: {
    actives: {
      required: true,
      type: Array
    },
    active: {
      required: true,
      type: String
    }
  },
  methods: {
    activeChange(p) {
      eventHub.$emit("change", p);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../../static/css/variable.css");
.san-tab {
  @apply --tabStyle;
  height: 44px;
}
</style>
