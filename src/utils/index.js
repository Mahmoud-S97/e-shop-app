import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native"

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