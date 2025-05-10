import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import UserProfileStyles from './UserProfileStyles';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/MenuIcon';
import MainFastImage from '../../components/Globals/MainFastImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfile = ({navigation}) => {
  return (
    <ScrollView
      style={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
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
              <View style={UserProfileStyles.editBtnBox}>
                <FontAwesome name="edit" color={COLORS.WHITE} size={25} />
                <Text style={UserProfileStyles.editBtnText}>Edit</Text>
              </View>
            ),
            headerRightAction2Styles: {
              width: 95,
              borderRadius: 25
            },
            action2: () => Alert.alert('', 'Edit profile soon!')
          }}
          headerTitle="My Profile"
          headerTitleStyles={{color: COLORS.WHITE, marginHorizontal: 0}}
        />
        <View style={UserProfileStyles.profileInfoCard}>
          <View style={UserProfileStyles.profileImageBox}>
            <MainFastImage
              style={UserProfileStyles.profileImageStyles}
              imageSource="https://i.pravatar.cc/100"
              resizeMode="contain"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={UserProfileStyles.editProfileImgBtn}>
              <MaterialCommunityIcons
                name="image-edit"
                size={30}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
          <Text style={UserProfileStyles.profileHolderName}>Mahmoud Saleh</Text>
        </View>
        <View style={GENERAL_STYLES.container}>
          <View style={UserProfileStyles.innerInfo}>
            <Text style={UserProfileStyles.fieldTitle} numberOfLines={1}>
              Name
            </Text>
            <View style={UserProfileStyles.infoField}>
              <FontAwesome name="user-o" size={23} color={COLORS.DARK_GRAY} />
              <Text style={UserProfileStyles.infoFieldText} numberOfLines={2}>
                Mahmoud Saleh
              </Text>
            </View>
            <Text style={UserProfileStyles.fieldTitle} numberOfLines={1}>
              Email
            </Text>
            <View style={UserProfileStyles.infoField}>
              <FontAwesome
                name="envelope-o"
                size={23}
                color={COLORS.DARK_GRAY}
              />
              <Text style={UserProfileStyles.infoFieldText} numberOfLines={2}>
                mahmoud97@gmail.com
              </Text>
            </View>
            <Text style={UserProfileStyles.fieldTitle} numberOfLines={1}>
              Birthdate
            </Text>
            <View style={UserProfileStyles.infoField}>
              <FontAwesome
                name="calendar-o"
                size={23}
                color={COLORS.DARK_GRAY}
              />
              <Text style={UserProfileStyles.infoFieldText} numberOfLines={2}>
                11/03/1997
              </Text>
            </View>
            <Text style={UserProfileStyles.fieldTitle} numberOfLines={1}>
              Gender
            </Text>
            <View style={UserProfileStyles.infoField}>
              <FontAwesome name="intersex" size={23} color={COLORS.DARK_GRAY} />
              <Text style={UserProfileStyles.infoFieldText} numberOfLines={2}>
                Male
              </Text>
            </View>
            <Text style={UserProfileStyles.fieldTitle} numberOfLines={1}>
              Address
            </Text>
            <View style={UserProfileStyles.infoField}>
              <SimpleLineIcons
                name="location-pin"
                size={23}
                color={COLORS.DARK_GRAY}
              />
              <Text style={UserProfileStyles.infoFieldText} numberOfLines={2}>
                11 Main St, Carrickmacross, Monaghan, Ireland
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
