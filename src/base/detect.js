const html = document.documentElement
const { userAgent } = window.navigator
const { width, height } = screen

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
