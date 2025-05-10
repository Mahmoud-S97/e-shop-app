import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants/styles/Styles';

const MenuIcon = props => {
  const {name, size, color, style, customMenuBoxText} = props;

  return (
    <View style={[styles.customMenuBox, {...style}]}>
      <Entypo
        name={name ? name : 'menu'}
        size={size ? size : 30}
        color={color ? color : COLORS.PRIMARY}
      />
      <Text style={[styles.customMenuBoxText, { ...customMenuBoxText }]}>MENU</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customMenuBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customMenuBoxText: {
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 5,
    color: COLORS.PRIMARY
  }
});

export default MenuIcon;
