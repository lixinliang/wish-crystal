<template>
  <div id="wish-add">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <group>
        <x-input v-model="title" :max="20" :placeholder="$t('wish-add@title')"/>
        <x-textarea v-model="content" :max="200" :placeholder="$t('wish-add@content')"/>
      </group>
    </widget-scroll-box>
    <layout-navbar :title="$t('wish-add@layout-navbar-title')" @tap="navbarTap">
      <a slot="left">{{$t('layout-navbar@cancel')}}</a>
      <a slot="right" class="primary" :class="{ 'disabled': disabled }">{{$t('layout-navbar@create')}}</a>
    </layout-navbar>
  </div>
</template>

<i18n>
wish-add@layout-navbar-title:
  en: Create Wish Note
  zh-CN: 创建心愿贴
wish-add@title:
  en: Title
  zh-CN: 标题
wish-add@content:
  en: Content
  zh-CN: 内容
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'

export default {
  components: {
    Group,
    XInput,
    XTextarea,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    disabled () {
      const { title, content } = this
      if (title && content) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async navbarTap ({ type }) {
      if (type === 'right') {
        const { now } = this.$
        const { name, checkcode } = this.$storage.user
        const key = `${now}${checkcode}`
        const born = now
        const uid = checkcode
        const wid = window.util.uuid(4)
        const title = encodeURIComponent(this.title)
        const content = encodeURIComponent(this.content)
        const value = {
          uid,
          wid,
          born,
          name,
          title,
          content,
          tag: [],
          type: '',
          isRemove: false,
          isSticky: false
        }
        this.$set(this.$storage.wish.map, key, value)
        await this.$forage({ type: 'update', key: 'wish@map' })
        const text = this.$t('sdk-toast@create-success')
        this.$sdk.toast({ text })
        this.$pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #wish-add {
    @include page-base;
    .primary {
      @include navbar-button-primary;
    }
    .disabled {
      @include navbar-button-disabled;
    }
  }
</style>

<style lang="scss">
  #wish-add {
    input {
      padding-left: 4px;
    }
  }
</style>
