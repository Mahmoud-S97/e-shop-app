import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';

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
  customContainer: {
    paddingTop: 0,
    backgroundColor: COLORS.SECONDARY
  }
});

export default ProductViewStyles;
