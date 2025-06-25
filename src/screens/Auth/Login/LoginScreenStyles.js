import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/styles/Styles';

const LoginScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  container: {
    width: '90%'
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
  inputStyles: {
    width: '100%',
    height: 50,
    padding: 8,
    borderWidth: 1.5,
    borderColor: COLORS.GRAY,
    borderRadius: 7,
    marginVertical: 10,
    color: COLORS.PRIMARY,
    fontWeight: '500',
    fontSize: 16
  },
  loginBtn: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.WHITE
  }
});

export default LoginScreenStyles;
