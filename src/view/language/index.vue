<template>
  <div id="language">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell v-for="(item, $index) in list" :key="$index" :title="item.title" :disabled="$storage.user.lang === item.language" @click.native="set(item)">
              <icon v-visible="$storage.user.lang === item.language" slot type="success-no-circle"></icon>
            </cell>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('language@layout-navbar-title')"/>
  </div>
</template>

<i18n>
language@layout-navbar-title:
  en: Language
  zh-CN: 选择语言
</i18n>

<script>
import { Cell, Icon, Group } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Cell,
    Icon,
    Group,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      list: [
        {
          title: '简体中文',
          language: 'zh-CN'
        },
        {
          title: 'English',
          language: 'en'
        }
      ]
    }
  },
  methods: {
    async set ({ language }) {
      await this.$forage({ type: 'set', key: 'user@lang', value: language })
      this.$i18n.set(language)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #language {
    @include page-base;
  }
</style>

<style lang="scss">
  #language {
    .weui-cell {
      &.vux-cell-disabled {
        pointer-events: none;
        .vux-label {
          color: inherit;
        }
      }
    }
  }
</style>
