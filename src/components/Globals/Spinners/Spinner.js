import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import constants from '../../../constants';
import {COLORS} from '../../../constants/styles/Styles';

const Spinner = props => {
  return (
    <View style={[styles.container, {...props.containerStyles}]}>
      <ActivityIndicator
        size={props.size || constants.LARGE}
        color={props.color || COLORS.PRIMARY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  }
});

export default Spinner;
