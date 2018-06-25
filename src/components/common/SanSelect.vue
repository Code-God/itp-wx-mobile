<template>
  <div class="san-selected">

  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      popupVisible: "false"
    };
  },
  computed: {
  },
  methods: {
    openSelect() {
      this.popupVisible = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.san-bottom-popup{
  width: 100%;
}
</style>
