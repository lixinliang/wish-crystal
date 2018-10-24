<template>
  <div id="wish-edit">
    <widget-scroll-box>
      <group v-if="item">
        <x-input v-model="title" :max="20" :placeholder="$t('wish-edit@title')"/>
        <x-textarea v-model="content" :max="200" :placeholder="$t('wish-edit@content')"/>
      </group>
    </widget-scroll-box>
  </div>
</template>

<i18n>
wish-edit@title:
  en: Title
  zh-CN: 标题
wish-edit@content:
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
  computed: {
    item () {
      return this.$route && this.$route.params && this.$route.params.item
    }
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    console.log(this.item)
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'save') {
        const { now } = this.$
        const { title, content } = this
        const { name, checkcode } = this.$storage.user
        const key = `${now}${checkcode}`
        const value = {
          name,
          title,
          content
        }
        this.$set(this.$storage.wish.map, key, value)
        await this.$forage({ type: 'update', key: 'wish@map' })
        const text = this.$t('app@save-success')
        window.$event.emit('app:toast', { text, width: '20em' })
        const { item } = this
        this.$replace('wish-detail', { item })
      }
      if (type === 'cancel') {
        const { item } = this
        this.$replace('wish-detail', { item })
      }
    })
    disposable.push(toy)
    window.$event.emit('layout-navbar:style', () => {
      return window.util.computed({
        'has-save-is-disabled': () => {
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
  #wish-edit {
    @include page-base;
  }
</style>

<style lang="scss">
  .layout-navbar {
    &.has-save-is-disabled {
      .vux-header {
        .save {
          opacity: .5;
          pointer-events: none;
        }
      }
    }
  }
</style>
