<template>
  <div id="changelog">
    <widget-scroll-box>
      <group v-for="(item, $key) in changelog" :key="$key" :title="$key">
        <cell v-for="(title, $index) in item['zh-CN']" :key="$index" :title="title"></cell>
      </group>
    </widget-scroll-box>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'
import changelog from 'changelog.yml'
import widgetScrollBox from '@/widget/scroll-box'

export default {
  components: {
    Cell,
    Group,
    widgetScrollBox
  },
  data () {
    return {
      changelog
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #changelog {
    @include page-base;
  }
</style>
