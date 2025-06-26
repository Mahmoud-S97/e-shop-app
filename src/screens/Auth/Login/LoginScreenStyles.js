import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/styles/Styles';

const LoginScreenStyles = StyleSheet.create({
  logoImgBox: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 70
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  mainTitleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginStart: 10
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.DARK_GRAY,
    borderRadius: 7,
    marginVertical: 10
  },
  inputStyles: {
    width: '100%',
    height: '100%',
    padding: 8,
    color: COLORS.PRIMARY,
    fontWeight: '500',
    fontSize: 17
  },
  showHidePassBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    end: 10
  },
  loginBtn: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.WHITE
  }
});

export default LoginScreenStyles;
