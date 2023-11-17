const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
    console.log('give at least one argument')
    process.exit(1)
}


const name = process.argv[2]
const number = process.argv[3]

const url = process.env.MONGO_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length>2) {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 2){
    console.log('Phonebook: \n')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
