export default {
  methods: {
    showToastTime(txt) {
      this.$createDialog({
        type: 'alert',

        content: txt,
        icon: 'cubeic-alert'
      }).show()
    }
  }
}
