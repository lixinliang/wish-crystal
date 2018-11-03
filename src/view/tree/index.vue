<template>
  <div id="tree">
    <widget-scroll-box>
      <layout-navbar-shadow/>
      <group :title="'dependencies'">
        <cell v-for="(value, key) in dependencies" :key="key" :title="key" :value="value"></cell>
      </group>
      <group :title="'devDependencies'">
        <cell v-for="(value, key) in devDependencies" :key="key" :title="key" :value="value"></cell>
      </group>
    </widget-scroll-box>
    <layout-navbar :title="$t('tree@layout-navbar-title')"/>
  </div>
</template>

<i18n>
tree@layout-navbar-title:
  en: Dependence Trees
  zh-CN: 依赖树
</i18n>

<script>
import { Cell, Group } from 'vux'
import pkg from 'package.json'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'

const { dependencies, devDependencies } = pkg

export default {
  components: {
    Cell,
    Group,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox
  },
  data () {
    return {
      dependencies,
      devDependencies
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #tree {
    @include page-base;
  }
</style>
