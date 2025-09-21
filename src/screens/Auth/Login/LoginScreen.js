import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  Image,
  ScrollView
} from 'react-native';
import LoginScreenStyles from './LoginScreenStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SCREENS from '../../../constants/screens';
import MainButton from '../../../components/Globals/Buttons/MainButton';
import {COLORS, GENERAL_STYLES} from '../../../constants/styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {loginOrSignUpHandler} from '../../../api/Auth';
import {LOCAL_IMAGES} from '../../../constants/images/LocalImages';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {authData, isAuthDataLoading, errors} = useSelector(
    state => state.authSlice
  );

  const showAndHidePasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const validateLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Login Failed', 'Username and Password are required!');
      return false;
    }
    return true;
  };

  const loginHandler = () => {
    if (!validateLogin()) return;

    dispatch(loginOrSignUpHandler({username, password}));
    console.log('Errors:: ', errors);
  };

  useEffect(() => {
    if (errors) {
      Alert.alert('Login Failed', errors);
    }
  }, [errors]);

  useEffect(() => {
    if (authData) {
      navigation.replace(SCREENS.ROOT);
    }
  }, [authData]);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={GENERAL_STYLES.scrollingView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={LoginScreenStyles.screen}>
            <View style={GENERAL_STYLES.container}>
              <View style={LoginScreenStyles.logoImgBox}>
                <Image
                  source={LOCAL_IMAGES.STORE_LOGO}
                  style={LoginScreenStyles.logoImg}
                />
              </View>
              <View style={LoginScreenStyles.mainTitleBox}>
                <FontAwesome name="lock" size={40} color={COLORS.PRIMARY} />
                <Text style={LoginScreenStyles.mainTitle}>Login</Text>
              </View>

              <View style={LoginScreenStyles.inputField}>
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor={COLORS.DARK_GRAY}
                  style={LoginScreenStyles.inputStyles}
                />
              </View>
              <View style={LoginScreenStyles.inputField}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={COLORS.DARK_GRAY}
                  style={[LoginScreenStyles.inputStyles, {width: '85%'}]}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={LoginScreenStyles.showHidePassBtn}
                  onPress={showAndHidePasswordHandler}>
                  <FontAwesome
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={25}
                    color={COLORS.DARK_GRAY}
                  />
                </TouchableOpacity>
              </View>
              <MainButton
                style={LoginScreenStyles.loginBtn}
                onPress={loginHandler}
                btnTextStyles={LoginScreenStyles.loginBtnText}
                loading={isAuthDataLoading}>
                Login
              </MainButton>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
