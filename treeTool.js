// 与树相关的工具方法

class BinarySearchTree {
  constructor () {
    this.root = null
  }
  genKey (value) {
    return {
      // key: key,
      value: value,
      left: left,
      right: right
    }
  }
  insertKey (key, newKey) {
    if (newKey.value < key.value) { // 左边
      if (!key.left) {
        key.left = newKey
      } else {
        insertKey(key.left, newKey)
      }
    } else { // 右边
      if (!key.right) {
        key.right = newKey
      } else {
        insertKey(key.right, newKey)
      }
    }
  }
  insert (value) {
    let key = this.genKey(value)
    if (!this.root) {
      this.root = key
    } else {
      insert(this.root, key)
    }
  }
  search (key) {}
  remove (key) {}
  min () {}
  max () {}
  inOrderTranverse () {}
  preOrderTranverse () {}
  postOrderTranverse () {}
}

export default {

}