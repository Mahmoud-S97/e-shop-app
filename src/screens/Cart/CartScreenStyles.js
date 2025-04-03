import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';

const CartScreenStyles = StyleSheet.create({
  cartTopTab: {
    width: '95%',
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    padding: 5,
    marginVertical: 25,
    borderRadius: 12
  },
  cartTopTabButton: {
    width: '49.2%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 12
  },
  cartTopTabButton_Active: {
    backgroundColor: COLORS.WHITE,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowColor: COLORS.BLACK,
    shadowRadius: 3,
    elevation: 7
  },
  cartTopTabButtonText: {
    fontSize: 15,
    color: COLORS.PRIMARY
  },
  emptyMessageTextStyles: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export const productItemCustomStyles = {
  productCard: {
    height: 110
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
    flexDirection: 'column',
    width: '70%',
    alignItems: 'flex-start'
  },
  productDetails: {
    width: '80%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingStart: 10
  },
  productActionBtnsBox: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    start: 5,
    zIndex: 10000,
    height: 45
  },
  decAndIncItemsBox: {
    height: 45,
    marginTop: 0
  }
};

export default CartScreenStyles;
