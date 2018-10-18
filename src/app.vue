<template>
  <div id="app">
    <div class="g-head">
      <layout-navbar ref="navbar"></layout-navbar>
    </div>
    <div class="g-body">
      <router-view ref="view"></router-view>
    </div>
    <layout-alert/>
    <layout-toast/>
    <layout-loading/>
    <layout-actionsheet/>
    <!-- todo confirm -->
    <!-- todo picker -->
    <!-- todo view box -->
    <!-- todo scroller -->
    <!-- todo webview -->
  </div>
</template>

<i18n>
app@save-success:
  en: Saved Successfully
  zh-CN: 保存成功
</i18n>

<script>
import layoutAlert from '@/layout/alert'
import layoutToast from '@/layout/toast'
import layoutNavbar from '@/layout/navbar'
import layoutLoading from '@/layout/loading'
import layoutActionsheet from '@/layout/actionsheet'
import router from './router'

export default {
  router,
  components: {
    layoutNavbar,
    layoutAlert,
    layoutToast,
    layoutLoading,
    layoutActionsheet
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
    // -webkit-overflow-scrolling: touch;
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
