import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';

const MainDrawerStyles = StyleSheet.create({
  drawerHeaderBox: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.SECONDARY,
    marginBottom: 20
  },
  drawerHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.PRIMARY
  },
  closeBtnBox: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    end: 12,
    borderRadius: 20,
    backgroundColor: COLORS.SECONDARY
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  drawerItem: {
    flexDirection: 'row',
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 50,
    backgroundColor: 'transparent'
  },
  drawerItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginStart: 10
  },
  logoutBtn: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY
  },
  logoutBtnText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.BLACK
  }
});

export default MainDrawerStyles;
