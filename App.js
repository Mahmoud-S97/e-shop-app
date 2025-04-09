import React, {useEffect} from 'react';
import MainNav from './src/navigation/MainNav';
import SplashScreen from 'react-native-splash-screen';
import MainLoading from './src/components/Globals/MainLoading';
import {useSelector} from 'react-redux';

const App = () => {
  const {isLoadingProducts} = useSelector(state => state.productsSlice);
  const {isQuotesLoading} = useSelector(state => state.userSlice);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <MainNav />
      {(isLoadingProducts || isQuotesLoading) && <MainLoading />}
    </>
  );
};

export default App;
