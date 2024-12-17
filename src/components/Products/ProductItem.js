import React, {useCallback, useEffect, useState} from 'react';
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
import {
  addToCart,
  decrementCart,
  incrementCart
} from '../../store/reducers/cartSlice';

const ProductItem = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {id, title, price, images, thumbnail} = props.item;
  const {productsViewType} = props;

  const productsCart = useSelector(state => state.cartSlice);
  const productQTY =
    useSelector(
      state => state.cartSlice.cartItems.find(ele => ele.id === id)?.qty
    ) || 0;

  const [numOfItems, setNumOfItems] = useState(0);
  const [isProductFav, setIsProductFav] = useState(false);

  const customStyles =
    productsViewType === constants.LIST
      ? ProductStyles.styles
      : productsViewType === constants.SINGLE
      ? ProductStyles.singleViewStyles
      : ProductStyles.gridViewStyles;

  useEffect(() => {
    console.log('productsCart::: ', productsCart);
  }, [dispatch, productsCart]);

  const handleNumOfItems = useCallback(value => {
    // Will be handled soon...!
    return;
    if (value === '') {
      return;
    }
    console.log('Number of Items: ', value);
    // Add To Cart
    const addedToCartItem = {
      id: id,
      title: title,
      price: price,
      image: thumbnail,
      qty: Number(value)
    };
    dispatch(addToCart(addedToCartItem));
  }, []);

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
      navigation.navigate(SCREENS.PRODUCT_VIEW, {item: props.item});
    }
  };

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
        {props?.alreadyInProductViewScreen &&
          (productQTY === '' || productQTY >= 1) && (
            <Text style={customStyles.quantityTitle}>Quantity</Text>
          )}
        <View
          style={[
            customStyles.productActionBtnsBox,
            {...props?.style?.productActionBtnsBox}
          ]}>
          {props.addedToCart || productQTY === '' || productQTY >= 1 ? (
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
                onChangeText={value => handleNumOfItems(value)}
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
          onPress={() => setIsProductFav(!isProductFav)}>
          <FontAwesome
            name={isProductFav ? 'heart' : 'heart-o'}
            size={22}
            color={COLORS.PRIMARY}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ProductItem;
