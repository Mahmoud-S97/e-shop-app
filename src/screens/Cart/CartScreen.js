import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../components/Header/MainHeader';
import CartScreenStyles, { productItemCustomStyles } from './CartScreenStyles';
import constants from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/Cart/CartItem';
import { setRemovedItemID } from '../../store/reducers/cartSlice';
import { setRemovedFavItemID } from '../../store/reducers/productsSlice';
import GeneralEmptyMessage from '../../components/Globals/GeneralEmptyMessage';
import MainButton from '../../components/Globals/MainButton';
import { LOCAL_IMAGES } from '../../constants/images/LocalImages';
import GoBackIcon from '../../components/Globals/GoBackIcon';
import SCREENS from '../../constants/screens';

const CartScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { cartItems: cartProducts, totalPrice: cartTotalPrice } = useSelector(state => state.cartSlice);
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
    ({ item, index }) => {
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

  const RenderEmptyMessage = () => {
    return (
      <GeneralEmptyMessage
        messageTextStyles={CartScreenStyles.emptyMessageTextStyles}
        button={
          tabType === constants.ORDER_SUMMARY ? (
            <MainButton
              btnTextStyles={CartScreenStyles.startShoppingBtnText}
              onPress={() => navigation.navigate('Home')}>
              Start Shopping!
            </MainButton>
          ) : null
        }
        icon={<RenderEmptyCartIcon />}>
        {tabType === constants.ORDER_SUMMARY
          ? 'Your Cart is Empty!'
          : "You haven't favorited any product yet!"}
      </GeneralEmptyMessage>
    );
  };

  const RenderOrderSummary = () => {
    if (!cartProducts.length) {
      return <RenderEmptyMessage />;
    }

    return cartProducts?.map((item, index) => (
      <RenderProductItem
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
      <RenderProductItem
        key={index.toString() || item.id.toString()}
        item={item}
        index={index}
      />
    ));
  };

  const RenderEmptyCartIcon = useCallback(() => {
    return (
      <View style={CartScreenStyles.emptyCartIconBox}>
        <Image
          source={
            tabType === constants.ORDER_SUMMARY
              ? LOCAL_IMAGES.EMPTY_CART
              : LOCAL_IMAGES.EMPTY_FAV_PRODUCT
          }
          style={CartScreenStyles.emptyCartIconStyles}
        />
      </View>
    );
  }, [tabType, setTabType]);

  const RenderCartItems = useCallback(() => {
    if (!favProducts.length && !cartProducts.length) {
      return (
        <GeneralEmptyMessage
          messageTextStyles={CartScreenStyles.emptyMessageTextStyles}
          button={
            <MainButton
              btnTextStyles={CartScreenStyles.startShoppingBtnText}
              onPress={() => navigation.navigate('Home')}>
              Start Shopping!
            </MainButton>
          }
          icon={<RenderEmptyCartIcon />}>
          Your Cart is Empty!
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
    <TouchableWithoutFeedback onPress={removeCartItemConfirmationHandler} accessible={false}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
            style={{ height: 80 }}
            headerLeft={{
              headerLeftBtn1_content: <GoBackIcon />,
              headerLeftBoxStyles: { width: '12.5%' },
              headerLeftAction1Styles: { backgroundColor: 'transparent' },
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
              action2: () => { }
            }}
          />
        <ScrollView
          contentContainerStyle={[GENERAL_STYLES.scrollingView, { paddingBottom: 80 }]}
          showsVerticalScrollIndicator={false}>
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
        </ScrollView>
        {cartTotalPrice > 0 && cartProducts.length > 0 && (
          <MainButton
            style={CartScreenStyles.checkoutBtn}
            onPress={() => navigation.navigate(SCREENS.CHECKOUT)}>
            Checkout Order
          </MainButton>
        )}
      </View>
    </TouchableWithoutFeedback>

  );
};

export default CartScreen;
