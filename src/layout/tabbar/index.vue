<template>
  <div class="layout-tabbar" @touchmove.prevent>
    <tabbar>
      <tabbar-item v-for="(item, $index) in tab" :key="$index" :selected="$route.name === item.name" @click.native="click(item)">
        <template slot="icon">
          <span v-html="item.icon"/>
          <badge v-if="item.badge" :text="item.badge | badge"/>
        </template>
        <span slot="label">{{$t(`layout-tabbar@${item.name}`)}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<i18n>
layout-tabbar@wish:
  en: Wish Note
  zh-CN: 心愿贴
layout-tabbar@home:
  en: Home
  zh-CN: 首页
layout-tabbar@person:
  en: Me
  zh-CN: 我
</i18n>

<script>
import { Badge, ButtonTab, ButtonTabItem, Tabbar, TabbarItem } from 'vux'
import home from '@/img/home.svg'
import wish from '@/img/wish.svg'
import person from '@/img/person.svg'

export default {
  components: {
    Badge,
    ButtonTab,
    ButtonTabItem,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      tab: [
        {
          name: 'wish',
          icon: wish,
          badge: 0
        },
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
    click ({ name }) {
      this.$push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-tabbar {
    .vux-badge {
      top: 0;
      left: 110%;
      transform: translateX(-50%);
      position: absolute;
    }
  }
</style>


<style lang="scss">
  .layout-tabbar {
    .weui-tabbar__item {
      svg {
        top: 5px;
        width: 22px;
        height: 22px;
        display: inline-block;
        position: relative;
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
