<template>
  <div class="sans-container-page">
    <RegisterList/>
  </div>
</template>

<script>
import RegisterList from "../components/regsiter/RegsiterList.vue";
import { urldecode } from '../plugins/until';
import eventHub from '../plugins/eventHub'
export default {
  name: "Register",
  components: {
    RegisterList
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.query.fromurl) {
      const url = urldecode(to.query.fromurl);
      const a = /[^#]+\/#/i;
      localStorage.setItem("sanFormUrl", JSON.stringify(url.replace(a, "")));
    }
    next();
  },
  mounted() {
    eventHub.$emit('loading', false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
