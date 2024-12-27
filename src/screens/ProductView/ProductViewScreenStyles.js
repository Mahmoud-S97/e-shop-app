import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';
import {getScreenWidth} from '../../utils';

const ProductViewStyles = StyleSheet.create({
  headerRightCartBtnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  headerRightCartBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    position: 'absolute',
    top: -12,
    end: -10,
    zIndex: 1000
  },
  cartNumOfItemsText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.WHITE
  },
  customProductItemStyles: {
    width: '100%',
    height: 400,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 0,
    padding: 10,
    marginBottom: 15
  },
  productImageBox: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  productDetails: {
    width: '100%',
    height: 'auto',
    paddingStart: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productTitle: {
    width: '65%',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left'
  },
  productPrice: {
    width: '30%',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right'
  },
  descSeparator: {
    width: getScreenWidth() - 50,
    alignSelf: 'center',
    height: 1,
    backgroundColor: COLORS.SECONDARY,
    marginVertical: 10
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.DARK_GRAY,
    textAlign: 'left'
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.DARK_GRAY,
    marginTop: 12,
    textAlign: 'left'
  }
});

export default ProductViewStyles;
