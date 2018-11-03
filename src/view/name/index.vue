<template>
  <div id="name">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <group>
        <x-input :max="20" v-model="value"/>
      </group>
    </widget-scroll-box>
    <layout-navbar :title="$t('name@layout-navbar-title')" @tap="navbarTap">
      <a slot="left">{{$t('layout-navbar@cancel')}}</a>
      <a slot="right" class="primary" :class="{ 'disabled': disabled }">{{$t('layout-navbar@save')}}</a>
    </layout-navbar>
  </div>
</template>

<i18n>
name@layout-navbar-title:
  en: Nickname
  zh-CN: 昵称
</i18n>

<script>
import { Group, XInput } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'

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
      value: this.$storage.user.name
    }
  },
  computed: {
    disabled () {
      if (this.value && this.value !== this.$storage.user.name) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async navbarTap ({ type }) {
      if (type === 'right') {
        const { value } = this
        await this.$forage({ type: 'set', key: 'user@name', value })
        const text = this.$t('sdk-toast@save-success')
        this.$sdk.toast({ text, width: '20em' })
        this.$pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #name {
    @include page-base;
    .primary {
      @include navbar-button-primary;
    }
    .disabled {
      @include navbar-button-disabled;
    }
  }
</style>
