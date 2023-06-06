import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { API_URL } from "../../../config";
import useAxios from "../../../components/hooks/UseAxios";
import { IAuthData, IUser, ITransactions, fundProps } from "../../../components/types";



export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/payments/transactions`,
        method: "get",
      });

      const authData: { data: ITransactions[] } = response.data;
      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response)
        const msg = error.response.data as { error: { userMessage: string } };
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const getCards = createAsyncThunk(
  "transactions/getCards",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/payments/cards`,
        method: "get",
      });
      const authData: { data: any } = response.data;
      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data as { error: { userMessage: string } };
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const fundAccount = createAsyncThunk(
  "transactions/fundAccount",
  async (data: fundProps, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/payments/fund`,
        method: "post",
        data: data
      });
      const authData: { data: any } = response.data;
      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data as { error: { userMessage: string } };
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

