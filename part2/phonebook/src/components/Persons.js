import services from "../services/PersonService"

const Persons = ({ filterName, persons, setPersons, setMessage, setColor }) => {

  const displayMessage = (message, color) => {
    setMessage(message)
    setColor(color)
    setTimeout(() => { setMessage(null) }, 4000)
  }

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
                  displayMessage(`Deleted ${person.name}`, 'green')
                })
                .catch(error => {
                  displayMessage(`Information of ${person.name} has already been removed from the server`, 'red')
                })
              setPersons(showPersons.filter(showPerson => showPerson.id !== person.id))
            }
          }}>
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Persons