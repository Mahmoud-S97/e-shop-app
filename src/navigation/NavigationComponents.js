import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUp/SignUpScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ContactUs from '../screens/ContactUs/ContactUs';
import Feedback from '../screens/Feedback/Feedback';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductViewScreen from '../screens/ProductView/ProductViewScreen';
import UserProfile from '../screens/UserProfile/UserProfile';

const AuthScreensList = [
  {
    name: 'Login',
    component: LoginScreen,
    screenOptions: {
      headerShown: false,
      title: 'Login'
    }
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    screenOptions: {
      headerShown: true,
      title: 'Sign Up'
    }
  }
];

const HomeScreensList = [
  {
    name: 'Home',
    component: HomeScreen,
    screenOptions: {
      headerShown: false,
      title: 'Home'
    }
  },  
  {
    name: 'ProductView',
    component: ProductViewScreen,
    screenOptions: {
      headerShown: false, // The customized header will be shown!
      title: 'Product View' // The title is default and will be customized by the product's name!
    }
  },
  {
    name: 'Cart',
    component: CartScreen,
    screenOptions: {
      headerShown: false,
      title: 'Cart'
    }
  }
];

const GeneralScreensList = [
  {
    name: 'UserProfile',
    component: UserProfile,
    screenOptions: {
      headerShown: false,
      title: 'User Profile'
    }
  },
  {
    name: 'Feedback',
    component: Feedback,
    screenOptions: {
      headerShown: false,
      title: 'Feedback'
    }
  },
  {
    name: 'ContactUs',
    component: ContactUs,
    screenOptions: {
      headerShown: false,
      title: 'Contact Us'
    }
  }
]

export {AuthScreensList, HomeScreensList, GeneralScreensList};
