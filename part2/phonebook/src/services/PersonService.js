import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => {
    return response.data
  })
}

const create = (newPerson) => {
  const promise = axios.post(baseUrl, newPerson)
  return promise.then(response => {
    return response.data
  })
}

const services = { getAll, create }

export default services