import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  AuthScreensList,
  HomeScreensList,
  GeneralScreensList
} from './NavigationComponents';
import MainDrawer from '../components/Drawer/MainDrawer';
import SplashScreen from '../screens/Intro/SplashScreen';
import {getScreenWidth} from '../utils';
import {COLORS} from '../constants/styles/Styles';
import {navigationRef} from './NavigationService';

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

const HomeStack = createNativeStackNavigator();
const HomeScreens = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      {HomeScreensList.map((item, index) => (
        <HomeStack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.screenOptions}
        />
      ))}
    </HomeStack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();
const Root = () => {
  return (
    <DrawerStack.Navigator
      initialRouteName="HomeScreens"
      drawerContent={props => <MainDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: getScreenWidth(),
          backgroundColor: COLORS.WHITE
        }
      }}>
      <DrawerStack.Screen name="HomeScreens" component={HomeScreens} />
      {GeneralScreensList.map((item, index) => (
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
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
        <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Splash" component={SplashScreen} />
          <MainStack.Screen name="Auth" component={AuthScreens} />
          <MainStack.Screen name="Root" component={Root} />
        </MainStack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MainNav;
