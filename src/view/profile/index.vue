<template>
  <div id="profile">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="$t('profile@photo')" is-link @click.native="$push('photo')">
              <widget-default-avatar :width="60" :height="60"/>
            </cell>
            <cell :title="$t('profile@name')" is-link @click.native="$push('name')">
              <widget-default-name/>
            </cell>
            <cell :title="$t('profile@checkcode')" :value="$storage.user.checkcode"/>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('profile@layout-navbar-title')"/>
  </div>
</template>

<i18n>
profile@layout-navbar-title:
  en: Profile
  zh-CN: 个人信息
profile@photo:
  en: Photo
  zh-CN: 头像
profile@name:
  en: Nickname
  zh-CN: 昵称
profile@checkcode:
  en: Check Code
  zh-CN: 校验码
</i18n>

<script>
import { Cell, Group } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetDefaultName from '@/widget/default-name'
import widgetDefaultAvatar from '@/widget/default-avatar'
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
    widgetDefaultName,
    widgetDefaultAvatar,
    widgetBackgroundColor,
    navigationEffectBox
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #profile {
    @include page-base;
  }
</style>
