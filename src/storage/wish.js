import _ from 'lodash'
import Vue from 'vue'

const { $storage } = Vue.prototype

let domain = '//webpage.applinzi.com'

if (window.util.test('development')) {
  domain = 'http://172.26.137.5:5050'
}

const config = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

async function post (postKeys) {
  const data = _(postKeys).keyBy((value) => value).mapValues((value) => $storage.wish.map[value]).value()
  const api = '/wish-crystal/1.0/wish-note/assign'
  const url = `${domain}${api}`
  await window.axios(url, {
    data,
    method: 'post',
    withCredentials: true
  })
}

async function save (saveKeys) {
  const param = _(saveKeys).keyBy((value) => value).mapValues(() => 1).value()
  const api = '/wish-crystal/1.0/wish-note/assign'
  const url = `${domain}${api}`
  const result = await window.axios.get(url, param, config)
  const response = result.data
  const { data } = response
  _.forEach(data, (value, key) => {
    Vue.set($storage.wish.map, key, value)
  })
  await Vue.prototype.$forage({ type: 'update', key: 'wish@map' })
}

export default {
  'map': {
    defaultValue () {
      return {}
    },
    afterAssign () {
      window.router.beforeEach((to, from, next) => {
        if (to.name === 'wish') {
          window.util.loop(async () => {
            await window.util.sleep(15 * 1000)
            const api = '/wish-crystal/1.0/wish-note/keys'
            const url = `${domain}${api}`
            const param = {}
            const result = await window.axios.get(url, param, config)
            const response = result.data
            const { data } = response
            const remoteKeys = data
            const localKeys = _.keys($storage.wish.map)
            const postKeys = _.difference(localKeys, remoteKeys)
            const saveKeys = _.difference(remoteKeys, localKeys)
            if (saveKeys.length) {
              await save(saveKeys)
            }
            if (postKeys.length) {
              await post(postKeys)
            }
          })
        }
        next()
      })
    }
  }
}
