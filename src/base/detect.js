const html = document.documentElement
const { userAgent, standalone, onLine } = window.navigator
const { width, height } = window.screen

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

if (standalone) {
  html.classList.add('standalone')
} else {
  html.classList.add('browser')
}

if (onLine) {
  html.classList.add('online')
} else {
  html.classList.add('offline')
}

if (process.env.NODE_ENV === 'development') {
  html.classList.add('development')
}

if (process.env.NODE_ENV === 'production') {
  html.classList.add('production')
}
