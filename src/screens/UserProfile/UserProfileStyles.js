import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/styles/Styles';

const UserProfileStyles = StyleSheet.create({
  editBtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 5,
    color: COLORS.WHITE
  },
  profileInfoCard: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20
  },
  profileImageBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  profileImageStyles: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  editProfileImgBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
    end: -5,
    zIndex: 9999,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  profileHolderName: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: COLORS.WHITE
  },
  innerInfo: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    marginBottom: 5
  },
  infoField: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    marginBottom: 15
  },
  infoFieldText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.DARK_GRAY,
    marginStart: 12
  }
});

export default UserProfileStyles;
