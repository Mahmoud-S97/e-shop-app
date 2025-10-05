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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils';
import MainModal from '../../components/Globals/Modal/MainModal';

const UserProfileScreen = ({ navigation }) => {

  const { userForm: userData, setUserForm, closeUpdatingDataHandler, isUserDataLoading, errors } = useFetchUserProfile(currentUser => {
    return {
      id: currentUser?.id,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      fullName: `${currentUser?.firstName} ${currentUser?.lastName}`, // Read only
      image: currentUser?.image, // Read only
      email: currentUser?.email,
      birthDate: currentUser?.birthDate,
      gender: currentUser?.gender,
      address: `${currentUser?.address?.address}, ${currentUser?.address?.country}`,
      city: currentUser?.address.city,
      country: currentUser?.address?.country,
      state: currentUser?.address?.state,
      postalCode: currentUser?.address?.postalCode
    }

  });
  const [formErrors, setFormErrors] = useState({});
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const inputRef = useRef(null);

  const onEditHandler = () => {
    setIsEditProfile(true);
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  const onCancelEditHandler = () => {
    closeUpdatingDataHandler();
    setFormErrors({});
    setIsEditProfile(false);
    inputRef.current?.blur();
  };

  const onApplyEditHandler = () => {
    if (!validForm()) return;

    setIsEditProfile(false);
    inputRef.current?.blur();
    // API Amendments will be handled soon...!
  };

  const validateField = (updatedField, value) => {
    switch (updatedField) {
      case 'firstName':
        if (!value.trim()) {
          return 'First Name is required!';
        } else if (value.includes(' ')) {
          return 'First Name cannot contain spaces!';
        }
        return '';
      case 'lastName':
        if (!value.trim()) {
          return 'Last Name is required!';
        } else if (value.includes(' ')) {
          return 'Last Name cannot contain spaces!';
        }
        return '';
      case 'email':
        if (!value.trim()) {
          return 'Email is required!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email address';
        }
        return '';
      case 'birthDate':
        if (!value.trim()) return 'Birthdate is required!';
        return '';
      case 'gender':
        if (!value.trim()) return 'Gender is required!';
        return '';
      case 'address':
        if (!value.trim()) return 'Address is required!';
        return '';
      case 'city':
        if (!value.trim()) return 'City is required!';
        return '';
      case 'country':
        if (!value.trim()) return 'Country is required!';
        return '';
      case 'state':
        if (!value.trim()) return 'State is required!';
        return '';
      case 'postalCode':
        if (!value.trim()) {
          return 'Postal code is required!';
        } else if (!/^\d{5,10}$/.test(value)) {
          return 'Invalid postal code';
        }
        return '';
      default:
        return '';
    }
  }

  const validForm = () => {

    const newErrors = {};

    Object.keys(userData).forEach(field => {
      const errorMessage = validateField(field, userData[field]);
      if (errorMessage) newErrors[field] = errorMessage;
    });

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const callValidatorOnBlur = (updatedField, value) => {
    const errorMessage = validateField(updatedField, value);
    setFormErrors(prevErrors => ({ ...prevErrors, [updatedField]: errorMessage }))
  }

  const updateFieldHandler = useCallback((updatedField, value) => {

    let updatedFullName = userData.fullName;

    if (updatedField === 'firstName' || updatedField === 'lastName') {

      updatedFullName = updatedFullName.split(' ');
      updatedFullName = updatedField === 'firstName' ?
        `${value.trim()} ${updatedFullName[1]}` :
        `${updatedFullName[0]} ${value.trim()}`
    }

    setUserForm(prevUserData =>
    ({
      ...prevUserData,
      ['fullName']: updatedFullName,
      [updatedField]: value
    }));

    setFormErrors(prevErrors => ({ ...prevErrors, [updatedField]: validateField(updatedField, value) }));

  }, [userData]);

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type == 'set' && selectedDate) {
        toggleDatePicker();
        updateFieldHandler('birthDate', formatDate(selectedDate));
      }
      toggleDatePicker();
    } else {
      if (selectedDate) setSelectedBirthDate(selectedDate);
    }
  }

  const confirmIOSDate = () => {
    if (selectedBirthDate) {
      updateFieldHandler('birthDate', formatDate(selectedBirthDate));
    }
    toggleDatePicker();
  }

  if (isUserDataLoading) {
    return <MainLoading />
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          style={{ backgroundColor: COLORS.WHITE }}
          headerLeft={{
            headerLeftBtn1_content: (
              <MenuIcon
                color={COLORS.PRIMARY}
                customMenuBoxText={{ color: COLORS.PRIMARY }}
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
                <FontAwesome name="edit" color={isEditProfile ? COLORS.WHITE : COLORS.PRIMARY} size={25} />
                <Text style={[UserProfileScreenStyles.editBtnText, isEditProfile && { color: COLORS.WHITE }]}>Edit</Text>
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
          headerTitleStyles={{ color: COLORS.PRIMARY, marginHorizontal: 0 }}
        />
        <ScrollView
          style={GENERAL_STYLES.scrollingView}
          showsVerticalScrollIndicator={false}>

          {!isUserDataLoading && userData.id ? (
            <>
              <View style={UserProfileScreenStyles.profileInfoCard}>
                <View style={UserProfileScreenStyles.profileImageBox}>
                  <MainFastImage
                    style={UserProfileScreenStyles.profileImageStyles}
                    imageSource={userData.image}
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
              <View style={[GENERAL_STYLES.container, UserProfileScreenStyles.customContainer, isEditProfile && { paddingBottom: 70 }]}>
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
                      <View style={[UserProfileScreenStyles.infoField, formErrors.firstName && { borderColor: COLORS.RED, marginBottom: 5 }]}>
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
                            updateFieldHandler('firstName', value)
                          }
                          selectTextOnFocus={isEditProfile}
                          onBlur={() => callValidatorOnBlur('firstName', userData.firstName)}
                        />
                      </View>
                      {formErrors.firstName ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.firstName}</Text> : null}
                      <Text
                        style={[
                          UserProfileScreenStyles.fieldTitle,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        numberOfLines={1}>
                        Last Name
                      </Text>
                      <View style={[UserProfileScreenStyles.infoField, formErrors.lastName && { borderColor: COLORS.RED, marginBottom: 5 }]}>
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
                            updateFieldHandler('lastName', value)
                          }
                          selectTextOnFocus={isEditProfile}
                          onBlur={() => callValidatorOnBlur('lastName', userData.lastName)}
                        />
                      </View>
                      {formErrors.lastName ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.lastName}</Text> : null}
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
                        <Text
                          style={[
                            UserProfileScreenStyles.fieldTextInput,
                            { height: 'auto' },
                            isEditProfile && { color: COLORS.DARK_GRAY }
                          ]}
                          numberOfLines={2}
                        >{userData.fullName}</Text>
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
                  <View style={[UserProfileScreenStyles.infoField, formErrors.email && { borderColor: COLORS.RED, marginBottom: 5 }]}>
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
                      onChangeText={value => updateFieldHandler('email', value)}
                      onBlur={() => callValidatorOnBlur('email', userData.email)}
                    />
                  </View>
                  {formErrors.email ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.email}</Text> : null}
                  <Text
                    style={[
                      UserProfileScreenStyles.fieldTitle,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                    numberOfLines={1}>
                    Birthdate
                  </Text>
                  <TouchableOpacity activeOpacity={0.7} disabled={!isEditProfile} style={[UserProfileScreenStyles.infoField, formErrors.birthDate && { borderColor: COLORS.RED, marginBottom: 5 }]} onPress={toggleDatePicker}>
                    <FontAwesome
                      name="calendar-o"
                      style={[
                        UserProfileScreenStyles.fieldIcon,
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                    />
                    <Text
                      style={[
                        UserProfileScreenStyles.fieldTextInput,
                        { height: 'auto' },
                        isEditProfile && { color: COLORS.DARK_GRAY }
                      ]}
                      numberOfLines={2}
                    >{userData?.birthDate}</Text>
                  </TouchableOpacity>
                  {formErrors.birthDate ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.birthDate}</Text> : null}
                  {Platform.OS == 'ios' ?
                    (<MainModal
                      style={{ modalContainer: UserProfileScreenStyles.modalContainer }}
                      transparent={true}
                      visible={showDatePicker}
                      animationType='slide'
                      onRequestClose={() => setShowDatePicker(false)}
                    >
                      <View style={UserProfileScreenStyles.modalContent}>
                        <RNDateTimePicker
                          mode='date'
                          display='spinner'
                          onChange={onChangeDate}
                          value={new Date(userData?.birthDate) ?? new Date()}
                          maximumDate={new Date()}
                          minimumDate={new Date(1950, 0, 1)}
                          themeVariant='light'
                        />
                        <View style={UserProfileScreenStyles.modalFooter}>
                          <MainButton
                            style={UserProfileScreenStyles.cancelBtn}
                            btnTextStyles={UserProfileScreenStyles.cancelBtnText}
                            onPress={() => setShowDatePicker(false)}>
                            Cancel
                          </MainButton>
                          <MainButton
                            style={UserProfileScreenStyles.applyBtn}
                            onPress={confirmIOSDate}>
                            Done
                          </MainButton>
                        </View>
                      </View>
                    </MainModal>) :
                    (
                      <>
                        {showDatePicker && (
                          <RNDateTimePicker
                            mode='date'
                            display='spinner'
                            onChange={onChangeDate}
                            value={new Date(userData.birthDate) ?? new Date()}
                            maximumDate={new Date()}
                            minimumDate={new Date(1950, 0, 1)}
                            themeVariant='light'
                          />
                        )}
                      </>
                    )
                  }
                  <Text
                    style={[
                      UserProfileScreenStyles.fieldTitle,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                    numberOfLines={1}>
                    Gender
                  </Text>
                  <View style={[UserProfileScreenStyles.infoField, formErrors.gender && { borderColor: COLORS.RED, marginBottom: 5 }]}>
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
                        updateFieldHandler('gender', value)
                      }
                      onBlur={() => callValidatorOnBlur('gender', userData.gender)}
                    />
                  </View>
                  {formErrors.gender ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.gender}</Text> : null}
                  <Text
                    style={[
                      UserProfileScreenStyles.fieldTitle,
                      isEditProfile && { color: COLORS.DARK_GRAY }
                    ]}
                    numberOfLines={1}>
                    Address
                  </Text>
                  <View style={[UserProfileScreenStyles.infoField, formErrors.address && { borderColor: COLORS.RED, marginBottom: 5 }]}>
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
                        updateFieldHandler('address', value)
                      }
                      onBlur={() => callValidatorOnBlur('address', userData.address)}
                    />
                  </View>
                  {formErrors.address ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.address}</Text> : null}
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
                      <View style={[UserProfileScreenStyles.infoField, formErrors.city && { borderColor: COLORS.RED, marginBottom: 5 }]}>
                        <TextInput
                          style={[
                            UserProfileScreenStyles.fieldTextInput,
                            isEditProfile && { color: COLORS.DARK_GRAY }
                          ]}
                          editable={isEditProfile}
                          value={userData.city}
                          maxLength={55}
                          onChangeText={value =>
                            updateFieldHandler('city', value)
                          }
                          onBlur={() => callValidatorOnBlur('city', userData.city)}
                        />
                      </View>
                      {formErrors.city ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.city}</Text> : null}
                      <Text
                        style={[
                          UserProfileScreenStyles.fieldTitle,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        numberOfLines={1}>
                        Country
                      </Text>
                      <View style={[UserProfileScreenStyles.infoField, formErrors.country && { borderColor: COLORS.RED, marginBottom: 5 }]}>
                        <TextInput
                          style={[
                            UserProfileScreenStyles.fieldTextInput,
                            isEditProfile && { color: COLORS.DARK_GRAY }
                          ]}
                          editable={isEditProfile}
                          value={userData.country}
                          maxLength={55}
                          onChangeText={value =>
                            updateFieldHandler('country', value)
                          }
                          onBlur={() => callValidatorOnBlur('country', userData.country)}
                        />
                      </View>
                      {formErrors.country ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.country}</Text> : null}
                      <Text
                        style={[
                          UserProfileScreenStyles.fieldTitle,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        numberOfLines={1}>
                        State/ County
                      </Text>
                      <View style={[UserProfileScreenStyles.infoField, formErrors.state && { borderColor: COLORS.RED, marginBottom: 5 }]}>
                        <TextInput
                          style={[
                            UserProfileScreenStyles.fieldTextInput,
                            isEditProfile && { color: COLORS.DARK_GRAY }
                          ]}
                          editable={isEditProfile}
                          value={userData.state}
                          maxLength={55}
                          onChangeText={value =>
                            updateFieldHandler('state', value)
                          }
                          onBlur={() => callValidatorOnBlur('state', userData.state)}
                        />
                      </View>
                      {formErrors.state ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.state}</Text> : null}
                      <Text
                        style={[
                          UserProfileScreenStyles.fieldTitle,
                          isEditProfile && { color: COLORS.DARK_GRAY }
                        ]}
                        numberOfLines={1}>
                        Postal Code
                      </Text>
                      <View style={[UserProfileScreenStyles.infoField, formErrors.postalCode && { borderColor: COLORS.RED, marginBottom: 5 }]}>
                        <TextInput
                          style={[
                            UserProfileScreenStyles.fieldTextInput,
                            isEditProfile && { color: COLORS.DARK_GRAY }
                          ]}
                          editable={isEditProfile}
                          value={userData.postalCode}
                          maxLength={55}
                          onChangeText={value =>
                            updateFieldHandler('postalCode', value)
                          }
                          onBlur={() => callValidatorOnBlur('postalCode', userData.postalCode)}
                        />
                      </View>
                      {formErrors.postalCode ? <Text style={UserProfileScreenStyles.errorText}>{formErrors.postalCode}</Text> : null}
                    </>
                  )}
                </View>
              </View>
            </>
          ) : (
            <GeneralEmptyMessage style={{ marginTop: 200 }}>
              <Text >{errors || 'Cannot fetch user profile, please try again later.'}</Text>
            </GeneralEmptyMessage>
          )}
        </ScrollView>

        {!isUserDataLoading && !errors && isEditProfile && (
          <View style={UserProfileScreenStyles.footerBtnsBox}>
            <MainButton
              style={UserProfileScreenStyles.cancelBtn}
              btnTextStyles={UserProfileScreenStyles.cancelBtnText}
              onPress={onCancelEditHandler}>
              Cancel
            </MainButton>
            <MainButton
              style={[UserProfileScreenStyles.applyBtn, Object.values(formErrors).some(ele => ele !== '') && { backgroundColor: COLORS.GRAY }]}
              disabled={Object.values(formErrors).some(ele => ele !== '')}
              onPress={onApplyEditHandler}>
              Apply Changes
            </MainButton>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfileScreen;
