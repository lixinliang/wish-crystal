<template>
  <div id="setting">
    <widget-scroll-box>
      <group>
        <cell :title="$t('setting@language')" is-link @click.native="$push('language')"></cell>
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
  </div>
</template>

<i18n>
setting@language:
  en: Language
  zh-CN: 多语言
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
import widgetScrollBox from '@/widget/scroll-box'

const { version } = pkg

export default {
  components: {
    Cell,
    Group,
    XButton,
    widgetScrollBox
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
      window.$event.emit('app:toast', { text, width: '20em' })
    },
    reset () {
      const text = this.$t('setting@can-not-reset')
      window.$event.emit('app:toast', { text, width: '20em' })
    },
    logout () {
      const text = this.$t('setting@can-not-logout')
      window.$event.emit('app:toast', { text, width: '20em' })
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
