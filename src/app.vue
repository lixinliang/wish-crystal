<template>
  <div id="app" :style="{ 'height': `${$window.screen.height}px` }">
    <layout-under-layer/>
    <transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"      
      @after-leave="onAfterLeave"      
    >
      <router-view ref="view"/>
    </transition>
    <sdk ref="sdk"/>
  </div>
</template>

<script>
import './sdk'
import layoutUnderLayer from '@/layout/under-layer'
import router from './router'
import navigation from './navigation'

const { methods } = navigation

export default {
  router,
  methods,
  components: {
    layoutUnderLayer
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #app {
    margin: 0 auto;
    max-width: 750px;
    overflow: scroll;
    position: relative;
  }
</style>
