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
    let current = this.head, res = [], index = 0, previous, next
    while (current) {
      if (current.element === element) {
        // previous = current.prev || this.head
        // next = current.next || this.tail
        // previous.next = next
        // next()


        // if (!current.prev && current.next) {
        //   this.head = current.next
        //   current.next.prev = null
        // } else {
        //   if (!current.prev && !current.next) {
        //     this.head = null
        //     this.tail = null
        //   } else {

        //   }
        // }


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
            // current.next = null
          } else {
            current.prev.next = current.next
            current.next.prev = current.prev
          }
        }
        this.length--
        if (!all) {
          break
        }


        // if (current.prev) {
        //   // previous = current.prev
        //   // previous.next = current.next
        //   current.prev.next = current.next
        // } else {
        //   this.head = current.next
        //   current.next.prev = null
        // }
        // if (current.next) {
        //   current.next = current.prev
        // } else {
        //   this.tail = current.prev
        // }
        // res.push(current.element)
        // this.length--        
        // if (!all) {
        //   break
        // }



        // if (index === 0) { // head
        //   this.head = current.next
        //   current.prev = null
        // } else {
        //   if (index != this.length - 1) { // middle
        //     current.prev.next = current.next
        //     current.next.prev = current.prev
        //   } else { // tail
        //     this.tail = current.prev
        //     current.prev.next = null
        //   }
        // }
        // res.push(current.element)
        // if (!all) {
        //   break
        // }
      }
      // index++
      current = current.next
    }
    // this.length -= res.length
    // if (all) {
    //   return res
    // } else {
    //   return res.length ? res[0] : null
    // }
  }
  // removeElementAll () {}
  // 连接成字符串
  join (separate = '') {}
  // 得到指定位置的元素
  getEleByIndex () {}
  // 得到头节点
  getHead () {}
  // 得到尾节点
  getTail () {}
  // 是否是空节点
  isEmpty () {}
}


    var r = null

    r = new DoublyLinkedList()
    r.append('first')
    r.append('first')
    r.append('second')
    // // r.append('third')
    // // r.append('fouth')
    // // r.append('fivth')
    r.insert(1, 'second')
    r.insert(1, 'second')
    r.insert(1, 'second')
    // r.removeAt(2)
    // r.removeElement('2.5')
    // r.removeElement('2.5')
    // r.removeElement('2.5')
    r.removeElement('second', true)
    
    










    console.log(r)