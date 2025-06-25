import {createAsyncThunk} from '@reduxjs/toolkit';
import {USER_LOGIN} from '../ApiEndPoints';
import {getAccessToken, saveAccessToken, saveRefreshToken} from '../../utils';
import {ACTION_KEYS} from '../actionKeys';

export const loginOrSignUpHandler = createAsyncThunk(
  ACTION_KEYS.USER_LOGIN,
  async (parameters, {rejectWithValue}) => {
    const {username, password} = parameters;
    console.log('Username: ', username);
    console.log('Password: ', password);

    try {
      const userLogin = await fetch(USER_LOGIN, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username,
          password
        })
      });
      const loginData = await userLogin.json();
      console.log('Login-Data:: ', loginData);
      const checkToken = await getAccessToken();
      console.log('TOKEN:: ', checkToken);
      if (!loginData?.accessToken) {
        return rejectWithValue(
          loginData?.message || 'Login failed, please try again later.'
        );
      }

      await saveAccessToken(loginData?.accessToken);
      await saveRefreshToken(loginData?.refreshToken);
      return loginData;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Network Error, please try again later.'
      );
    }
  }
);
