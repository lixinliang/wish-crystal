<template>
  <span class="widget-default-name"><template v-if="$storage.user.name">{{$storage.user.name}}</template><template v-else>{{$t('widget-default-name@name')}}</template></span>
</template>

<i18n>
widget-default-name@name:
  en: Anonymous User
  zh-CN: 你还木有昵称呢
</i18n>
