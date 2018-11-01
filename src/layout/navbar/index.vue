<template>
  <div class="layout-navbar">
    <x-header :left-options="{ backText, showBack, preventGoBack }" :right-options="{ showMore }" @on-click-title="onClickTitle" @on-click-back="onClickBack" @on-click-more="onClickMore">
      <slot name="left" slot="left"></slot>
      <slot name="right" slot="right"></slot>
      <span class="title" v-if="this.title">{{this.title}}</span>
    </x-header>
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

export default {
  props: {
    left: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    XHeader
  },
  computed: {
    showBack () {
      return !this.$slots.left
    },
    backText () {
      return this.left || this.$t('layout-navbar@back')
    },
    preventGoBack () {
      return true
    },
    showMore () {
      return false
    }
  },
  methods: {
    onClickTitle () {
      this.$emit('tap', {
        type: 'title'
      })
    },
    onClickBack () {
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
    },
    onClickMore () {
      this.$emit('tap', {
        type: 'right'
      })
    },
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
