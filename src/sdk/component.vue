<template>
  <div id="sdk" @touchmove.prevent>
    <alert/>
    <toast/>
    <masker/>
    <!-- <picker/> -->
    <!-- <confirm/> -->
    <loading/>
    <actionsheet/>
  </div>
</template>

<script>
import './namespace'
import alert from './alert'
import toast from './toast'
import masker from './masker'
// import picker from './picker'
// import confirm from './confirm'
import loading from './loading'
import actionsheet from './actionsheet'

export default {
  components: {
    alert,
    toast,
    masker,
    // picker,
    // confirm,
    loading,
    actionsheet
  }
}
</script>
