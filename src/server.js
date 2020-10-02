const express = require('express')
const cors = require('cors')

const { cats, dogs } = require('./store')
const { Queue, readQue } = require('./queue/Queue')
const { seedQue, startCatInterval, startDogInterval } = require('./utils')
const { PORT, CLIENT } = require('./config')

const [catQ, dogQ] = [new Queue(), new Queue()]

let catDequeueTimer
let dogDequeueTimer

seedQue(catQ, cats)
seedQue(dogQ, dogs)

const app = express()

app.use(cors({
  origin: CLIENT_ORIGIN
}))

setTimeout(() => {
  startCatInterval(catQ, 5000)
  startDogInterval(dogQ, 5000)
}, 2500)

app.get('/api/cats/queue', (req, res, next) => {
  res.json(readQue(catQ))
  console.log(cats)
})

app.get('/api/dogs/queue', (req, res, next) => {
  res.json(readQue(dogQ))
})

app.delete('/api/cats/adopt', (req, res, next) => {
  const dq = catQ.dequeue()
  catQ.enqueue(dq)
  startCatInterval(catQ, 5000)
  res.sendStatus(204)
})

app.delete('/api/dogs/adopt', (req, res, next) => {
  const dq = dogQ.dequeue()
  dogQ.enqueue(dq)
  startDogInterval(dogQ, 5000)
  res.sendStatus(204)
})

app.use(function (req, res, next) {
  const err = new Error('Not found')
  err.status(404)
    next(err)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err: {}
  })
})

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`)
})