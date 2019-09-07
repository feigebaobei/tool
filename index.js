/**
 * 是否为奇数
 */
let isOdd = n => !!n ^ 1
/**
 * 位运算，是否为偶数
 */
let isEven = n => !isOdd(n)
/**
 * 乘以2^n
 * n 数字
 * m 2的幂
 */
let multipleTwo = (n, m) => {
  return n << m
}
/**
 * 深拷贝
 */
let deepCope = obj => new Promise((resolve) => {
  let {port1, port2} = new MessageChannel()
  port2.onmessage = e => resolve(e.data)
  port1.postMessage(obj)
})
/**
 * base64编码
 */
let transBase64 = string => {
  let table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '', '=']
  let arr = string.split('')
  let bArr = arr.reduce((res, cur) => {
    let b = cur.charCodeAt()
    b = b.toString(2)
    let delta = 8 - b.length
    while (delta > 0) {
      b = '0' + b
      delta--
    }
    res += b
    return res
  }, '')
  let bArr2 = [], bindex = 0
  while (bindex < bArr.length) {
    bArr2.push(bArr.slice(bindex, bindex + 24))
    bindex += 24
  }
  let res = bArr2.slice(0, -1).reduce((res, cur) => {
    let index = 0
    while (index < 24) {
      let item6 = cur.slice(index, index + 6)
      let n = Number.parseInt(item6, 2)
      res += table[n]
      index += 6
    }
    return res
  }, '')
  let codeAccount = Math.ceil(bArr2.slice(-1)[0].length / 6)
  let emptyAccount = 4 - codeAccount
  let latest = bArr2.slice(-1)[0]
  while (latest.length < codeAccount * 6) {
    latest += '0'
  }
  let index = 0
  while (index < codeAccount) {
    let item6 = latest.substring(index * 6, (index + 1) * 6)
    let n = Number.parseInt(item6, 2)
    res += table[n]
    index++
  }
  while (emptyAccount) {
    res += '='
    emptyAccount--
  }
  return res
}
/**
 * 平分数组
 */
let halvingArr = (arr, number) => {
  if (arr.length > number) {
    let res = []
    let quotients = Math.floor(arr.length / number)
    let modulo = arr.length - quotients * number//arr.length % number
    let index = 0
    let start = 0
    let end = quotients + (modulo > 0 ? 1 : 0)
    while (index < quotients - 1) {
      res.push(arr.slice(start, end))
      start = end
      modulo--
      end = end + quotients + (modulo > 0 ? 1 : 0)
      index++
    }
    res.push(arr.slice(start))
    return res
  } else {
    let res = [], index = 0
    while (index < arr.length) {
      res.push([arr[index]])
      index++
    }
    return res
  }
}
/**
 * 判断是否是回文字段
 */
let isPalindrome = str => str === str.split('').reduceRight((res, cur) => res += cur, '')
/**
 * 生成一个在给定范围内徘徊的数组成的数组。
 */
let wander = (direction, start, min, max, time) => {
  let res = []
  if (time < 2) {
    res.push(start)
  }
  while (time > 0) {
    if (direction) {
      if (start < max) {
        start++
      } else {
        start--
        direction = !direction
      }
      res.push(start)
    } else {
      if (start > min) {
        start--
      } else {
        start++
        direction = !direction
      }
      res.push(start)
    }
    time--
  }
  // console.log(res)
  return res
}
/**
 * 把一个字符串按z型返回（从上到下，从左到右）
 * @param  {[type]} s       [description]
 * @param  {[type]} numRows [description]
 * @return {[type]}         [description]
 */
let convert = (s, numRows) => {
  if (numRows < 2) {
    return s
  } else {
    let group = []
    for (let i = 0; i < numRows; i++) {
      group.push('')
    }
    let index = 0
    let direction = true // true: +   false: -
    for (let i = 0; i < s.length; i++) {
      console.log(index)
      group[index] += s.substr(i, 1)
      if (direction) {
        if (index < numRows - 1) {
          index++
        } else {
          index--
          direction = !direction
        }
      } else {
        if (index > 0) {
          index--
        } else {
          index++
          direction = !direction
        }
      }
    }
    return group.reduce((res, cur) => (res += cur), '')
  }
}
/**
 * 根据一个字符串返回一条龙排列的字符串。
 * @param  {[type]} s       [description]
 * @param  {[type]} numRows [description]
 * @return {[type]}         [description]
 */
