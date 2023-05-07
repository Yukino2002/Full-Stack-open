import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import services from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  const messageStyle = {
    padding: 15,
    marginBottom: 15,
    color: color,
    backgroundColor: '#D3D3D3',
    fontSize: 20,
    border: 'solid',
    borderColor: color,
    borderRadius: 5,
  }

  useEffect(() => {
    services
      .getPersons()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <div style={messageStyle}>{message}</div> : ""}
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setColor={setColor} />
      <h3>Numbers</h3>
      <Persons filterName={filterName} persons={persons} setPersons={setPersons} setMessage={setMessage} setColor={setColor} />
    </div>
  )
}

export default App