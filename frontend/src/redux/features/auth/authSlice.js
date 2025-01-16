import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: (() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      return null; // If nothing is stored, return null
    }
    try {
      return JSON.parse(storedUserInfo);
    } catch (error) {
      console.error('Error parsing userInfo from localStorage:', error);
      localStorage.removeItem('userInfo'); // Remove the invalid item to prevent future issues
      return null; // If parsing fails, return null
    }
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
      state.userInfo = null; // Fixed syntax
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime'); // Fixed key name
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
