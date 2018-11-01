<template>
  <div id="app" :style="{ 'height': `${$window.screen.height}px` }">
    <router-view ref="view"/>
    <sdk/>
  </div>
</template>

<script>
import sdk from './sdk'
import router from './router'

export default {
  router,
  components: {
    sdk
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #app {
    margin: 0 auto;
    max-width: 750px;
    overflow: hidden;
    position: relative;
    background-color: $background-color-normal;
  }
</style>
