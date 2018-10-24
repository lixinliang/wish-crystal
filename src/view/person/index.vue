<template>
  <div id="person">
    <widget-scroll-box>
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
    <layout-tabbar></layout-tabbar>
  </div>
</template>

<i18n>
person@setting:
  en: Setting
  zh-CN: 设置
</i18n>

<script>
import { Cell, Group } from 'vux'
import layoutTabbar from '@/layout/tabbar'
import widgetScrollBox from '@/widget/scroll-box'
import widgetDefaultName from '@/widget/default-name'
import widgetDefaultAvatar from '@/widget/default-avatar'

export default {
  components: {
    Cell,
    Group,
    layoutTabbar,
    widgetScrollBox,
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
