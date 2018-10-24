<template>
  <div id="home">
    <widget-scroll-box>
      <grid-style v-if="$storage.config['home:style'] === 'grid'" :list="list" @click="click"></grid-style>
      <list-style v-if="$storage.config['home:style'] === 'list'" :list="list" @click="click"></list-style>
    </widget-scroll-box>
    <layout-tabbar></layout-tabbar>
  </div>
</template>

<i18n>
home@wish:
  en: Wish Note
  zh-CN: 心愿贴
home@more:
  en: More
  zh-CN: 更多功能
home@coming-soon:
  en: Coming Soon
  zh-CN: 更多功能，敬请期待
</i18n>

<script>
import star from '@/img/star.svg'
import wish from '@/img/wish.svg'
import layoutTabbar from '@/layout/tabbar'
import widgetScrollBox from '@/widget/scroll-box'
import gridStyle from './grid-style'
import listStyle from './list-style'

export default {
  components: {
    gridStyle,
    listStyle,
    layoutTabbar,
    widgetScrollBox
  },
  data () {
    return {
      list: [
        {
          name: 'wish',
          icon: wish,
          badge: 0
        },
        {
          name: 'more',
          icon: star,
          badge: 0
        }
      ]
    }
  },
  created () {
    window.$event.on('home:badge', ({ name, badge }) => {
      // todo home:badge
    })
  },
  methods: {
    click ({ name }) {
      if (name === 'more') {
        window.$event.emit('app:alert', { show: true, content: this.$t('home@coming-soon') })
        return
      }
      this.$push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #home {
    @include page-base;
  }
</style>
