import { createSlice } from "@reduxjs/toolkit";
import { 
  signIn, 
  verifyOtp, 
  loginUser, 
  verifyPhone, 
  getUser, 
  updatePassword,
  getResetPassordToken,
  changePassword
 } from "./thunkAction";
import { IUser } from "../../../components/types";

interface IState {
  user: IUser;
  loading: "failed" | "pending" | "successful" | "idle";
}


const initialState: IState = {
    user: {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      accountBalance: '',
      accountNumber: '',
      accountType: '',
      referral_code: "",
      points: 0

  },
  loading: "idle",
};

// Then, handle actions in your reducers:ß
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },

  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      return { ...state, loading: "successful", };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      console.log(action.payload);
      return { ...state, loading: "failed" };
    });

    //verify email
    builder.addCase(verifyOtp.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      return { ...state, loading: "successful", };
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //verify phone
    builder.addCase(verifyPhone.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(verifyPhone.fulfilled, (state, action) => {
      return { ...state, loading: "successful", };
    });
    builder.addCase(verifyPhone.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //login user
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return { ...state, loading: "successful", user: action.payload };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    // user details
    builder.addCase(getUser.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      return { ...state, loading: "successful", user: action.payload };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     // update password
     builder.addCase(updatePassword.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      return { ...state, loading: "successful" };
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     // get token
     builder.addCase(getResetPassordToken.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getResetPassordToken.fulfilled, (state, action) => {
      return { ...state, loading: "successful" };
    });
    builder.addCase(getResetPassordToken.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    // get token
    builder.addCase(changePassword.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      return { ...state, loading: "successful" };
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });
  },
});
export const authReducer = authSlice.reducer;

// Later, dispatch the thunk as needed in the app
