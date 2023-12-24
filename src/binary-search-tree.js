const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    this.rootTree = addNode(this.rootTree, data)

    function addNode(node, val) {
      if (!node) return new Node(val);

      if (node.data === val) return node;

      if (node.data > val) {
        node.left = addNode(node.left, val);
      } else {
        node.right = addNode(node.right, val);
      }

      return node
    }
  }

  has(data) {
    function searchData(node, data) {
      if (!node) return false;

      if (node.data === data) return true;

      if (node.data > data) {
        return searchData(node.left, data);
      } else {
        return searchData(node.right, data);
      }
    }

    return searchData(this.rootTree, data)
  }

  find(data) {
    function searchData(node, data) {
      if (!node) return null;

      if (node.data === data) return node;

      if (node.data > data) {
        return searchData(node.left, data);
      } else {
        return searchData(node.right, data);
      }
    }

    return searchData(this.rootTree, data)
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data)

    function removeNode(node, data) {
      if (!node) return null

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      }

      if (data === node.data) {
        if(!node.left && !node.right) return null

        if(!node.left) {
          return node.right
        }

        if(!node.right) {
          return node.left
        }

        let minRight = node.right
        while(minRight.left) {
          minRight = minRight.left
        }
        node.data = minRight.data
        node.right = removeNode(node.right, minRight.data)

        return node;
      }
    }
  }

  min() {
    let node = this.rootTree
    while(node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    let node = this.rootTree
    while(node.right) {
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};