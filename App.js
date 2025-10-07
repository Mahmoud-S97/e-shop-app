import React, { useEffect } from 'react';
import MainNav from './src/navigation/MainNav';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import MainLoading from './src/components/Globals/Spinners/MainLoading';
import { COLORS } from './src/constants/styles/Styles';
import MainThemedStatusBar from './src/components/Globals/StatusBar/MainThemedStatusBar';
import { SelectMainLoading } from './src/store/selectors/MainLoadingSelectors';

const App = () => {

  const globalLoading = useSelector(SelectMainLoading);

  const isDark = useColorScheme() === 'dark';
  const backgroundColor = isDark ? COLORS.BLACK : COLORS.WHITE;
  const contentColor = isDark ? 'light-content' : 'dark-content';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <MainThemedStatusBar backgroundColor={backgroundColor} contentColor={contentColor} />
      <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY}>
        <MainNav />
        {globalLoading && <MainLoading /> }
      </StripeProvider>
    </>
  );
};

export default App;
