<template>
  <div id="checkcode">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <x-input :min="4" :max="4" v-model="value"/>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('checkcode@layout-navbar-title')" @tap="navbarTap">
      <a slot="left">{{$t('layout-navbar@cancel')}}</a>
      <a slot="right" class="primary" :class="{ 'disabled': disabled }">{{$t('layout-navbar@save')}}</a>
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
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Group,
    XInput,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
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
    async navbarTap ({ type }) {
      if (type === 'right') {
        const { value } = this
        await this.$forage({ type: 'set', key: 'user@checkcode', value })
        const text = this.$t('sdk-toast@save-success')
        this.$sdk.toast({ text })
        this.$pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #checkcode {
    @include page-base;
    .primary {
      @include navbar-button-primary;
    }
    .disabled {
      @include navbar-button-disabled;
    }
  }
</style>
