import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import services from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    services
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons filterName={filterName} persons={persons} />
    </div>
  )
}

export default App