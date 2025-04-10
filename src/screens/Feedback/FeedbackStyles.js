import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';
import {getScreenWidth} from '../../utils';

const FeedbackStyles = StyleSheet.create({
  feedbackBG: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginTop: 25
  },
  carouselBox: {
    width: getScreenWidth() - 24,
    height: 450,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 15
  },
  carouselItemBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewerImgBox: {
    width: 320,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewerImg: {
    width: '100%',
    height: '100%'
  },
  reviewerText: {
    width: '95%',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.PRIMARY
  },
  reviewerName: {
    width: '100%',
    textAlign: 'right',
    marginTop: 25,
    marginBottom: 15,
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.PRIMARY
  },
  footerBtnsBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25
  },
  shoppingBtn: {
    width: '48%'
  },
  contactBtn: {
    width: '48%',
    backgroundColor: COLORS.GOLD
  }
});

export default FeedbackStyles;
