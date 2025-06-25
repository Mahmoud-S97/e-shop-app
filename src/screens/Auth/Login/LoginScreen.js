import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Keyboard
} from 'react-native';
import LoginScreenStyles from './LoginScreenStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SCREENS from '../../../constants/screens';
import MainButton from '../../../components/Globals/MainButton';
import {COLORS} from '../../../constants/styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {loginOrSignUpHandler} from '../../../api/Auth';
import { getAccessToken } from '../../../utils';

const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {authData, isAuthDataLoading, errors} = useSelector(state => state.authSlice);


  const validateLogin = () => {
    if(!username.trim() || !password.trim()){
      Alert.alert('Login Failed', 'Username and Password are required!');
      return false;
    }
    return true;
  }

  const loginHandler = () => {

    if(!validateLogin()) return;

    dispatch(loginOrSignUpHandler({username, password}));
    console.log('Errors:: ', errors);
  }

  useEffect(() => {
    if(errors) {
      Alert.alert('Login Failed', errors);
    }
  }, [errors]);
  
  useEffect(() => {
    if(authData) {
      navigation.replace(SCREENS.ROOT);
    }
    const tok = async () => {
      const t = await getAccessToken();
      console.log('Access-Token:: ', t); // Arrived here ...
    }
    tok();
  }, [authData]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={LoginScreenStyles.screen}>
          <View style={LoginScreenStyles.mainTitleBox}>
            <FontAwesome name="lock" size={40} color={COLORS.PRIMARY} />
            <Text style={LoginScreenStyles.mainTitle}>Login</Text>
          </View>
          <View style={LoginScreenStyles.container}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={COLORS.GRAY}
              style={LoginScreenStyles.inputStyles}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={COLORS.GRAY}
              style={LoginScreenStyles.inputStyles}
              secureTextEntry={true}
            />
            <MainButton
              style={LoginScreenStyles.loginBtn}
              onPress={loginHandler}
              btnTextStyles={LoginScreenStyles.loginBtnText}
              loading={isAuthDataLoading}>
              Login
            </MainButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
