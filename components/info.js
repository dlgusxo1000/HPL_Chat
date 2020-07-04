import React, { Component } from 'react';
import {Text, Image, View, Button, StyleSheet, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';



class info extends Component {

    constructor() {
        super();
        this.state = {
            user_id : 'guest',
            roomKey : ''
        }
    }

    componentDidMount() {
      this.test();
    }

    test = () => {
      if(this.props.navigation.state.params){
        const roomKey = this.props.navigation.state.params.roomKey;
        this.setState({roomKey: roomKey});
      }
    }

    test2 = () => {
      //Alert.alert(this.state.roomKey);
      this.openMessages(this.state.roomKey, this.state.user_id)
    }

    openMessages(roomKey, user_id) {
      
      this.props.navigation.navigate('Chat', {roomKey : roomKey, user_id : user_id});
        
      
    }
    
    render(){

        return(
        <View style ={styles.container}>
        <View style = {styles.content}>
            <Image
            source = {require('../assets/b9a79e1bdc27f0dd1008fd2719aa2287.png')} ></Image>
            <Text>이름</Text>
            <TextInput
            editable ={false}
            ></TextInput>
            <Text>특징</Text>
            <TextInput
            editable = {false}
            multiline ={true}></TextInput>
        </View>
        <View style = {styles.footer}>
            <CustomButton
            buttonColor={'white'}
            titleColor = {'black'}
            title={'채팅하기'}
            onPress={this.test2}
            ></CustomButton>
        </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    header: {
      width:'100%',
      height:'5%',
      //backgroundColor: '#ff9a9a',
    },
    title: {
      width:'100%',
      height:'18%',
      justifyContent: 'center',
      //backgroundColor: '#9aa9ff',
    },
    content: {
      //flex :1 ,
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:20,
     // backgroundColor: '#d6ca1a',
    },
    footer: {
      width:'100%',
      height:'10%',
      //backgroundColor: '#1ad657',
    },
  });
export default info;