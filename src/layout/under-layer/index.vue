<template>
  <div class="layout-under-layer" :style="style">
    <widget-background-color/>
    <div class="header" :style="{ 'padding-bottom': `${thickness}px` }">
      <div class="header-view">
        <widget-background-color :color="'#35495e'"/>
      </div>
    </div>
  </div>
</template>

<script>
import widgetBackgroundColor from '@/widget/background-color'

const thickness = 20

export default {
  components: {
    widgetBackgroundColor
  },
  data () {
    return {
      thickness
    }
  },
  computed: {
    top () {
      return -thickness
    },
    left () {
      return -thickness
    },
    width () {
      return window.screen.width + thickness * 2
    },
    height () {
      return window.screen.height + thickness * 2
    },
    style () {
      const {
        top,
        left,
        width,
        height
      } = this
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-under-layer {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      pointer-events: none;
      .header {
        top: 0;
        left: 0;
        width: 100%;
        position: absolute;
        box-sizing: content-box;
        .header-view {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
    }
</style>


<style lang="scss">
  @import '~@/global';
  .layout-under-layer {
    .header {
      height: $navbar + $ios-status-bar;
    }
  }
  html.iphonex {
    .layout-under-layer {
      .header {
        height: $navbar + $ios-status-bar + $iphonex-status-bar;
      }
    }
  }
</style>
