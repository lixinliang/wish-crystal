<template>
  <div id="name">
    <widget-scroll-box>
      <group>
        <x-input :max="20" v-model="value"/>
      </group>
    </widget-scroll-box>
  </div>
</template>

<script>
import { Group, XInput } from 'vux'
import widgetScrollBox from '@/widget/scroll-box'

const { _ } = window

const disposable = []

export default {
  components: {
    Group,
    XInput,
    widgetScrollBox
  },
  data () {
    return {
      value: this.$storage.user.name
    }
  },
  created () {
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'save') {
        const { value } = this
        await this.$forage({ type: 'set', key: 'user@name', value })
        const text = this.$t('app@save-success')
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
        'has-save-is-disabled': () => {
          if (this.value && this.value !== this.$storage.user.name) {
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
  #name {
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
