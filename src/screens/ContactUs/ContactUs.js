import React, {useState, useCallback} from 'react';
import {
  View,
  Platform,
  Image,
  Linking,
  Alert,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS
} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';
import ContactUsStyles from './ContactUsStyles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import Spinner from '../../components/Globals/Spinner';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {LOCAL_IMAGES} from '../../constants/images/LocalImages';
import MainButton from '../../components/Globals/MainButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/MenuIcon';
import constants, {SOCIAL_MEDIA_LINKS} from '../../constants';
import GeneralEmptyMessage from '../../components/Globals/GeneralEmptyMessage';

const ContactUs = ({navigation}) => {
  const [myOriginCoords, setMyOriginCoords] = useState(null);
  const [grantedLocation, setGrantedLocation] = useState(false);
  const [isMapsLoading, setIsMapsLoading] = useState(true);

  const destinationCoords = {
    latitude: 53.968451,
    longitude: -6.703923
  };

  useFocusEffect(
    useCallback(() => {
      requestLocationPermission();
      console.log('MY-CURRENT-LOCATION-STATE:: ', myOriginCoords);
    }, [])
  );

  const requestLocationPermission = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    });

    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('Sorry, Maps feature is not available');
        setGrantedLocation(false);
        setIsMapsLoading(false);
        break;
      case RESULTS.LIMITED:
      case RESULTS.GRANTED:
        console.log('Maps permission is granted!-1');
        setGrantedLocation(true);
        getMyOriginCoordsHandler();
        break;
      case RESULTS.DENIED:
        const req = await request(permission);
        console.log('New Location Request:: ', req);
        if (req === RESULTS.GRANTED || req === RESULTS.LIMITED) {
          console.log('Maps permission is granted!');
          setGrantedLocation(true);
          getMyOriginCoordsHandler();
        } else {
          console.log('Maps location is not granted!');
          setGrantedLocation(false);
          setIsMapsLoading(false);
          Alert.alert(
            'Permission Required',
            'Location permission is blocked. Please enable it in settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => openSettings()}
            ]
          );
        }
        break;
      case RESULTS.BLOCKED:
        setGrantedLocation(false);
        setIsMapsLoading(false);
        Alert.alert(
          'Permission Required',
          'Location permission is blocked. Please enable it in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => openSettings()}
          ]
        );
        break;
    }

    console.log(':::Location-Permission-Result::: ', result);
  };

  const getMyOriginCoordsHandler = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position: ', position);
        setMyOriginCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsMapsLoading(false);
      },
      error => {
        console.log('Get current location error: ', error);
        setIsMapsLoading(false);
        if(error?.code === 3) {
          Alert.alert(
            'Location Timeout',
            "We couldn't get your location. Try moving to an open area or check your GPS settings."
          );
        } else {
          Alert.alert('Maps Error', "Cannot get your current location, please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true
      }
    );
  };

  const goToStoreByGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords.latitude},${destinationCoords.longitude}&travelmode=driving`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('', 'Sorry, Google-Maps not supported!');
        }
      })
      .catch(error => Alert.alert('Error', error.message));
  };

  const goToMediaProfile = async mediaType => {
    try {
      let urlApp = '';
      let urlWeb = '';

      if (mediaType === constants.FACEBOOK) {
        urlApp = SOCIAL_MEDIA_LINKS.FACEBOOK_APP;
        urlWeb = SOCIAL_MEDIA_LINKS.FACEBOOK_WEB;
      } else if (mediaType === constants.INSTAGRAM) {
        urlApp = SOCIAL_MEDIA_LINKS.INSTAGRAM_APP;
        urlWeb = SOCIAL_MEDIA_LINKS.INSTAGRAM_WEB;
      } else if (mediaType === constants.LINKEDIN) {
        urlApp = SOCIAL_MEDIA_LINKS.LINKEDIN_APP;
        urlWeb = SOCIAL_MEDIA_LINKS.LINKEDIN_WEB;
      }

      const supported = await Linking.canOpenURL(urlApp);
      if (supported) {
        Linking.openURL(urlApp);
      } else {
        Linking.openURL(urlWeb);
      }
    } catch (error) {
      Alert.alert(
        '',
        `Sorry, failed to open URL: ${mediaType.toUpperCase()}, ${error}`
      );
    }
  };

  const socialMediaClickHandler = async mediaType => {
    switch (mediaType) {
      case constants.FACEBOOK:
        goToMediaProfile(constants.FACEBOOK);
        break;
      case constants.INSTAGRAM:
        goToMediaProfile(constants.INSTAGRAM);
        break;
      case constants.LINKEDIN:
        goToMediaProfile(constants.LINKEDIN);
        break;
    }
  };

  if (isMapsLoading) return <Spinner />;

  return (
    <ScrollView
      style={GENERAL_STYLES.scrollingView}
      refreshControl={
        !grantedLocation ? (
          <RefreshControl
            refreshing={isMapsLoading}
            onRefresh={requestLocationPermission}
          />
        ) : null
      }>
      <View style={GENERAL_STYLES.screen}>
        <MainHeader
          headerLeft={{
            headerLeftBtn1_content: <MenuIcon />,
            headerLeftAction1Styles: {
              width: 95,
              borderRadius: 25
            },
            action1: () => navigation.openDrawer()
          }}
          headerTitle="Contact Us"
          headerRight={{}}
        />
        {grantedLocation ? (
          <MapView
            style={ContactUsStyles.mapView}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: destinationCoords?.latitude,
              longitude: destinationCoords?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation
            showsMyLocationButton>
            <Marker
              coordinate={destinationCoords}
              title="Gold Store Jo"
              description="The new location of Gold Store Jo in Ireland">
              <Image
                style={{width: 40, height: 40}}
                source={LOCAL_IMAGES.STORE_LOGO}
              />
            </Marker>
            <MapViewDirections
              origin={myOriginCoords}
              destination={destinationCoords}
              latitudeDelta={0.01}
              longitudeDelta={0.01}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={5}
              strokeColor={COLORS.PRIMARY}
            />
          </MapView>
        ) : (
          <GeneralEmptyMessage style={{height: 300}}>
            Can't view Google Maps due to permission Denied or Unavailable
          </GeneralEmptyMessage>
        )}
        <MainButton
          style={ContactUsStyles.goToStoreBtn}
          onPress={goToStoreByGoogleMaps}
          icon={<FontAwesome name="car" size={20} color={COLORS.WHITE} />}>
          Drive To The Store
        </MainButton>
        <View style={ContactUsStyles.socialMediaBox}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={ContactUsStyles.socialMediaBtn}
            onPress={() => socialMediaClickHandler(constants.FACEBOOK)}>
            <MaterialCommunityIcons
              name="facebook"
              size={30}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={ContactUsStyles.socialMediaBtn}
            onPress={() => socialMediaClickHandler(constants.INSTAGRAM)}>
            <FontAwesome name="instagram" size={30} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={ContactUsStyles.socialMediaBtn}
            onPress={() => socialMediaClickHandler(constants.LINKEDIN)}>
            <Entypo
              name="linkedin-with-circle"
              size={30}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
