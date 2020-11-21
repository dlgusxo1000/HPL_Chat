import React from 'react';
import Login from './Login';
import TabNavigator from './TabNavigator';
import info from './info';
import Pet from './Pet';
import SignUp from './SignUp';
import Push from './Push';
import PetChange from './PetChange';
import Pet_mo_de from './Pet_mo_de';
import Setting from './Setting';
import Chat_De from './Chat_De';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton  } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View,Text} from 'react-native';


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
    screen : Setting,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<HeaderBackButton onPress={() => navigation.navigate("Home")}/>)
  })
  },
  Push : {
    screen : Push
  },
  PetChange : {
    screen : PetChange
  },
  Pet_mo_de : {
    screen : Pet_mo_de
  },
  Chat_De : {
    screen : Chat_De
  }
},
{
  initialRouteName: "Login",

  defaultNavigationOptions:{
    //headerLeft : () => <Icon name='home' color = 'rgb(161,175,210)' size = {20} style={{ paddingLeft:10}}/>,
    headerTitle : ()=> <View style={{flex : 1, 
                             justifyContent: 'center',
                             alignItems: 'center', 
                             alignContent : 'center' }}>
                          <Text style={{fontSize: 20, color: 'white', paddingRight : 0,}}>
                          <Icon name='dog' size= {20} style={{ color : 'white'}}/>HPL</Text>
                       </View>,
    headerStyle : {backgroundColor: 'rgb(161,175,210)'},
    //headerRight :() => <Icon name='home' color = 'rgb(161,175,210)' size = {20} style={{ paddingRight:20}}/>
  }



});
const Navigator = createAppContainer(AppStack);

export default Navigator;
