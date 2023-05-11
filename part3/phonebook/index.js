require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.log(error.message, error.name)
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response
      .status(400)
      .send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({ error: 'unknown endpoint' })
}

app.get('/info', (request, response) => {
  response.send(
    `<div>
      <p>Phonebook has info for ${Person.find({}).then(persons => persons.length)} people</p>
      <p>${Date()}</p>
    <div>`
  )
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    'name': body.name,
    'number': body.number,
  })

  person.save()
    .then(() => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = new Person({
    '_id': request.params.id,
    'name': body.name,
    'number': body.number,
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response
        .status(204)
        .end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})