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
    marginTop: 25,
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
  }
});

export default CartScreenStyles;
