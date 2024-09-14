import { saveOrderRequest } from '@/app/_service/service';
import { personalInfoType } from '@/app/_service/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  userInfo: {},
  error: false,
  isLoading: false,
};
export const sendPersonalInfo = createAsyncThunk(
  'sendPersonalInfo',
  async (data: personalInfoType) => {
    await saveOrderRequest(data);
  }
);
export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return { userInfo: action.payload };
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(sendPersonalInfo.pending, (state) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(sendPersonalInfo.fulfilled, (state, action) => {
  //       (state.isLoading = false),
  //         (state.error = false),
  //         (state.data = action.payload);
  //     });
  //     builder.addCase(sendPersonalInfo.rejected, (state) => {
  //       (state.isLoading = false), (state.error = true);
  //     });
  //   },
});
export const { storeUserInfo } = userSlice.actions;
export default userSlice.reducer;
