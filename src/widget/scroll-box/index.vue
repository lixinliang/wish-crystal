<template>
  <div class="scroll-box"
    @touchstart="touchstart">
    <div class="scroll-view" ref="view">
      <div class="scroll-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$refs.view.scrollTop = 1
  },
  methods: {
    touchstart () {
      const { view } = this.$refs
      const { scrollTop, scrollHeight, offsetHeight } = view
      if (scrollTop === 0) {
        view.scrollTop = 1
        return
      }
      if (scrollTop === scrollHeight - offsetHeight) {
        view.scrollTop = scrollHeight - offsetHeight - 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  %full {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .scroll-box {
    @extend %full;
    overflow: hidden;
  }
  .scroll-view {
    @extend %full;
    overflow: scroll;
    overflow-x: hidden;
    padding-right: 12px;
    box-sizing: content-box;
    -webkit-overflow-scrolling: touch;
  }
  .scroll-container {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    padding-bottom: 2px;
    box-sizing: content-box;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }
</style>
