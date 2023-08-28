import { createSlice } from "@reduxjs/toolkit"

const initialState = 'ALL'

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const { content } = action.payload
      return content
    }
  }
})

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       const { content } = action.payload
//       return content
//     default:
//       return state
//   }
// }

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer