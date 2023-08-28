import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch()

  const filteredAnecdotes = (filter === 'ALL' || filter === '') ? anecdotes : anecdotes.filter(anecdote => anecdote.content.includes(filter))

  const vote = anecdote => dispatch(updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 }))

  const sortedAnecdotes = [...filteredAnecdotes].sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList