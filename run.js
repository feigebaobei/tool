
class Stack {
  constructor () {
    this.items = []
    // this.length = this.items.length
  }
  // 添加一个或多个元素
  push (...arg) {
    this.items.push(...arg)
  }
  // 弹出一个元素
  pop () {
    this.items.pop()
  }
  // 返回栈顶的元素
  peek () {
    return this.items[this.length - 1]
  }
  isEmpty () {
    return this.size() === 0
  }
  clear () {
    this.items = []
  }
  size () {
    return this.items.length
  }
}

var r = null
r = new Stack()
r.push(12,34)








    console.log(r)