// 与队列相关的工具方法

// 队列
class Queue {
    constructor () {
        this.items = []
    }
    enqueue (...args) {
        this.items.push(...args)
    }
    dequeue () {
        this.items.shift()
    }
    getAll () {
        return this.items
    }
    head () {
        return this.items[0]
    }
    tail () {
        return this.items[this.size() - 1]
    }
    size () {
        return this.items.length
    }
    isEmpty () {
        return this.size === 0
    }
    clear () {
        return this.items = []
    }
    reverse () {
        return this.items.reverse()
    }
}

// 优先队列
class PriorityQueue extends Queue {
    constructor () {
        super()
    }
    highestPriority () {
        let ele = super.tail()
        return ele ? ele.priority : 0
    }
    enqueue (element, priority = 0) {
        let i = 0, len = super.size()
        // while (i < len -)
        // 0 add
        // 1 比大小 add
        // 2 二分查找 add
        // 3 二分查找 add

        // while add
        // 0
        if (!len) {
            this.items.push({
                element,
                priority
            })
        } else {
        // 1
            if (len === 1) {
                let oe = this.items[0]
                if (oe.priority <= priority) {
                    this.items.push({
                        element,
                        priority
                    })
                } else {
                    this.items.shift({
                        element,
                        priority
                    })
                }
            } else {
        // 2
                if (this.highestPriority() <= priority) {
                    this.items.push({
                        element,
                        priority
                    })
                } else {
                    let i = 0
                    while (i < len - 1) {
                        let arr = super.getAll(),
                            left = arr[i],
                            right = arr[i + 1]
                        if (left.priority <= priority && right.priority > priority) {
                            this.items.splice(i + 1, 0, {element, priority})
                        }
                        i++
                    }
                }
            }
        }
    }
}


// /*
// 队列
// */
// let Queue = (function () {
//   // let items = new WeakMap()
//   let items = new Map()
//   // let items = []
//   return class Queue {
//     constructor () {
//       items.set(this, [])
//     }
//     //
//     getArray () {
//       return items.get(this)
//     }
//     // 追加元素
//     enqueue (...args) {
//       this.getArray().push(...args)
//     }
//     // 若要使用优先队列可以使用下面的方法重新设置追加元素的方法
//     // Queue.prototype.enqueue = function (element) {
//     //   let arr = this.getArray(), index = 0, arrLen = arr.length
//     //   while (arr[index] <= element) {
//     //     index++
//     //     if (arr[index] > element) {
//     //       break
//     //     }
//     //   }
//     //   arr.splice(index, 0, element)
//     // }
//     // 移除队列的第一个元素，并返回移除的元素
//     dequeue () {
//       return this.getArray().shift()
//     }
//     head () {
//       return this.getArray()[0]
//     }
//     tail () {
//       return this.getArray()[this.size() - 1]
//     }
//     isEmpty () {
//       return this.size() === 0
//     }
//     clear () {
//       items.set(this, [])
//     }
//     size () {
//       return items.get(this).length
//     }
//     reverse () {
//       let arr = this.getArray()
//       this.clear()
//       this.enqueue(...(arr.reverse()))
//     }
//   }
// })()






export default {
  Queue,
  PriorityQueue,
  // LinkBase,
  // LinkedNode,
  // DoublyLinkedList,
  // CircularLinkedList,
  // linkedNodeReverse
}