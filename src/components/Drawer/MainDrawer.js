import React from 'react';
import {View, Text} from 'react-native';
import MainDrawerStyles from './MainDrawerStyles';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SCREENS from '../../constants/screens';
import {COLORS} from '../../constants/styles/Styles';
import {removeDataFromAsyncStorage} from '../../utils';
import { CommonActions } from '@react-navigation/native';
import constants from '../../constants';
import MainButton from '../Globals/MainButton';

const MainDrawer = props => {
  console.log('Drawer Props: ', props);
  const {navigation} = props;
  const {routeNames, index} = props.state;
  const focused = routeNames[index];

  const drawerItemsList = [
    {
      id: 1,
      name: SCREENS.HOME,
      title: 'Home',
      itemFocused: focused === SCREENS.HOME_SCREENS,
      icon: () => (
        <Octicons
          name="home"
          size={25}
          color={focused === SCREENS.HOME_SCREENS ? COLORS.GRAY : COLORS.BLACK}
        />
      )
    },
    {
      id: 2,
      name: SCREENS.PROFILE,
      title: 'Profile',
      itemFocused: focused === SCREENS.PROFILE,
      icon: () => (
        <FontAwesome
          name="user-o"
          size={25}
          color={focused === SCREENS.PROFILE ? COLORS.GRAY : COLORS.BLACK}
        />
      )
    },
    {
      id: 3,
      name: SCREENS.FEEDBACK,
      title: 'Feedback',
      itemFocused: focused === SCREENS.FEEDBACK,
      icon: () => (
        <MaterialIcons
          name="feedback"
          size={25}
          color={focused === SCREENS.FEEDBACK ? COLORS.GRAY : COLORS.BLACK}
        />
      )
    },
    {
      id: 4,
      name: SCREENS.CONTACT_US,
      title: 'Contact Us',
      itemFocused: focused === SCREENS.CONTACT_US,
      icon: () => (
        <MaterialIcons
          name="quick-contacts-dialer"
          size={25}
          color={focused === SCREENS.CONTACT_US ? COLORS.GRAY : COLORS.BLACK}
        />
      )
    }
  ];

  const logoutHandler = async () => {
    await removeDataFromAsyncStorage(constants.IS_LOGGED_IN);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: SCREENS.AUTH }]
      })
    )
    return;
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={MainDrawerStyles.drawerHeaderBox}>
          <Text style={MainDrawerStyles.drawerHeaderTitle}>menu</Text>
          <MainButton
            style={MainDrawerStyles.closeBtnBox}
            rippleBorderRadius={20}
            onPress={() => navigation.closeDrawer()}
            icon={<Ionicons name="close" size={25} color={COLORS.PRIMARY} />}>
          </MainButton>
        </View>
        <View style={MainDrawerStyles.inner}>
          {drawerItemsList.map(item => (
            <MainButton
              key={item.id}
              style={[
                MainDrawerStyles.drawerItem,
                item.itemFocused && {backgroundColor: COLORS.LIGHT_GRAY}
              ]}
              onPress={() => navigation.navigate(item.name)}
              btnTextStyles={[
                MainDrawerStyles.drawerItemText,
                item.itemFocused && {color: COLORS.BLUE}
              ]}
              icon={item.itemFocused && <item.icon />}>
                {item.title}
            </MainButton>
          ))}
        </View>
      </DrawerContentScrollView>
      <MainButton
        onPress={logoutHandler}
        style={MainDrawerStyles.logoutBtn}
        btnTextStyles={MainDrawerStyles.logoutBtnText}>
          Sign Out
      </MainButton>
    </View>
  );
};

export default MainDrawer;
