<template>
  <div id="develop">
    <widget-scroll-box>
      <group>
        <cell :title="$t('develop@checkcode')" :value="$storage.user.checkcode" is-link @click.native="$push('checkcode')"/>
      </group>
      <group>
        <panel type="2" :list="list"/>
      </group>
    </widget-scroll-box>
  </div>
</template>

<i18n>
develop@checkcode:
  en: Check Code
  zh-CN: 校验码
</i18n>

<script>
import { Cell, Group, Panel } from 'vux'
import widgetScrollBox from '@/widget/scroll-box'

export default {
  components: {
    Cell,
    Group,
    Panel,
    widgetScrollBox
  },
  data () {
    return {
      list: [
        {
          title: 'User Agent',
          desc: window.navigator.userAgent
        },
        {
          title: 'Standalone',
          desc: `${window.navigator.standalone}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #develop {
    @include page-base;
  }
</style>

<style lang="scss">
  @import '~@/global';
  #develop {
    .weui-cells {
      .weui-panel {
        .weui-panel__bd {
          .weui-media-box {
            .weui-media-box__desc {
              display: block;
              overflow: auto;
            }
          }
        }
      }
    }
  }
</style>
