<template>
  <div id="wish-add">
    <widget-scroll-box>
      <group>
        <x-input v-model="title" :max="20" :placeholder="$t('wish-add@title')"/>
        <x-textarea v-model="content" :max="200" :placeholder="$t('wish-add@content')"/>
      </group>
    </widget-scroll-box>
  </div>
</template>

<i18n>
wish-add@title:
  en: Title
  zh-CN: 标题
wish-add@content:
  en: Content
  zh-CN: 内容
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'
import widgetScrollBox from '@/widget/scroll-box'

const { _ } = window

const disposable = []

export default {
  components: {
    Group,
    XInput,
    XTextarea,
    widgetScrollBox
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'create') {
        const { now } = this.$
        const { name, checkcode } = this.$storage.user
        const key = `${now}${checkcode}`
        const born = now
        const uid = checkcode
        const wid = window.util.uuid()
        const title = encodeURIComponent(this.title)
        const content = encodeURIComponent(this.content)
        const value = {
          uid,
          wid,
          born,
          name,
          title,
          content,
          tag: [],
          type: '',
          isRemove: false,
          isSticky: false
        }
        this.$set(this.$storage.wish.map, key, value)
        await this.$forage({ type: 'update', key: 'wish@map' })
        const text = this.$t('app@create-success')
        window.$event.emit('app:toast', { text, width: '20em' })
        this.$pop()
      }
      if (type === 'cancel') {
        this.$pop()
      }
    })
    disposable.push(toy)
    window.$event.emit('layout-navbar:style', () => {
      return window.util.computed({
        'has-create-is-disabled': () => {
          const { title, content } = this
          if (title && content) {
            return false
          } else {
            return true
          }
        }
      })
    })
  },
  destroyed () {
    _.forEach(disposable, (item) => item.remove())
    window.$event.emit('layout-navbar:style')
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #wish-add {
    @include page-base;
  }
</style>

<style lang="scss">
  .layout-navbar {
    &.has-create-is-disabled {
      .vux-header {
        .create {
          opacity: .5;
          pointer-events: none;
        }
      }
    }
  }
</style>
