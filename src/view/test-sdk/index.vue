<template>
  <div id="test-sdk">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <group-title slot="title">Action Sheet</group-title>
            <cell :title="'Case 1'" is-link @click.native="actionsheet(1)">{{status['actionsheet1']}}</cell>
          </group>
          <group>
            <group-title slot="title">Alert</group-title>
            <cell :title="'Case 1'" is-link @click.native="alert(1)">{{status['alert1']}}</cell>
            <cell :title="'Case 2'" is-link @click.native="alert(2)">{{status['alert2']}}</cell>
          </group>
          <group>
            <group-title slot="title">Confirm</group-title>
            <cell :title="'Case 1'" is-link @click.native="confirm(1)">{{status['confirm1']}}</cell>
            <cell :title="'Case 2'" is-link @click.native="confirm(2)">{{status['confirm2']}}</cell>
          </group>
          <group>
            <group-title slot="title">Loading</group-title>
            <cell :title="'Case 1'" is-link @click.native="loading(1)">{{status['loading1']}}</cell>
            <cell :title="'Case 2'" is-link @click.native="loading(2)">{{status['loading2']}}</cell>
          </group>
          <group>
            <group-title slot="title">Masker</group-title>
            <cell :title="'Case 1'" is-link @click.native="masker(1)">{{status['masker1']}}</cell>
          </group>
          <group>
            <group-title slot="title">Picker</group-title>
            <cell :title="'Case 1'" is-link @click.native="picker(1)">{{status['picker1']}}</cell>
            <cell :title="'Case 2'" is-link @click.native="picker(2)">{{status['picker2']}}</cell>
          </group>
          <group>
            <group-title slot="title">Toast</group-title>
            <cell :title="'Case 1'" is-link @click.native="toast(1)"/>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('test-sdk@layout-navbar-title')"/>
  </div>
</template>

<i18n>
test-sdk@layout-navbar-title:
  en: SDK Unit Testing
  zh-CN: SDK 单元测试
</i18n>

<script>
import { Cell, Group, GroupTitle } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Cell,
    Group,
    GroupTitle,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      status: {}
    }
  },
  methods: {
    async actionsheet (index) {
      const key = `actionsheet${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        result = await this.$sdk.actionsheet({ menus: ['a', 'b', 'c'] })
      }
      this.$set(this.status, key, result)
    },
    async alert (index) {
      const key = `alert${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        await this.$sdk.alert({ content: 'content' })
      }
      if (index === 2) {
        await this.$sdk.alert({ title: 'title', content: 'content' })
      }
      this.$set(this.status, key, result)
    },
    async confirm (index) {
      const key = `confirm${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        result = await this.$sdk.confirm({ content: 'content' })
      }
      if (index === 2) {
        result = await this.$sdk.confirm({ title: 'title', content: 'content' })
      }
      this.$set(this.status, key, result)
    },
    async loading (index) {
      const key = `loading${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        this.$sdk.loading({ show: true })
        await window.util.sleep(2000)
        this.$sdk.loading({ show: false })
      }
      if (index === 2) {
        await new Promise((resolve) => {
          let text = 0;
          const $break = resolve
          window.util.loop(() => (new Promise(async (resolve) => {
            if (text >= 100) {
              $break()
              return
            }
            this.$sdk.loading({ show: true, text })
            text++
            await window.util.sleep(20)
            resolve()
          })))
        })
        this.$sdk.loading({ show: false })
      }
      this.$set(this.status, key, result)
    },
    async masker (index) {
      const key = `masker${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        this.$sdk.masker({ show: true, opacity: 0.5, fullscreen: true })
        await window.util.sleep(2000)
        this.$sdk.masker({ show: false, opacity: 0.5 })
      }
      this.$set(this.status, key, result)
    },
    async picker (index) {
      const key = `picker${index}`
      this.$set(this.status, key, 'pending')
      let result = 'resolve'
      if (index === 1) {
        result = await this.$sdk.picker({ title: 'title', data: [['1', '2', '3']] })
      }
      if (index === 2) {
        result = await this.$sdk.picker({ title: 'title', data: [['1', '2', '3'], ['a', 'b', 'c']] })
      }
      this.$set(this.status, key, result)
    },
    toast (index) {
      this.$sdk.toast({ text: 'toast' })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #test-sdk {
    @include page-base;
  }
</style>
