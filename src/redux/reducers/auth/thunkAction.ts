import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { API_URL } from "../../../config";
import useAxios from "../../../components/hooks/UseAxios";
import { IAuthData, IUser } from "../../../components/types";
import { saveToken } from "../../../components/hooks/UseAxios";

export const signIn = createAsyncThunk(
  "auth/signup",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/users/signup`,
        method: "post",
        data: data,
      });
      console.log(response.data);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully created a new account, verify your email now'

      });

      const authData: { data: IAuthData } = response.data;

      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data as { error: { userMessage: string } };
        const mss = error.response.data.message.slice(error.response.data.message.indexOf('Error',))
        console.log(error.response)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: mss

        });
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/users/verify-email`,
        method: "post",
        data: data,
      });
      console.log(response.data);


      const authData: { data: IAuthData } = response.data;


      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data as { error: { userMessage: string } };
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.meta.error

        });
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const verifyPhone = createAsyncThunk(
  "auth/verifyPhone",
  async (data: object, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/users/confirm-phone`,
        method: "post",
        data: data,
      });
      console.log(response.data);



    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response)
        const msg = error.response.data as { error: { userMessage: string } };
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.meta.error

        });
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: object, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/users/login`,
        method: "post",
        data: data,
      });

      console.log(response.data)
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Welcome back, you can proceed to your dashboard now'

      });
      const authData: { data: IUser, token: string } = response.data;
      await saveToken('token', authData.token)

      return authData.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data)
        const msg = error.response.data as { error: { userMessage: string } };
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.meta.error

        });
        return thunkAPI.rejectWithValue(msg.error.userMessage);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (data: object, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/users/details`,
        method: "get",
      });
      const authData: { data: IUser } = response.data;
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


export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data: object, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/users/update-password`,
        method: "post",
        data: data
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
       
        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const getResetPassordToken = createAsyncThunk(
  "auth/getResetPassordToken",
  async (data: object, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/users/get-token`,
        method: "post",
        data: data
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: msg

        });
        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: object, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/users/change-password`,
        method: "post",
        data: data
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.meta.error;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: msg

        });
        return thunkAPI.rejectWithValue(msg);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);