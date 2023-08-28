import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote({ content, votes: 0 }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm