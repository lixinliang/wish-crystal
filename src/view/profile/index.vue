<template>
  <div id="profile">
    <widget-scroll-box>
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
  </div>
</template>

<i18n>
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
import widgetScrollBox from '@/widget/scroll-box'
import widgetDefaultName from '@/widget/default-name'
import widgetDefaultAvatar from '@/widget/default-avatar'

export default {
  components: {
    Cell,
    Group,
    widgetScrollBox,
    widgetDefaultName,
    widgetDefaultAvatar
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #profile {
    @include page-base;
  }
</style>
