<template>
  <div id="splash"/>
</template>

<i18n>
splash@checking:
  en: Checking for Updates
  zh-CN: 正在检查更新
splash@updating:
  en: Updating
  zh-CN: 正在更新
splash@loading:
  en: Loading
  zh-CN: 加载中
home@coming-soon:
</i18n>

<script>
import pkg from 'package.json'
import heart from '@/img/heart.svg'

const { _ } = window
const { version } = pkg

const zindex = 99999 // 启屏动画

export default {
  async mounted () {
    // 创建画布
    const dpr = window.devicePixelRatio
    const width = window.innerWidth * dpr
    const height = window.innerHeight * dpr
    const { canvas, context } = window.util.canvas(width, height)
    this.canvas = canvas
    this.context = context

    canvas.style['top'] = 0
    canvas.style['left'] = 0
    canvas.style['width'] = `${window.innerWidth}px`
    canvas.style['height'] = `${window.innerHeight}px`
    canvas.style['z-index'] = zindex
    canvas.style['opacity'] = 1
    canvas.style['position'] = 'absolute'
    document.body.appendChild(canvas)

    // 图形常量
    const svg = util.html(heart)
    const base64 = util.xml(svg)
    const img = await window.util.img(base64)

    // 字体
    context.font = window.getComputedStyle(document.documentElement).font.replace(/\b[0-9\.]+px/g, (match) => `${+((parseFloat(match) * dpr).toFixed(2))}px`)

    // 颜色常量
    const white = '#ffffff'
    const pink = '#fb7299'

    // 动画终结点
    const deadline = 100
    // 动画进度条阶段 进度临时峰值
    let progressPeak = 0
    // 动画进度条阶段 进度变量
    let progressPercentage = 0
    // 动画进度条阶段 文案变量
    let text = ''
    // 动画进度条阶段 省略号变量
    let ellipsis = '...'
    // 动画淡出阶段 进度变量
    let fadeoutPercentage = 0

    const range = util.range(0, 100)

    // 清除画布
    const clear = () => (context.clearRect(0, 0, width, height))
    // 背景层
    const drawBackground = () => {
      context.beginPath()
      context.fillStyle = white
      context.rect(0, 0, width, height)
      context.fill()
      context.closePath()
    }
    // 创建心形
    const createHeart = (size, color) => {
      const { canvas, context } = window.util.canvas(size)
      context.drawImage(img, 0, 0, size, size)
      context.globalCompositeOperation = 'source-in'
      context.beginPath()
      context.fillStyle = color
      context.rect(0, 0, size, size)
      context.fill()
      context.closePath()
      context.globalCompositeOperation = 'source-over'
      return canvas
    }
    // 创建描边
    const createBorder = (shape, thickness, color) => {
      const offset = {
        'top-left': [-1, -1],
        'top': [0, -1],
        'top-right': [1, -1],
        'left': [-1, 0],
        'right': [1, 0],
        'bottom-left': [-1, 1],
        'bottom': [0, 1],
        'bottom-right': [1, 1]
      }
      const width = shape.width + thickness * 2
      const height = shape.height + thickness * 2
      const { canvas, context } = window.util.canvas(width, height)
      context.save()
      context.translate(thickness, thickness)
      _.forEach(offset, ([ x, y ]) => {
        context.drawImage(shape, x * thickness, y * thickness, shape.width, shape.height)
      })
      context.restore()
      context.globalCompositeOperation = 'source-in'
      context.beginPath()
      context.fillStyle = color
      context.rect(0, 0, width, height)
      context.fill()
      context.closePath()
      context.globalCompositeOperation = 'source-over'
      return canvas
    }
    // 创建进度区域 progressPercentage
    const createProgress = (shape) => {
      // progressPercentage 0 -> 100
      const context = shape.getContext('2d')
      // value 越大 切割后剩余区域越小
      const min = .20
      const max = .90
      const value = min + (max - min) * range(progressPercentage) / 100
      // console.log(value)
      // value 是擦除区域 需要取反
      context.clearRect(0, 0, shape.width, shape.height * (1 - value))
      return shape
    }
    // 创建描边心形
    const createShape = () => {
      const size = 75 * dpr
      const thickness = 1 * dpr
      const { canvas, context } = window.util.canvas(size + (thickness * 2) * 3)
      const inner = createHeart(size, pink)
      const middle = createBorder(inner, thickness, white)
      const outer = createBorder(middle, thickness, pink)
      const final = createProgress(inner)
      context.drawImage(outer, thickness * 0, thickness * 0, outer.width, outer.height)
      context.drawImage(middle, thickness * 1, thickness * 1, middle.width, middle.height)
      context.drawImage(final, thickness * 2, thickness * 2, inner.width, inner.height)
      return canvas
    }
    // 心形层
    const drawHeart = () => {
      const shape = createShape()
      context.drawImage(shape, (width - shape.width) / 2, (height - shape.height) / 2, shape.width, shape.height)
    }
    // 文字层
    const drawText = () => {
      if (!text) {
        return
      }
      const top = 60 * dpr
      context.fillStyle = pink
      context.textAlign = 'center'
      context.fillText(text + ellipsis, (width + context.measureText(ellipsis).width) / 2, height / 2 + top)
    }
    // 镂空层
    const drawHollow = () => {
      const size = 75 * dpr
      const hollow = createHeart(size, '#000000')
      context.globalCompositeOperation = 'destination-out'
      context.drawImage(hollow, (width - hollow.width) / 2, (height - hollow.height) / 2, hollow.width, hollow.height)
      context.globalCompositeOperation = 'source-over'
    }
    // 版本号
    const drawVersion = () => {
      const right = 20 * dpr
      const bottom = 24 * dpr
      context.fillStyle = pink
      context.textAlign = 'right'
      context.fillText(`v${version}`, width - right, height - bottom)
    }

    // 动画初始化
    window.$event.once('splash:init', () => {
      canvas.style['pointer-events'] = 'auto'
      clear()
      drawBackground()
    })
    // 动画进度条阶段
    window.$event.once('splash:progress', async () => {
      // 动画线程
      window.util.loop(() => (new Promise(async (resolve) => {
        // 进度变量 达到 动画终结点
        // 跳出 loop
        if (progressPercentage > deadline) {
          await window.util.sleep(100)
          window.$event.emit('splash:fadeout')
          return
        }
        clear()
        drawBackground()
        drawHeart()
        drawText()
        drawVersion()
        await window.util.sleep(20)
        if (progressPercentage > progressPeak) {
          // 进度变量 达到 进度临时峰值
          // 动画缓停
        } else {
          progressPercentage++
          // 进度变量 未达到 进度临时峰值
          // 动画继续
        }
        resolve()
      })))
      // 省略号线程
      window.util.loop(() => (new Promise(async (resolve) => {
        // 进度变量 达到 动画终结点
        // 跳出 loop
        if (progressPercentage > deadline) {
          return
        }
        const length = ellipsis.length % 3
        ellipsis = _.repeat('.', length + 1)
        await window.util.sleep(200)
        resolve()
      })))
      // 动画逻辑
      progressPeak = 30
      text = this.$t('splash@checking')
      await window.util.sleep(800)
      if (this.$storage.config['splash:display-updating'] === version) {
        // noop
      } else {
        progressPeak = 60
        text = this.$t('splash@updating')
        await this.$forage({ type: 'set', key: 'config@splash:display-updating', value: version })
        await window.util.sleep(1400)
      }
      progressPeak = 100
      text = this.$t('splash@loading')
    })
    // 动画淡出阶段
    window.$event.once('splash:fadeout', async () => {
      // 动画线程
      window.util.loop(() => (new Promise(async (resolve) => {
        // 进度变量 达到 动画终结点
        // 跳出 loop
        if (fadeoutPercentage > deadline) {
          return
        }
        clear()
        drawBackground()
        context.globalAlpha = 1 - range(fadeoutPercentage) / 100
        drawHeart()
        drawText()
        context.globalAlpha = 1 - context.globalAlpha
        drawHollow()
        context.globalAlpha = 1
        resolve()
      })))
      // 参数递增线程
      window.util.loop(() => (new Promise(async (resolve) => {
        // 进度变量 达到 动画终结点
        // 跳出 loop
        if (fadeoutPercentage > deadline) {
          return
        }
        await window.util.sleep(10)
        fadeoutPercentage += 7
        resolve()
      })))
      // 放大
      await window.util.sleep(200)
      canvas.style['transition'] = 'transform .3s cubic-bezier(0, 0, 1, 0)'
      canvas.style['transform'] = 'scale(20)'
      await window.util.sleep(400)
      window.$event.emit('splash:destroy')
    })
    // 动画销毁
    window.$event.once('splash:destroy', () => {
      canvas.remove()
    })

    // test
    // window.$event.emit('splash:init')
    // window.$event.emit('splash:progress')
    // progressPeak = 100
    // return

    window.$event.emit('splash:init')
    window.$event.emit('splash:progress')

    await window.util.sleep(100)
    this.$replace('home')
  }
}
</script>
