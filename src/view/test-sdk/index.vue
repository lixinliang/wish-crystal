<template>
  <div id="test-sdk">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <group-title slot="title">Action Sheet</group-title>
            <cell :title="$t('test-sdk@actionsheet-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@actionsheet-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Alert</group-title>
            <cell :title="$t('test-sdk@alert-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@alert-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Confirm</group-title>
            <cell :title="$t('test-sdk@confirm-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@confirm-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Loading</group-title>
            <cell :title="$t('test-sdk@loading-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@loading-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Masker</group-title>
            <cell :title="$t('test-sdk@masker-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@masker-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Picker</group-title>
            <cell :title="$t('test-sdk@picker-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@picker-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <group-title slot="title">Toast</group-title>
            <cell :title="$t('test-sdk@toast-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@toast-2')" is-link @click.native="click"></cell>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('test-sdk@layout-navbar-title')"/>
  </div>
</template>

<i18n>
test-sdk@layout-navbar-title:
  en: SDK Unit Testing
  zh-CN: SDK 单元测试
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
  methods: {
    click () {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #test-sdk {
    @include page-base;
  }
</style>
