<template>
  <div id="navigation"/>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  $duration: 5000;
  @mixin front {
    z-index: 1;
  }
  @mixin back {
    z-index: 0;
  }
  @mixin left {
    transform: translate3d(-50% ,0, 0);
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
