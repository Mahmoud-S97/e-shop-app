import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';
import constants from '../../constants';
import * as ProductStyles from './ProductItemsStyle';
import MainButton from '../Globals/MainButton';

const ProductItem = props => {
  const {title, price, images, thumbnail} = props.item;
  const {productsViewType} = props;

  const [numOfItems, setNumOfItems] = useState(0);
  const [isProductFav, setIsProductFav] = useState(false);

  const customStyles =
    productsViewType === constants.LIST
      ? ProductStyles.styles
      : productsViewType === constants.SINGLE
      ? ProductStyles.singleViewStyles
      : ProductStyles.gridViewStyles;

  const handleNumOfItems = useCallback(
    value => {
      if (value === '') {
        setNumOfItems('');
        return;
      }
      setNumOfItems(Number(value));
      console.log('Number of Items: ', value);
    },
    [numOfItems, setNumOfItems]
  );

  const handleCartIncrementBtn = () => {
    setNumOfItems(prevCount => prevCount + 1);
  };

  const handleCartDecrementBtn = () => {
    setNumOfItems(prevCount => (prevCount < 1 ? 0 : prevCount - 1));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[customStyles.productCard, {...props.style}]}>
      <View style={customStyles.productImageBox}>
        <Image source={{uri: thumbnail}} style={customStyles.productImage} />
      </View>
      <View style={customStyles.productInnerContainer}>
        <View style={customStyles.productDetails}>
          <Text numberOfLines={1} style={customStyles.productTitle}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={customStyles.productPrice}>{`$${price.toFixed(2)}`}</Text>
        </View>
        <View style={customStyles.productActionBtnsBox}>
          {props.addedToCart || numOfItems === '' || numOfItems >= 1 ? (
            <View style={customStyles.decAndIncItemsBox}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={customStyles.decItemBtn}
                onPress={handleCartDecrementBtn}>
                {numOfItems > 1 ? (
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
                style={customStyles.numOfItemsInputStyles}
                value={numOfItems.toString()}
                onChangeText={value => handleNumOfItems(value)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={customStyles.incItemBtn}
                onPress={handleCartIncrementBtn}>
                <FontAwesome6 name="plus" size={22} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>
          ) : (
            <MainButton
              style={customStyles.addToCartBtn}
              icon={
                <FontAwesome6
                  name="cart-shopping"
                  size={18}
                  color={COLORS.WHITE}
                />
              }
              onPress={() => handleNumOfItems(1)}></MainButton>
          )}
        </View>
      </View>
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
    </TouchableOpacity>
  );
};

export default ProductItem;
