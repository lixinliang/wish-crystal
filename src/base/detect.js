const html = document.documentElement
const { userAgent, standalone, onLine } = window.navigator
const { width, height } = window.screen

// 设备检查
if (/android/.test(userAgent)) {
  html.classList.add('android')
} else {
  html.classList.add('ios')
  if (width === 375 && height === 812) {
    html.classList.add('iphonex')
  }
  if (width === 414 && height === 896) {
    html.classList.add('iphonex')
  }
}

html.classList.add(`width${width}`)
html.classList.add(`height${height}`)
html.classList.add(`dpi${devicePixelRatio}`)

// PWA
if (standalone) {
  html.classList.add('standalone')
} else {
  html.classList.add('browser')
}

// 离线应用
if (onLine) {
  html.classList.add('online')
} else {
  html.classList.add('offline')
}

// 开发环境
if (process.env.NODE_ENV === 'development') {
  html.classList.add('development')
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  html.classList.add('production')
}
