import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native"
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageKeys";
import { useDispatch } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { setUserLogout } from "../store/reducers/authSlice";
import SCREENS from "../constants/screens";
import dayjs from "dayjs";

export const getScreenWidth = () => {
    return Dimensions.get('screen').width;
}

export const getScreenHeight = () => {
    return Dimensions.get('screen').height;
}

export const saveDataToAsyncStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch(e) {
        console.log('Error in Saving data from AsyncStorage: ', e);       
    }
}

export const getDataFromAsyncStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch(e) {
        console.log('Error in Fetching data from AsyncStorage: ', e);       
    }
}

export const removeDataFromAsyncStorage = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch(e) {
        console.log('Error in Removing data from AsyncStorage: ', e);       
    }
}

export const saveAccessToken = async (token) => {
    return await saveDataToAsyncStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
}

export const getAccessToken = async () => {
    return await getDataFromAsyncStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}

export const removeAccessToken = async () => {
    return await removeDataFromAsyncStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}

export const saveRefreshToken = async (refreshToken) => {
    return await saveDataToAsyncStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

export const getRefreshToken = async () => {
    return await getDataFromAsyncStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
}

export const removeRefreshToken = async () => {
    return await removeDataFromAsyncStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
}

export const userLogout = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return () => {
        dispatch(setUserLogout());
        removeAccessToken();
        removeRefreshToken();
        navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: SCREENS.AUTH }]
              })
            )
    }
}

export const formatDate = (selectedDate) => {
    return dayjs(selectedDate).format('YYYY-M-DD');
}