<template>
  <div id="develop">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="$t('develop@checkcode')" :value="$storage.user.checkcode" is-link @click.native="$push('checkcode')"/>
          </group>
          <group>
            <panel type="2" :list="list"/>
          </group>
          <div class="button">
            <x-button type="warn" @click.native="reboot">{{$t('develop@reboot')}}</x-button>
          </div>
          <div class="button">
            <x-button type="warn" @click.native="reload">{{$t('develop@reload')}}</x-button>
          </div>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
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
develop@reboot:
  en: Reboot
  zh-CN: 软重启
develop@reload:
  en: Reload
  zh-CN: 硬重启
</i18n>

<script>
import { Cell, Group, Panel, XButton } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Cell,
    Group,
    Panel,
    XButton,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
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
        },
        {
          title: 'Online',
          desc: `${window.navigator.onLine}`
        }
      ]
    }
  },
  methods: {
    reboot () {
      window.$event.emit('root:reboot')
    },
    async reload () {
      const source = 2849184197
      const url_long = `${window.URI().hash('')}`
      this.$sdk.loading({ show: true })
      const response = await window.util.jsonp('http://api.weibo.com/2/short_url/shorten.json', {
        source,
        url_long
      })
      this.$sdk.loading({ show: false })
      if (!response) {
        this.$sdk.toast({ text: 'error' })
        return
      }
      const { code, data } = response
      if (!code || !data) {
        this.$sdk.toast({ text: 'error' })
        return
      }
      const url = data.urls[0].url_short
      location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #develop {
    @include page-base;
    .button {
      margin-top: 20px;
      padding: 0 15px;
    }
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
