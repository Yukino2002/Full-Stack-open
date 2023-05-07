import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'

let countries = []

const App = () => {
  const [name, setName] = useState('')
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => countries = response.data)
      .catch(error => console.log(error))
  }, [])

  const handleNameChange = (event) => {
    const filterName = event.target.value
    setName(filterName)
    filterName === '' ? setShowCountries([]) : setShowCountries(countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())))
  }

  const handleShow = (filterName) => {
    setShowCountries(countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())))
  }

  return (
    <div>
      find countries <input value={name} onChange={handleNameChange} />
      <br />
      {showCountries.length > 10
        ? "Too many matches, specify another filter"
        : showCountries.length !== 1
          ? showCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => {
            handleShow(country.name.common)
          }}>show</button></div>)
          : <CountryView country={showCountries[0]} />}
    </div>
  );
}

export default App;
