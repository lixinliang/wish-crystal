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
  @mixin show {
    opacity: 1;
  }
  @mixin hide {
    opacity: 0;
  }
  .navigation-push-enter-start {
    .navigation-effect-header {
      @include hide;
    }
  }
  .navigation-push-enter-end {
    .navigation-effect-header {
      @include show;
    }
  }
  .navigation-push-leave-start {
    .navigation-effect-header {
      @include show;
    }
  }
  .navigation-push-leave-end {
    .navigation-effect-header {
      @include hide;
    }
  }
  .navigation-pop-enter-start {
    .navigation-effect-header {
      @include hide;
    }
  }
  .navigation-pop-enter-end {
    .navigation-effect-header {
      @include show;
    }
  }
  .navigation-pop-leave-start {
    .navigation-effect-header {
      @include show;
    }
  }
  .navigation-pop-leave-end {
    .navigation-effect-header {
      @include hide;
    }
  }
</style>
