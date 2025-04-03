import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';
import {getScreenWidth} from '../../utils';

const HomeScreenStyles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 400
  },
  imgBgTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center'
  },
  customContainer: {
    marginTop: -15,
    paddingHorizontal: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center'
  },
  productsText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.PRIMARY,
    alignSelf: 'flex-start',
    marginVertical: 15
  },
  filterationBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  searchBox: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.SECONDARY
  },
  searchTextStyles: {
    width: '80%',
    marginStart: 4,
    fontSize: 14,
    color: COLORS.PRIMARY
  },
  viewTypesBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%'
  },
  viewTypeBtn: {
    marginEnd: 4
  },
  footerBtnsBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25
  },
  feedbackBtn: {
    width: '48%'
  },
  contactBtn: {
    width: '48%',
    backgroundColor: COLORS.GOLD
  },
  orderingBtn: {
    width: getScreenWidth() - 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10
  }
});

export default HomeScreenStyles;
