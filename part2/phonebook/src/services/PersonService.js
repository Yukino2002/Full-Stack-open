import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
  const promise = axios.get(baseUrl)
  return promise
    .then(response => {
      return response.data
    })
}

const createPerson = (newPerson) => {
  const promise = axios.post(baseUrl, newPerson)
  return promise
    .then(response => {
      return response.data
    })
}

const deletePerson = (personId) => {
  const promise = axios.delete(`${baseUrl}/${personId}`)
  return promise
    .then(response => {
      return response
    })
}

const updatePerson = (updatedPerson) => {
  const promise = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return promise
    .then(response => {
      return response.data
    })
}

const services = { getPersons, createPerson, deletePerson, updatePerson }

export default services