<template>
  <div id="app" :style="{ 'height': `${$window.screen.height}px` }">
    <navigation/>
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
    <sdk/>
  </div>
</template>

<script>
import './sdk'
import router from './router'
import navigation from './navigation'

const { methods } = navigation

export default {
  router,
  methods
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
