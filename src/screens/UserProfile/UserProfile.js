import React from 'react';
import {View, Text} from 'react-native';
import UserProfileStyles from './UserProfileStyles';

const UserProfile = () => {
  return (
    <View style={UserProfileStyles.screen}>
      <Text style={{ fontSize: 20, color: "#333" }}>User Profile Screen!</Text>
    </View>
  );
};

export default UserProfile;
