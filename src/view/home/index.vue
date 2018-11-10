<template>
  <div id="home">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <grid-style v-if="$storage.config['home:style'] === 'grid'" :list="menu" @click="click"></grid-style>
      <list-style v-if="$storage.config['home:style'] === 'list'" :list="menu" @click="click"></list-style>
    </widget-scroll-box>
    <layout-tabbar/>
    <layout-navbar :title="$t('home@layout-navbar-title')" @tap="navbarTap">
      <a slot="right">
        <em v-if="$storage.config['home:style'] === 'grid'" v-html="list"/>
        <em v-if="$storage.config['home:style'] === 'list'" v-html="grid"/>
      </a>
    </layout-navbar>
  </div>
</template>

<i18n>
home@layout-navbar-title:
  en: Home
  zh-CN: 首页
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
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import gridStyle from './grid-style'
import listStyle from './list-style'
import grid from '@/img/grid.svg'
import list from '@/img/list.svg'

export default {
  components: {
    gridStyle,
    listStyle,
    layoutTabbar,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      grid,
      list,
      menu: [
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
        const content = this.$t('home@coming-soon')
        this.$sdk.alert({ content })
        return
      }
      if (name === 'wish') {
        this.$replace(name)
        return
      }
      this.$push(name)
    },
    async navbarTap ({ type }) {
      if (type === 'right') {
        const style = this.$storage.config['home:style']
        let value
        if (style === 'list') {
          value = 'grid'
        }
        if (style === 'grid') {
          value = 'list'
        }
        await this.$forage({ type: 'set', key: 'config@home:style', value })
      }
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

<style lang="scss">
  #home {
    .layout-navbar {
      .vux-header-left {
        display: none;
      }
      .vux-header-right {
        svg {
          width: 20px;
          height: 20px;
          display: inline-block;
        }
      }
    }
  }
</style>
