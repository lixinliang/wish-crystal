import _ from 'lodash'
import VueRouter from 'vue-router'

// 记录已加载的资源
const closure = {}

// 公共依赖
const base = [
  'moment.min.js'
]

const config = {
  about: {
    assets: ['hammer.min.js'],
    component: () => import(/* webpackChunkName: "about" */'@/view/about')
  },
  changelog: {
    component: () => import(/* webpackChunkName: "changelog" */'@/view/changelog')
  },
  checkcode: {
    component: () => import(/* webpackChunkName: "checkcode" */'@/view/checkcode')
  },
  develop: {
    component: () => import(/* webpackChunkName: "develop" */'@/view/develop')
  },
  home: {
    component: () => import(/* webpackChunkName: "home" */'@/view/home')
  },
  index: {
    alias: '/',
    assets: ['micro-app.min.js'],
    component: () => import(/* webpackChunkName: "index" */'@/view/index'),
    beforeEnter (to, from, next) {
      if (navigator.standalone) {
        // app 环境 跳转到 首页
        next('home')
        return
      }
      next()
    }
  },
  language: {
    component: () => import(/* webpackChunkName: "language" */'@/view/language')
  },
  name: {
    component: () => import(/* webpackChunkName: "name" */'@/view/name')
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
  setting: {
    component: () => import(/* webpackChunkName: "setting" */'@/view/setting')
  },
  tree: {
    component: () => import(/* webpackChunkName: "tree" */'@/view/tree')
  },
  wish: {
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

const router = new VueRouter({ routes })

const beforeHook = async (to, from, next) => {
  if (!navigator.standalone) {
    if (to.name !== 'index') {
      next('index')
      return
    }
  }
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

const afterHook = async (to, from) => {
}

router.afterEach(afterHook)

router.beforeEach(beforeHook)

window.router = router

export default router
