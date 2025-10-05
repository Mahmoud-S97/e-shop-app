import React, {useEffect} from 'react';
import MainNav from './src/navigation/MainNav';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY}>
      <MainNav />
    </StripeProvider>
  );
};

export default App;
