import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import UserProfileScreenStyles from './UserProfileScreenStyles';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/Icons/MenuIcon';
import MainFastImage from '../../components/Globals/imgs/MainFastImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButton from '../../components/Globals/Buttons/MainButton';

const UserProfileScreen = ({navigation}) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userData, setUserData] = useState({
    id: 1,
    fullName: 'Mahmoud Saleh',
    email: 'mahmoud97@gmail.com',
    birthdate: '11/03/1997',
    gender: 'Male',
    address: '11 Main St, Dublin 2, Ireland'
  });

  const inputRef = useRef(null);

  const onEditHandler = () => {
    setIsEditProfile(true);
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  const onCancelEditHandler = () => {
    setIsEditProfile(false);
    inputRef.current?.blur();
  };

  const onApplyEditHandler = () => {
    setIsEditProfile(false);
    inputRef.current?.blur();
    // API Amendments will be handled soon...!
  };

  const editUserProfileHandler = useCallback((index, updatedField) => {

    userData[index] = updatedField;

    setUserData({...userData});

    console.log('Updated-User-Profile::: ', userData);
  }, [userData, setUserData]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <View style={GENERAL_STYLES.screen}>
          <MainHeader
            style={{backgroundColor: COLORS.BLUE}}
            headerLeft={{
              headerLeftBtn1_content: (
                <MenuIcon
                  color={COLORS.WHITE}
                  customMenuBoxText={{color: COLORS.WHITE}}
                />
              ),
              headerLeftAction1Styles: {
                width: 95,
                borderRadius: 25
              },
              action1: () => navigation.openDrawer()
            }}
            headerRight={{
              headerRightBtn2_content: (
                <View style={UserProfileScreenStyles.editBtnBox}>
                  <FontAwesome name="edit" color={COLORS.WHITE} size={25} />
                  <Text style={UserProfileScreenStyles.editBtnText}>Edit</Text>
                </View>
              ),
              headerRightAction2Styles: {
                width: 95,
                borderRadius: 25,
                backgroundColor: isEditProfile ? COLORS.RED : COLORS.LIGHT_GRAY
              },
              action2: onEditHandler
            }}
            headerTitle="My Profile"
            headerTitleStyles={{color: COLORS.WHITE, marginHorizontal: 0}}
          />
          <ScrollView
        style={[GENERAL_STYLES.scrollingView, {backgroundColor: COLORS.BLUE}]}
        showsVerticalScrollIndicator={false}>
          <View style={UserProfileScreenStyles.profileInfoCard}>
            <View style={UserProfileScreenStyles.profileImageBox}>
              <MainFastImage
                style={UserProfileScreenStyles.profileImageStyles}
                imageSource="https://i.pravatar.cc/100"
                resizeMode="contain"
              />
              {isEditProfile && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={UserProfileScreenStyles.editProfileImgBtn}>
                  <MaterialCommunityIcons
                    name="image-edit"
                    size={30}
                    color={COLORS.WHITE}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={UserProfileScreenStyles.profileHolderName}
              numberOfLines={2}>
              {userData.fullName}
            </Text>
          </View>
          <View style={GENERAL_STYLES.container}>
            <View style={UserProfileScreenStyles.innerInfo}>
              <Text
                style={[
                  UserProfileScreenStyles.fieldTitle,
                  isEditProfile && {color: COLORS.DARK_GRAY}
                ]}
                numberOfLines={1}>
                Name
              </Text>
              <View style={UserProfileScreenStyles.infoField}>
                <FontAwesome
                  name="user-o"
                  style={[
                    UserProfileScreenStyles.fieldIcon,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                />
                <TextInput
                  ref={inputRef}
                  style={[
                    UserProfileScreenStyles.fieldTextInput,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                  editable={isEditProfile}
                  value={userData.fullName}
                  maxLength={25}
                  onChangeText={value =>
                    editUserProfileHandler('fullName', value)
                  }
                  selectTextOnFocus={isEditProfile}
                />
              </View>
              <Text
                style={[
                  UserProfileScreenStyles.fieldTitle,
                  isEditProfile && {color: COLORS.DARK_GRAY}
                ]}
                numberOfLines={1}>
                Email
              </Text>
              <View style={UserProfileScreenStyles.infoField}>
                <FontAwesome
                  name="envelope-o"
                  style={[
                    UserProfileScreenStyles.fieldIcon,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                />
                <TextInput
                  style={[
                    UserProfileScreenStyles.fieldTextInput,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                  editable={isEditProfile}
                  value={userData.email}
                  maxLength={55}
                  onChangeText={value => editUserProfileHandler('email', value)}
                />
              </View>
              <Text
                style={[
                  UserProfileScreenStyles.fieldTitle,
                  isEditProfile && {color: COLORS.DARK_GRAY}
                ]}
                numberOfLines={1}>
                Birthdate
              </Text>
              <View style={UserProfileScreenStyles.infoField}>
                <FontAwesome
                  name="calendar-o"
                  style={[
                    UserProfileScreenStyles.fieldIcon,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                />
                <TextInput
                  style={[
                    UserProfileScreenStyles.fieldTextInput,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                  editable={isEditProfile}
                  value={userData.birthdate}
                  maxLength={15}
                  onChangeText={value =>
                    editUserProfileHandler('birthdate', value)
                  }
                />
              </View>
              <Text
                style={[
                  UserProfileScreenStyles.fieldTitle,
                  isEditProfile && {color: COLORS.DARK_GRAY}
                ]}
                numberOfLines={1}>
                Gender
              </Text>
              <View style={UserProfileScreenStyles.infoField}>
                <FontAwesome
                  name="intersex"
                  style={[
                    UserProfileScreenStyles.fieldIcon,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                />
                <TextInput
                  style={[
                    UserProfileScreenStyles.fieldTextInput,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                  editable={isEditProfile}
                  value={userData.gender}
                  maxLength={6}
                  onChangeText={value =>
                    editUserProfileHandler('gender', value)
                  }
                />
              </View>
              <Text
                style={[
                  UserProfileScreenStyles.fieldTitle,
                  isEditProfile && {color: COLORS.DARK_GRAY}
                ]}
                numberOfLines={1}>
                Address
              </Text>
              <View style={UserProfileScreenStyles.infoField}>
                <SimpleLineIcons
                  name="location-pin"
                  style={[
                    UserProfileScreenStyles.fieldIcon,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                />
                <TextInput
                  style={[
                    UserProfileScreenStyles.fieldTextInput,
                    isEditProfile && {color: COLORS.DARK_GRAY}
                  ]}
                  editable={isEditProfile}
                  value={userData.address}
                  maxLength={55}
                  onChangeText={value =>
                    editUserProfileHandler('address', value)
                  }
                />
              </View>
            </View>
            {isEditProfile && (
              <View style={UserProfileScreenStyles.footerBtnsBox}>
                <MainButton
                  style={UserProfileScreenStyles.cancelBtn}
                  btnTextStyles={UserProfileScreenStyles.cancelBtnText}
                  onPress={onCancelEditHandler}>
                  Cancel
                </MainButton>
                <MainButton
                  style={UserProfileScreenStyles.applyBtn}
                  onPress={onApplyEditHandler}>
                  Apply Changes
                </MainButton>
              </View>
            )}
          </View>
          </ScrollView>
        </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfileScreen;
