import axios from 'axios'
const baseUrl = '/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async anecdote => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateAnecdote = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

const services = { getAnecdotes, createAnecdote, updateAnecdote }
export default services