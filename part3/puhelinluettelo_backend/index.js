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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const mongoose = require('mongoose')
  
const Person = require('./models/person')

const generateID = async () => {
    const persons = await Person.find({})
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const info = `<p>Phonebook has info for ${persons.length} people <br> ${Date()} <p>`
        res.send(info)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})
  

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    Person.findByIdAndRemove(id)
        .then(deletedPerson => {
        if (deletedPerson) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    })
});

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "Number missing"
        })
    } /*else if (person.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }*/

    const person = new Person({
        id: generateID(),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
