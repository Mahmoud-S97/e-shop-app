import React from 'react';
import {I18nManager} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/styles/Styles';

const GoBackIcon = props => {
  const {color, name, size, style} = props;
  return (
    <FontAwesome
      style={{...style}}
      name={name ? name : I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
      color={color ? color : COLORS.PRIMARY}
      size={size ? size : 25}
    />
  );
};

export default GoBackIcon;
