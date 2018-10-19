export default {
  proto: [
    'home:style'
  ],
  async init (forage) {
    const value = await forage({ type: 'get', key: 'config@home:style' })
    if (value === 'list' || value === 'grid') {
      // noop
    } else {
      await forage({ type: 'set', key: 'config@home:style', value: 'grid' })
    }
  }
}
