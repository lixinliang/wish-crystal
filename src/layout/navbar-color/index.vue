<template>
  <div class="layout-navbar-color">
    <widget-background-color :color="'#35495e'"/>
  </div>
</template>

<script>
import widgetBackgroundColor from '@/widget/background-color'
export default {
  components: {
    widgetBackgroundColor
  },
}
</script>

<style lang="scss" scoped>
  .layout-navbar-color {
      top: 0;
      left: 0;
      width: 100%;
      position: absolute;
      pointer-events: none;
      $zindex: 110; // 导航颜色占位
      z-index: $zindex;
    }
</style>

<style lang="scss">
  @import '~@/global';
  .layout-navbar-color {
    height: $navbar + $ios-status-bar;
  }
  html.iphonex {
    .layout-navbar-color {
      height: $navbar + $ios-status-bar + $iphonex-status-bar;
    }
  }
</style>
