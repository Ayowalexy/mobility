import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import { transactionReducer } from "./reducers/transactions";
import { transferReducer } from "./reducers/transfer";

export const rootReducer = combineReducers({
  authReducer,
  transactionReducer,
  transferReducer
});
export type RootState = ReturnType<typeof rootReducer>;
