import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';


const MainThemedStatusBar = ({ backgroundColor, contentColor }) => (
    <>
        {Platform.OS == 'android' && (
            <View style={[StyleSheet.absoluteFillObject, { height: Platform.OS == 'android' ? StatusBar.currentHeight : 0, backgroundColor, zIndex: 9999 }]} />
        )}
        <StatusBar translucent backgroundColor={backgroundColor} barStyle={contentColor} animated />
    </>
)

export default MainThemedStatusBar;