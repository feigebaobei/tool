/**
 * 是否为奇数
 */
let isOdd = n => !!(n & 1)
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
/**
 * 得到浏览器种类
 */
let getBrowser = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
            && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        }//IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
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
/**
 * 得到查询字符串
 * @param  {[String]} url) [url]
 * @return {[Object]}      [description]
 */
let queryString = (url) => url.split('?')[1].split('&').reduce((res, cur) => {
  let [k, v] = cur.split('=')
  res[decodeURIComponent(k)] = decodeURIComponent(v)
  return res
}, {})

