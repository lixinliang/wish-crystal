<template>
  <div id="app">
    <div class="g-head" @touchmove.stop.prevent>
      <layout-navbar ref="navbar"></layout-navbar>
    </div>
    <div class="g-body">
      <router-view ref="view"></router-view>
    </div>
  </div>
</template>

<i18n>
app@save-success:
  en: Saved Successfully
  zh-CN: 保存成功
app@create-success:
  en: Created Successfully
  zh-CN: 创建成功
</i18n>

<script>
import sdk from './sdk'
import router from './router'

console.log(sdk)

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
    height: 100%;
    margin: 0 auto;
    max-width: 750px;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    background-color: $background-color-normal;
    .g-head {
      height: 0;
      position: relative;
      z-index: 1;
    }
    .g-body {
      height: 100%;
      position: relative;
    }
  }
</style>
