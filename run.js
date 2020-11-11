// // 与队列相关的工具方法

// /*
// 队列
// */
// let Queue = (function () {
//   // let items = new WeakMap() // 若key被删除则队列中的相应元素也会被删除。
//   // let items = new Map() // 不能实现有序插入。也就无法实现优先队列。
//   let items = [] // 可以实现优先队列
//   return class Queue {
//     constructor () {
//       this.items = items
//     }
//     //
//     getAll () {
//       // return items.get(this)
//       // return this
//       // return this.items
//       return items
//     }
//     // 追加元素
//     enqueue (...args) {
//       // this.getArray().push(...args)
//       // this.push(...args)
//       // this.items.push(...args)
//       items.push(...args)
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
//       // return this.getArray().shift()
//       // return this.items.shift()
//       return items.shift()
//     }
//     head () {
//       // return this.getArray()[0]
//       return this.items[0]
//     }
//     size () {
//       // return items.get(this).length
//       return this.items.length
//     }
//     tail () {
//       // return this.getArray()[this.size() - 1]
//       return this.items[this.size() - 1]
//     }
//     isEmpty () {
//       return this.items.size() === 0
//     }
//     clear () {
//       // items.set(this, [])
//       this.items = []
//     }
//     reverse () {
//       // let arr = this.getArray()
//       // this.clear()
//       // this.enqueue(...(arr.reverse()))
//       this.items.reverse()
//     }
//   }
// })()

// class PriorityQueue extends Queue {
//   // [k: [], ...]
//   constructor () {
//     // this
//     super()
//   }
//   enqueue () {}
// }



// // var q = new PriorityQueue()
// var q = new Queue()
// q.enqueue('str', 0)
// // console.log(q.getArray()[0].getArray())

// console.log(q.enqueue(1))
// // console.log(q.enqueue(3))
// // console.log(q.enqueue(2))
// // console.log(q.getArray())
// // console.log(q.reverse())
// // console.log(q.getArray())
// console.log(q.getAll())
// // q.dequeue()
// // console.log(q.size())
// // console.log(q.tail())
// // console.log(q.reverse())
// // console.log(q.getAll())
// // console.log(q.clear())
// // console.log(q.getAll())

// class Foo {
//   constructor () {
//     this.k = 'v'
//   }
//   a = () => {
//     console.log(this)
//   }
//   b () {
//     console.log(this)
//   }
// }

// function _defineProperty(obj, key, value) {
//   if (key in obj) {
//     Object.defineProperty(obj, key, {
//       value: value, enumerable: true, configurable: true, writable: true
//     });
//   } else {
//     obj[key] = value;
//   }
//   return obj;
// }

// class Foo {
//   constructor() {
//     _defineProperty(this, "a", () => {
//       console.log(this);
//     });

//     this.k = 'v';
//   }

//   b() {
//     console.log(this);
//   }

// }


var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()
life.on('open', function (param) {
  console.log('param', param)
})

// life.removeListener('open', )
life.emit('open', 'hello')

function close (param) {
  console.log('close', param)
}
life.on('close', close)
life.emit('close', 'test close')
life.removeListener('close', close)
life.emit('close', 'test close')