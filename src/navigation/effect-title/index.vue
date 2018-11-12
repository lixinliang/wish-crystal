<template>
  <div class="navigation-effect-title" :style="{ 'transition': `transform ${duration}ms ease` }">
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

<style lang="scss">
  @mixin left {
    transform: translate3d(-50% ,0, 0);
  }
  @mixin center {
    transform: translate3d(0 ,0, 0);
  }
  @mixin right {
    transform: translate3d(50% ,0, 0);
  }
  .navigation-push-enter-start {
    .navigation-effect-title {
      @include right;
    }
  }
  .navigation-push-enter-end {
    .navigation-effect-title {
      @include center;
    }
  }
  .navigation-push-leave-start {
    .navigation-effect-title {
      @include center;
    }
  }
  .navigation-push-leave-end {
    .navigation-effect-title {
      @include left;
    }
  }
  .navigation-pop-enter-start {
    .navigation-effect-title {
      @include left;
    }
  }
  .navigation-pop-enter-end {
    .navigation-effect-title {
      @include center;
    }
  }
  .navigation-pop-leave-start {
    .navigation-effect-title {
      @include center;
    }
  }
  .navigation-pop-leave-end {
    .navigation-effect-title {
      @include right;
    }
  }
</style>
