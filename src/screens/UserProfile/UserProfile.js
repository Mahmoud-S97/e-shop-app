import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import UserProfileStyles from './UserProfileStyles';
import {GENERAL_STYLES} from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/MenuIcon';

const UserProfile = ({navigation}) => {
  return (
    <ScrollView
      style={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          headerLeft={{
            headerLeftBtn1_content: <MenuIcon />,
            headerLeftAction1Styles: {
              width: 95,
              borderRadius: 25
            },
            action1: () => navigation.openDrawer()
          }}
          headerTitle="Profile"
          headerRight={{}}
        />
      </View>
    </ScrollView>
  );
};

export default UserProfile;
