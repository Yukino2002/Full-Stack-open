import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
const _ = require('lodash')

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.find(person => _.isEqual(person.name, newPerson.name))) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterName} />
      </div>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons filterName={filterName} persons={persons} />
    </div>
  )
}

export default App