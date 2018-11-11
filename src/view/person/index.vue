<template>
  <div id="person">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell is-link @click.native="$push('profile')">
              <template slot="icon">
                <div class="avatar">
                  <widget-default-avatar :width="60" :height="60"/>
                </div>
              </template>
              <template slot="title">
                <widget-default-name/>
              </template>
            </cell>
          </group>
          <group>
            <cell :title="$t('person@setting')" is-link @click.native="$push('setting')"></cell>
          </group>
        </widget-scroll-box>
        <layout-tabbar/>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('person@layout-navbar-title')"/>
  </div>
</template>

<i18n>
person@layout-navbar-title:
  en: Me
  zh-CN: 我
person@setting:
  en: Setting
  zh-CN: 设置
</i18n>

<script>
import { Cell, Group } from 'vux'
import layoutTabbar from '@/layout/tabbar'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'
import widgetDefaultName from '@/widget/default-name'
import widgetDefaultAvatar from '@/widget/default-avatar'

export default {
  components: {
    Cell,
    Group,
    layoutTabbar,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox,
    widgetDefaultName,
    widgetDefaultAvatar
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #person {
    @include page-base;
    .avatar {
      padding-right: 5px;
    }
  }
</style>

<style lang="scss">
  #person {
    .layout-navbar {
      .vux-header-left {
        display: none;
      }
    }
  }
</style>
