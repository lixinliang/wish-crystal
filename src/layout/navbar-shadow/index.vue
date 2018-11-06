<template>
  <div class="layout-navbar-shadow"/>
</template>

<style lang="scss">
  @import '~@/global';
  .layout-navbar-shadow {
    height: $navbar + $ios-status-bar;
  }
  html.iphonex {
    .layout-navbar-shadow {
      height: $navbar + $ios-status-bar + $iphonex-status-bar;
    }
  }
</style>
