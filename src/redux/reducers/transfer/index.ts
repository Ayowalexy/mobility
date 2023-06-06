import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBanks, 
  resolveOtherBanks, 
  sendMoneyToOtherBanks, 
  resolveIntraBanks, 
  sendMoneyIntraBanks
} from "./thunkAction";
import { IBanks, IUserBanks } from "../../../components/types";

interface IState {
  allBanks: IBanks[];
  loading: "failed" | "pending" | "successful" | "idle";
  isResolving: "failed" | "pending" | "successful" | "idle";
  resolvedBank: IUserBanks
}


const initialState: IState = {
  allBanks: [],
  loading: "idle",
  isResolving: 'idle',
  resolvedBank: {
    account_name: "",
    account_number: '',
    bank_id: 0
  }
};
const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getAllBanks.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getAllBanks.fulfilled, (state, action) => {
      return { ...state, loading: "successful", allBanks: action.payload };
    });
    builder.addCase(getAllBanks.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //resolve bank
    builder.addCase(resolveOtherBanks.pending, (state) => {
      return { ...state, isResolving: "pending" };
    });
    builder.addCase(resolveOtherBanks.fulfilled, (state, action) => {
      return { ...state, isResolving: "successful", resolvedBank: action.payload };
    });
    builder.addCase(resolveOtherBanks.rejected, (state, action) => {
      return { ...state, isResolving: "failed" };
    });

    //resolve intra bank
    builder.addCase(resolveIntraBanks.pending, (state) => {
      return { ...state, isResolving: "pending" };
    });
    builder.addCase(resolveIntraBanks.fulfilled, (state, action) => {
      return { ...state, isResolving: "successful", resolvedBank: action.payload };
    });
    builder.addCase(resolveIntraBanks.rejected, (state, action) => {
      return { ...state, isResolving: "failed" };
    });

    //send to other bank
    builder.addCase(sendMoneyToOtherBanks.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(sendMoneyToOtherBanks.fulfilled, (state, action) => {
      return { ...state, loading: "successful" };
    });
    builder.addCase(sendMoneyToOtherBanks.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //send to intra bank
     builder.addCase(sendMoneyIntraBanks.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(sendMoneyIntraBanks.fulfilled, (state, action) => {
      return { ...state, loading: "successful" };
    });
    builder.addCase(sendMoneyIntraBanks.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });
  },
});
export const transferReducer = transferSlice.reducer;

