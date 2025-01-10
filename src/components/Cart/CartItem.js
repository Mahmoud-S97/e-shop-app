import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';
import CartItemStyles from './CartItemStyles';
import MainButton from '../Globals/MainButton';
import SCREENS from '../../constants/screens';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementCart,
  incrementCart,
  setRemovedItemID,
  removeItemFromCart
} from '../../store/reducers/cartSlice';

const CartItem = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {id, title, price, image} = props.item;

  const productsCart = useSelector(state => state.cartSlice);
  const onHoldRemovedItem = useSelector(
    state => state.cartSlice.onHoldDeletedItemID
  );
  const productQTY =
    useSelector(
      state => state.cartSlice.cartItems.find(ele => ele.id === id)?.qty
    ) || 0;

  const [isProductFav, setIsProductFav] = useState(false);

  useEffect(() => {
    console.log('productsCart::: ', productsCart);
  }, [dispatch, productsCart]);

  const incrementCartHandler = useCallback(() => {
    const addedToCartItem = {
      id: id,
      title: title,
      price: price,
      image: image,
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

  const viewProductHandler = () => {
    if (onHoldRemovedItem === id) {
      dispatch(setRemovedItemID(null));
    }
    if (!props?.alreadyInProductViewScreen) {
      navigation.navigate(SCREENS.PRODUCT_VIEW, {productId: id});
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
          source={{uri: image}}
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
        {props?.alreadyInProductViewScreen && productQTY >= 1 && (
          <Text style={CartItemStyles.quantityTitle}>Quantity</Text>
        )}
        <View
          style={[
            CartItemStyles.productActionBtnsBox,
            {...props?.style?.productActionBtnsBox}
          ]}>
          {productQTY >= 1 ? (
            <View
              style={[
                CartItemStyles.decAndIncItemsBox,
                {...props?.style?.decAndIncItemsBox}
              ]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  CartItemStyles.decItemBtn,
                  {...props?.style?.decItemBtn}
                ]}
                onPress={decrementCartHandler}>
                {productQTY > 1 ? (
                  <FontAwesome6 name="minus" size={22} color={COLORS.PRIMARY} />
                ) : (
                  <FontAwesome6
                    name="trash-can"
                    size={22}
                    color={COLORS.PRIMARY}
                  />
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
                style={[
                  CartItemStyles.incItemBtn,
                  {...props?.style?.incItemBtn}
                ]}
                onPress={incrementCartHandler}>
                <FontAwesome6 name="plus" size={22} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>
          ) : (
            <MainButton
              style={[
                CartItemStyles.addToCartBtn,
                {...props?.style?.addToCartBtn}
              ]}
              icon={
                <FontAwesome6
                  name="cart-shopping"
                  size={18}
                  color={COLORS.WHITE}
                />
              }
              onPress={incrementCartHandler}></MainButton>
          )}
        </View>
      </View>
      {!props.alreadyInProductViewScreen ||
        (!props.alreadyInCartScreen && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={CartItemStyles.addToFavBtn}
            onPress={() => setIsProductFav(!isProductFav)}>
            <FontAwesome
              name={isProductFav ? 'heart' : 'heart-o'}
              size={22}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        ))}
      {props.alreadyInCartScreen && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            CartItemStyles.removeCartItemBtn,
            onHoldRemovedItem === id &&
              CartItemStyles.removeCartItemBtnConfirmation
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
      )}
    </TouchableOpacity>
  );
};

export default CartItem;
