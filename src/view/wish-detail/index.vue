<template>
  <div id="wish-detail">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group v-if="item">
            <x-input v-model="title" readonly/>
            <x-textarea v-model="content" readonly :rows="14"/>
          </group>
          <div class="button">
            <x-button type="warn" @click.native="remove">{{$t('wish-detail@remove')}}</x-button>
          </div>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('wish-detail@layout-navbar-title')" :right="'more'" @tap="navbarTap"/>
  </div>
</template>

<i18n>
wish-detail@layout-navbar-title:
  en: Wish Note Detail
  zh-CN: 查看心愿贴
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
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Group,
    XInput,
    XButton,
    XTextarea,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
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
    async navbarTap ({ type }) {
      if (type === 'right') {
        const menus = [this.$t(`wish-detail@edit`)]
        const result = await this.$sdk.actionsheet({ menus })
        const { index } = result
        if (index === 0) {
          const { item } = this
          this.$replace('wish-edit', { item })
          // const text = this.$t('wish-detail@can-not-edit')
          // this.$sdk.toast({ text })
        }
      }
    },
    remove () {
      const text = this.$t('wish-detail@can-not-remove')
      this.$sdk.toast({ text })
    }
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
