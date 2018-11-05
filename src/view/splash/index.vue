<template>
  <div id="splash"/>
</template>

<script>
import heart from '@/img/heart.svg'

export default {
  async mounted () {
    const { width, height } = window.screen
    const { canvas, context } = window.util.canvas(width, height)
    this.canvas = canvas
    this.context = context
    canvas.style['top'] = 0
    canvas.style['left'] = 0
    canvas.style['width'] = `${width}px`
    canvas.style['height'] = `${height}px`
    canvas.style['z-index'] = 99999
    canvas.style['opacity'] = 1
    canvas.style['position'] = 'absolute'
    canvas.style['transition'] = 'opacity .2s linear'
    document.body.appendChild(canvas)

    const clear = () => (context.clearRect(0, 0, width, height))

    const svg = util.html(heart)
    const base64 = util.xml(svg)
    const img = await window.util.img(base64)

    let loading
    let progress

    window.$event.on('splash:init', () => {
      clear()
      canvas.style['pointer-events'] = 'auto'
      loading = true
      progress = 0
      context.beginPath()
      context.fillStyle = `#ffffff`
      context.rect(0, 0, width, height)
      context.fill()
      context.closePath()
      window.util.loop(() => (new Promise(async (resolve) => {
        if (!loading) {
          return
        }
        context.clearRect(0, 0, width, height)
        const size = 50
        context.drawImage(img, ((width - size) / 2), ((height - size) / 2), size, size)
        context.globalCompositeOperation = 'source-in'
        context.fillStyle = '#fb7299'
        context.rect(0, 0, width, height)
        context.fill()
        context.globalCompositeOperation = 'source-over'
        await window.util.sleep(200)
        resolve()
      })))
    })

    window.$event.on('splash:progress', (value) => {
      progress = value
    })

    window.$event.on('splash:destroy', () => {
      clear()
      canvas.style['pointer-events'] = 'none'
      loading = false
      progress = 100
      context.beginPath()
      context.fillStyle = `#ffffff00`
      context.rect(0, 0, width, height)
      context.fill()
      context.closePath()
    })

    window.$event.emit('splash:init')
    await window.util.sleep(1000)
    this.$replace('home')
    await window.util.sleep(100)
    window.$event.emit('splash:destroy')
  }
}
</script>
