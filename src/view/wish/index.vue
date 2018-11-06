<template>
  <div id="wish" :class="{ 'has-list': list.length }">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <list v-if="list.length" :list="list"/>
      <widget-empty v-else :type="'wish'" :label="$t('wish@empty')" :button="$t('wish@button')" @click="$push('wish-add')"/>
    </widget-scroll-box>
    <layout-tabbar/>
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
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import list from './list'
import plus from '@/img/plus.svg'

export default {
  components: {
    list,
    widgetEmpty,
    layoutTabbar,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      plus
    }
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
    &.has-list {
      background-color: #bdc5ca;
    }
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
