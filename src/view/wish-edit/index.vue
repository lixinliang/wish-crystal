<template>
  <div id="wish-edit">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group v-if="item">
            <x-input v-model="title" :max="20" :placeholder="$t('wish-edit@title')"/>
            <x-textarea v-model="content" :max="200" :placeholder="$t('wish-edit@content')"/>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('wish-edit@layout-navbar-title')" @tap="navbarTap">
      <a slot="left">{{$t('layout-navbar@cancel')}}</a>
      <a slot="right" class="primary" :class="{ 'disabled': disabled }">{{$t('layout-navbar@save')}}</a>
    </layout-navbar>
  </div>
</template>

<i18n>
wish-edit@layout-navbar-title:
  en: Edit Wish Note
  zh-CN: 编辑心愿贴
wish-edit@title:
  en: Title
  zh-CN: 标题
wish-edit@content:
  en: Content
  zh-CN: 内容
wish-edit@can-not-edit:
  en: Edit is disabled (✿◡‿◡)
  zh-CN: 暂不支持编辑功能 (✿◡‿◡)
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

const { _ } = window

export default {
  components: {
    Group,
    XInput,
    XTextarea,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  computed: {
    item () {
      const item = this.$route && this.$route.params && this.$route.params.item
      if (item) {
        const { title, content } = item
        this.title = decodeURIComponent(title)
        this.content = decodeURIComponent(content)
        return item
      }
    },
    disabled () {
      const { title, content } = this
      if (title && content) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async navbarTap ({ type, preventDefault }) {
      const { item } = this
      if (type === 'left') {
        preventDefault()
        this.$replace('wish-detail', { item })
      }
      if (type === 'right') {
        const result = _(this.$storage.wish.map)
        .map((item, key) => {
          const { wid } = item
          const time = +key.slice(0, -4)
          return {
            wid,
            time,
            item
          }
        })
        .sort((m, n) => {
          return n.time - m.time
        })
        .find(({ wid }) => {
          return wid === item.wid
        })
        {
          const item = window.util.copy(result.item)
          const value = item
          const { now } = this.$
          const { name, checkcode } = this.$storage.user
          const key = `${now}${checkcode}`
          const uid = checkcode
          item.name = name
          item.uid = uid
          item.title = encodeURIComponent(this.title)
          item.content = encodeURIComponent(this.content)
          this.$set(this.$storage.wish.map, key, value)
          await this.$forage({ type: 'update', key: 'wish@map' })
          const text = this.$t('sdk-toast@save-success')
          this.$sdk.toast({ text })
          this.$replace('wish-detail', { item })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #wish-edit {
    @include page-base;
    .primary {
      @include navbar-button-primary;
    }
    .disabled {
      @include navbar-button-disabled;
    }
  }
</style>
