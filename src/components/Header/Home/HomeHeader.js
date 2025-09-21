import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MainHeader from '../MainHeader';
import {COLORS} from '../../../constants/styles/Styles';
import { useSelector } from 'react-redux';
import MenuIcon from '../../Globals/Icons/MenuIcon';

const HomeHeader = props => {

  const productsCart = useSelector(state => state.cartSlice.cartItems);

  return (
    <MainHeader
      style={styles.HomeHeader}
      headerLeft={{
        headerLeftBtn1_content: (
          <MenuIcon />
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
          <View style={styles.headerRightCartBtnBox}>
            <FontAwesome6
              name="cart-shopping"
              size={22}
              color={COLORS.PRIMARY}
            />
            {productsCart?.length > 0 && (
              <View style={styles.headerRightCartBtn}>
                <Text style={styles.cartNumOfItemsText}>
                  {productsCart?.length}
                </Text>
              </View>
            )}
          </View>
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
    backgroundColor: COLORS.WHITE
  },
  headerRightCartBtnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  headerRightCartBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    position: 'absolute',
    top: -12,
    end: -10,
    zIndex: 1000
  },
  cartNumOfItemsText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.WHITE
  }
});

export default HomeHeader;
