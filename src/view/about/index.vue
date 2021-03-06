<template>
  <div id="about">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <div class="logo" @touchstart="touchstart" @touchend="touchend">
            <i v-image:size.96x96="icon"/>
          </div>
          <p>{{$t('about@app')}}</p>
          <p @click="toast">{{$t('about@version')}}：{{version}}.{{$timestamp|format('YYYYMMDD.HHmmss')}}</p>
          <p>
            <em><span @click="$push('changelog')">{{$t('about@changelog')}}</span>·<span @click="$push('tree')">{{$t('about@tree')}}</span></em>
          </p>
          <div class="copyright">李昕亮(393464140@qq.com) 版权所有<br>Copyright © {{year}} lixinliang. All Rights Reserved.</div>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('about@layout-navbar-title')" :right="develop ? 'more' : ''" @tap="navbarTap"/>
  </div>
</template>

<i18n>
about@layout-navbar-title:
  en: About
  zh-CN: 关于
about@app:
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
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

const { _ } = window
const { version } = pkg

let resolve

// keep alive
const observe = util.observe({ develop: false })

export default {
  components: {
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      icon,
      version
    }
  },
  computed: {
    develop () {
      return observe.develop
    },
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
  created () {
    if (window.util.test('development')) {
      observe.develop = true
    }
  },
  methods: {
    toast () {
      const text = this.$t('about@up-to-date')
      this.$sdk.toast({ text })
    },
    async navbarTap ({ type }) {
      if (type === 'right') {
        const menus = [this.$t(`about@develop`)]
        const result = await this.$sdk.actionsheet({ menus })
        const { index } = result
        if (index === 0) {
          this.$push('develop')
        }
      }
    },
    async touchstart () {
      if (window.util.test('development')) {
        return
      }
      let promise
      ({ promise, resolve } = window.util.promise())
      const stop = await Promise.race([promise, window.util.sleep(5000)])
      if (stop) {
        return
      }
      observe.develop = true
    },
    touchend () {
      if (window.util.test('development')) {
        return
      }
      resolve(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #about {
    @include page-index;
    p {
      em {
        position: relative;
        display: inline-block;
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color: $green-color;
        font-style: normal;
        span {
          top: 0;
          width: 120px;
          position: absolute;
          cursor: pointer;
          &:active {
            opacity: .7;
          }
          &:first-child {
            right: 10px;
            text-align: right;
          }
          &:last-child {
            left: 10px;
            text-align: left;
          }
        }
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
