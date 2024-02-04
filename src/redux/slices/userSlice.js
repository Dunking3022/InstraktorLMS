import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userClasses: [{ classid: "You have no classes assigned to you yet!" }],
    userData: {}
  },
  reducers: {
    setUserData: (state, action) => {
        state.userData = action.payload;;
    },
    setUserClasses: (state, action) => {
      // Assuming action.payload is an array of user classes
      state.userClasses = action.payload;
    },
  },
});

export const { setUserData, setUserClasses } = userSlice.actions;
export default userSlice.reducer;