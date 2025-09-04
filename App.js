import React, {useEffect} from 'react';
import MainNav from './src/navigation/MainNav';
import SplashScreen from 'react-native-splash-screen';
import MainLoading from './src/components/Globals/MainLoading';
import {useSelector} from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const App = () => {
  const {isLoadingProducts} = useSelector(state => state.productsSlice);
  const {isQuotesLoading} = useSelector(state => state.clientsSlice);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY}>
      <MainNav />
      {(isLoadingProducts || isQuotesLoading) && <MainLoading />}
    </StripeProvider>
  );
};

export default App;
