import { useState } from "react"

import services from '../services/PersonService'

const _ = require('lodash')

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const person = persons.find(person => _.isEqual(person.name, newPerson.name))

    if (person) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        services
          .updatePerson(updatedPerson)
          .then(personData => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? personData : person))
          })
      }
      return
    }

    services
      .createPerson(newPerson)
      .then(newPersonData => {
        setPersons(persons.concat(newPersonData))
        setNewName('')
        setNewNumber('')
      })
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