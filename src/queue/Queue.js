class _Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
function createNode(value = null, next = null, prev = null) {
  return { value, next, prev }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = createNode(data);
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
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }

}

function peek(q) {
  if (!q.first) {
    return null;
  }
  return q.first.value
}

function readQue(q) {
  const array = [];
  if(!q.first) {
    return []
  }

  let current = q.first;

  while(current.prev !== null){
    array.push(current.value);
    current = current.prev;
  }
  array.push(current.value)
  return array;
}



module.exports = {
  Queue,
  peek,
  readQue
}