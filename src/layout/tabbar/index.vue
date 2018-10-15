<template>
  <div class="layout-tabbar">
    <tabbar>
      <tabbar-item v-for="(item, $index) in tab" :key="$index" :link="{ path: `/${item.name}` }" :selected="$route.name === item.name" :badge="badge(item.badge)">
        <span slot="icon" v-html="item.icon"></span>
        <span slot="label">{{$t(`layout-tabbar@${item.name}`)}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<i18n>
layout-tabbar@home:
  en: Home
  zh-CN: 首页
layout-tabbar@person:
  en: Me
  zh-CN: 我
</i18n>

<script>
import home from '@/img/home.svg'
import person from '@/img/person.svg'

import { ButtonTab, ButtonTabItem, Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      tab: [
        {
          name: 'home',
          icon: home,
          badge: 0
        },
        {
          name: 'person',
          icon: person,
          badge: 0
        }
      ]
    }
  },
  created () {
    window.$event.on('layout-tabbar:badge', ({ name, badge }) => {
      if (name === 'home') {
        this.tab[0].badge = badge
      }
      if (name === 'person') {
        this.tab[1].badge = badge
      }
    })
  },
  methods: {
    badge (value) {
      const badge = +value || 0
      if (badge <= 0) {
        return ''
      }
      if (badge >= 100) {
        return '99+'
      }
      return `${badge}`
    }
  }
}
</script>

<style lang="scss">
  .layout-tabbar {
    .weui-tabbar__item {
      svg {
        top: 5px;
        width: 22px;
        height: 22px;
        display: inline-block;
        position: relative;
        fill: currentColor;
      }
      .weui-tabbar__label {
        margin: 3px 0 6px;
      }
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  html.iphonex {
    .layout-tabbar {
      .weui-tabbar {
        padding-bottom: $iphonex-home-indicator;
      }
    }
  }
</style>
