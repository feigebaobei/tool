// 哈希表相关的方法

import {LinkedList} from './linkedListTool.js'

class hashTableBase{
  constructor () {
    this.table = []
  }
  loseloseHashCode (key) {
    let hash = 0
    for (let i = 0, iLen = key.length; i < iLen; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
  put (key, value) {
    this.table[this.loseloseHashCode(key)] = value
  }
  remove (key) {
    this.table[this.loseloseHashCode(key)] = undefined
  }
  get (key) {
    return this.table[this.loseloseHashCode(key)]
  }
}

class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
    this.toString = `[${key} - ${value}]`
  }
}
// 使用分离链接方法
class hashTableLinked {
  constructor () {
    this.table = {}
  }
  djbHashCode (key) {
    var hash = 5381
    for (let i = 0, iLen = key.length; i < iLen; i++) {
      hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
  }
  put (key, value) {
    let position = this.djbHashCode(key)
    if (!this.table[position]) {
      this.table[position] = new LinkedList()
    }
    this.table[position].append(new ValuePair(key, value))
  }
  remove () {
    let position = this.loseloseHashCode(key)
    let link = this.table[position]
    if (link.isEmpty()) {
      return false
    } else {
      let cur = link.getHead()
      let index = -1
      while (cur.next) {
        if (cur.element.key === key) {
          break
        }
        index++
        cur = cur.next
      }
      if (cur.element.key === key) {
        index++
      }
      let removeEle = link.removeAt(index) // 返回被删除的元素
      if (link.isEmpty()) {
        this.table[position] = undefined
      }
      return removeEle
    }
  }
  get (key) {
    let position = this.djbHashCode(key)
    if (this.table[position]) {
      let cur = this.table[position].getHead()
      let value = undefined
      while (cur && cur.element.key !== key) {
        cur = cur.next
      }
      return cur.element.value
    } else {
      return undefined
    }
  }
}

// 使用线性探查方法
class hashTableLinear {
  constructor () {
    this.table = {}
  }
  djbHashCode (key) {
    var hash = 5381
    for (let i = 0, iLen = key.length; i < iLen; i++) {
      hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
  }
  put (key, value) {
    let position = this.djbHashCode(key)
    while (this.table[position]) {
      position++
    }
    this.table[position] = new ValuePair(key, value)
  }
  remove (key) {
    let position = this.djbHashCode(key)
    let value = undefined
    while (this.table[position] && this.table[position].key !== key) {
      position++
    }
    value = this.table[position] ? this.table[position].value : value
    this.table[position] = undefined
    return value
  }
  get (key) {
    let position = this.djbHashCode(key)
    let cur = this.table[position]
    let value = undefined
    while (cur && cur.key !== key) {
      cur = this.table[position++]
    }
    return cur ? cur.value : value
  }
}



export default {
  hashTableBase,
  hashTableLinked
}