import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, UserDocument, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const logout = createAsyncThunk<void, string>(
  'users/logout',
  async (token, { rejectWithValue }) => {
    try {
      await axiosApi.delete('/users/sessions', {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const login = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data
    } catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const googleLogin = createAsyncThunk<UserDocument, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });

      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

