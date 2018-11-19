<template>
  <div class="card" v-mc="hammer" @touchforcechange="touchforcechange">
    <div class="main">
      <div class="hd">
        <div class="time">{{item.time|format('YYYY-MM-DD HH:mm:ss')}}</div>
        <div class="title">{{item.title|decodeURIComponent}}</div>
      </div>
      <div class="bd">
        <div class="content">{{item.content|decodeURIComponent}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: -1
    }
  },
  methods: {
    hammer (mc) {
      const { item } = this
      mc.add([
        new window.Hammer.Tap(),
        // new window.Hammer.Pan(),
        // new window.Hammer.Press()
      ])
      mc.on('tap', (event) => {
        this.$push('wish-detail', { item })
      })
      mc.on('press', (event) => {
        this.$sdk.toast({ text: 'press' })
      })
      mc.on('panleft', (event) => {
        this.$sdk.toast({ text: 'panleft' })
      })
      mc.on('panright', (event) => {
        this.$sdk.toast({ text: 'panright' })
      })
      mc.on('panup', (event) => {
        this.$sdk.toast({ text: 'panup' })
      })
      mc.on('pandown', (event) => {
        this.$sdk.toast({ text: 'pandown' })
      })
    },
    touchforcechange (event) {
      const touch = event.touches[0]
      if (!touch) {
        return
      }
      const { force } = touch
      console.log(force)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .card {
    padding: 0 10px;
    margin-top: 10px;
    position: relative;
    cursor: pointer;
    &:active {
      .main {
        background-color: $background-color-active;
      }
    }
    .main {
      border-radius: 8px;
      background-color: #fff;
      padding: 8px;
      pointer-events: none;
      .hd {
        overflow: hidden;
        padding: 0 8px 8px;
        position: relative;
        &::after {
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #657786;
          transform: scale(.9, .5);
        }
        .time {
          float: right;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #657786;
        }
        .title {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #657786;
          @include ellipsis;
          font-weight: 400;
        }
      }
      .bd {
        padding: 0 8px;
        padding-top: 12px;
        padding-bottom: 4px;
        .content {
          height: 22px * 3;
          line-height: 22px;
          font-size: 14px;
          @include ellipsis(3);
        }
      }
    }
  }
</style>
