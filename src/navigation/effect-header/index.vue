<template>
  <div class="navigation-effect-header" :style="{ 'transition': `opacity ${duration}ms ease` }">
    <slot/>
  </div>
</template>

<script>
import duration from '../duration'

export default {
  data () {
    return {
      duration
    }
  }
}
</script>

<style lang="scss" scoped>
  .navigation-effect-header {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>

<style lang="scss">
  @mixin show {
    opacity: 1;
  }
  @mixin hide {
    opacity: 0;
  }
  @mixin normal {
    $zindex: 120; // 导航动画 header 普通状态
    z-index: $zindex;
  }
  @mixin below {
    $zindex: 121; // 导航动画 header 底层状态
    z-index: $zindex;
  }
  @mixin above {
    $zindex: 122; // 导航动画 header 上层状态
    z-index: $zindex;
  }
  .navigation-effect-header {
    @include normal;
  }
  .navigation-push-enter-start {
    .navigation-effect-header {
      @include hide;
      @include above;
    }
  }
  .navigation-push-enter-end {
    .navigation-effect-header {
      @include show;
      @include above;
    }
  }
  .navigation-push-leave-start {
    .navigation-effect-header {
      @include show;
      @include below;
    }
  }
  .navigation-push-leave-end {
    .navigation-effect-header {
      @include hide;
      @include below;
    }
  }
  .navigation-pop-enter-start {
    .navigation-effect-header {
      @include hide;
      @include below;
    }
  }
  .navigation-pop-enter-end {
    .navigation-effect-header {
      @include show;
      @include below;
    }
  }
  .navigation-pop-leave-start {
    .navigation-effect-header {
      @include show;
      @include above;
    }
  }
  .navigation-pop-leave-end {
    .navigation-effect-header {
      @include hide;
      @include above;
    }
  }
</style>
