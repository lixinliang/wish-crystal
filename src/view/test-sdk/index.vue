<template>
  <div id="test-sdk">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="$t('test-sdk@actionsheet-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@actionsheet-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <cell :title="$t('test-sdk@alert-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@alert-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <cell :title="$t('test-sdk@confirm-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@confirm-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <cell :title="$t('test-sdk@loading-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@loading-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <cell :title="$t('test-sdk@masker-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@masker-2')" is-link @click.native="click"></cell>
          </group>
          <group>
            <cell :title="$t('test-sdk@picker-1')" is-link @click.native="click"></cell>
            <cell :title="$t('test-sdk@picker-2')" is-link @click.native="click"></cell>
          </group>
          <group>
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
  en: Sample
  zh-CN: 示例
</i18n>

<script>
import { Cell, Group } from 'vux'
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
