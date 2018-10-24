<template>
  <div id="tree">
    <widget-scroll-box>
      <group :title="'dependencies'">
        <cell v-for="(value, key) in dependencies" :key="key" :title="key" :value="value"></cell>
      </group>
      <group :title="'devDependencies'">
        <cell v-for="(value, key) in devDependencies" :key="key" :title="key" :value="value"></cell>
      </group>
    </widget-scroll-box>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'
import pkg from 'package.json'
import widgetScrollBox from '@/widget/scroll-box'

const { dependencies, devDependencies } = pkg

export default {
  components: {
    Cell,
    Group,
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
