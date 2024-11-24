import React from 'react';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {COLORS} from '../../constants/styles/Styles';

const MainButton = props => {
  const {children} = props;

  return (
    <Ripple
      rippleColor={COLORS.SECONDARY}
      rippleContainerBorderRadius={props.rippleBorderRadius ? props.rippleBorderRadius : 7}
      rippleOpacity={props.rippleOpacity ? rippleOpacity : 0.7}
      rippleDuration={props.rippleDuration ? props.rippleDuration : 300}
      disabled={props.disabled || props.loading} // Arrived Here ....
      style={[styles.mainBtnStyles, Array.isArray(props.style) ? props.style : {...props.style}]}
      onPress={props.onPress}>
      {props.loading ? 
      <ActivityIndicator size='large' color={COLORS.WHITE} /> :
      <>
      {props?.icon && props.icon}
      <Text
        style={[
          styles.mainBtnTextStyles,
          Array.isArray(props.btnTextStyles) ?
          props.btnTextStyles :
          {...props.btnTextStyles},
          children && props.icon && {marginHorizontal: 6}
        ]}>
        {children}
      </Text>
      </>}
    </Ripple>
  );
};

const styles = StyleSheet.create({
  mainBtnStyles: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  mainBtnTextStyles: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.WHITE
  }
});

export default MainButton;
