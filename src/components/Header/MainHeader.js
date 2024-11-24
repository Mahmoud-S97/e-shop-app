import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from '../../constants/styles/Styles';

const MainHeader = props => {
  return (
    <View style={[styles.header, {...props.style}]}>
      {props.headerLeft ? (
        <View
          style={[
            styles.headerLeftBoxStyles,
            {...props.headerLeft.headerLeftBoxStyles}
          ]}>
          {props.headerLeft.headerLeftBtn1_content && (
            <TouchableOpacity
            activeOpacity={0.6}
              style={[
                styles.headerLeftAction1Styles,
                {...props.headerLeft.headerLeftAction1Styles}
              ]}
              onPress={props.headerLeft.action1}>
              {props.headerLeft.headerLeftBtn1_content}
            </TouchableOpacity>
          )}
          {props.headerLeft.headerLeftBtn2_content && (
            <TouchableOpacity
            activeOpacity={0.6}
              style={[
                styles.headerLeftAction2Styles,
                {...props.headerLeft.headerLeftAction2Styles}
              ]}
              onPress={props.headerLeft.action2}>
              {props.headerLeft.headerLeftBtn2_content}
            </TouchableOpacity>
          )}
        </View>
      ) : null}
      {props.headerTitle ? (
        <Text style={[styles.headerTitleStyles, {...props.headerTitleStyles}]}>
          {props.headerTitle}
        </Text>
      ) : null}
      {props.headerRight ? (
        <View
          style={[
            styles.headerRightBoxStyles,
            {...props.headerRight.headerRightBoxStyles}
          ]}>
          {props.headerRight.headerRightBtn1_content && (
            <TouchableOpacity
            activeOpacity={0.6}
              style={[
                styles.headerRightAction1Styles,
                {...props.headerRight.headerRightAction1Styles}
              ]}
              onPress={props.headerRight.action1}>
              {props.headerRight.headerRightBtn1_content}
            </TouchableOpacity>
          )}
          {props.headerRight.headerRightBtn2_content && (
            <TouchableOpacity
            activeOpacity={0.6}
              style={[
                styles.headerRightAction2Styles,
                {...props.headerRight.headerRightAction2Styles}
              ]}
              onPress={props.headerRight.action2}>
              {props.headerRight.headerRightBtn2_content}
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  headerLeftBoxStyles: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerLeftAction1Styles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 22.5,
    marginEnd: 12
  },
  headerLeftAction2Styles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 22.5
  },
  headerTitleStyles: {
    width: '50%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.BLACK
  },
  headerRightBoxStyles: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerRightAction1Styles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 22.5
  },
  headerRightAction2Styles: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 12,
    width: 45,
    height: 45,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 22.5
  }
});

export default MainHeader;
