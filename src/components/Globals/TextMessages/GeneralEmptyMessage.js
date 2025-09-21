import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS, GENERAL_STYLES} from '../../../constants/styles/Styles';

const GeneralEmptyMessage = props => {
  const {children, style, messageTextStyles, icon, button} = props;
  return (
    <View style={[GENERAL_STYLES.screen, styles.container, {...style}]}>
      <View style={styles.emptyMessageBox}>
        {icon && icon}
        <Text
          style={[
            styles.emptyMessageText,
            (icon || button) && {marginVertical: 25},
            messageTextStyles
          ]}>
          {children}
        </Text>
        {button && button}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyMessageBox: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyMessageText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.PRIMARY
  }
});

export default GeneralEmptyMessage;
