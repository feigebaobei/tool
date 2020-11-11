// 与promise相关的工具方法

/**
 * 依次请求arr里的promise.
 * @param  {[type]} pArr [description]
 * @return {[type]}      [description]
 */
let orderPromise = (pArr) => {
  let data = []
  let sequence = Promise.resolve() // promise的filfulled状态
  pArr.forEach(item => {
    sequence = sequence.then(item).then(response => {
      data.push(response)
      return data
    })
  })
  return sequence
}
// orderPromise(pArr).then(res => {...})

// function handler (url) {
//   return new Promise((resolve, reject) => {
//     // resovle()
//     // reject()
//   })
// }

/**
 * 限制并发请求的的最大值。
 * @param  {[type]} arr     [description]
 * @param  {[function]} handler [返回promise的方法]
 * @param  {[number]} limit   [并发的最大值]
 * @return {[promise]}         [全部为filfulled的promise]
 */
let limitPromise = (arr, handler, limit) => {
  let sequence = [...arr]
  let promises = []
  // promises里是promise对象。
  // 当promise为filfulled状态时返回在arr中的index.
  promises = sequence.splice(0, limit).map((item, index) => {
    return handler(item).then(() => index)//.catch((e) => {error: e, index})
  })
  return sequence.reduce((r, item, index) => {
    return r.then(() => {
      return Promise.race(promises) // 得到最快resolve的promise在arr中的index
    })
    .catch(eo => {
      console.log(eo.error)
      return Promise.resolve(eo.index)
    })
    .then((res) => { // res是promises里的下标
      promises[res] = handler(sequence[index]).then(() => res)
    })
  }, Promise.resovle()).then(() => {
    return Promise.all(promises)
  })
}


export default {
  orderPromise,
  limitPromise
}