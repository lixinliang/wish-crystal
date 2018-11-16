<template>
  <div id="native-api">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="'Alert'" is-link @click.native="alert = $window.alert('alert')">{{alert}}</cell>
            <cell :title="'Confirm'" is-link @click.native="confirm = $window.confirm('confirm')">{{confirm}}</cell>
            <cell :title="'Prompt'" is-link @click.native="prompt = $window.prompt('prompt')">{{prompt}}</cell>
          </group>
          <group>
            <cell :title="'Worker'"/>
          </group>
          <group>
            <cell :title="'Navigator'"/>
          </group>
          <group>
            <cell :title="'Performance'"/>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('native-api@layout-navbar-title')"/>
  </div>
</template>

<i18n>
native-api@layout-navbar-title:
  en: System Interface
  zh-CN: 系统接口
</i18n>

<script>
import { Cell, Group, GroupTitle } from 'vux'
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
    GroupTitle,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      alert: '',
      confirm: '',
      prompt: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #native-api {
    @include page-base;
  }
</style>
