import React, { useCallback, useRef, useState } from 'react';
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
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/Icons/MenuIcon';
import MainFastImage from '../../components/Globals/imgs/MainFastImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButton from '../../components/Globals/Buttons/MainButton';
import { useFetchUserProfile } from '../../services/hooks/useFetchUserProfile';
import MainLoading from '../../components/Globals/Spinners/MainLoading';
import GeneralEmptyMessage from '../../components/Globals/TextMessages/GeneralEmptyMessage';

const UserProfileScreen = ({ navigation }) => {

  const { userForm: userData, setUserForm, isUserDataLoading, errors } = useFetchUserProfile(currentUser => {
    return {
      id: currentUser?.id,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      fullName: `${currentUser?.firstName} ${currentUser?.lastName}`, // Read only
      email: currentUser?.email,
      birthDate: currentUser?.birthDate,
      gender: currentUser?.gender,
      address: currentUser?.address?.address, // Read only
      city: currentUser?.address.city,
      country: currentUser?.address?.country,
      state: currentUser?.address?.state,
      postalCode: currentUser?.address?.postalCode
    }

  });

  const [isEditProfile, setIsEditProfile] = useState(false);

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

    setUserForm({ ...userData });

    console.log('Updated-User-Profile::: ', userData);
  }, []);

  if (isUserDataLoading) {
    return <MainLoading />
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          style={{ backgroundColor: COLORS.BLUE }}
          headerLeft={{
            headerLeftBtn1_content: (
              <MenuIcon
                color={COLORS.WHITE}
                customMenuBoxText={{ color: COLORS.WHITE }}
              />
            ),
            headerLeftAction1Styles: {
              width: 95,
              borderRadius: 25
            },
            action1: () => navigation.openDrawer()
          }}
          headerRight={{
            headerRightBtn2_content: userData.id ? (
              <View style={UserProfileScreenStyles.editBtnBox}>
                <FontAwesome name="edit" color={COLORS.WHITE} size={25} />
                <Text style={UserProfileScreenStyles.editBtnText}>Edit</Text>
              </View>
            ) : null,
            headerRightAction2Styles: {
              width: 95,
              borderRadius: 25,
              backgroundColor: isEditProfile ? COLORS.RED : COLORS.LIGHT_GRAY
            },
            action2: onEditHandler
          }}
          headerTitle="My Profile"
          headerTitleStyles={{ color: COLORS.WHITE, marginHorizontal: 0 }}
        />
        {userData.id ? (
          <ScrollView
            style={[GENERAL_STYLES.scrollingView, { backgroundColor: COLORS.BLUE }]}
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
                {isEditProfile && (
                  <>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      First Name
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <FontAwesome
                        name="user-o"
                        style={[
                          UserProfileScreenStyles.fieldIcon,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                      />
                      <TextInput
                        ref={inputRef}
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.firstName}
                        maxLength={25}
                        onChangeText={value =>
                          editUserProfileHandler('firstName', value)
                        }
                        selectTextOnFocus={isEditProfile}
                      />
                    </View>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      Last Name
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <FontAwesome
                        name="user-o"
                        style={[
                          UserProfileScreenStyles.fieldIcon,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                      />
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.lastName}
                        maxLength={25}
                        onChangeText={value =>
                          editUserProfileHandler('lastName', value)
                        }
                        selectTextOnFocus={isEditProfile}
                      />
                    </View>
                  </>
                )}
                {!isEditProfile && (
                  <>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      Full Name
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <FontAwesome
                        name="user-o"
                        style={[
                          UserProfileScreenStyles.fieldIcon,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                      />
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
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
                  </>
                )}
                <Text
                  style={[
                    UserProfileScreenStyles.fieldTitle,
                    isEditProfile && { color: COLORS.DARK_GRAY }
                  ]}
                  numberOfLines={1}>
                  Email
                </Text>
                <View style={UserProfileScreenStyles.infoField}>
                  <FontAwesome
                    name="envelope-o"
                    style={[
                      UserProfileScreenStyles.fieldIcon,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                  />
                  <TextInput
                    style={[
                      UserProfileScreenStyles.fieldTextInput,
                      isEditProfile && { color: COLORS.DARK_GRAY }
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
                    isEditProfile && { color: COLORS.DARK_GRAY }
                  ]}
                  numberOfLines={1}>
                  Birthdate
                </Text>
                <View style={UserProfileScreenStyles.infoField}>
                  <FontAwesome
                    name="calendar-o"
                    style={[
                      UserProfileScreenStyles.fieldIcon,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                  />
                  <TextInput
                    style={[
                      UserProfileScreenStyles.fieldTextInput,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                    editable={isEditProfile}
                    value={userData.birthDate}
                    maxLength={15}
                    onChangeText={value =>
                      editUserProfileHandler('birthdate', value)
                    }
                  />
                </View>
                <Text
                  style={[
                    UserProfileScreenStyles.fieldTitle,
                    isEditProfile && { color: COLORS.DARK_GRAY }
                  ]}
                  numberOfLines={1}>
                  Gender
                </Text>
                <View style={UserProfileScreenStyles.infoField}>
                  <FontAwesome
                    name="intersex"
                    style={[
                      UserProfileScreenStyles.fieldIcon,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                  />
                  <TextInput
                    style={[
                      UserProfileScreenStyles.fieldTextInput,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                    editable={isEditProfile}
                    value={userData.gender}
                    maxLength={6}
                    onChangeText={value =>
                      editUserProfileHandler('gender', value)
                    }
                  />
                </View>
                {!isEditProfile && (
                  <>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      Address
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <SimpleLineIcons
                        name="location-pin"
                        style={[
                          UserProfileScreenStyles.fieldIcon,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                      />
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.address}
                        maxLength={55}
                        onChangeText={value =>
                          editUserProfileHandler('address', value)
                        }
                      />
                    </View>
                  </>
                )}
                {isEditProfile && (
                  <>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      City
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.city}
                        maxLength={55}
                        onChangeText={value =>
                          editUserProfileHandler('city', value)
                        }
                      />
                    </View>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      Country
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.country}
                        maxLength={55}
                        onChangeText={value =>
                          editUserProfileHandler('country', value)
                        }
                      />
                    </View>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      State/County
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.state}
                        maxLength={55}
                        onChangeText={value =>
                          editUserProfileHandler('state', value)
                        }
                      />
                    </View>
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTitle,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={1}>
                      Postal Code
                    </Text>
                    <View style={UserProfileScreenStyles.infoField}>
                      <TextInput
                        style={[
                          UserProfileScreenStyles.fieldTextInput,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        editable={isEditProfile}
                        value={userData.postalCode}
                        maxLength={55}
                        onChangeText={value =>
                          editUserProfileHandler('postalCode', value)
                        }
                      />
                    </View>
                  </>
                )}
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
        ) : (
          <GeneralEmptyMessage>
            {errors || 'Cannot fetch user profile, please try again later!'}
          </GeneralEmptyMessage>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfileScreen;
