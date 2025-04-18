import {StyleSheet} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../utils';
import {COLORS} from '../../constants/styles/Styles';

const ContactUsStyles = StyleSheet.create({
  mapView: {
    width: getScreenWidth(),
    height: getScreenHeight() - 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goToStoreBtn: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 30
  },
  socialMediaBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialMediaBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GOLD,
    borderRadius: 10,
    marginHorizontal: 8
  }
});

export default ContactUsStyles;
