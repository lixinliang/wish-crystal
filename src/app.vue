<template>
  <div id="app" :style="{ 'height': `${$window.screen.height}px` }">
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

const duration = 200

let taskAfterEnter = window.util.promise()
let taskAfterLeave = window.util.promise()

export default {
  router,
  data () {
    return {
      direction: 'none'
    }
  },
  created () {
    window.$event.on('navigation:direction', async ({ direction, resolve }) => {
      this.direction = direction
      taskAfterEnter = window.util.promise()
      taskAfterLeave = window.util.promise()
      await Promise.all([taskAfterEnter.promise, taskAfterLeave.promise])
      resolve()
    })
  },
  methods: {
    onBeforeEnter (el) {
      if (this.direction === 'none') {
        return
      }
      if (this.direction === 'push') {
        el.classList.add('navigation-push-enter-start')
      }
      if (this.direction === 'pop') {
        el.classList.add('navigation-pop-enter-start')
      }
      // trick repaint
      el.offsetTop
    },
    async onEnter (el, done) {
      if (this.direction === 'none') {
        done()
        return
      }
      if (this.direction === 'push') {
        el.classList.add('navigation-push-enter-end')
      }
      if (this.direction === 'pop') {
        el.classList.add('navigation-pop-enter-end')
      }
      el.classList.add('navigation-animate')
      await window.util.sleep(duration)
      done()
    },
    onAfterEnter (el) {
      if (this.direction === 'none') {
        taskAfterEnter.resolve()
        return
      }
      if (this.direction === 'push') {
        el.classList.remove('navigation-push-enter-start')
        el.classList.remove('navigation-push-enter-end')
      }
      if (this.direction === 'pop') {
        el.classList.remove('navigation-pop-enter-start')
        el.classList.remove('navigation-pop-enter-end')
      }
      el.classList.remove('navigation-animate')
      taskAfterEnter.resolve()
    },
    onBeforeLeave (el) {
      if (this.direction === 'none') {
        return
      }
      if (this.direction === 'push') {
        el.classList.add('navigation-push-leave-start')
      }
      if (this.direction === 'pop') {
        el.classList.add('navigation-pop-leave-start')
      }
      // trick repaint
      el.offsetTop
    },
    async onLeave (el, done) {
      if (this.direction === 'none') {
        done()
        return
      }
      if (this.direction === 'push') {
        el.classList.add('navigation-push-leave-end')
      }
      if (this.direction === 'pop') {
        el.classList.add('navigation-pop-leave-end')
      }
      el.classList.add('navigation-animate')
      await window.util.sleep(duration)
      done()
    },
    onAfterLeave (el) {
      if (this.direction === 'none') {
        taskAfterLeave.resolve()
        return
      }
      if (this.direction === 'push') {
        el.classList.remove('navigation-push-leave-start')
        el.classList.remove('navigation-push-leave-end')
      }
      if (this.direction === 'pop') {
        el.classList.remove('navigation-pop-leave-start')
        el.classList.remove('navigation-pop-leave-end')
      }
      el.classList.remove('navigation-animate')
      taskAfterLeave.resolve()
    }
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

<style lang="scss" scoped>
  $duration: 200;
  @mixin front {
    z-index: 1;
  }
  @mixin back {
    z-index: 0;
  }
  @mixin left {
    transform: translate3d(-100% ,0, 0);
  }
  @mixin center {
    transform: translate3d(0 ,0, 0);
  }
  @mixin right {
    transform: translate3d(100% ,0, 0);
  }
  @mixin unreactive {
    pointer-events: none;
  }
  .navigation-animate {
    transition: transform $duration * 1ms linear;
  }
  .navigation-push-enter-start {
    @include right;
    @include front;
    @include unreactive;
  }
  .navigation-push-enter-end {
    @include center;
    @include front;
  }
  .navigation-push-leave-start {
    @include center;
    @include back;
    @include unreactive;
  }
  .navigation-push-leave-end {
    @include left;
    @include back;
  }
  .navigation-pop-enter-start {
    @include left;
    @include back;
    @include unreactive;
  }
  .navigation-pop-enter-end {
    @include center;
    @include back;
  }
  .navigation-pop-leave-start {
    @include center;
    @include front;
    @include unreactive;
  }
  .navigation-pop-leave-end {
    @include right;
    @include front;
  }
</style>
