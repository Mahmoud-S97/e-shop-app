import React from 'react';
import {View, Text} from 'react-native';
import FeedbackStyles from './FeedbackStyles';

const Feedback = () => {
  return (
    <View style={FeedbackStyles.screen}>
      <Text style={{ fontSize: 20, color: "#333" }}>Feedback Screen!</Text>
    </View>
  );
};

export default Feedback;
