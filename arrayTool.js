// 与数组相关的工具方法

/*
有序数组
*/
class OrderArray {
  constructor () {
    this.box = []
  }
  push (value) {
    // 先用从头开始的查询方法。
    // 后改为二分查询的方法
    let index = this.box.findIndex(item => {
      return item > value
    })
    if (index > -1) {
      // this.box.push(value)
      this.box.splice(index, 0, value)
    } else {
      this.box.push(value)
    }
  }
  // 删除指定下标的元素
  pullIndex (index) {
    this.box.splice(index, 1)
  }
  // 删除第一个指定元素
  pullElementOne (value) {
    let index = this.box.findIndex((item, index) => {
      return item === value
    })
    this.box.splice(index, 1)
  }
  // 删除所有指定元素
  pullElementAll (value) {
    let [start, end] = [this.box.indexOf(value), this.box.lastIndexOf(value)]
    this.box.splice(start, end - start + 1)
  }
}
/*
数组排序
*/
let arraySort = {
  // 结果都是升序
  // 冒泡排序
  // arr 需要排序的数组
  bubbleSort: arr => {
    for (let i = 0, iLen = arr.length; i < iLen; i++) {
      for (let j = 0; j < iLen - 1 - i; j++) {
        if (arr[j] > arr[j + 1])  {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
  },
  // 选择排序
  // 从未排序的部分中选出最小的放在排序部分的最后面
  selectSort: arr => {
    let length = arr.length, indexMin
    for (let i = 0; i < length; i++) {
      indexMin = i
      for (let j = i; j < length; j++) {
        if (arr[indexMin] > arr[j]) {
          indexMin = j
        }
      }
      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]]
      }
    }
  },
  // 插入排序
  insertSort: arr => {
    let length = arr.length, j, temp
    for (let i = 1; i < length; i++) {
      j = i
      temp = arr[i]
      while (j > 0 && arr[j - 1] > temp) {
        arr[j] = arr[j - 1]
        j--
      }
      arr[j] = temp
    }
  },
  // 归并排序
  mergeSort: arr => {
    let length = arr.length
    // arr = mergeSortRec(arr)
    return mergeSortRec(arr)
    function mergeSortRec (arr) {
      let length = arr.length
      if (length === 1) {
        return arr
      }
      var mid = Math.floor(length / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid, length)
      return merge(mergeSortRec(left), mergeSortRec(right))
    }
    function merge (left, right) {
      let il = 0, ir = 0, result = []
      while (il < left.length && ir < right.length) {
        result.push(left[il] < right[ir] ? left[il++] : right[ir++])
      }
      while (il < left.length) {
        result.push(left[il++])
      }
      while (ir < right.length) {
        result.push(right[ir++])
      }
      return result
    }
  },
  // 快速排序
  quickSort: arr => {
    let position = (arr, left, right) => {
      let pivot = arr[Math.floor((left + right) / 2)], i = left, j = right
      while (i <= j) {
        while (arr[i] < pivot) {
          i++
        }
        while (arr[j] > pivot) {
          j--
        }
        if (i <= j) {
          [arr[i], arr[j]] = [arr[j], arr[i]]
          i++
          j--
        }
      }
      return i
    }
    let quick = (arr, left, right) => {
      var index
      if (arr.length > 1) {
        index = position(arr, left, right)
        if (left < index - 1) {
          quick(arr, left, index - 1)
        }
        if (index < right) {
          quick(arr, index, right)
        }
      }
    }
    quick(arr, 0, arr.length - 1)
  }
  // 堆排序
  // 计数排序
  // 桶排序
  // 基数排序
}


export default {
  OrderArray,
  arraySort
}