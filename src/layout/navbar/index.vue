<template>
  <div class="layout-navbar" v-fade="this.$route.name && displayHeader" :class="style">
    <x-header v-if="displayHeader" :left-options="{ backText, showBack, preventGoBack }" :right-options="{ showMore }" @on-click-title="onClickTitle" @on-click-back="onClickBack" @on-click-more="onClickMore">
      <span class="title">{{$t(`layout-navbar@${$route.name}`)}}</span>
      <span slot="left" v-if="displayCancel" class="left cancel" @click="onCancel">{{$t(`layout-navbar@cancel`)}}</span>
      <span slot="right" v-if="displaySave" class="right save" @click="onSave">{{$t(`layout-navbar@save`)}}</span>
      <span slot="right" v-if="displayGridOrList" class="right grid-or-list" @click="onGridOrList">
        <em v-if="$storage.config['home:style'] === 'grid'" v-html="grid"/>
        <em v-if="$storage.config['home:style'] === 'list'" v-html="list"/>
      </span>
    </x-header>
    <i18n-base></i18n-base>
    <i18n-page></i18n-page>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import grid from '@/img/grid.svg'
import list from '@/img/list.svg'
import i18nBase from './i18n-base'
import i18nPage from './i18n-page'

export default {
  components: {
    XHeader,
    i18nBase,
    i18nPage
  },
  data () {
    return {
      grid,
      list,
      style: null
    }
  },
  computed: {
    displayHeader () {
      switch (this.$route.name) {
        case 'index':
          return false
      }
      return true
    },
    showBack () {
      switch (this.$route.name) {
        case 'checkcode':
        case 'home':
        case 'name':
        case 'person':
        case 'wish':
          return false
      }
      return true
    },
    backText () {
      return this.$t('layout-navbar@back')
    },
    preventGoBack () {
      return false
    },
    showMore () {
      switch (this.$route.name) {
        case 'photo':
          return true
      }
      return false
    },
    displayCancel () {
      switch (this.$route.name) {
        case 'checkcode':
        case 'name':
          return true
      }
      return false
    },
    displaySave () {
      switch (this.$route.name) {
        case 'checkcode':
        case 'name':
          return true
      }
      return false
    },
    displayGridOrList () {
      switch (this.$route.name) {
        case 'home':
          return true
      }
      return false
    }
  },
  methods: {
    onClickTitle () {
      window.$event.emit('layout-navbar:click', 'title')
    },
    onClickBack () {
      window.$event.emit('layout-navbar:click', 'back')
    },
    onClickMore () {
      window.$event.emit('layout-navbar:click', 'more')
    },
    onCancel () {
      window.$event.emit('layout-navbar:click', 'cancel')
    },
    onSave () {
      window.$event.emit('layout-navbar:click', 'save')
    },
    async onGridOrList () {
      const style = this.$storage.config['home:style']
      let value
      if (style === 'list') {
        value = 'grid'
      }
      if (style === 'grid') {
        value = 'list'
      }
      await this.$forage({ type: 'set', key: 'config@home:style', value })
    }
  },
  created () {
    window.$event.on('layout-navbar:style', (callback) => {
      if (callback) {
        this.style = callback()
      } else {
        this.style = null
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .layout-navbar {
    .title {
      font-weight: 400;
    }
    .cancel {
      cursor: pointer;
      &:active {
        opacity: .5;
      }
    }
    .save {
      font-weight: 400;
      color: $green-color;
      cursor: pointer;
      &:active {
        opacity: .5;
      }
    }
    .grid-or-list {
      width: 20px;
      height: 20px;
      display: inline-block;
      cursor: pointer;
      &:active {
        opacity: .5;
      }
      em {
        pointer-events: none;
      }
    }
  }
</style>

<style lang="scss">
  .layout-navbar {
    background-color: #35495e;
    .vux-header {
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
        .grid-or-list {
          svg {
            width: 20px;
            height: 20px;
            display: inline-block;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  .g-body {
    padding-top: $navbar + $ios-status-bar;
  }
  .layout-navbar {
    height: $navbar + $ios-status-bar;
    .vux-header {
      top: $navbar + $ios-status-bar - $xheader;
    }
  }
  html.iphonex {
    .g-body {
      padding-top: $navbar + $ios-status-bar + $iphonex-status-bar;
    }
    .layout-navbar {
      height: $navbar + $ios-status-bar + $iphonex-status-bar;
      .vux-header {
        top: $navbar + $ios-status-bar + $iphonex-status-bar - $xheader;
      }
    }
  }
</style>
