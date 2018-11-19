import _ from 'lodash'
import VueRouter from 'vue-router'

// 记录已加载的资源
const closure = {}

// 公共依赖
const base = [
  'moment.min.js'
]

// 路由配置
const config = {
  about: {
    component: () => import(/* webpackChunkName: "about" */'@/view/about')
  },
  blank: {
    component: () => import(/* webpackChunkName: "blank" */'@/view/blank')
  },
  changelog: {
    component: () => import(/* webpackChunkName: "changelog" */'@/view/changelog')
  },
  checkcode: {
    component: () => import(/* webpackChunkName: "checkcode" */'@/view/checkcode')
  },
  develop: {
    assets: [
      'JSONP-min.js',
      'URI.min.js'
    ],
    component: () => import(/* webpackChunkName: "develop" */'@/view/develop')
  },
  'environment-client': {
    component: () => import(/* webpackChunkName: "environment-client" */'@/view/environment-client')
  },
  'environment-server': {
    component: () => import(/* webpackChunkName: "environment-server" */'@/view/environment-server')
  },
  home: {
    component: () => import(/* webpackChunkName: "home" */'@/view/home')
  },
  index: {
    alias: '/',
    assets: ['micro-app.min.js'],
    component: () => import(/* webpackChunkName: "index" */'@/view/index'),
    beforeEnter (to, from, next) {
      // app 入口
      if (window.util.test('standalone')) {
        // app 环境 跳转到 启动动画
        next('splash')
        return
      }
      next()
    }
  },
  lab: {
    component: () => import(/* webpackChunkName: "lab" */'@/view/lab')
  },
  language: {
    component: () => import(/* webpackChunkName: "language" */'@/view/language')
  },
  name: {
    component: () => import(/* webpackChunkName: "name" */'@/view/name')
  },
  'native-api': {
    component: () => import(/* webpackChunkName: "native-api" */'@/view/native-api')
  },
  'native-auth': {
    component: () => import(/* webpackChunkName: "native-auth" */'@/view/native-auth')
  },
  person: {
    component: () => import(/* webpackChunkName: "person" */'@/view/person')
  },
  photo: {
    component: () => import(/* webpackChunkName: "photo" */'@/view/photo')
  },
  profile: {
    component: () => import(/* webpackChunkName: "profile" */'@/view/profile')
  },
  sample: {
    component: () => import(/* webpackChunkName: "sample" */'@/view/sample')
  },
  setting: {
    component: () => import(/* webpackChunkName: "setting" */'@/view/setting')
  },
  splash: {
    component: () => import(/* webpackChunkName: "splash" */'@/view/splash')
  },
  'test-api': {
    component: () => import(/* webpackChunkName: "test-api" */'@/view/test-api')
  },
  'test-sdk': {
    component: () => import(/* webpackChunkName: "test-sdk" */'@/view/test-sdk')
  },
  tree: {
    component: () => import(/* webpackChunkName: "tree" */'@/view/tree')
  },
  webview: {
    component: () => import(/* webpackChunkName: "webview" */'@/view/webview')
  },
  wish: {
    assets: ['hammer.min.js'],
    component: () => import(/* webpackChunkName: "wish" */'@/view/wish')
  },
  'wish-add': {
    component: () => import(/* webpackChunkName: "wish-add" */'@/view/wish-add')
  },
  'wish-detail': {
    component: () => import(/* webpackChunkName: "wish-detail" */'@/view/wish-detail')
  },
  'wish-edit': {
    component: () => import(/* webpackChunkName: "wish-edit" */'@/view/wish-edit')
  }
}

// 路由配置
const routes = _.map(config, ({ alias, assets = [], component, beforeEnter }, name) => {
  return _.assign({
    name,
    path: `/${name}`
  }, {
    alias,
    component,
    beforeEnter
  }, {
    meta: {
      assets
    }
  })
})

// 路由对象
const router = new VueRouter({ routes })

// 路由钩子
const beforeHook = async (to, from, next) => {
  console.log(`[router.js]@beforeHook:to.name=${to.name}`)
  // 加载依赖资源
  const assets = _.concat(base, to.meta.assets)
  const files = _.map(assets, async (file) => {
    if (!file) {
      return
    }
    if (closure[file]) {
      return
    }
    await window.util.load(file)
    closure[file] = true
  })
  await Promise.all(files)
  next()
}

// 路由钩子
const afterHook = async (to, from) => {
}

router.afterEach(afterHook)

router.beforeEach(beforeHook)

window.router = router

export default router
