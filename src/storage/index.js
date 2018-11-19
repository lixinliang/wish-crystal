import _ from 'lodash'
import Vue from 'vue'
import pkg from 'package.json'
import auth from './auth'
import user from './user'
import wish from './wish'
import config from './config'

const bundle = {
  auth,
  user,
  wish,
  config
}

const closure = {}
const separator = '@'
const { version } = pkg
const { $storage } = Vue.prototype

const [ major, minor ] = version.split('.')
const appVersion = `${major}.${minor}`

function ellipsis (value) {
  const string = `${value}`
  if (string.length <= 20) {
    return string
  } else {
    return `${string.slice(0, 10)}...${string.slice(-10)}`
  }
}

// forage 更新
const forage = async ({ type, key, value }) => {
  const [ storageName, keyName ] = key.split(separator)
  const storage = closure[storageName]
  if (type === 'get') {
    const result = await storage.getItem(keyName)
    console.log(`[storage.js]@forage:type=${type};key=${key};result=${ellipsis(result)}`)
    return result
  }
  if (type === 'set') {
    const result = await storage.setItem(keyName, value)
    $storage[storageName][keyName] = result
    console.log(`[storage.js]@forage:type=${type};key=${key};result=${ellipsis(result)}`)
    return result
  }
  if (type === 'remove') {
    $storage[storageName][keyName] = null
    console.log(`[storage.js]@forage:type=${type};key=${key}`)
    return storage.removeItem(keyName)
  }
  if (type === 'update') {
    const value = $storage[storageName][keyName]
    const result = await storage.setItem(keyName, value)
    console.log(`[storage.js]@forage:type=${type};key=${key}`)
    return result
  }
}

// 占用 Vue 原型链 命名空间
Vue.prototype.$forage = forage

export default async function () {
  await Promise.all(_.map(bundle, async (proto, storageName) => {
    const name = `${storageName}#${appVersion}`
    const storage = window.localforage.createInstance({
      name
    })
    const entity = _.mapValues(proto, () => '')
    const observe = window.util.observe(_.assign({}, entity))
    Vue.set($storage, storageName, observe)
    closure[storageName] = storage
    await Promise.all(_.map(proto, async (config, keyName) => {
      const key = `${storageName}${separator}${keyName}`
      let value = await forage({
        type: 'get',
        key
      })
      if (!value) {
        if (config) {
          const { defaultValue } = config
          if (defaultValue) {
            if (typeof defaultValue === 'function') {
              value = await defaultValue()
            } else {
              value = defaultValue
            }
            await forage({
              type: 'set',
              key,
              value
            })
          }
        }
      }
      $storage[storageName][keyName] = value
      if (config) {
        const { afterAssign } = config
        if (afterAssign) {
          await afterAssign(value)
        }
      }
    }))
  }))
}
