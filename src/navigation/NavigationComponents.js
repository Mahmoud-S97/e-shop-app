import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUp/SignUpScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ContactUsScreen from '../screens/ContactUs/ContactUsScreen';
import FeedbackScreen from '../screens/Feedback/FeedbackScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductViewScreen from '../screens/ProductView/ProductViewScreen';
import UserProfileScreen from '../screens/UserProfile/UserProfileScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';

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
  },
  {
    name: 'Checkout',
    component: CheckoutScreen,
    screenOptions: {
      headerShown: false,
      title: 'Order Details'
    }
  },
  {
    name: 'Payment',
    component: PaymentScreen,
    screenOptions: {
      headerShown: false,
      title: 'Payment',
      headerShown: false,
      presentation: 'modal',
      animation: 'slide_from_bottom'
    }
  }
];

const GeneralScreensList = [
  {
    name: 'UserProfile',
    component: UserProfileScreen,
    screenOptions: {
      headerShown: false,
      title: 'User Profile'
    }
  },
  {
    name: 'Feedback',
    component: FeedbackScreen,
    screenOptions: {
      headerShown: false,
      title: 'Feedback'
    }
  },
  {
    name: 'ContactUs',
    component: ContactUsScreen,
    screenOptions: {
      headerShown: false,
      title: 'Contact Us'
    }
  }
]

export { AuthScreensList, HomeScreensList, GeneralScreensList };
