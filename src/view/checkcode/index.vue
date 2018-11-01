<template>
  <div id="checkcode">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <group>
        <x-input :min="4" :max="4" v-model="value"/>
      </group>
    </widget-scroll-box>
    <layout-navbar :title="$t('checkcode@layout-navbar-title')" @tap="navbarTap">
      <a slot="left">{{$t('layout-navbar@cancel')}}</a>
      <a slot="right" :class="{ 'disabled': disabled }">{{$t('layout-navbar@confirm')}}</a>
    </layout-navbar>
  </div>
</template>

<i18n>
checkcode@layout-navbar-title:
  en: Check Code
  zh-CN: 校验码
</i18n>

<script>
import { Group, XInput } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'

const { _ } = window

export default {
  components: {
    Group,
    XInput,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      value: this.$storage.user.checkcode
    }
  },
  computed: {
    disabled () {
      if (this.value && this.value !== this.$storage.user.checkcode && /^[a-zA-Z0-9]{4}$/.test(this.value)) {
        return false
      } else {
        return  true
      }
    }
  },
  methods: {
    navbarTap ({ type, preventDefault }) {
      console.log(type)
      if (type === 'left') {
        preventDefault()
      }
      if (type === 'right') {
        // const { value } = this
        // await this.$forage({ type: 'set', key: 'user@checkcode', value })
        // const text = this.$t('app@save-success')
        // window.$event.emit('app:toast', { text, width: '20em' })
        // this.$pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #checkcode {
    @include page-base;
    .disabled {
      opacity: .5;
      pointer-events: none;
    }
  }
</style>
