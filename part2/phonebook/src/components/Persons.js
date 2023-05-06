import services from "../services/PersonService"

const Persons = ({ filterName, persons, setPersons }) => {
  const showPersons = filterName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

  return (
    <div>
      {showPersons.map(person =>
        <div key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => {
            if (window.confirm(`Delete ${person.name} ?`)) {
              services
                .deletePerson(person.id)
                .then(response => {
                  if (response.status === 200) {
                    setPersons(showPersons.filter(showPerson => showPerson.id !== person.id))
                  }
                })
            }
          }}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons