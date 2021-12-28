import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Working:"Yes"
}

export const CommonSlice = createSlice({
  name: 'Common',
  initialState,
  reducers: {
  
    commonFunction: (state, action) => {
    //   state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { commonFunction } = CommonSlice.actions

export default CommonSlice.reducer