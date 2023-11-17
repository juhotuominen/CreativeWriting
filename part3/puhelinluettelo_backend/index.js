const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();


const app = express()

morgan.token('postData', (req) => {
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(cors())

const mongoose = require('mongoose')
  
const Person = require('./models/person')

const generateID = async () => {
    const persons = await Person.find({})
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            const info = `<p>Phonebook has info for ${persons.length} people <br> ${Date()} <p>`
            res.send(info)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})
  

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
        if (deletedPerson) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Person not found' });
        }  
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(request.params.id, { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
