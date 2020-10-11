import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './Home';
import Pet from './Pet';
import QRScreen from './QRScreen';
import Chat from './Chat';
import Setting from './Setting';
//import Login from '../components/Login';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TabNavigation = createBottomTabNavigator(
    {
        Home:{
            screen:Home,
            navigationOptions: {
                title: 'Home',
                tabBarIcon : ({focused, tintColor}) => <Icon name = 'home' style = {{ color : tintColor}} />
            }
        },
        Pet :{
            screen: Pet,
            navigationOptions : {
                title: 'pet',
                tabBarIcon : ({focused, tintColor}) => <Icon name = 'bell' style = {{ color : tintColor}} />
            }
        },
        QRScreen : {
            screen: QRScreen,
            navigationOptions : {
                title : 'QRCode',
                tabBarIcon : ({focused, tintColor}) => <Icon name = 'qrcode' style = {{color : tintColor}}/>
            }
        },
        Chat :{
            screen: Chat,
            navigationOptions : {
                title : 'Chat',
                tabBarIcon : ({focused, tintColor}) => <Icon name = 'comment' style = {{color : tintColor}}/>
            }
        },
        
    },
    {
        navigationOptions:{
            header:null,
        }
    }
)



const TabNavigator = createAppContainer(TabNavigation);
export default TabNavigator;