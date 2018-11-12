<template>
  <div id="setting">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="$t('setting@language')" is-link @click.native="$push('language')"></cell>
            <cell :title="$t('setting@splash')" is-link @click.native="$replace('splash')"></cell>
            <cell :title="$t('setting@about')" :value="version" is-link @click.native="$push('about')"></cell>
          </group>
          <group>
            <cell :title="$t('setting@clear-cache')" :isLoading="clearCacheProcessing" :disabled="clearCacheProcessing" is-link @click.native="clear"></cell>
          </group>
          <div class="button">
            <x-button type="warn" @click.native="reset">{{$t('setting@reset')}}</x-button>
          </div>
          <div class="button">
            <x-button type="warn" @click.native="logout">{{$t('setting@logout')}}</x-button>
          </div>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('setting@layout-navbar-title')"/>
  </div>
</template>

<i18n>
setting@layout-navbar-title:
  en: Setting
  zh-CN: 设置
setting@language:
  en: Language
  zh-CN: 多语言
setting@splash:
  en: Splash
  zh-CN: 启屏动画
setting@about:
  en: About
  zh-CN: 关于
setting@clear-cache:
  en: Clear Cache
  zh-CN: 清除缓存
setting@clear-cache-success:
  en: Clear Cache Success (*^▽^*)
  zh-CN: 你懂的 (*￣︶￣)
setting@reset:
  en: Reset
  zh-CN: 重置数据
setting@can-not-reset:
  en: Reset Data is disabled (✿◡‿◡)
  zh-CN: 暂不支持重置数据 (✿◡‿◡)
setting@logout:
  en: Log Out
  zh-CN: 退出登录
setting@can-not-logout:
  en: Log Out is disabled (✿◡‿◡)
  zh-CN: 暂不支持退出登录 (✿◡‿◡)
</i18n>

<script>
import { Cell, Group, XButton } from 'vux'
import pkg from 'package.json'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

const { version } = pkg

export default {
  components: {
    Cell,
    Group,
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
      version,
      clearCacheProcessing: false
    }
  },
  methods: {
    async clear () {
      this.clearCacheProcessing = true
      await window.util.sleep(1500)
      this.clearCacheProcessing = false
      const text = this.$t('setting@clear-cache-success')
      this.$sdk.toast({ text })
    },
    reset () {
      const text = this.$t('setting@can-not-reset')
      this.$sdk.toast({ text })
    },
    logout () {
      const text = this.$t('setting@can-not-logout')
      this.$sdk.toast({ text })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #setting {
    @include page-base;
    .button {
      margin-top: 20px;
      padding: 0 15px;
    }
  }
</style>
