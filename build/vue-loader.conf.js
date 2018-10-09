'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap


module.exports = {
  loaders: Object.assign(utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }), {
    'i18n': 'i18n-loader'
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting, 
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
