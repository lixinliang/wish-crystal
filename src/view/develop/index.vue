<template>
  <div id="develop">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <group>
        <cell :title="$t('develop@checkcode')" :value="$storage.user.checkcode" is-link @click.native="$push('checkcode')"/>
      </group>
      <group>
        <panel type="2" :list="list"/>
      </group>
    </widget-scroll-box>
    <layout-navbar :title="$t('develop@layout-navbar-title')"/>
  </div>
</template>

<i18n>
develop@layout-navbar-title:
  en: Develop
  zh-CN: 开发者选项
develop@checkcode:
  en: Check Code
  zh-CN: 校验码
</i18n>

<script>
import { Cell, Group, Panel } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'

export default {
  components: {
    Cell,
    Group,
    Panel,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      list: [
        {
          title: 'User Agent',
          desc: window.navigator.userAgent
        },
        {
          title: 'Standalone',
          desc: `${window.navigator.standalone}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #develop {
    @include page-base;
  }
</style>

<style lang="scss">
  @import '~@/global';
  #develop {
    .weui-cells {
      .weui-panel {
        .weui-panel__bd {
          .weui-media-box {
            .weui-media-box__desc {
              display: block;
              overflow: auto;
            }
          }
        }
      }
    }
  }
</style>
