import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import constants from '../../../constants';
import {COLORS} from '../../../constants/styles/Styles';
import { getScreenHeight, getScreenWidth } from '../../../utils';

const MainLoading = props => {

    const { label, style, color, size } = props;

  return (
    <View style={[styles.screen, {...style}]}>
      <View style={styles.container}>
      <ActivityIndicator
        size={size || constants.LARGE}
        color={color || COLORS.WHITE}
      />
      <Text style={styles.loadingText} numberOfLines={2}>{label || 'Loading...'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    width: getScreenWidth(),
    height: getScreenHeight(),
    zIndex: 999999,
    elevation: 999999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 3,
    borderRadius: 10
  },
  loadingText: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 2,
    color: COLORS.WHITE,
    marginTop: 15
  }
});

export default MainLoading;
