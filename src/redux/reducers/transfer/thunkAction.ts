import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { API_URL } from "../../../config";
import useAxios from "../../../components/hooks/UseAxios";
import { IBanks, IUserBanks } from "../../../components/types";

export const getAllBanks = createAsyncThunk(
  "auth/getAllBanks",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/transfer/banks`,
        method: "get",
      });

      const resp: { data: IBanks[] } = response.data;

      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data as { error: { userMessage: string } };
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        console.log(error.response)

        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const resolveOtherBanks = createAsyncThunk(
  "transfer/resolveOtherBanks",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/transfer/banks`,
        method: "post",
        data: data
      });

      const resp: { data: IUserBanks} = response.data;

      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        console.log(error.response)

        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const resolveIntraBanks = createAsyncThunk(
  "transfer/resolveIntraBanks",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/payments/resolve`,
        method: "post",
        data: data
      });

      const resp: { data: IUserBanks} = response.data;

      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        console.log(error.response)

        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const sendMoneyToOtherBanks = createAsyncThunk(
  "transfer/sendMoneyToOtherBanks",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/transfer/other-banks`,
        method: "post",
        data: data
      });


      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        // console.log(error.response)

        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const sendMoneyIntraBanks = createAsyncThunk(
  "transfer/sendMoneyIntraBanks",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/payments/send`,
        method: "post",
        data: data
      });

      return response.data.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        // console.log(error.response)

        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


