<template>
  <div id="language">
    <group>
      <cell v-for="(item, $index) in list" :key="$index" :title="item.title" :disabled="$i18n.locale() === item.language" @click.native="$i18n.set(item.language)">
        <icon v-visible="$i18n.locale() === item.language" slot type="success-no-circle"></icon>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Icon, Group } from 'vux'

export default {
  components: {
    Cell,
    Icon,
    Group
  },
  data () {
    return {
      list: [
        {
          title: '简体中文',
          language: 'zh-CN'
        },
        {
          title: 'English',
          language: 'en'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #language {
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: $background-color-normal;
  }
</style>

<style lang="scss">
  #language {
    .weui-cell {
      &.vux-cell-disabled {
        pointer-events: none;
        .vux-label {
          color: inherit;
        }
      }
    }
  }
</style>
