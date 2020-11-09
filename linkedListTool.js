// 链表相关的工具方法

// class LinkedList {
//   constructor () {}
//   append (element) {}
//   insert (element, position) {}
//   remove (element) {}
//   removeAt (position) {}
//   indexOf (element) {}
//   isEmpty () {}
//   size () {}
//   // toString () {}
// }

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
class LinkedList extends LinkBase { // 声明式
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
    let ele = LinkedList.node(element), current = null
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
    let node = LinkedList.node(element),
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
      node.next = this.head
      this.head.prev = node
    } else {
      this.head = node
      this.tail = node
      node.next = this.head
      node.prev = this.tail
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
  // slice(start = 0, end = this.length - 1) {
  //   if (start > 0 && start < this.length - 1 && end >= start && end <= this.length - 1) {
  //     let current = this.head, index = 0
  //     while (index < start) {
  //       current = current.next
  //       index++
  //     }
  //     this.head = current
  //     this.head.prev = null
  //     while (index < end) {
  //       current = current.next
  //       index++
  //     }
  //     this.tail = current
  //     this.tail.next = null
  //   }
  //   let index = 0, current = this.head
  //   while (current) {
  //     current = current.next
  //     index++
  //   }
  //   this.length = index
  //   return this
  // }
  // 应改为不改变原链表，返回新链表。
  slice (start = 0, end = this.length - 1) {
    let link = new DoublyLinkedList()
    for (let i = 0, iLen = end - start; i < iLen; i++) {
      link.append(this.getEleByIndex(i))
    }
    return link
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



export default {
  // LinkedList,
  LinkedList,
  DoublyLinkedList
}