import Home from './Home';
import Chat from './Chat';
import Login from './Login';
import Signup from './Signup';
import QRScreen from './QRScreen';
import Push from './Push';
import Rooms from './Rooms';

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
  Signup: { screen: Signup},
  QRScreen: { screen: QRScreen},
  Rooms: { screen: Rooms},
  Push: { screen: Push},
});
const AppContainer = createAppContainer(navigator);

export default AppContainer;