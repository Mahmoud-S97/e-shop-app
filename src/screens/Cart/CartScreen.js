import React, {memo, useCallback, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../components/Header/MainHeader';
import CartScreenStyles from './CartScreenStyles';
import constants from '../../constants';
import {useSelector} from 'react-redux';
import CartItem from '../../components/Cart/CartItem';

const CartScreen = props => {
  const {navigation} = props;
  const productsCart = useSelector(state => state.cartSlice.cartItems);

  const [tabType, setTabType] = useState(constants.ORDER_SUMMARY);

  console.log('productsCart<<>>', productsCart);

  const goBack = () => {
    navigation.goBack();
  };

  const renderProductItem = useCallback(({item, index}) => {
    return (
      <CartItem key={index.toString() || item.id.toString()} item={item} />
    );
  }, []);

  const MemoizedProductComponent = memo(renderProductItem);

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
              onPress={() => setTabType(constants.ORDER_SUMMARY)}>
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
              onPress={() => setTabType(constants.FAVORITE)}>
              <Text style={CartScreenStyles.cartTopTabButtonText}>
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
          {tabType === constants.ORDER_SUMMARY
            ? productsCart?.map((item, index) => (
                <MemoizedProductComponent
                  key={index.toString() || item.id.toString()}
                  item={item}
                  index={index}
                />
              ))
            : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen;
