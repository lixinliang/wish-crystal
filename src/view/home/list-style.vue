<template>
  <div class="list-style">
    <group>
      <cell v-for="(item, $index) in list" :key="$index" :title="$t(`home@${item.name}`)" is-link @click.native="$emit('click', item)">
        <span slot="icon" class="symbol" v-html="item.icon"/>
        <badge v-if="item.badge" :text="item.badge | badge"/>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Badge, Group } from 'vux'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Cell,
    Badge,
    Group
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .list-style {
    .weui-cell {
      .symbol {
        top: 3px;
        width: 18px;
        height: 18px;
        display: inline-block;
        position: relative;
        margin-right: 8px;
      }
      .vux-badge {
        display: block;
      }
    }
  }
</style>
