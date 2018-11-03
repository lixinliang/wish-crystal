<template>
  <div id="splash"/>
</template>

<script>
export default {
  async mounted () {
    const { width, height } = window.screen
    const { canvas, context } = window.util.canvas(width, height)
    canvas.style['top'] = 0
    canvas.style['left'] = 0
    canvas.style['width'] = `${width}px`
    canvas.style['height'] = `${height}px`
    canvas.style['z-index'] = 99999
    canvas.style['opacity'] = 1
    canvas.style['position'] = 'absolute'
    canvas.style['transition'] = 'opacity .2s linear'
    document.body.appendChild(canvas)
    context.fillStyle = '#ffffff'
    context.rect(0, 0, width, height)
    context.fill()
    context.fillStyle = '#ff0000'
    context.rect(0, 0, 100, 100)
    context.fill()
    canvas.addEventListener('transitionend', () => {
      canvas.remove()
    })
    this.$replace('home')
    await window.util.sleep(1000)
    canvas.style['opacity'] = 0
  }
}
</script>
