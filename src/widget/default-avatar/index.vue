<template>
  <div class="widget-default-avatar" :style="style" v-image="avatar"/>
</template>

<script>
import avatar from './img/avatar.jpg'

export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    avatar () {
      return this.$storage.user.avatar || avatar
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .widget-default-avatar {
    @include image;
    pointer-events: none;
    overflow: hidden;
    border-radius: 3px;
  }
</style>
