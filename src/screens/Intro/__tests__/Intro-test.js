import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent, within} from '@testing-library/react-native';
import Intro from '../Intro';
import {styles} from '../Intro';

test('renders correctly', async () => {
  render(<Intro />);

  const btnId = screen.getByRole('button');
  const touchableOp = screen.getByTestId('touchableOpacity');

  expect(btnId).toBeOnTheScreen();
  expect(touchableOp).toBeOnTheScreen();
});

test('Text contains a valid value', () => {
  render(<Intro />);

  const {getByText} = within(screen.getByTestId('mainText997'));

  expect(getByText('Welcome to React Native!')).toBeOnTheScreen();
});

test('It should handle button press!', () => {
  const {getByText} = render(<Intro />);

  expect(getByText('Hello World!')).toBeTruthy();

  const userBtn = screen.getByTestId('touchableOpacity');

  fireEvent.press(userBtn);
  expect(getByText('The Touchable Button Is Pressed!')).toBeTruthy();
});
