<template>
  <div id="wish">
    <navigation-effect-box>
      <widget-background-color :color="color">
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <list v-if="list.length" :list="list"/>
          <widget-empty v-else :type="'wish'" :label="$t('wish@empty')" :button="$t('wish@button')" @click="$push('wish-add')"/>
        </widget-scroll-box>
        <layout-tabbar/>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('wish@layout-navbar-title')" @tap="navbarTap">
      <a slot="right">
        <em v-html="plus"/>
      </a>
    </layout-navbar>
  </div>
</template>

<i18n>
wish@layout-navbar-title:
  en: Wish Note
  zh-CN: 心愿贴
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
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'
import list from './list'
import plus from '@/img/plus.svg'

export default {
  components: {
    list,
    widgetEmpty,
    layoutTabbar,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      plus
    }
  },
  computed: {
    list () {
      return _(this.$storage.wish.map)
      .map(({ wid, name, title, content }, key) => {
        const time = +key.slice(0, -4)
        return {
          wid,
          name,
          time,
          title,
          content
        }
      })
      .sort((m, n) => {
        return n.time - m.time
      })
      .uniqBy(({ wid }) => {
        return wid
      })
      .value()
    },
    color () {
      let color = ''
      if (this.list.length) {
        color = '#bdc5ca'
      }
      return color
    },
  },
  methods: {
    async navbarTap ({ type }) {
      if (type === 'right') {
        this.$push('wish-add')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #wish {
    @include page-base;
  }
</style>

<style lang="scss">
  #wish {
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
