import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userInfo: {
    nationalId: '',
    phoneNumber: '',
  },
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return { userInfo: action.payload };
    },
  },
});
export const { storeUserInfo } = userSlice.actions;
export default userSlice.reducer;
