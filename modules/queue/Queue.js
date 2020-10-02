class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = null;
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
      this.last.next = node;
    }
    if (!this.first) {
      this.first = node;
    }
    this.last = node;
  }

  dequeue() {
    if (!this.first) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;

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
    let current = this.first;
    while(current){
      array.push(current.value);
      current = current.next;
    }
    return array;
  }
}

module.exports = Queue
