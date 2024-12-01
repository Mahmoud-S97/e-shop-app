import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';
import {getScreenWidth} from '../../utils';

export const styles = StyleSheet.create({
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
    color: COLORS.PRIMARY
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
    fontWeight: '500'
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
  }
});

export const gridViewStyles = StyleSheet.create({
  productCard: {
    width: (getScreenWidth() - 45) / 2,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    borderRadius: 5,
    padding: 10,
    margin: 7.5
  },
  productImageBox: {
    ...styles.productImageBox,
    width: '100%',
    height: '50%'
  },
  productImage: {
    ...styles.productImage
  },
  productInnerContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start'
  },
  productDetails: {
    ...styles.productDetails,
    width: '100%',
    height: 'auto',
    paddingStart: 5
  },
  productTitle: {
    ...styles.productTitle,
    marginBottom: 2
  },
  productPrice: {
    ...styles.productPrice
  },
  productActionBtnsBox: {
    width: '100%'
  },
  addToCartBtn: {
    ...styles.addToCartBtn,
    width: '100%',
    alignSelf: 'center'
  },
  decAndIncItemsBox: {
    ...styles.decAndIncItemsBox
  },
  decItemBtn: {
    ...styles.decItemBtn
  },
  incItemBtn: {
    ...styles.incItemBtn
  },
  numOfItemsInputStyles: {
    ...styles.numOfItemsInputStyles
  },
  addToFavBtn: {
    ...styles.addToFavBtn
  }
});

export const singleViewStyles = StyleSheet.create({
  productCard: {
    width: getScreenWidth() - 30,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  productImageBox: {
    ...styles.productImageBox,
    width: '100%',
    height: '50%',
    alignSelf: 'center'
  },
  productImage: {
    ...styles.productImage
  },
  productInnerContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start'
  },
  productDetails: {
    ...styles.productDetails,
    width: '100%',
    height: 'auto',
    paddingStart: 5
  },
  productTitle: {
    ...styles.productTitle,
    marginBottom: 2
  },
  productPrice: {
    ...styles.productPrice
  },
  productActionBtnsBox: {
    width: '100%'
  },
  addToCartBtn: {
    ...styles.addToCartBtn,
    width: '100%',
    alignSelf: 'center'
  },
  decAndIncItemsBox: {
    ...styles.decAndIncItemsBox
  },
  decItemBtn: {
    ...styles.decItemBtn
  },
  incItemBtn: {
    ...styles.incItemBtn
  },
  numOfItemsInputStyles: {
    ...styles.numOfItemsInputStyles
  },
  addToFavBtn: {
    ...styles.addToFavBtn
  }
});
