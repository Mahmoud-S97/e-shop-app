import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {saveDataToAsyncStorage} from '../../../utils';
import constants from '../../../constants';
import SCREENS from '../../../constants/screens';
import MainButton from '../../../components/Globals/MainButton';
import {COLORS} from '../../../constants/styles/Styles'

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validationPromise = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'mahmoud' && password === '123321') {
          resolve({ message: 'Loggedin Successfully!', loggedIn: true });
        } else {
          reject({ message: 'Loggin failed, please check the Username or Password, and try again.', loggedIn: false });
        }
      }, 2000);
    });
  }

  const loginHandler = async () => {
    setLoading(true);
    try {
      const response = await validationPromise();
      if(response.loggedIn) {
        console.log('Login Success: ', response.message);
        Alert.alert('', response.message);
        await saveDataToAsyncStorage(constants.IS_LOGGED_IN, 'true');
        navigation.replace(SCREENS.ROOT);
      }
    } catch(error) {
      console.log('Login Error:', error);
      Alert.alert('Login Error ', error.message);
    }
    finally {
      setLoading(false);
    }

  };

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
            onChangeText={value => setUsername(value)}
            style={LoginScreenStyles.inputStyles}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            style={LoginScreenStyles.inputStyles}
            secureTextEntry={true}
          />
          <MainButton
            style={LoginScreenStyles.loginBtn}
            onPress={loginHandler}
            btnTextStyles={LoginScreenStyles.loginBtnText}
            loading={loading}>
            Login
          </MainButton>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
