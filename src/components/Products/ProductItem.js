import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';
import constants from '../../constants';
import * as ProductStyles from './ProductItemsStyle';
import MainButton from '../Globals/MainButton';

const ProductItem = props => {
  const {title, price, images, thumbnail} = props.item;
  const {productsViewType} = props;

  const [isProductFav, setIsProductFav] = useState(false);

  const customStyles =
    productsViewType === constants.LIST
      ? ProductStyles.styles
      : productsViewType === constants.SINGLE
      ? ProductStyles.singleViewStyles
      : ProductStyles.gridViewStyles;

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
          <MainButton
            style={customStyles.addToCartBtn}
            icon={<FontAwesome6 name="cart-shopping" size={18} color={COLORS.WHITE} />}
            >
          </MainButton>
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
