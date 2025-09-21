import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import GoBackIcon from '../../components/Globals/Icons/GoBackIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainButton from '../../components/Globals/Buttons/MainButton';
import { useSelector } from 'react-redux';
import CheckoutScreenStyles from './CheckoutScreenStyles';
import SCREENS from '../../constants/screens';

const RenderOrderedProductDetails = (product, index) => {
        return (
            <View key={index} style={CheckoutScreenStyles.orderDetailsCard}>
                <View style={CheckoutScreenStyles.productImgLayout}>
                    <View style={CheckoutScreenStyles.productImgBox}>
                        <Image style={CheckoutScreenStyles.productImg} source={{ uri: product.image }} />
                    </View>
                </View>
                <View style={CheckoutScreenStyles.productTitleAndQtyBox}>
                    <Text numberOfLines={3} style={CheckoutScreenStyles.productTitleAndQtyText}>{`${product.title}  x ${product.qty}`}</Text>
                </View>
                <Text numberOfLines={3} style={CheckoutScreenStyles.productPriceText}>${(product.price * product.qty).toFixed(2)}</Text>
            </View>
        )
    }

const CheckoutScreen = ({ navigation }) => {

    const { totalPrice: cartTotalPrice, cartItems: cartProducts } = useSelector(state => state.cartSlice);

    const goBack = () => navigation.goBack();

    return (
        <View style={GENERAL_STYLES.screen}>
            <MainHeader
                style={{ height: 80 }}
                headerLeft={{
                    headerLeftBtn1_content: <GoBackIcon />,
                    headerLeftBoxStyles: { width: '12.5%' },
                    headerLeftAction1Styles: { backgroundColor: 'transparent' },
                    action1: goBack
                }}
                headerTitle='Checkout'
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
            <ScrollView style={GENERAL_STYLES.scrollingView}>
                <View style={[GENERAL_STYLES.container, { paddingTop: 30, paddingBottom: 110 }]}>
                    <View style={CheckoutScreenStyles.inner}>
                        <View style={CheckoutScreenStyles.orderSummaryBox}>
                            <Text style={CheckoutScreenStyles.orderSummaryTitle}>Shipping Address:</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                                <Text style={CheckoutScreenStyles.editAddress}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={CheckoutScreenStyles.userInfo}>
                            <View style={CheckoutScreenStyles.userNameBox}>
                                <FontAwesome name='user' color={COLORS.BLACK} size={20} />
                                <Text style={CheckoutScreenStyles.userName}>Mahmoud Saleh</Text>
                            </View>
                            <Text style={CheckoutScreenStyles.userAddressText}>Dublin 7, Ireland. 2A7 Benburb St.</Text>
                        </View>
                        <View style={CheckoutScreenStyles.orderSummaryBox}>
                            <Text style={CheckoutScreenStyles.orderSummaryTitle}>Order Summary:</Text>
                            <Text style={CheckoutScreenStyles.itemsCount}>({cartProducts.length.toString()} Items)</Text>
                        </View>
                        {cartProducts.length > 0 && (
                            cartProducts.map(RenderOrderedProductDetails)
                        )}
                        <View style={CheckoutScreenStyles.orderPriceSummaryBox}>
                            <View style={CheckoutScreenStyles.shippingBox}>
                                <Text style={CheckoutScreenStyles.shippingTitle}>Shipping:</Text>
                                <Text style={CheckoutScreenStyles.shippingPrice}>${(cartTotalPrice - cartTotalPrice).toFixed(2)}</Text>
                            </View>
                            <View style={CheckoutScreenStyles.shippingBox}>
                                <Text style={CheckoutScreenStyles.shippingTitle}>Subtotal:</Text>
                                <Text style={CheckoutScreenStyles.shippingPrice}>${cartTotalPrice.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={CheckoutScreenStyles.totalPriceBox}>
                        <Text style={CheckoutScreenStyles.totalPriceTitle}>Total:</Text>
                        <Text style={CheckoutScreenStyles.totalPrice}>{cartTotalPrice.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            {cartTotalPrice > 0 && cartProducts.length > 0 && (
                <MainButton
                    style={CheckoutScreenStyles.checkoutBtn}
                    onPress={() => navigation.navigate(SCREENS.PAYMENT)}>
                    Proceed to Payment
                </MainButton>
            )}
        </View>
    )
}

export default CheckoutScreen;