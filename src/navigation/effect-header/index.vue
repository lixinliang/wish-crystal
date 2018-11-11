<template>
  <div class="navigation-effect-header" :style="{ 'transition': `transform ${duration}ms ease` }">
    <slot/>
  </div>
</template>

<script>
import duration from '../duration'

export default {
  data () {
    return {
      duration
    }
  }
}
</script>
