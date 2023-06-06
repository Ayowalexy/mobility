import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, getCards, fundAccount } from "./thunkAction";
import { ITransactions } from "../../../components/types";

interface IState {
  transactions: ITransactions[];
  loading: "failed" | "pending" | "successful" | "idle";
  cards: [],
  oneTransaction: ITransactions
}


const initialState: IState = {
  transactions: [],
  loading: "idle",
  cards: [],
  oneTransaction: {
    reference: "",
    amount: 0,
    name: '',
    type: '',
    status: 'pending',
    createdAt: '',
    _id: ''
  }
};

const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setOneTransaction: (state, action) => {
      const oneTransaction = state.transactions.find(data => data._id === action.payload);
      return {
        ...state,
        oneTransaction
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      return { ...state, loading: "successful", transactions: action.payload };
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      return { ...state, loading: "failed", };
    });

    builder.addCase(getCards.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      return { ...state, loading: "successful", cards: action.payload };
    });
    builder.addCase(getCards.rejected, (state, action) => {
      return { ...state, loading: "failed", };
    });

    builder.addCase(fundAccount.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(fundAccount.fulfilled, (state, action) => {
      return { ...state, loading: "successful", };
    });
    builder.addCase(fundAccount.rejected, (state, action) => {
      return { ...state, loading: "failed", };
    });



  },
});
export const transactionReducer = transactionsSlice.reducer;
export const { setOneTransaction } = transactionsSlice.actions
// Later, dispatch the thunk as needed in the app
