import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';

const SearchProductsModalStyles = StyleSheet.create({
  customScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  customContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  modalHeaderStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    marginTop: 25
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  searchBox: {
    width: '88%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden'
  },
  searchInputStyles: {
    width: '70%',
    height: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: COLORS.PRIMARY
  },
  clearTextBtn: {
    width: '11%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: '2%',
    borderRadius: 20,
    opacity: 0,
    pointerEvents: 'none'
  },
  searchBtn: {
    width: '15%',
    height: '100%',
    marginStart: '2%',
    borderRadius: 20,
    backgroundColor: COLORS.SECONDARY
  }
});

export default SearchProductsModalStyles;
