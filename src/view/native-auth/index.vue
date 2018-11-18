<template>
  <div id="native-auth">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <!-- <x-switch :title="`${geolocation}`" v-model="geolocation" prevent-default @on-click="click('geolocation')"/> -->
            <!-- <cell :title="'navigator.mediaDevices.getUserMedia'"/> -->
            <!-- <cell :title="'navigator.serviceWorker'"/> -->
            <!-- <cell :title="'ApplePaySession'"/> -->
            <!-- <cell :title="'ApplePayError'"/> -->
            <!-- <cell :title="'PaymentAddress'"/> -->
            <!-- <cell :title="'PaymentRequest'"/> -->
            <!-- <cell :title="'PaymentRequestUpdateEvent'"/> -->
            <!-- <cell :title="'PaymentResponse'"/> -->
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('native-auth@layout-navbar-title')"/>
  </div>
</template>

<i18n>
native-auth@layout-navbar-title:
  en: System Permission
  zh-CN: 系统授权
</i18n>

<script>
import { Cell, Group, GroupTitle, XSwitch } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

const { _ } = window

export default {
  components: {
    Cell,
    Group,
    GroupTitle,
    XSwitch,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      geolocation: this.$storage.auth.geolocation
    }
  },
  methods: {
    async click (type) {
      if (type === 'geolocation') {
        const value = !this.geolocation
        if (value) {
          this.$sdk.masker({ show: true, opacity: 0.5, fullscreen: true })
          const sleep = window.util.sleep(1000)
          const permission = new Promise((resolve) => {
            const options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
            window.navigator.geolocation.getCurrentPosition(resolve, resolve, options)
          })
          const [result] = await Promise.all([permission, sleep])
          this.$sdk.masker({ show: false })
          if (window.util.typeof(result) === 'PositionError') {
            const { code, message } = result
            const $enum = [
              'PERMISSION_DENIED',
              'POSITION_UNAVAILABLE',
              'TIMEOUT'
            ]
            const $map = _.mapKeys($enum, (value) => result[value])
            const text = `[${code}]${$map[code]}:${message}`
            this.$sdk.toast({ text })
            return
          }
        }
        await this.$forage({ type: 'set', key: 'auth@geolocation', value })
        this.geolocation = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #native-auth {
    @include page-base;
  }
</style>
