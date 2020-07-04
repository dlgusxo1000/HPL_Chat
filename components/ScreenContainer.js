import Home from './Home';
import Chat from './Chat';
import Login from './Login';
import SignUp from './SignUp';
import QRScreen from './QRScreen';
import Push from './Push';
import info from './info.js';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


const navigator = createStackNavigator({
  
  Login: { screen: Login},
  Home: { screen: Home},
  Chat: { screen: Chat},
  SignUp: { screen: SignUp},
  QRScreen: { screen: QRScreen},
  Push: { screen: Push},
  info: { screen: info, path : "info/:roomKey"},
});
const AppContainer = createAppContainer(navigator);

export default AppContainer;