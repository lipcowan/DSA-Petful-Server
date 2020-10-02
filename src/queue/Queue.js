class _Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data);
    if (this.last) {
      node.next = this.last
      this.last.prev = node
    }
    this.last = node

    if (this.first === null) {
      this.first = node;
    }
  }

  dequeue() {
    if (!this.first) {
      return;
    }
    const node = this.first;
    this.first = this.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }

  showFirst() {
    if (!this.first) {
      return null;
    }
    return this.first.value
  }

  showAll() {
    const array = [];
    if(!this.first) {
      return []
    }

    let current = this.first;

    while(current.prev !== null){
      array.push(current.value);
      current = current.prev;
    }
    array.push(current.value)
    return array;
  }
}

module.exports = Queue