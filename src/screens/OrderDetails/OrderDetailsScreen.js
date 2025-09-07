import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import GoBackIcon from '../../components/Globals/GoBackIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainButton from '../../components/Globals/MainButton';
import { useSelector } from 'react-redux';
import OrderDetailsScreenStyles from './OrderDetailsScreenStyles';

const RenderOrderedProductDetails = (product, index) => {
        return (
            <View key={index} style={OrderDetailsScreenStyles.orderDetailsCard}>
                <View style={OrderDetailsScreenStyles.productImgLayout}>
                    <View style={OrderDetailsScreenStyles.productImgBox}>
                        <Image style={OrderDetailsScreenStyles.productImg} source={{ uri: product.image }} />
                    </View>
                </View>
                <View style={OrderDetailsScreenStyles.productTitleAndQtyBox}>
                    <Text numberOfLines={3} style={OrderDetailsScreenStyles.productTitleAndQtyText}>{`${product.title}  x ${product.qty}`}</Text>
                </View>
                <Text numberOfLines={3} style={OrderDetailsScreenStyles.productPriceText}>${(product.price * product.qty).toFixed(2)}</Text>
            </View>
        )
    }

const OrderDetailsScreen = ({ navigation }) => {

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
                headerTitle='Order Details'
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
                    <View style={OrderDetailsScreenStyles.inner}>
                        <View style={OrderDetailsScreenStyles.orderSummaryBox}>
                            <Text style={OrderDetailsScreenStyles.orderSummaryTitle}>Shipping Address:</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                                <Text style={OrderDetailsScreenStyles.editAddress}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={OrderDetailsScreenStyles.userInfo}>
                            <View style={OrderDetailsScreenStyles.userNameBox}>
                                <FontAwesome name='user' color={COLORS.BLACK} size={20} />
                                <Text style={OrderDetailsScreenStyles.userName}>Mahmoud Saleh</Text>
                            </View>
                            <Text style={OrderDetailsScreenStyles.userAddressText}>Dublin 7, Ireland. 2A7 Benburb St.</Text>
                        </View>
                        <View style={OrderDetailsScreenStyles.orderSummaryBox}>
                            <Text style={OrderDetailsScreenStyles.orderSummaryTitle}>Order Summary:</Text>
                            <Text style={OrderDetailsScreenStyles.itemsCount}>({cartProducts.length.toString()} Items)</Text>
                        </View>
                        {cartProducts.length > 0 && (
                            cartProducts.map(RenderOrderedProductDetails)
                        )}
                        <View style={OrderDetailsScreenStyles.orderPriceSummaryBox}>
                            <View style={OrderDetailsScreenStyles.shippingBox}>
                                <Text style={OrderDetailsScreenStyles.shippingTitle}>Shipping:</Text>
                                <Text style={OrderDetailsScreenStyles.shippingPrice}>${(cartTotalPrice - cartTotalPrice).toFixed(2)}</Text>
                            </View>
                            <View style={OrderDetailsScreenStyles.shippingBox}>
                                <Text style={OrderDetailsScreenStyles.shippingTitle}>Subtotal:</Text>
                                <Text style={OrderDetailsScreenStyles.shippingPrice}>${cartTotalPrice.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={OrderDetailsScreenStyles.totalPriceBox}>
                        <Text style={OrderDetailsScreenStyles.totalPriceTitle}>Total:</Text>
                        <Text style={OrderDetailsScreenStyles.totalPrice}>{cartTotalPrice.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            {cartTotalPrice > 0 && cartProducts.length > 0 && (
                <MainButton
                    style={OrderDetailsScreenStyles.checkoutBtn}
                    onPress={() => navigation.navigate('Checkout')}>
                    Proceed to Payment
                </MainButton>
            )}
        </View>
    )
}

export default OrderDetailsScreen;