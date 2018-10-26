<template>
  <div id="photo" @touchmove.prevent>
    <input ref="file" type="file" accept="image/*" @change="change">
    <widget-default-avatar :width="size" :height="size"/>
  </div>
</template>

<i18n>
photo@select-photo:
  en: Choose from Album
  zh-CN: 从相册选择图片
</i18n>

<script>
import widgetDefaultAvatar from '@/widget/default-avatar'

const { _ } = window

const disposable = []

export default {
  components: {
    widgetDefaultAvatar
  },
  data () {
    return {
      size: window.innerWidth
    }
  },
  methods: {
    async change (evnet) {
      const { files } = this.$refs.file
      if (files.length) {
        window.$event.emit('app:loading', { show: true })
        const sleep = window.util.sleep(2000)
        const file = files[0]
        const { result } = await window.util.reader(file)
        const img = await window.util.img(result)
        const value = img.src
        await sleep
        await this.$forage({ type: 'set', key: 'user@avatar', value })
        window.$event.emit('app:loading', { show: false })
        const text = this.$t('app@save-success')
        window.$event.emit('app:toast', { text, width: '20em' })
      }
    }
  },
  created () {
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'more') {
        const menus = _.map(['select-photo'], (key) => this.$t(`photo@${key}`))
        const result = await window.util.actionsheet({ menus })
        const { payload } = result
        if (payload === 0) {
          this.$refs.file.click()
        }
      }
    })
    disposable.push(toy)
  },
  destroyed () {
    _.forEach(disposable, (item) => item.remove())
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #photo {
    @include page-base;
    background-color: #000;
    .widget-default-avatar {
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      margin: 0 auto;
      border-radius: 0;
    }
    input[type="file"] {
      top: 0;
      left: 0;
      opacity: 0;
      font-size: 0;
      position: absolute;
    }
  }
</style>
