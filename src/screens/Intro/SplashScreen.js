import React from 'react';
import {View} from 'react-native';
import {getDataFromAsyncStorage} from '../../utils';
import constants from '../../constants';
import SCREENS from '../../constants/screens';

const SplashScreen = async ({navigation}) => {
  const isAuth = await getDataFromAsyncStorage(constants.IS_LOGGED_IN);
  console.log('Is Logged In ? :: ', isAuth);
  if (isAuth) {
    navigation.replace(SCREENS.ROOT);
  } else {
    navigation.replace(SCREENS.AUTH);
  }

  return <View />;
};

export default SplashScreen;
