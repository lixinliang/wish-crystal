<template>
  <div id="wish-detail">
    <widget-scroll-box>
      <group v-if="item">
        <x-input v-model="title" readonly/>
        <x-textarea v-model="content" readonly :rows="14"/>
      </group>
      <div class="button">
        <x-button type="warn" @click.native="remove">{{$t('wish-detail@remove')}}</x-button>
      </div>
    </widget-scroll-box>
  </div>
</template>

<i18n>
wish-detail@edit:
  en: Edit
  zh-CN: 编辑
wish-detail@remove:
  en: Delete
  zh-CN: 删除
wish-detail@can-not-edit:
  en: Edit is disabled (✿◡‿◡)
  zh-CN: 暂不支持编辑功能 (✿◡‿◡)
wish-detail@can-not-remove:
  en: Delete is disabled (✿◡‿◡)
  zh-CN: 暂不支持删除功能 (✿◡‿◡)
</i18n>

<script>
import { Group, XInput, XButton, XTextarea } from 'vux'
import widgetScrollBox from '@/widget/scroll-box'

const { _ } = window

const disposable = []

export default {
  components: {
    Group,
    XInput,
    XButton,
    XTextarea,
    widgetScrollBox
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    item () {
      const item = this.$route && this.$route.params && this.$route.params.item
      if (item) {
        const { title, content } = item
        this.title = decodeURIComponent(title)
        this.content = decodeURIComponent(content)
        return item
      }
    }
  },
  methods: {
    remove () {
      const text = this.$t('wish-detail@can-not-remove')
      window.$event.emit('app:toast', { text, width: '20em' })
    }
  },
  created () {
    const toy = window.$event.listen('layout-navbar:click', async (type) => {
      if (type === 'more') {
        const menus = _.map(['edit'], (key) => this.$t(`wish-detail@${key}`))
        const result = await window.util.actionsheet({ menus })
        const { payload } = result
        if (payload === 0) {
          // const { item } = this
          // this.$replace('wish-edit', { item })
          const text = this.$t('wish-detail@can-not-edit')
          window.$event.emit('app:toast', { text, width: '20em' })
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
  #wish-detail {
    @include page-base;
    .button {
      margin-top: 20px;
      padding: 0 15px;
    }
  }
</style>
