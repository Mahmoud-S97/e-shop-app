import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MainHeader from '../../components/Header/MainHeader';
import ProductViewStyles from './ProductViewScreenStyles';

const ProductViewScreen = props => {
  const {
    navigation,
    route: {
      params: {item}
    }
  } = props;

  console.log('Product-Item: ', item);

  const addToFavHandler = () => {
    return;
  };

  const gotToCartHandler = () => {
    return;
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
        style={{ height: 80 }}
          headerLeft={{
            headerLeftBtn1_content: (
              <FontAwesome name="angle-left" size={30} color={COLORS.PRIMARY} />
            ),
            headerLeftBoxStyles: { width: '12.5%' },
            headerLeftAction1Styles: { backgroundColor: 'transparent' },
            action1: goBack
          }}
          headerTitle={item.title}
          headerRight={{
            headerRightBtn1_content: (
              <FontAwesome
                name={!item.id ? 'heart' : 'heart-o'} // Should be isFav ? ... : ...
                size={22}
                color={COLORS.PRIMARY}
              />
            ),
            headerRightAction1Styles: { backgroundColor: 'transparent' },
            action1: addToFavHandler,
            headerRightBtn2_content: (
              <View style={ProductViewStyles.headerRightCartBtnBox}>
                <FontAwesome6
                name="cart-shopping"
                size={22}
                color={COLORS.PRIMARY}
              />
              <View style={ProductViewStyles.headerRightCartBtn}>
                <Text style={ProductViewStyles.cartNumOfItemsText}>1</Text>
              </View>
              </View>
            ),
            headerRightAction2Styles: { backgroundColor: 'transparent' },
            action2: gotToCartHandler
          }}
        />
        <View style={[GENERAL_STYLES.container, ProductViewStyles.customContainer]}>
          <Text style={{color: 'black'}}>{item.title}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductViewScreen;