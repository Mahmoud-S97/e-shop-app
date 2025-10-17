import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/Styles';

const UserProfileScreenStyles = StyleSheet.create({
  editBtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 5,
    color: COLORS.PRIMARY
  },
  profileInfoCard: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY
  },
  profileImageBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  profileImageStyles: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.WHITE
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
    backgroundColor: COLORS.OVERLAY
  },
  profileHolderName: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  customContainer: {
    marginTop: -15,
    paddingHorizontal: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  innerInfo: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30
  },
  fieldTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.GRAY,
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
  fieldIcon: {
    fontSize: 23,
    color: COLORS.GRAY
  },
  fieldTextInput: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.GRAY,
    marginStart: 12,
    padding: 0,
    width: '90%',
    height: '100%',
    textAlign: 'left'
  },
  footerBtnsBox: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 99999
  },
  applyBtn: {
    width: '48%',
    backgroundColor: COLORS.PRIMARY
  },
  cancelBtn: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1.2,
    borderColor: COLORS.RED
  },
  cancelBtnText: {
    color: COLORS.RED
  },
  errorText: {
    fontSize: 15,
    color: COLORS.RED,
    marginBottom: 15
  },
  datePickerIOSModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY,
    paddingBottom: 10
  },
  modalContent: {
    margin: 20,
    padding: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20
  },
  modalFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15
  }
});

export default UserProfileScreenStyles;
