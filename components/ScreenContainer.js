import React from 'react';
import Login from './Login';
import TabNavigator from './TabNavigator';
import info from './info';
import Pet from './Pet';
import SignUp from './SignUp';
import Push from './Push';
import PetChange from './PetChange';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View,Text} from 'react-native';
import Setting from './Setting';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const  AppStack = createStackNavigator({
  Login : {
    screen : Login,
  },
  SignUp : {
    screen: SignUp,
  },
  Home : {
    screen : TabNavigator
  },
  Pet : {
    screen : Pet,
  },
  info : {
    screen : info, path : "info/:roomKey"
  },
  Setting : {
    screen : Setting
  },
  Push : {
    screen : Push
  },
  PetChange : {
    screen : PetChange
  }
},
{
  initialRouteName: "Login",
  defaultNavigationOptions:{
    headerLeft: ()=> <Icon name='font-awesome-logo-full' size= {20} style={{ paddingLeft:30}} color ={'rgb(161,175,210)'}/>,
    headerTitle : ()=> (<View style={{alignItems: 'center',flex:1}}><Text style={{fontSize: 17, color: 'white'}}>HPL</Text></View>),
    headerStyle : {backgroundColor: 'rgb(161,175,210)'},
    headerRight:() => <Icon name='font-awesome-logo-full' size = {20}style={{ paddingRight:30}} color ={'rgb(161,175,210)'}/>,
  }
});

const Navigator = createAppContainer(AppStack);

export default Navigator;
