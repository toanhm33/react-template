import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
    listUser: object;
}

const initialState: StudentState = {
  listUser: [],
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetch(state = initialState, action: PayloadAction<any>) {
      state.listUser = action.payload.res;
    },
  }
})

// action
export const studentActions = studentSlice.actions;

// Selectors

const studentReducer = studentSlice.reducer;
export default studentReducer;