import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'

import NotificationContext from './NotificationContextProvider'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const { isLoading, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => await axios.get('http://localhost:3001/anecdotes'),
    retry: 3,
  })

  const updateMutation = useMutation({
    mutationFn: async anecdote => await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const handleVote = anecdote => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET', payload: 'You voted ' + anecdote.content })
    setTimeout(() => {
      dispatch({ type: 'SET', payload: '' })
    }, 3000)
  }
  const anecdotes = data.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
