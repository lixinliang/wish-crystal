<template>
  <div id="webview">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <div class="container">
            <div class="webview">
              <iframe v-if="src" :src="src" @load="load" scrolling="yes"/>
              <div class="progress" v-fade="progress" :style="{ 'width': `${percentage}%` }" @transitionend="transitionend"/>
            </div>
          </div>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="title"/>
  </div>
</template>

<script>
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    layoutNavbar,
    layoutNavbarColor,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      src: '',
      progress: true,
      percentage: 0
    }
  },
  computed: {
    item () {
      return this.$route && this.$route.params && this.$route.params.item
    },
    title () {
      return (this.item && this.item.title) || ''
    },
    url () {
      return (this.item && this.item.url) || ''
    }
  },
  created () {
    window.$event.once('navigation:animation-end', () => {
      this.percentage = 90
      this.src = this.item.url
    })
  },
  methods: {
    load () {
      this.percentage = 100
    },
    transitionend () {
      if (this.percentage >= 100) {
        this.progress = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #webview {
    @include page-base;
    .container {
      height: 100%;
      position: relative;
    }
    .webview {
      height: 100%;
      position: relative;
      // overflow-y: scroll;
      // -webkit-overflow-scrolling: touch;
    }
    .progress {
      top: 0;
      left: 0;
      opacity: 1;
      height: 3px;
      position: absolute;
      pointer-events: none;
      background-color: $green-color;
      transition: width .3s, opacity .3s;
    }
    iframe {
      border: 0;
      width: 100%;
      min-height: 100%;
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  #webview {
    .container {
      padding-top: $navbar + $ios-status-bar;
    }
  }
  html.iphonex {
    #webview {
      .container {
        padding-top: $navbar + $ios-status-bar + $iphonex-status-bar;
      }
    }
  }
</style>
