const Persons = ({ filterName, persons }) => {
  const showPersons = filterName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

  return (
    <div>
      {showPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default Persons