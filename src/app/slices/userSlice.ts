import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
    },

    clearUser: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
