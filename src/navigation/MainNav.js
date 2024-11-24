import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthScreensList, HomeScreensList} from './NavigationComponents';
import MainDrawer from '../components/Drawer/MainDrawer';
import SplashScreen from '../screens/Intro/SplashScreen';
import { getScreenWidth } from '../utils';
import { COLORS } from '../constants/styles/Styles';

const AuthStack = createNativeStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      {AuthScreensList.map((item, index) => (
        <AuthStack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.screenOptions}
        />
      ))}
    </AuthStack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();

const Root = () => {
  return (
    <DrawerStack.Navigator
      initialRouteName="Home"
      drawerContent={props => <MainDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: getScreenWidth(),
          backgroundColor: COLORS.WHITE
        }
      }}>
      {HomeScreensList.map((item, index) => (
        <DrawerStack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.screenOptions}
        />
      ))}
    </DrawerStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const MainNav = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Splash" component={SplashScreen} />
          <MainStack.Screen name="Auth" component={AuthScreens} />
          <MainStack.Screen name="Root" component={Root} />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNav;
