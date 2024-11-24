import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

const Intro = () => {
  const [message, setMessage] = useState('Hello World!');

  const pressMeHandler = () => {
    Alert.alert('Awwww, you have pressed me successfully!');
    setMessage('The Touchable Button Is Pressed!');
  };

  return (
    <View style={styles.container}>
      <Text testID="mainText997" style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        This is a React Native snapshot test.
      </Text>
      <Button
        title="Show Alert"
        onPress={() => Alert.alert('Hello with Testing!')}
      />
      <TouchableOpacity testID="touchableOpacity" onPress={pressMeHandler}>
        <Text>Press Me</Text>
      </TouchableOpacity>
      <Text>{message}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center'
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  }
});

export default Intro;
