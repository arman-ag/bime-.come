import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  nationalId: '',
  phoneNumber: '',
  addressId: '',
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { storeUserInfo } = userSlice.actions;
export default userSlice.reducer;
