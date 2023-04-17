const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.rootOfNode = null;
  }
  root() {
    return this.rootOfNode;
  }
  add(data) {
    this.rootOfNode = addInto(this.rootOfNode, data);

    function addInto(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) {
        node.left = addInto(node.left, data);
      } else {
        node.right = addInto(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    function findNode(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data
        ? findNode(node.left, data)
        : findNode(node.right, data);
    }
    return findNode(this.rootOfNode, data);
  }

  find(data) {
    function findNode(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data
        ? findNode(node.left, data)
        : findNode(node.right, data);
    }
    return findNode(this.rootOfNode, data);
  }

  remove(data) {
    this.rootOfNode = removeNode(this.rootOfNode, data);

    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }
  min() {
    if (!this.rootOfNode) return null;
    let node = this.rootOfNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
  max() {
    if (!this.rootOfNode) return null;
    let node = this.rootOfNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
