const html = document.documentElement
const { userAgent } = window.navigator
const { width, height } = window.screen

if (/android/.test(userAgent)) {
  html.classList.add('android')
} else {
  html.classList.add('ios')
  if (width === 375 && height === 812) {
    html.classList.add('iphonex')
  }
}

html.classList.add(`width${width}`)
html.classList.add(`height${height}`)
html.classList.add(`dpi${devicePixelRatio}`)

if (navigator.standalone) {
  html.classList.add('standalone')
}

if (process.env.NODE_ENV === 'development') {
  html.classList.add('development')
}

if (process.env.NODE_ENV === 'production') {
  html.classList.add('production')
}
