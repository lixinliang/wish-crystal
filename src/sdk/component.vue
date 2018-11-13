<template>
  <div id="sdk" @touchmove.prevent>
    <alert ref="alert"/>
    <toast ref="toast"/>
    <masker ref="masker"/>
    <picker ref="picker"/>
    <confirm ref="confirm"/>
    <loading ref="loading"/>
    <actionsheet ref="actionsheet"/>
  </div>
</template>

<script>
import './namespace'
import alert from './alert'
import toast from './toast'
import masker from './masker'
import picker from './picker'
import confirm from './confirm'
import loading from './loading'
import actionsheet from './actionsheet'

export default {
  components: {
    alert,
    toast,
    masker,
    picker,
    confirm,
    loading,
    actionsheet
  }
}
</script>
