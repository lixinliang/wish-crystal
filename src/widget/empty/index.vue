<template>
  <div class="widget-empty" @click="click">
    <div class="center">
      <div class="shape" v-if="displayCry" v-html="cry"/>
      <div class="label" v-html="label"></div>
      <div class="button" v-html="button"></div>
    </div>
  </div>
</template>

<script>
import cry from '@/img/cry.svg'

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cry
    }
  },
  computed: {
    displayCry () {
      switch (this.type) {
        case 'wish':
          return true
      }
      return false
    }
  },
  methods: {
    click () {
      if (this.button) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  .widget-empty {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    .center {
      top: 50%;
      left: 0;
      width: 100%;
      position: absolute;
      text-align: center;
      transform: translateY(-50%);
      margin-top: -30px;
    }
    .shape {
      width: 36px;
      height: 36px;
      margin: 0 auto;
      color: #ababab;
    }
    .label {
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: #ababab;
    }
    .button {
      width: 120px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      background-color: transparentize($color: $green-color, $amount: .1);
      border-radius: 5px;
      color: #fff;
      &:active {
        opacity: .8;
      }
    }
  }
</style>
