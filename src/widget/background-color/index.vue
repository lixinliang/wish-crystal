<template>
  <div class="widget-background-color" :style="{ 'background-color': `${color}` }">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .widget-background-color {
    height: 100%;
    position: relative;
    background-color: $background-color-normal;
  }
</style>
