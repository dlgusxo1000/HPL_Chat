import React, { Component } from 'react';
import {Text, Image, View, Button, StyleSheet, Alert, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';
import firebaseApp from './firebaseConfig';
import PetButton from './PetButton';


class info extends Component {

    constructor(props) {
      
        super(props);

        var firebaseDB = firebaseApp.database();
        this.roomsRef = firebaseDB.ref('rooms');
        this.state = {
            user_id : '',
            guest_id : 'guest',
            roomKey : this.props.navigation.state.params.roomKey,
            pet_id : '',
            pet_name : '',
            pet_age : '',
            pet_kind : '',
            pet_add : '',
            data : [],
            uri : null
        }

        this.pet_info = this.pet_info.bind(this);
    }

    pet_info = (user_id) => {
     
      fetch('http://192.168.43.18/react/search_pet.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          pet_id : user_id,
  
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
      
      
      this.getUser();

    }

    getImage = (user_id) => {
      
      let imgRef = firebaseApp.storage().ref('userImages/' + user_id);
      imgRef.getDownloadURL().then((url) => {
        this.setState({uri : url});
      })
    }
    
    getData(data) {
      this.setState({
        pet_name : data[1],
        pet_age : data[2],
        pet_kind : data[3],
        pet_add : data[4]

      })
    }

    getUser(){
      
        const {roomKey} = this.state;  
        
        fetch('http://192.168.43.18/react/search_user.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
  
            roomKey : roomKey
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            
            
            this.pet_info(responseJson);
            this.getImage(responseJson);

          }).catch((error) => {
            console.error(error);
          });
          
            
    }
    
    Chat = () => {
      
      this.openMessages(this.state.roomKey, this.state.guest_id)

  
    }

    openMessages(roomKey, guest_id) {
      
      this.props.navigation.navigate('Chat', {roomKey : roomKey, user_id : guest_id});
        
      
    }
    
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.header}></View>
          <Image style={styles.avatar} 
                 source={{uri: this.state.uri}} >  
          </Image>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={{ paddingBottom:'0.2%',
                              paddingTop : '3%',}}>
                  <Text style={{fontSize:13,
                                  color : 'gray',
                                  fontWeight : "bold"}}>이름</Text>
              </View>
              <View style={{ paddingBottom: '0.1%'}}>
                  <TextInput style = {{ fontSize : 20,
                                      color : 'black',
                                      fontWeight : '700'}}
                             value = {this.state.pet_name}
                             editable ={false}></TextInput>
              </View>
  
              <View style = {{borderWidth : 0.4,
                              borderColor : 'gray',
                              width : '90%',
                              paddingBottom : 0,}}>
              </View>
  
              <View style={{ paddingBottom:'0.2%',
                              paddingTop : '3%',}}>
                  <Text style={{fontSize:13,
                                  color : 'gray',
                                  fontWeight : "bold"}}>나이</Text>
              </View>
  
              <View style={{ paddingBottom:'0.1%'}}>
                  <TextInput style = {{ fontSize : 20,
                                      color : 'black',
                                      fontWeight : '700'}}
                             value = {this.state.pet_age}
                             editable ={false}></TextInput>
              </View>
  
              <View style = {{borderWidth : 0.4,
                              borderColor : 'gray',
                              width : '90%',
                              paddingBottom : 0,}}>
              </View>
  
              <View style={{ paddingBottom:'0.2%',
                              paddingTop : '3%'}}>
                  <Text style={{fontSize:13,
                                  color : 'gray',
                                  fontWeight : "bold"}}>견종 / 묘종</Text>
                  </View>
              <View style={{ paddingBottom:'0.1%'}}>
                  <TextInput style = {{ fontSize : 20,
                                      color : 'black',
                                      fontWeight : '700'}}
                             value = {this.state.pet_kind}
                             editable ={false}></TextInput>
              </View>
  
              <View style = {{borderWidth : 0.4,
                              borderColor : 'gray',
                              width : '90%',
                              paddingBottom : 0,}}>
              </View>
  
              <View style={{ paddingBottom:'0.2%',
                              paddingTop : '3%'}}>
                  <Text style={{fontSize:13,
                                  color : 'gray',
                                  fontWeight : "bold"}}>특징</Text>
              </View>
  
              <View style = {{borderWidth : 0.4,
                              borderColor : 'gray',
                              width : '90%',
                              paddingBottom : 72,}}>
                      
                      <TextInput style = {{ fontSize : 15,
                                      color : 'black',
                                      fontWeight : '700'}}
                                 value = {this.state.pet_add}
                                 editable ={false}></TextInput>
                    
              </View>
             </View>

          </View>
          <View style = {styles.footer}>
            <PetButton
                buttonColor={'null'}
                titleColor = {'black'}
                title={'주인과 채팅하기'}
                onPress = {this.Chat}>   
            </PetButton>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    header:{
      backgroundColor: "rgb(161,175,210)",
      height:200,
      
    },
    container : {
      flex :1,
    },
    avatar: {
      width: 180,
      height: 180,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:10
    },
    font:{
      color : "black",
      fontSize : 40,
      fontWeight : '700',
    },
    body:{
      marginTop:20,
    },
    bodyContent: {
      
     // marginTop : '10%',
      paddingLeft:25,
      paddingRight:10,
      paddingBottom:20,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
  
    footer: {
      marginLeft  : '40%',

      height : 55,
      width:'60%',
  
      //backgroundColor: '#1ad657',
    },
  });
  export default info;