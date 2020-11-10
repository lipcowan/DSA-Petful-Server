const express = require('express')
const json = require('body-parser').json()
const People = require('./people.service')

const router = express.Router()

router.get('/', (req, res) => {
  // Return all the people currently in the queue.
  const people = People.get()
  if(!people) {
    res.status(400).json({error: {message: 'No people in list'}})
  } else {
    res.status(200).send(people)
  }
})

router.post('/', json, (req, res) => {
  // Add a new person to the queue.
  const { name } = req.body
  try {
    People.enqueue(name)
    res.status(201).json(People.get())
  } catch(error) {
    res.status(400).json(error.message)
  }
})

router.delete('/', json, (req, res) => {
  People.dequeue()
  res.status(204).end()
})

module.exports = router
