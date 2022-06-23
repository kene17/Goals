import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from localStorage using token
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //if there's a user in localStorage, then use that else it would be null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register User, it receives a user from the front end
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);//sends the user to make post request and return data from the backend
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const logout = createAsyncThunk('auth/logout', async() =>{

  await authService.logout()

}) 


//Register User
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: {
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload; //what's returned from the register try block
    },
    [register.rejectted]: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.message = action.payload; //what's gotten from the register catch block
      state.user = null;
    },
    [logout.fulfilled]: (state, action) =>{
      state.user = null;
    }
  },
});

//Logout user





export const { reset } = authSlice.actions;
export default authSlice.reducer;
