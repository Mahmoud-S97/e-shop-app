import React, {memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../components/Header/MainHeader';
import CartScreenStyles, {productItemCustomStyles} from './CartScreenStyles';
import constants from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../../components/Cart/CartItem';
import {setRemovedItemID} from '../../store/reducers/cartSlice';
import {setRemovedFavItemID} from '../../store/reducers/productsSlice';
import GeneralEmptyMessage from '../../components/Globals/GeneralEmptyMessage';
import MainButton from '../../components/Globals/MainButton';

const CartScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cartSlice.cartItems);
  const favProducts = useSelector(state => state.productsSlice.favProducts);

  const [tabType, setTabType] = useState(constants.ORDER_SUMMARY);

  const goBack = () => {
    navigation.goBack();
  };

  const removeCartItemConfirmationHandler = useCallback(() => {
    dispatch(setRemovedItemID(null));
    dispatch(setRemovedFavItemID(null));
  }, [dispatch]);

  const RenderProductItem = useCallback(
    ({item, index}) => {
      return (
        <CartItem
          key={index.toString() || item.id.toString()}
          item={item}
          style={productItemCustomStyles}
          alreadyInCartScreen={true}
          itemType={tabType}
        />
      );
    },
    [navigation, tabType, setTabType]
  );

  const MemoizedProductComponent = memo(RenderProductItem);

  const RenderEmptyMessage = () => {
    return (
      <GeneralEmptyMessage
        messageTextStyles={CartScreenStyles.emptyMessageTextStyles}
        button={
          tabType === constants.ORDER_SUMMARY ? (
            <MainButton onPress={() => navigation.navigate('Home')}>
              Go Shop!
            </MainButton>
          ) : null
        }>
        {tabType === constants.ORDER_SUMMARY
          ? 'Your Cart is Empty'
          : 'No Favorite Products Yet!'}
      </GeneralEmptyMessage>
    );
  };

  const RenderOrderSummary = () => {
    if (!cartProducts.length) {
      return <RenderEmptyMessage />;
    }

    return cartProducts?.map((item, index) => (
      <MemoizedProductComponent
        key={index.toString() || item.id.toString()}
        item={item}
        index={index}
      />
    ));
  };

  const RenderFavorites = () => {
    if (!favProducts.length) {
      return <RenderEmptyMessage />;
    }

    return favProducts?.map((item, index) => (
      <MemoizedProductComponent
        key={index.toString() || item.id.toString()}
        item={item}
        index={index}
      />
    ));
  };

  const RenderCartItems = useCallback(() => {
    if (!favProducts.length && !cartProducts.length) {
      return (
        <GeneralEmptyMessage
          messageTextStyles={CartScreenStyles.emptyMessageTextStyles}
          button={
            <MainButton onPress={() => navigation.navigate('Home')}>
              Go Shop!
            </MainButton>
          }>
          Your Cart is Empty
        </GeneralEmptyMessage>
      );
    }
    if (tabType === constants.ORDER_SUMMARY) {
      return <RenderOrderSummary />;
    } else {
      return <RenderFavorites />;
    }
  }, [favProducts, cartProducts, tabType, setTabType]);

  return (
    <ScrollView
      contentContainerStyle={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={removeCartItemConfirmationHandler}>
        <View style={GENERAL_STYLES.screen}>
          <MainHeader
            style={{height: 80}}
            headerLeft={{
              headerLeftBtn1_content: (
                <FontAwesome
                  name="angle-left"
                  size={30}
                  color={COLORS.PRIMARY}
                />
              ),
              headerLeftBoxStyles: {width: '12.5%'},
              headerLeftAction1Styles: {backgroundColor: 'transparent'},
              action1: goBack
            }}
            headerTitle={`Cart (${cartProducts.length})`}
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
            {favProducts.length || cartProducts.length ? (
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
            ) : null}
            <RenderCartItems />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default CartScreen;