let straight = (s, numRows) => {
  if (numRows < 2) {
    return s
  } else {
    let group = []
    let sArr = s.split('')
    let i = 0
    for (; i < sArr.length - 1; i+=numRows) {
      let arr = sArr.slice(i, i + numRows)
      if (i & 1) {
        arr = arr.reverse()        
      }
      group.push(arr)
    }
    group.push(sArr.slice(i))
    let res = ''
    for (i = 0; i < numRows; i++) {
      group.forEach(arr => {
        res += arr[i]  || '' // === undefined ? '' : arr[i]
      })
    }
    return res
  }
}





// 罗马数字 => 阿拉伯数字
var intToRoman = function(num) {
    if (num < 1 || num > 3999) {
        return false
    }
    let arr = [['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], ['', 'M', 'MM', 'MMM']], i = 0, j = 0, res = ''
    while (num > 1) {
        j = num % 10
        num = ~~(num /= 10)
        res = arr[i][j] + res
        i++
    }
    return res
};
r = intToRoman(58)
// 得到无序数组的最长递增子序列
var ascendSubArr = arr => {
  let res = arr.slice(0, 1), i = 1
  while (i < arr.length) {
    if ((res[res.length - 2] || arr[i] - 1) < arr[i] && arr[i] < res[res.length - 1]) {
      res[res.length - 1] = arr[i]
    }
    i++
  }
  return res
}
// 阿拉伯数字 => 罗马数字
let romanToInt = s => {
  if (s < 0 || 3999 < s) {
    return false
  }
  let map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let arr = s.split('').reverse(), i = 1, res = map[arr[0]]
  while (i < arr.length) {
    if (map[arr[i - 1]] > map[arr[i]]) {
      res -= map[arr[i]]
    } else {
      
      res += map[arr[i]]
    }
    i++
  }
  return res
}

/*
栈
*/
let Stack = (function () {
let items = new WeakMap()
class Stack {
  constructor () {
    // this.items = []
    // this.length = this.items.length
    items.set(this, [])
  }
  // 得到数组
  getArray () {
    return items.get(this)
  }
  // 添加一个或多个元素
  push (...args) {
    // this.items.push(...args)
    // items.get(this).push(...args)
    this.getArray().push(...args)
  }
  // 弹出一个元素
  pop () {
    // return this.items.pop()
    return this.getArray().pop()
  }
  // 返回栈顶的元素
  peek () {
    return this.getArray()[this.size() - 1]
  }
  isEmpty () {
    return this.size() === 0
  }
  clear () {
    items.set(this, [])
  }
  size () {
    return items.get(this).length
  }
}
return Stack
})()
/*
队列
*/
let Queue = (function () {
  let items = new WeakMap()
  return class Queue {
    constructor () {
      items.set(this, [])
    }
    //
    getArray () {
      return items.get(this)
    }
    // 追加元素
    enqueue (...args) {
      this.getArray().push(...args)
    }
    // 移除队列的第一个元素，并返回移除的元素
    dequeue () {
      return this.getArray().shift()
    }
    front () {
      return this.getArray()[0]
    }
    end () {
      return this.getArray()[this.size() - 1]
    }
    isEmpty () {
      return this.size() === 0
    }
    clear () {
      items.set(this, [])
    }
    size () {
      return items.get(this).length
    }
  }
})()
/*
链表
*/
class LinkBase {
  constructor () {
    this.length = 0
    this.head = null
  }
  isEmpty () {
    this.length === 0
  }
  size () {
    return this.length
  }
  getHead () {
    return this.head
  }
  // getTail () {
  //   return this.tail
  // }
  join (separate = '') {
    let current = this.head, str = ''
    while (current) {
      str += String(current.element) + separate
      current = current.next
    }
    return str.substr(0, str.length - separate.length)
  }
}
class LinkedNode extends LinkBase { // 声明式
  constructor (iterate = []) {
    super()
    this.length = 0
    if (iterate.length) {
      let link = iterate.reduceRight((res, cur) => {
        let o = {
          element: cur,
          next: res
        }
        this.length++
        return o
      }, null)
      this.head = link
    } else {
      this.head = null
    }
  }
  static node (element) { // 静态方法可以由类调用,不能由实例调用.
    return {
      element: element,
      next: null
    }
  }
  append (element) {
    let ele = Link.node(element), current = null
    // this.head = ele
    if (this.head === null) {
      this.head = ele
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = ele
    }
    this.length++
  }
  // 在指定位置插入元素
  insert (position, element) {
    if (position < -1 || position > this.length) {
      return false
    }
    let node = Link.node(element),
      current = this.head,
      previous = null,
      index = 0
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      while (index++ < position) {
        previous = current
        current = current.next
      }
      node.next = current
      previous.next = node
    }
    this.length++
    return true
  }
  removeAt (position) {
    if (position > -1 && position < this.length) {
      let current = this.head, previous = null, index = 0
      if (position === 0) {
        current = head
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length--
      return current.element
    } else {
      return null
    }
  }
  // 删除链表中包含指定元素的节点。不返回东西。
  removeElement (element, all = false) {
    if (this.head.element === element) {
      this.head = null
      this.length = 0
    } else {
      let current = this.head.next, previous = this.head
      while (current) {
        if (current.element === element) {
          previous.next = current.next
          this.length--
          if (!all) {
            break
          }
        }
        previous = current
        current = current.next
      }
    }
  }
  // 删除链表中所有包含指定节点的元素
  // removeElementAll (element) {
  //   this.removeElement(element, true)
  // }
  // 得到指定元素第一次出现的位置
  indexOf (element) {
    let current = this.head, index = 0
    while (current) {
      if (current.element === element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  indexOfAll (element) {
    let current = this.head, index = 0, res = []
    while (current) {
      if (current.element === element) {
        res.push(index)
      }
      index++
      current = current.next
    }
    return res
  }
  // 得到指定位置的元素
  getEleByIndex (index = null) {
    if (index === null) {
      return null
    } else {
      let i = 0, current = this.head
      while (i < index && current) {
        current = current.next
        i++
      }
      return current.element
    }
  }
}
/*
双向链表
*/
class DoublyLinkedList {
  constructor () {
    this.head = null
    this.length = 0
    this.tail = null
  }
  static node (element) {
    return {
      element: element,
      prev: null,
      next: null
    }
  }
  // 追加
  append (element) {
    let node = DoublyLinkedList.node(element)
    if (this.length) {
      let t = this.tail
      t.next = node
      node.prev = t
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }
    this.length++
  }
  // 在指定位置插入
  insert (position, element) {
    if (position > 0 && position <= this.length) {
      let node = DoublyLinkedList.node(element), current, previous, index = 0
      if (position === 0) { // head
        // node.next = this.head
        // this.head = node
        if (this.length) {
          node.next = this.head
          this.head.prev = node
          this.head = node
        } else {
          this.head = node
          this.tail = node
        }
      } else {
        if (position === this.length) { // tail
          this.tail.next = node
          node.prev = this.tail
          this.tail = node
        } else { // middle
          current = this.head
          while(index++ < position) {
            previous = current
            current = current.next
          }
          node.next = current
          node.prev = previous
          current.prev = node
          previous.next = node
        }
      }
      this.length++
      return true
    } else {
      return false
    }
  }
  // 删除指定位置的节点，若删除成功则返回节点的element。否则返回false
  removeAt (position) {
    if (position > -1 && position < this.length) {
      let current = this.head, previous, index = 0
      if (position === 0) { // head
        if (this.length === 1) {
          this.head = null
          this.tail = null
        } else {
          this.head = this.head.next
          this.head.prev = null
        }
      } else {
        if (position === this.length - 1) { // tail
          // if (this.length) {}
          current = this.tail
          this.tail = current.prev
          this.tail.next = null
        } else { // middle
          while (index++ < position) {
            previous = current
            current = current.next
          }
          previous.next = current.next
          current.next.prev = previous
        }
      }
      this.length--
      return current.element
    } else {
      return false
    }
  }
  // 删除指定元素
  removeElement (element, all = false) {
    let current = this.head, res = []
    while (current) {
      if (current.element === element) {
        if (!current.prev) { // 前面无元素
          this.head = current.next
          if (!current.next) { // 后面无元素
            this.tail = current.prev
          } else { // 后面有元素
            current.next.prev = null
          }
        } else { // 前面有元素
          if (!current.next) { // tail
            this.tail = current.prev
            current.prev.next = null
          } else {
            current.prev.next = current.next
            current.next.prev = current.prev
          }
        }
        this.length--
        if (!all) {
          break
        }
      }
      current = current.next
    }
  }
  // removeElementAll () {}
  // 连接成字符串
  join (separate = '') {
    let current = this.head, res = ''
    while (current) {
      str += String(current.element) + separate
      current = current.next
    }
    return str.substr(0, str.length - separate.length)
  }
  // 切片后的链条
  slice(start = 0, end = this.length - 1) {
    if (start > 0 && start < this.length - 1 && end >= start && end <= this.length - 1) {
      let current = this.head, index = 0
      while (index < start) {
        current = current.next
        index++
      }
      this.head = current
      this.head.prev = null
      while (index < end) {
        current = current.next
        index++
      }
      this.tail = current
      this.tail.next = null
    }
    let index = 0, current = this.head
    while (current) {
      current = current.next
      index++
    }
    this.length = index
    return this
  }
  // 得到指定位置的元素
  getEleByIndex (position) {
    if (position > 0 && position < this.length) {
      let index = 0, current = this.head
      while (index++ < position) {
        current = current.next
      }
      return current.element
    }
  }
  // 得到头节点
  getHead () {
    return this.head
  }
  // 得到尾节点
  getTail () {
    return this.tail
  }
  // 是否是空节点
  isEmpty () {
    return this.length === 0
  }
}
/*
循环链表
*/
class CircularLinkedList extends LinkBase {
  constructor () {
    super()
    this.length = 0
    this.head = null
    this.tail = null
  }
  static node (element) {
    return {
      element: element,
      prev: null,
      next: null
    }
  }
  // 追加元素
  append (element) {
    let node = CircularLinkedList.node(element)
    if (this.length) {
      let last = this.tail
      last.next = node
      node.prev = last
      this.tail = node
      node.next = this.head
      this.head.prev = node
    } else {
      this.head = node
      node.prev = node
      node.next = node
      this.tail = node
    }
    this.length++
  }
  // 把元素插入到指定位置
  insert (position, element) {
    if (position <= this.length && position > -1) {
      let node = CircularLinkedList.node(element)
      if (this.length) {
        if (position === 0) {
          node.next = this.head
          this.head.prev = node
          node.prev = this.tail
          this.tail.next = node
          this.head = node
        } else {
          if (position === this.length) {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
            node.next = this.head
            this.head.prev = node
          } else {
            let current = this.head, index = 0
            while (index++ < position) {
              current = current.next
            }
            current.prev.next = node
            node.prev = current.prev
            node.next = current
            current.prev = node
          }
        }
      } else {
        this.head = node
        this.tail = node
        node.prev = node
        node.next = node
      }
      this.length++
      return true
    } else {
      return false
    }
  }
  // 删除指定位置的节点，若删除成功则返回true。否则返回false
  removeAt (position) {
    if (position > -1 && position < this.length) {
      if (this.length) {
        let current = this.head, index = 0
        while (index++ < position) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
        if (position === 0) {
          this.head = current.next
        } else {
          if (position === this.length - 1) {
            this.tail = current
          }
        }
      } else {
        this.head = null
        this.tail = null
      }
      this.length--
      return true
    } else {
      return false
    }
  }
  // 删除指定的元素，返回删除节点的数据
  removeElement (element, all = false) {
    let current = this.head, index = 0, count = 0
    while (index++ < this.length) {
      current = current.next
      if (current.element === element) {
        if (index === 0) {// 删除头
          if (this.length === 1) {
            this.head = null
            this.tail = null
          } else {
            this.head = this.head.next
            this.head.prev = this.tail
            this.tail.next = this.head
          }
        } else {
          if (index === this.length - 1) { // 删除尾
            this.tail = current.prev
            this.tail.next = this.head
            this.head.prev = this.tail
          } else { // 删除中间
            current.prev.next = current.next
            current.next.prev = current.prev
          }
        }
        index--
        this.length--
        count++
        if (!all) {
          break
        }
      }
    }
    return count
  }
  // 若切片成功，则返回指定范围的切片，否则返回false
  slice (start = 0, end = this.length - 1) {
    if (start > -1 && start <= end && end < this.length) {
      let index = 0, current = this.head
      this.length = end - start + 1
      while (index++ < start) {
        current = current.next
      }
      if (this.length) {
        this.head = current
        let count = 1
        while (count++ < this.length - 1) {
          current = current.next
        }
        this.tail = current
        this.head.prev = this.tail
        this.tail.next = this.head
      } else {
        this.head = null
        this.tail = null
      }
      return this
    }
    return false
  }
  getEleByIndex (position) {
    if (position > -1 && position < this.length) {
      let current = this.head, index = 0
      while (index++ < this.length) {
        current = current.next
      }
      return current.element
    }
    return new Error('range error')
  }
  getTail (position) {
    return this.tail
  }
}
/*
判断指定属性是否在自身上
*/
function hasPrototypeProperty(entity, property){ 
  return !entity.hasOwnProperty(property) && (property in entity); 
}