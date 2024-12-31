import React, {memo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MainHeader from '../../components/Header/MainHeader';
import ProductViewStyles from './ProductViewScreenStyles';
import constants from '../../constants';
import ProductItem from '../../components/Products/ProductItem';
import {useSelector} from 'react-redux';
import SCREENS from '../../constants/screens';

const ProductViewScreen = (props) => {

  const { navigation, route: { params: { productId } } } = props;

  console.log('ProductID:::: ', productId);

  const productsCart = useSelector(state => state.cartSlice.cartItems);
  const productItem = useSelector(state => state.productsSlice.products.find(ele => ele.id === productId));

  console.log('Product-Item: ', productItem);

  const MemoizedProductComponent = memo(ProductItem);

  const addToFavHandler = () => {
    return;
  };

  const gotToCartHandler = () => {
    navigation.navigate(SCREENS.CART);
  };

  const goBack = () => {
    navigation.goBack();
  };

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
          headerTitle={productItem.title}
          headerRight={{
            headerRightBtn1_content: (
              <FontAwesome
                name={!productItem.id ? 'heart' : 'heart-o'} // Should be isFav ? ... : ...
                size={22}
                color={COLORS.PRIMARY}
              />
            ),
            headerRightAction1Styles: {backgroundColor: 'transparent'},
            action1: addToFavHandler,
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
          <MemoizedProductComponent
            activeOpacity={1}
            item={productItem}
            alreadyInProductViewScreen={true}
            productsViewType={constants.SINGLE}
            titleNumberOfLines={4}
            priceNumberOfLines={2}
            style={{
              productCard: ProductViewStyles.customProductItemStyles,
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
            {productItem.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductViewScreen;
