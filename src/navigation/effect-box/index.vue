<template>
  <div class="navigation-effect-box" :style="{ 'transition': `transform ${duration}ms ease, box-shadow ${duration}ms ease` }">
    <slot/>
    <masker :style="{ 'transition': `opacity ${duration}ms ease` }" :opacity=".1"/>
  </div>
</template>

<script>
import { Masker } from 'vux'
import duration from '../duration'

export default {
  components: {
    Masker
  },
  data () {
    return {
      duration
    }
  },
  mounted () {
    // navigation animation not working without repaint
    window.util.repaint(this.$el)
  }
}
</script>

<style lang="scss" scoped>
  .navigation-effect-box {
    height: 100%;
    position: relative;
  }
  .vux-masker-box {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }
</style>

<style lang="scss">
  @mixin left {
    transform: translate3d(-50% ,0, 0);
  }
  @mixin center {
    transform: translate3d(0 ,0, 0);
  }
  @mixin right {
    transform: translate3d(100% ,0, 0);
  }
  @mixin show-mask {
    opacity: 1;
  }
  @mixin hide-mask {
    opacity: 0;
  }
  @mixin show-shadow {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, .6);
  }
  @mixin hide-shadow {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0);
  }
  @mixin normal {
    $zindex: 100; // 导航动画 box 普通状态
    z-index: $zindex;
  }
  @mixin below {
    $zindex: 101; // 导航动画 box 底层状态
    z-index: $zindex;
  }
  @mixin above {
    $zindex: 102; // 导航动画 box 上层状态
    z-index: $zindex;
  }
  .navigation-effect-box {
    @include normal;
  }
  .navigation-push-enter-start {
    .navigation-effect-box {
      @include right;
      @include hide-shadow;
      @include above;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
  .navigation-push-enter-end {
    .navigation-effect-box {
      @include center;
      @include show-shadow;
      @include above;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
  .navigation-push-leave-start {
    .navigation-effect-box {
      @include center;
      @include hide-shadow;
      @include below;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
  .navigation-push-leave-end {
    .navigation-effect-box {
      @include left;
      @include hide-shadow;
      @include below;
    }
    .vux-masker-box {
      @include show-mask;
    }
  }
  .navigation-pop-enter-start {
    .navigation-effect-box {
      @include left;
      @include hide-shadow;
      @include below;
    }
    .vux-masker-box {
      @include show-mask;
    }
  }
  .navigation-pop-enter-end {
    .navigation-effect-box {
      @include center;
      @include hide-shadow;
      @include below;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
  .navigation-pop-leave-start {
    .navigation-effect-box {
      @include center;
      @include show-shadow;
      @include above;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
  .navigation-pop-leave-end {
    .navigation-effect-box {
      @include right;
      @include hide-shadow;
      @include above;
    }
    .vux-masker-box {
      @include hide-mask;
    }
  }
</style>
