import _ from 'lodash'
import Vue from 'vue'
import pkg from 'package.json'
import user from './user'
import config from './config'

const { version } = pkg
const [ major, minor ] = version.split('.')
const app = `${major}.${minor}`

const { $storage } = Vue.prototype

const closure = {}

const forage = async ({ type, key, value }) => {
  const [ name, item ] = key.split('@')
  const storage = closure[name]
  const path = `${app}/${item}`
  if (type === 'get') {
    const result = await storage.getItem(path)
    console.log(`[storage.js]@forage:type=${type};path=${path};result=${result};name=${name}`)
    return result
  }
  if (type === 'set') {
    const result = await storage.setItem(path, value)
    $storage[name][item] = result
    console.log(`[storage.js]@forage:type=${type};path=${path};result=${result};name=${name}`)
    return result
  }
  if (type === 'remove') {
    $storage[name][item] = null
    console.log(`[storage.js]@forage:type=${type};path=${path};name=${name}`)
    return storage.removeItem(path)
  }
}

Vue.prototype.$forage = forage

export default async function () {
  await Promise.all(_.map({
    user,
    config
  }, async ({ proto, init }, name) => {
    Vue.set($storage, name, window.util.observe(_.assign({}, _(proto).keyBy((item) => item).mapValues(() => '').value())))
    const storage = window.localforage.createInstance({
      name
    })
    closure[name] = storage
    await Promise.all(_.map(proto, async (item) => {
      const key = `${name}@${item}`
      const value = await forage({
        type: 'get',
        key
      })
      $storage[name][item] = value
    }))
    await init(forage)
  }))
}
