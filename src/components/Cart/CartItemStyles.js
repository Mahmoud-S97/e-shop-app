import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';
import {getScreenWidth} from '../../utils';

const CartItemStyles = StyleSheet.create({
  productCard: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10
  },
  productImageBox: {
    width: '30%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  productInnerContainer: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center'
  },
  productDetails: {
    width: '50%',
    height: '100%',
    paddingStart: 10,
    justifyContent: 'space-evenly'
  },
  productTitle: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    marginTop: 4
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY
  },
  productActionBtnsBox: {
    width: '50%'
  },
  addToCartBtn: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.PRIMARY,
    marginTop: 25,
    borderRadius: 8
  },
  decAndIncItemsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 25,
    borderWidth: 0.8,
    borderColor: COLORS.SECONDARY,
    borderRadius: 8
  },
  decItemBtn: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8
  },
  incItemBtn: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8
  },
  numOfItemsInputStyles: {
    width: '40%',
    height: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: '500',
    padding: 5
  },
  addToFavBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 2,
    end: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  favAndRemoveCartItemBtn: {
    flexDirection: 'row',
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 5,
    end: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 17.5,
    zIndex: 1000
  },
  confirmationBtnText: {
    fontSize: 14,
    color: COLORS.WHITE,
    marginStart: 2
  },
  addedToCartLabelBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addedToCartText: {
    fontSize: 17,
    color: COLORS.LIGHT_GREEN,
    marginStart: 5
  }
});

// Changing the content of the Fav/Remove confirmation button dynamically!
export const favAndremoveCartItemBtnConfirmation = {
  width: '25%',
  borderRadius: 15,
  padding: 5,
  backgroundColor: COLORS.RED
};

export default CartItemStyles;
