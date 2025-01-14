import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';
import constants from '../../constants';
import * as ProductStyles from './ProductItemsStyle';
import MainButton from '../Globals/MainButton';
import SCREENS from '../../constants/screens';
import {useDispatch, useSelector} from 'react-redux';
import {decrementCart, incrementCart} from '../../store/reducers/cartSlice';
import {switchItemAsFavorite} from '../../store/reducers/productsSlice';

const ProductItem = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {id, title, price, images, thumbnail} = props.item;
  const {productsViewType} = props;

  const productsReduxState = useSelector(state => state.productsSlice);
  const cartReduxState = useSelector(state => state.cartSlice);
  const productQTY =
    useSelector(
      state => state.cartSlice.cartItems.find(ele => ele.id === id)?.qty
    ) || 0;
  const isFav = useSelector(state =>
    state.productsSlice.favProducts.some(ele => ele.id === id)
  );

  const customStyles =
    productsViewType === constants.LIST
      ? ProductStyles.styles
      : productsViewType === constants.SINGLE
      ? ProductStyles.singleViewStyles
      : ProductStyles.gridViewStyles;

  useEffect(() => {
    console.log('Products-Redux-State::: ', productsReduxState);
    console.log('Cart-Redux-State::: ', cartReduxState);
  }, [dispatch, productsReduxState, cartReduxState]);

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

  const viewProductHandler = () => {
    if (!props?.alreadyInProductViewScreen) {
      navigation.navigate(SCREENS.PRODUCT_VIEW, {productId: id});
    }
  };

  const productFavoriteHandler = useCallback(() => {
    dispatch(switchItemAsFavorite(props.item));
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || 0.9}
      style={[customStyles.productCard, {...props?.style?.productCard}]}
      onPress={viewProductHandler}>
      <View
        style={[
          customStyles.productImageBox,
          {...props?.style?.productImageBox}
        ]}>
        <Image
          source={{uri: thumbnail}}
          style={[customStyles.productImage, {...props?.style?.productImage}]}
        />
      </View>
      <View
        style={[
          customStyles.productInnerContainer,
          {...props?.style?.productInnerContainer}
        ]}>
        <View
          style={[
            customStyles.productDetails,
            {...props?.style?.productDetails}
          ]}>
          <Text
            numberOfLines={props?.titleNumberOfLines || 1}
            style={[
              customStyles.productTitle,
              {...props?.style?.productTitle}
            ]}>
            {title}
          </Text>
          <Text
            numberOfLines={props?.priceNumberOfLines || 1}
            style={[
              customStyles.productPrice,
              {...props?.style?.productPrice}
            ]}>{`$${price.toFixed(2)}`}</Text>
        </View>
        {props?.alreadyInProductViewScreen && productQTY >= 1 && (
          <Text style={customStyles.quantityTitle}>Quantity</Text>
        )}
        <View
          style={[
            customStyles.productActionBtnsBox,
            {...props?.style?.productActionBtnsBox}
          ]}>
          {productQTY >= 1 ? (
            <View
              style={[
                customStyles.decAndIncItemsBox,
                {...props?.style?.decAndIncItemsBox}
              ]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[customStyles.decItemBtn, {...props?.style?.decItemBtn}]}
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
                  customStyles.numOfItemsInputStyles,
                  {...props?.style?.numOfItemsInputStyles}
                ]}
                value={productQTY.toString()}
                onChangeText={() => {}}
                editable={false}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={[customStyles.incItemBtn, {...props?.style?.incItemBtn}]}
                onPress={incrementCartHandler}>
                <FontAwesome6 name="plus" size={22} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>
          ) : (
            <MainButton
              style={[
                customStyles.addToCartBtn,
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
      {!props.alreadyInProductViewScreen && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={customStyles.addToFavBtn}
          onPress={productFavoriteHandler}>
          <FontAwesome
            name={isFav ? 'heart' : 'heart-o'}
            size={22}
            color={COLORS.PRIMARY}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ProductItem;
