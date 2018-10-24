<template>
  <div id="wish" :class="{ 'has-list': list.length }">
    <widget-scroll-box>
      <list v-if="list.length" :list="list"/>
      <widget-empty v-else :type="'wish'" :label="$t('wish@empty')" :button="$t('wish@button')" @click="$push('wish-add')"/>
    </widget-scroll-box>
    <layout-tabbar></layout-tabbar>
  </div>
</template>

<i18n>
wish@empty:
  en: Nothing here
  zh-CN: 空空如也
wish@button:
  en: Create Wish Note
  zh-CN: 创建心愿贴
</i18n>

<script>
import widgetEmpty from '@/widget/empty'
import layoutTabbar from '@/layout/tabbar'
import widgetScrollBox from '@/widget/scroll-box'
import list from './list'

const { _ } = window

const disposable = []

export default {
  components: {
    list,
    widgetEmpty,
    layoutTabbar,
    widgetScrollBox
  },
  computed: {
    list () {
      return _(this.$storage.wish.map)
      .map(({ name, title, content }, key) => {
        const time = +key.slice(0, -4)
        return {
          name,
          time,
          title,
          content
        }
      })
      .sort((m, n) => {
        return n.time - m.time
      })
      .value()
    }
  },
  created () {
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'plus') {
        this.$push('wish-add')
      }
    })
    disposable.push(toy)
  },
  destroyed () {
    _.forEach(disposable, (item) => item.remove())
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #wish {
    @include page-base;
    &.has-list {
      background-color: #bdc5ca;
    }
  }
</style>
