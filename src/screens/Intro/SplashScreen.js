import React from 'react';
import {View} from 'react-native';
import {getAccessToken} from '../../utils';
import SCREENS from '../../constants/screens';
import { useSelector } from 'react-redux';

const SplashScreen = async ({navigation}) => {
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const isAuth = await getAccessToken();
  console.log('Is Logged In ? :: ', isLoggedIn);
  console.log('Is Authenticated ? :: ', isAuth);
  if (isAuth && isLoggedIn) {
    navigation.replace(SCREENS.ROOT);
  } else {
    navigation.replace(SCREENS.AUTH);
  }

  return <View />;
};

export default SplashScreen;
