import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  Button,
  ImageButton, 
  TouchableOpacity,
  Alert, 
  ImageBackground, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import firebaseApp from './firebaseConfig';

class Home extends React.Component {
    
  constructor(props) {
    super(props);
    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');

    this.state = {
      rooms: [],
      user_id : this.props.navigation.state.params.user_id,
      
    }
    this.openMessages = this.openMessages.bind(this);
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.on('value', (dataSnapshot) => {
      var roomsFB = [];
      dataSnapshot.forEach((child) => {
        roomsFB.push({
          name: child.val().name,
          key: child.key
        });
      });
      this.setState({ rooms: roomsFB });
    });
  }
  
  _getName() {
    //const {user_id} = this.state;

    if(this.props.navigation.state.params){
      const user_id = this.props.navigation.state.params.user_id;
      this.setState({user_id: user_id});
      
    }
  }


  addRoom() {

    this.roomsRef.orderByChild('name').equalTo(this.state.user_id).once('value', snapshot => {
      if(snapshot.exists()){
        
        this.openMessages(this.state.rooms, this.state.user_id);
      
      }
      else {
        this.roomsRef.push({ name: this.state.user_id });
        
      }
    })
  }

  openMessages(rooms, user_id) {
    for(var i in rooms){
      if(user_id == rooms[i].name){
        console.log(rooms[i].key);
        this.props.navigation.navigate('Chat', {roomKey : rooms[i].key, roomName : rooms[i].key, user_id : user_id});
      }
    }
  }

  goQrscreen(rooms, user_id) {
    for(var i in rooms){
      if(user_id == rooms[i].name){
        console.log(rooms[i].key);
        this.props.navigation.navigate('QRScreen', {roomKey : rooms[i].key, user_id : user_id});
      }
    }
    
  }
  
    
    onPress = () =>
    this.goQrscreen(this.state.rooms, this.state.user_id);
    
    
    onPress1 = () =>
    this.props.navigation.navigate('Pet', {user_id : this.state.user_id});



  render(){

    return (
      <View style={styles.container}>
        <ImageBackground
              style = {{ 
                width: "100%", 
                height: "100%" }}
              source = {require("./Photo/petbackground.png")}>

          <View style={styles.header}>
            <Text style={styles.title2}> 
            <Icon 
              name="dog" 
              size={40} 
              color="white" />HPL</Text>
          </View>
          
          <View style={styles.buttonHeight}>

              <TouchableOpacity 
                onPress={this.onPress} 
                style={styles.buttonGroup}>
                <View style={{
                          flex: 1, 
                          flexDirection: 'row',
                          alignItems : 'center'}}>
                  <View style = {{
                    flex : 0.3,
                    marginLeft : '5%',
                  }}>
                    <Text style={styles.imagetext}>
                    <Icon name="qrcode" size={50} color="white"  /></Text>
                  </View>
                  <View style = {{ flex : 0.6 }}>
                    <Text style={styles.imagetext}>QR CODE 생성</Text>
                  </View>
                  <View style = {{ flex : 0.1}}>
                  <Icon name='chevron-right' color = 'white' size = {20} style = {{marginRight : '2%'}}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={this.onPress1} 
                style={styles.buttonGroup}>
                <View style={{
                          flex: 1, 
                          flexDirection: 'row',
                          alignItems : 'center'}}>
                  <View style = {{
                    flex : 0.3,
                    marginLeft : '5%',
                  }}>
                    <Text style={styles.imagetext}>
                    <Icon name="comments" size={50} color="white"  /></Text>
                  </View>
                  <View style = {{ flex : 0.6 }}>
                    <Text style={styles.imagetext}>펫 정보 입력</Text>
                  </View>
                  <View style = {{ flex : 0.1}}>
                  <Icon name='chevron-right' color = 'white' size = {20} style = {{marginRight : '2%'}}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => this.addRoom()} 
                style={styles.buttonGroup}>
                <View style={{
                          flex: 1, 
                          flexDirection: 'row',
                          alignItems : 'center'}}>
                  <View style = {{
                    flex : 0.3,
                    marginLeft : '5%',
                  }}>
                    <Text style={styles.imagetext}>
                    <Icon name="comment" size={50} color="white"  /></Text>
                  </View>
                  <View style = {{ flex : 0.6 }}>
                    <Text style={styles.imagetext}>채팅방 입장</Text>
                  </View>
                  <View style = {{ flex : 0.1}}>
                  <Icon name='chevron-right' color = 'white' size = {20} style = {{marginRight : '2%'}}/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

        </ImageBackground>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex :1,
  },
  buttonHeight : {
    height :'60%',
 // borderWidth : 1,
  // alignItems: 'center',
  alignContent : 'center',
  justifyContent : 'center', 
  marginBottom : '0%',
  },
  header: {
    height : '20%',
    marginTop : '11%',
  // backgroundColor: '#fff',
    alignItems: 'center',
    alignContent : 'center',
    justifyContent : 'center', 
    //borderWidth : 1,
    
  // backgroundColor : 'rgb(161,175,210)',
  }, 
  
  title2 : {
    fontSize : 40,
    fontWeight : "700",
    color : "white",
    alignItems : 'center',
    justifyContent : 'center', 
  
    //marginLeft : '-3%',
  },
  
  buttonGroup : {
    
    height: '25%', 
    borderWidth: 0.6,
    borderRadius : 15,
    borderColor : 'rgb(161,175,210)' ,
    margin : 5,
    alignContent : 'center',
    justifyContent : 'center',
    backgroundColor : 'rgb(161,175,210)',

  },
  imagetext : {
    fontSize : 23,
    color : 'white',
    fontWeight : "700",
    marginLeft : '5%',
    
  },

  footer: {
    height : '20%',
    width : '100%',
    //backgroundColor : '#fff',
    alignItems : 'center',
    alignContent : 'center',
    marginTop : '5%',
  },


  title1: {
    fontSize: 25,
    fontWeight : "bold",
    
  },
  sb : {
    marginTop : '30%',
  },
  sbbutton : {
    flexDirection : 'row',
    alignContent : 'center',
    alignItems : 'center',
    justifyContent : 'center',
    flex : 0.2,
    borderWidth : 1,
    height : 50,
    borderRadius : 79,
        },
  div : {
    flex : 1,
    backgroundColor : "white",
    width : '80%',
    height : '50%',
    alignContent : 'center',
    alignItems : 'center',
    justifyContent : 'center',
    margin : '10%',

  }

});

export default Home;