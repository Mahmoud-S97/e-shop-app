import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MainHeader from '../../components/Header/MainHeader';
import ProductViewStyles from './ProductViewScreenStyles';
import constants from '../../constants';
import ProductItem from '../../components/Products/ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import SCREENS from '../../constants/screens';
import {switchItemAsFavorite} from '../../store/reducers/productsSlice';
import GoBackIcon from '../../components/Globals/GoBackIcon';

const ProductViewScreen = props => {
  const {
    navigation,
    route: {
      params: {productId}
    }
  } = props;

  const dispatch = useDispatch();
  const productsCart = useSelector(state => state.cartSlice.cartItems);
  const productItem = useSelector(state =>
    state.productsSlice.products.find(ele => ele.id === productId)
  );


  if(!productItem) {
    Alert.alert('Cannot preview product', 'Something went wrong, please check your network and try again.', [{
      onPress: () => navigation.goBack()
    }]);
    return;
  }

  const isFav = useSelector(state =>
    state.productsSlice.favProducts.some(ele => ele.id === productId)
  );

  const gotToCartHandler = () => {
    navigation.navigate(SCREENS.CART);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const productFavoriteHandler = () => {
    dispatch(switchItemAsFavorite(productItem));
  };

  return (
    <ScrollView
      style={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          style={{height: 80}}
          headerLeft={{
            headerLeftBtn1_content: <GoBackIcon />,
            headerLeftBoxStyles: {width: '12.5%'},
            headerLeftAction1Styles: {backgroundColor: 'transparent'},
            action1: goBack
          }}
          headerTitle={productItem?.title}
          headerRight={{
            headerRightBtn1_content: (
              <FontAwesome
                name={isFav ? 'heart' : 'heart-o'}
                size={22}
                color={COLORS.PRIMARY}
              />
            ),
            headerRightAction1Styles: {backgroundColor: 'transparent'},
            action1: productFavoriteHandler,
            headerRightBtn2_content: (
              <View style={ProductViewStyles.headerRightCartBtnBox}>
                <FontAwesome6
                  name="cart-shopping"
                  size={22}
                  color={COLORS.PRIMARY}
                />
                {productsCart?.length > 0 && (
                  <View style={ProductViewStyles.headerRightCartBtn}>
                    <Text style={ProductViewStyles.cartNumOfItemsText}>
                      {productsCart?.length}
                    </Text>
                  </View>
                )}
              </View>
            ),
            headerRightAction2Styles: {backgroundColor: 'transparent'},
            action2: gotToCartHandler
          }}
        />
        <View style={GENERAL_STYLES.container}>
          <ProductItem
            activeOpacity={1}
            item={productItem}
            alreadyInProductViewScreen={true}
            productsViewType={constants.SINGLE}
            titleNumberOfLines={4}
            priceNumberOfLines={2}
            style={{
              product_View_Style: ProductViewStyles.customProductItemViewStyles,
              productImageBox: ProductViewStyles.productImageBox,
              productImage: ProductViewStyles.productImage,
              productDetails: ProductViewStyles.productDetails,
              productTitle: ProductViewStyles.productTitle,
              productPrice: ProductViewStyles.productPrice
            }}
          />
          <View style={ProductViewStyles.descSeparator} />
          <Text style={ProductViewStyles.descriptionTitle}>
            Product Description
          </Text>
          <Text style={ProductViewStyles.descriptionText}>
            {productItem?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductViewScreen;
