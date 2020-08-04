import React, { Component } from 'react';
import {Text, Image, View, Button, StyleSheet, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';



class info extends Component {

    constructor() {
        super();
        this.state = {
            user_id : '',
            guest_id : 'guest',
            roomKey : '',
            pet_id : '',
            pet_name : '',
            pet_age : '',
            pet_kind : '',
            pet_add : '',
            data : []
        }
    }

    pet_info = () => {

      fetch('http://192.168.43.18/react/search_pet.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          pet_id : this.state.user_id,
  
        })
  
      }).then((response) => response.json())
        .then((responseJson) => {
          
          this.setState({ data: responseJson });
          this.getData(this.state.data);
        }).catch((error) => {
          console.error(error);
        });
  
  
    }

    componentDidMount() {
      
      this.pet_info();
    }

    componentWillMount(){
      this.test();
    }
  
    
    getData(data) {
      this.setState({
        pet_name : data[1],
        pet_age : data[2],
        pet_kind : data[3],
        pet_add : data[4]

      })
    }

    test = () => {
      if(this.props.navigation.state.params){
        const roomKey = this.props.navigation.state.params.roomKey;
        const user_id = this.props.navigation.state.params.user_id;
        this.setState({
          roomKey: roomKey, 
          user_id: user_id});
      }
    }

    test2 = () => {
      //Alert.alert(this.state.roomKey);
      this.openMessages(this.state.roomKey, this.state.guest_id)

      //Alert.alert(this.state.data[1]);
    }



    openMessages(roomKey, guest_id) {
      
      this.props.navigation.navigate('Chat', {roomKey : roomKey, user_id : guest_id});
        
      
    }
    
    render(){

        return(
        <View style ={styles.container}>
        <View style = {styles.content}>
            <Image
            source = {require('../assets/b9a79e1bdc27f0dd1008fd2719aa2287.png')} ></Image>
            <Text>이름</Text>
            <TextInput
            value = {this.state.pet_name}
            editable ={false}
            ></TextInput>
            <Text>나이</Text>
            <TextInput
            value = {this.state.pet_age}
            editable ={false}
            ></TextInput>
            <Text>견종 / 묘종</Text>
            <TextInput
            value = {this.state.pet_kind}
            editable ={false}
            ></TextInput>
            <Text>특징</Text>
            <TextInput
            value = {this.state.pet_add}
            editable = {false}
            multiline ={true}
            ></TextInput>
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