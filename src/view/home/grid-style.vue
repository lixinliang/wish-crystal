<template>
  <div class="grid-style">
    <grid v-for="(sublist, $index) in computedList" :key="$index" :show-lr-borders="false">
      <grid-item v-for="(item, $index) in sublist" :key="$index" @click.native="$emit('click', item)" v-fade="item">
        <template v-if="item">
          <span class="symbol" slot="icon">
            <em v-html="item.icon"/>
            <badge v-if="item.badge" :text="item.badge | badge"/>
          </span>
          <span class="label" slot="label">{{$t(`home@${item.name}`)}}</span>
        </template>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Badge, Grid, GridItem } from 'vux'

const { _ } = window

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Grid,
    GridItem,
    Badge
  },
  computed: {
    computedList () {
      const size = 3
      const placeholder = _.map(Array.apply(null, { length: size }), () => null)
      return _(this.list).concat(placeholder).chunk(size).slice(0, -1).value()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .grid-style {
    .weui-grids {
      &::before {
        z-index: 1;
      }
    }
    .weui-grid {
      background-color: #fff;
      &:active {
        background-color: $background-color-active;
      }
      &:nth-child(1) {
        .symbol,
        .label {
          color: #e91e63;
        }
        &:active {
          .symbol,
          .label {
            color: transparentize($color: #e91e63, $amount: .2)
          }
        }
      }
      &:nth-child(2) {
        .symbol,
        .label {
          color: #ffc107;
        }
        &:active {
          .symbol,
          .label {
            color: transparentize($color: #ffc107, $amount: .2)
          }
        }
      }
      .symbol {
        position: relative;
        &,
        em {
          width: 28px;
          height: 28px;
          display: block;
        }
        .vux-badge {
          top: -10px;
          right: -20px;
          position: absolute;
        }
      }
    }
  }
</style>
