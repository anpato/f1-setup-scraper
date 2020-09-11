module.exports = class Stack {
  constructor() {
    this.items = []
  }

  enque(item) {
    return this.items.unshift(item)
  }

  deque() {
    return this.items.shift()
  }

  async makeRequests(cb) {
    let pageData = []
    for (const item of this.items) {
      let str = item.split('/')
      let name = str[str.length - 2].replace('-gp', ' ').split(' ')[0]
      pageData.push(await cb(item))
    }
    return pageData
  }
}
