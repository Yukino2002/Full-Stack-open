import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    update(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
    },
    append(state, action) {
      return [...state, action.payload]
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdoteList = await anecdoteService.getAnecdotes()
    dispatch(set(anecdoteList))
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(append(newAnecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(update(updatedAnecdote))
  }
}

export const { update, append, set } = anecdoteSlice.actions
export default anecdoteSlice.reducer