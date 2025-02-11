import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';
import CartItemStyles, {
  favAndremoveCartItemBtnConfirmation
} from './CartItemStyles';
import MainButton from '../Globals/MainButton';
import SCREENS from '../../constants/screens';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementCart,
  incrementCart,
  setRemovedItemID,
  removeItemFromCart
} from '../../store/reducers/cartSlice';
import constants from '../../constants';
import {
  removeItemFromFavorites,
  setRemovedFavItemID
} from '../../store/reducers/productsSlice';

const CartItem = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {id, title, price, image, thumbnail} = props.item;

  const onHoldRemovedItem = useSelector(
    state => state.cartSlice.onHoldDeletedItemID
  );
  const onHoldRemovedFavItem = useSelector(
    state => state.productsSlice.onHoldRemovedFavItemID
  );
  const itemInCart = useSelector(state =>
    state.cartSlice.cartItems.some(ele => ele.id === id)
  );
  const productQTY =
    useSelector(
      state => state.cartSlice.cartItems.find(ele => ele.id === id)?.qty
    ) || 0;

  const incrementCartHandler = useCallback(() => {
    const addedToCartItem = {
      id: id,
      title: title,
      price: price,
      image: thumbnail,
      qty: 1 // initial value
    };
    dispatch(incrementCart(addedToCartItem));
  }, []);

  const decrementCartHandler = useCallback(() => {
    dispatch(decrementCart(id));
  }, []);

  const putRemovedItemOnHoldHandler = () => {
    if (onHoldRemovedItem === id) {
      dispatch(removeItemFromCart(id));
    } else {
      dispatch(setRemovedItemID(id));
    }
  };

  const putRemovedFavItemOnHold = () => {
    if (onHoldRemovedFavItem === id) {
      dispatch(removeItemFromFavorites(id));
    } else {
      dispatch(setRemovedFavItemID(id));
    }
  };

  const viewProductHandler = () => {
    if (onHoldRemovedItem === id) {
      dispatch(setRemovedItemID(null));
    }
    if (onHoldRemovedFavItem === id) {
      dispatch(setRemovedFavItemID(null));
    }
    navigation.navigate(SCREENS.PRODUCT_VIEW, {productId: id});
  };

  const RenderIncAndDecButtons = () => {
    if (productQTY >= 1) {
      return props.itemType === constants.FAVORITE && itemInCart ? (
        <View style={CartItemStyles.addedToCartLabelBox}>
          <FontAwesome
            name="check-circle"
            size={22}
            color={COLORS.LIGHT_GREEN}
          />
          <Text style={CartItemStyles.addedToCartText}>Added To Cart</Text>
        </View>
      ) : (
        <View
          style={[
            CartItemStyles.decAndIncItemsBox,
            {...props?.style?.decAndIncItemsBox}
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[CartItemStyles.decItemBtn, {...props?.style?.decItemBtn}]}
            onPress={decrementCartHandler}>
            {productQTY > 1 ? (
              <FontAwesome6 name="minus" size={22} color={COLORS.PRIMARY} />
            ) : (
              <FontAwesome6 name="trash-can" size={22} color={COLORS.PRIMARY} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[
              CartItemStyles.numOfItemsInputStyles,
              {...props?.style?.numOfItemsInputStyles}
            ]}
            value={productQTY.toString()}
            onChangeText={() => {}}
            editable={false}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={[CartItemStyles.incItemBtn, {...props?.style?.incItemBtn}]}
            onPress={incrementCartHandler}>
            <FontAwesome6 name="plus" size={22} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <MainButton
          style={[
            CartItemStyles.addToCartBtn,
            props.itemType === constants.FAVORITE && {
              width: '90%',
              height: 45,
              alignSelf: 'flex-start',
              marginTop: 0
            },
            {...props?.style?.addToCartBtn}
          ]}
          icon={
            <FontAwesome6 name="cart-shopping" size={18} color={COLORS.WHITE} />
          }
          onPress={incrementCartHandler}>
          Add To Cart
        </MainButton>
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || 0.9}
      style={[CartItemStyles.productCard, {...props?.style?.productCard}]}
      onPress={viewProductHandler}>
      <View
        style={[
          CartItemStyles.productImageBox,
          {...props?.style?.productImageBox}
        ]}>
        <Image
          source={{uri: image || thumbnail}}
          style={[CartItemStyles.productImage, {...props?.style?.productImage}]}
        />
      </View>
      <View
        style={[
          CartItemStyles.productInnerContainer,
          {...props?.style?.productInnerContainer}
        ]}>
        <View
          style={[
            CartItemStyles.productDetails,
            {...props?.style?.productDetails}
          ]}>
          <Text
            numberOfLines={props?.titleNumberOfLines || 1}
            style={[
              CartItemStyles.productTitle,
              {...props?.style?.productTitle}
            ]}>
            {title}
          </Text>
          <Text
            numberOfLines={props?.priceNumberOfLines || 1}
            style={[
              CartItemStyles.productPrice,
              {...props?.style?.productPrice}
            ]}>{`$${price.toFixed(2)}`}</Text>
        </View>
        <View
          style={[
            CartItemStyles.productActionBtnsBox,
            props.itemType === constants.FAVORITE && {width: '70%'},
            {...props?.style?.productActionBtnsBox}
          ]}>
          <RenderIncAndDecButtons />
        </View>
      </View>
      {props.itemType === constants.ORDER_SUMMARY ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            CartItemStyles.favAndRemoveCartItemBtn,
            onHoldRemovedItem === id && favAndremoveCartItemBtnConfirmation
          ]}
          onPress={putRemovedItemOnHoldHandler}>
          <FontAwesome6
            name="trash-can"
            size={18}
            color={onHoldRemovedItem === id ? COLORS.WHITE : COLORS.PRIMARY}
          />
          {onHoldRemovedItem === id && (
            <Text style={CartItemStyles.confirmationBtnText}>Confirm</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            CartItemStyles.favAndRemoveCartItemBtn,
            onHoldRemovedFavItem === id && favAndremoveCartItemBtnConfirmation
          ]}
          onPress={putRemovedFavItemOnHold}>
          <FontAwesome
            name={onHoldRemovedFavItem === id ? 'trash' : 'heart'}
            size={18}
            color={onHoldRemovedFavItem === id ? COLORS.WHITE : COLORS.PRIMARY}
          />
          {onHoldRemovedFavItem === id && (
            <Text style={CartItemStyles.confirmationBtnText}>Remove</Text>
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default CartItem;
