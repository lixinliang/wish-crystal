<template>
  <div class="list">
    <card v-for="(item, $index) in list" :key="$index" :item="item" :index="$index"/>
  </div>
</template>

<script>
import card from './card'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    card
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .list {
    overflow: hidden;
    padding-bottom: 70px;
    position: relative;
  }
</style>
