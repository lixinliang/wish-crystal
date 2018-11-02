<template>
  <div id="sdk">
    <!-- <alert/> -->
    <toast/>
    <!-- <picker/> -->
    <!-- <confirm/> -->
    <!-- <loading/> -->
    <actionsheet/>
  </div>
</template>

<script>
import './namespace'
// import alert from './alert'
import toast from './toast'
// import picker from './picker'
// import confirm from './confirm'
// import loading from './loading'
import actionsheet from './actionsheet'

export default {
  components: {
    // alert,
    toast,
    // picker,
    // confirm,
    // loading,
    actionsheet
  }
}
</script>
