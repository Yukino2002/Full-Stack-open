const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Password must be provided!')
  process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://jallanpratik:${password}@fsopen.feitwf7.mongodb.net/personsApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(result)
    mongoose.connection.close()
  })
}