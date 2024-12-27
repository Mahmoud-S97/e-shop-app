import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../components/Header/MainHeader';
import CartScreenStyles from './CartScreenStyles';
import constants from '../../constants';
import {useSelector} from 'react-redux';

const CartScreen = props => {
  const {navigation} = props;
  const productsCart = useSelector(state => state.cartSlice.cartItems);

  const [tabType, setTabType] = useState(constants.ORDER_SUMMARY);

  console.log('productsCart<<>>', productsCart);

  const changeTabHandler = useCallback(
    value => {
      setTabType(value);
    },
    [tabType, setTabType]
  );

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          style={{height: 80}}
          headerLeft={{
            headerLeftBtn1_content: (
              <FontAwesome name="angle-left" size={30} color={COLORS.PRIMARY} />
            ),
            headerLeftBoxStyles: {width: '12.5%'},
            headerLeftAction1Styles: {backgroundColor: 'transparent'},
            action1: goBack
          }}
          headerTitle={`Cart (${productsCart.length})`}
          headerRight={{
            headerRightBtn2_content: (
              <FontAwesome
                name="user-circle-o"
                size={25}
                color={COLORS.PRIMARY}
              />
            ),
            action2: () => {}
          }}
        />
        <View style={GENERAL_STYLES.container}>
          <View style={CartScreenStyles.cartTopTab}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                CartScreenStyles.cartTopTabButton,
                tabType === constants.ORDER_SUMMARY &&
                  CartScreenStyles.cartTopTabButton_Active
              ]}
              onPress={() => changeTabHandler(constants.ORDER_SUMMARY)}>
              <Text style={CartScreenStyles.cartTopTabButtonText}>
                Order Summary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                CartScreenStyles.cartTopTabButton,
                tabType === constants.FAVORITE &&
                  CartScreenStyles.cartTopTabButton_Active
              ]}
              onPress={() => changeTabHandler(constants.FAVORITE)}>
              <Text style={CartScreenStyles.cartTopTabButtonText}>
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
          {productsCart.map((item, index) => (
            <Text key={index} style={{fontSize: 20, color: 'green'}}>
              {item.title}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen;
