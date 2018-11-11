<template>
  <div class="layout-navbar" @touchmove.prevent @click="click">
    <navigation-effect-header>
      <x-header :left-options="{ backText, showBack, preventGoBack }" :right-options="{ showMore }">
        <span class="title" v-if="this.title">{{this.title}}</span>
        <slot slot="left" name="left"/>
        <slot slot="right" name="right"/>
      </x-header>
    </navigation-effect-header>
  </div>
</template>

<i18n>
layout-navbar@back:
  en: Back
  zh-CN: 返回
layout-navbar@cancel:
  en: Cancel
  zh-CN: 取消
layout-navbar@save:
  en: Save
  zh-CN: 保存
layout-navbar@confirm:
  en: Confirm
  zh-CN: 确定
layout-navbar@create:
  en: Create
  zh-CN: 创建
</i18n>

<script>
import { XHeader } from 'vux'
import navigationEffectHeader from '@/navigation/effect-header'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    }
  },
  components: {
    XHeader,
    navigationEffectHeader
  },
  computed: {
    showBack () {
      return !this.$slots.left
    },
    backText () {
      return this.$t('layout-navbar@back')
    },
    preventGoBack () {
      return true
    },
    showMore () {
      return this.right === 'more'
    }
  },
  methods: {
    click (event) {
      if (event.target.matches('.vux-header-left *')) {
        let back = true
        this.$emit('tap', {
          type: 'left',
          preventDefault () {
            back = false
          }
        })
        if (back) {
          this.$pop()
        }
      }
      if (event.target.matches('.vux-header-right *')) {
        this.$emit('tap', {
          type: 'right'
        })
      }
      if (event.target.matches('.vux-header-title *')) {
        this.$emit('tap', {
          type: 'title'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .layout-navbar {
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    background-color: #35495e;
    .title {
      font-weight: 400;
    }
  }
</style>

<style lang="scss">
  .layout-navbar {
    .vux-header {
      left: 0;
      bottom: 0;
      width: 100%;
      position: absolute;
      .vux-header-left {
        .vux-header-back {
          &:active {
            & + .left-arrow {
              opacity: .5;
            }
          }
        }
        .left-arrow {
          &::before {
            width: 10px;
            height: 10px;
            top: 10px;
          }
        }
      }
      .vux-header-right {
        .vux-header-more {
          &::after {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  .layout-navbar {
    height: $navbar + $ios-status-bar;
  }
  html.iphonex {
    .layout-navbar {
      height: $navbar + $ios-status-bar + $iphonex-status-bar;
    }
  }
</style>
