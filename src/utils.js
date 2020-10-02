const faker = require('faker')
const { cats, dogs } = require('./store')
const Queue = require('./queue/Queue')

const [catQue, dogQue] = [new Queue(), new Queue()]

function random(a) {
    const rand = Math.floor(Math.random() * a.length)

    if(rand <= 0) {
        return 1
    } else if(rand >= a.length-1) {
        return a.length - 2
    } else {
        return rand
    }
}

function seedQue(que, arr) {
    if(que.first !== null) {
        const randClient = random(arr)
        for(let i=0; i < arr.length; i++) {
            if(randClient === i) {
                arr[i].adopter = null
                que.enqueue(arr[i])
            } else {
                arr[i].adopter = `${faker.name.first()} ${faker.name.lastName()}`
                que.enqueue(arr[i])
            }
        }
    }
}

function safeCatDequeue(que) {
    if(que.first !== null) {
        if(que.first.value.adopter !== null) {
            const dq = que.dequeue()
            que.enqueue(dq)
        } else {
            clearInterval(catDequeueTimer)
        }
    } else {
        clearInterval(catDequeueTimer)
    }
}

function safeDogDequeue(que) {
    if(que.first !== null) {
        if(que.first.value.adopter !== null) {
            const dq = que.dequeue()
            que.enqueue(dq)
        } else {
            clearInterval(dogDequeueTimer)
        }
    } else {
        clearInterval(dogDequeueTimer)
    }
}

function startDogInterval(que, t) {
    dogDequeueTimer = setInterval(() => {
        safeDogDequeue(que)
    }, t)
}

function startCatInterval(que, t) {
    catDequeueTimer = setInterval(() => {
        safeCatDequeue(que)
    }, t)
}

module.exports = {
    random,
    seedQue,
    safeCatDequeue,
    safeDogDequeue,
    startCatInterval,
    startDogInterval
}