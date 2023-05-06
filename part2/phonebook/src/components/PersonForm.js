import { useState } from "react"

import services from '../services/PersonService'

const _ = require('lodash')

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.find(person => _.isEqual(person.name, newPerson.name))) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }

    services
    .create(newPerson)
    .then(newPersonData => {
      setPersons(persons.concat(newPersonData))
      setNewName('')
      setNewNumber('')
    })

    // axios
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     setPersons(persons.concat(response.data))
    //     setNewName('')
    //     setNewNumber('')
    //   })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm