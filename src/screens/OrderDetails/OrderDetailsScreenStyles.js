import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/styles/Styles";
import { getScreenWidth } from "../../utils";

const OrderDetailsScreenStyles = StyleSheet.create({
    inner: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        borderRadius: 10
    },
    orderDetailsCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    productImgLayout: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImgBox: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    productTitleAndQtyBox: {
        flexDirection: 'row',
        width: '55%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    productTitleAndQtyText: {
        width: '90%',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.BLACK
    },
    productPriceText: {
        width: '20%',
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    orderSummaryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    orderSummaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    editAddress: {
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.BLUE
    },
    userInfo: {
        width: '100',
        flexDirection: 'column',
         marginBottom: 25
    },
    userNameBox: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
    },
    userName: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.BLACK,
        marginStart: 5
    },
    userAddressText: {
        width: '70%',
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.DARK_GRAY,
        paddingHorizontal: 20,
        marginTop: 5
    },
    itemsCount: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.BLACK
    },
    productImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    orderPriceSummaryBox: {
        width: '100%',
        marginTop: 20
    },
    shippingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    shippingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.DARK_GRAY
    },
    shippingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    totalPriceBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 15
    },
    totalPriceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    checkoutBtn: {
        width: getScreenWidth() - 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        zIndex: 9999
    }
})

export default OrderDetailsScreenStyles;