import React from 'react';
import {View, Text} from 'react-native';
import ContactUsStyles from './ContactUsStyles';

const ContactUs = () => {
  return (
    <View style={ContactUsStyles.screen}>
      <Text style={{ fontSize: 20, color: "#333" }}>Contact Us Screen!</Text>
    </View>
  );
};

export default ContactUs;
