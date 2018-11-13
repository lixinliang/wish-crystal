<template>
  <div id="lab">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <h1>{{$t('lab@layout-navbar-title')}}</h1>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('lab@layout-navbar-title')"/>
  </div>
</template>

<i18n>
lab@layout-navbar-title:
  en: Sample
  zh-CN: 示例
</i18n>

<script>
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #lab {
    @include page-base;
  }
</style>
