import React, {useEffect} from 'react';
import MainNav from './src/navigation/MainNav';
import SplashScreen from 'react-native-splash-screen';
import MainButton from './src/components/Globals/MainButton';
import { StyleSheet } from 'react-native';
import { getScreenWidth } from './src/utils';
import { useSelector } from 'react-redux';
import SCREENS from './src/constants/screens';
import {navigate} from './src/navigation/NavigationService';

const App = () => {

  const cartTotalPrice = useSelector(state => state.cartSlice.totalPrice);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <MainNav />
      {cartTotalPrice > 0 && (
        <MainButton style={style.orderingBtn} onPress={() => navigate(SCREENS.CART)}>
          {`Order Now $${cartTotalPrice.toFixed(2)}`}
        </MainButton>
      )}
    </>
  );
};

const style = StyleSheet.create({
  orderingBtn: {
    width: getScreenWidth() - 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5
  }
})

export default App;
