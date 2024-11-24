import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MainHeader from '../MainHeader';
import {COLORS} from '../../../constants/styles/Styles';

const HomeHeader = props => {
  return (
    <MainHeader
      style={styles.HomeHeader}
      headerLeft={{
        headerLeftBtn1_content: (
          <View style={styles.customMenuBox}>
            <Entypo name="menu" size={30} color={COLORS.PRIMARY} />
            <Text style={styles.customMenuBoxText}>MENU</Text>
          </View>
        ),
        headerLeftAction1Styles: {
          width: 95,
          borderRadius: 25
        },
        action1: props.headerLeftHomeBtn
      }}
      headerTitle=""
      headerRight={{
        headerRightBtn1_content: (
          <FontAwesome6 name="cart-shopping" size={22} color={COLORS.PRIMARY} />
        ),
        action1: props.headerRightAction1,
        headerRightBtn2_content: (
          <FontAwesome name="user-circle-o" size={25} color={COLORS.PRIMARY} />
        ),
        action2: props.headerRightAction2
      }}
    />
  );
};

const styles = StyleSheet.create({
  HomeHeader: {
    backgroundColor: 'transparent'
  },
  customMenuBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customMenuBoxText: {
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 5,
    color: COLORS.PRIMARY
  }
});

export default HomeHeader;
