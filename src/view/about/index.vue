<template>
  <div id="about">
    <widget-scroll-box>
      <div class="logo" v-mc="hammer">
        <i v-image:size.96x96="icon"/>
      </div>
      <p>{{$t('about@title')}}</p>
      <p @click="toast">{{$t('about@version')}}：{{version}}.{{$timestamp|format('YYYYMMDD.HHmmss')}}</p>
      <p>
        <span @click="$push('changelog')">{{$t('about@changelog')}}</span>
        <span>·</span>
        <span @click="$push('tree')">{{$t('about@tree')}}</span>
      </p>
      <div class="copyright">李昕亮(393464140@qq.com) 版权所有<br>Copyright © {{year}} lixinliang. All Rights Reserved.</div>
    </widget-scroll-box>
  </div>
</template>

<i18n>
about@title:
  en: Wish Crystal
  zh-CN: 愿望水晶
about@version:
  en: Version
  zh-CN: 版本
about@up-to-date:
  en: Wish Crystal is up to date (*^▽^*)
  zh-CN: 当前版本已是最新版本 (*^▽^*)
about@changelog:
  en: Change Log
  zh-CN: 更新日志
about@tree:
  en: Dependence Trees
  zh-CN: 依赖树
about@develop:
  en: Develop
  zh-CN: 开发者选项
</i18n>

<script>
import pkg from 'package.json'
import icon from '@/img/logo.png'
import widgetScrollBox from '@/widget/scroll-box'

const { _ } = window
const { version } = pkg

export default {
  components: {
    widgetScrollBox
  },
  data () {
    return {
      icon,
      version
    }
  },
  computed: {
    year () {
      const $year = 2018
      const year = new Date(this.$.now).getFullYear()
      if (year > $year) {
        return `${$year} - ${year}`
      } else {
        return `${$year}`
      }
    }
  },
  methods: {
    toast () {
      const text = this.$t('about@up-to-date')
      window.$event.emit('app:toast', { text, width: '20em' })
    },
    hammer (mc) {
      mc.add([new window.Hammer.Press()])
      let sid
      mc.on('press', async (event) => {
        const timeout = window.util.timeout(5000)
        sid = timeout.sid
        await timeout.tick
        const menus = _.map(['develop'], (key) => this.$t(`about@${key}`))
        const result = await window.util.actionsheet({ menus })
        const { payload } = result
        if (payload === 0) {
          this.$push('develop')
        }
      })
      mc.on('pressup', (event) => {
        clearTimeout(sid)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #about {
    @include page-index;
    p {
      span {
        display: inline-block;
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color: $green-color;
      }
    }
    .copyright {
      left: 0;
      bottom: 30px;
      width: 100%;
      color: #bdbdbd;
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
      position: absolute;
    }
  }
</style>
