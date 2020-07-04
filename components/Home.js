import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  
  TouchableOpacity, 
  Alert } from 'react-native';

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
    
    //this._getName();
    //Alert.alert(this.state.user_id);
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

  goPush(rooms, user_id) {
    for(var i in rooms){
      if(user_id == rooms[i].name){
        console.log(rooms[i].key);
        this.props.navigation.navigate('QRScreen', {roomKey : rooms[i].key});
      }
    }
    
  }
  
    
    onPress = () =>
     this.props.navigation.navigate('Chat');
     
    onPress1 = () =>
     this.props.navigation.navigate('Login');
     onPress2 = () =>
     this.props.navigation.navigate('Signup');
     onPress3 = () => {
      this.goPush(this.state.rooms, this.state.user_id);
     }
     
     onPress4 = () =>
     this.props.navigation.navigate('Push');

  render(){

    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>HPL</Text>
        </View>

        <View style = {styles.section1}>
          <TouchableOpacity onPress={this.onPress3}>
            <Image 
              source ={{uri : 'https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png',}}
              style = {styles.ImageIcon1}>                  
            </Image>
            <Text style = {styles.imagetext}>
              QR code를 통해 간편하게 반려동물의 정보를 등록할 수 있습니다
            </Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.section2}>
        <TouchableOpacity onPress={this.test}>
            <Image 
              source ={{uri : 'https://cdn.icon-icons.com/icons2/858/PNG/512/chat_without_content_v2_icon-icons.com_67752.png',}}
              style = {styles.ImageIcon2}>                  
            </Image>
            <Text style = {styles.imagetext}>
              발견자와의 1:1 채팅이 가능합니다
            </Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.section3}>
        <TouchableOpacity onPress={this.onPress4}>
            <Image 
              source ={{uri : 'https://cdn.icon-icons.com/icons2/1997/PNG/512/alarm_alert_bell_notification_ring_icon_123294.png',}}
              style = {styles.ImageIcon3}>                  
            </Image>
            <Text style = {styles.imagetext}>
              푸쉬 알림을 통해 인근 지역의 회원에게 알림메시지
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}
              hide = {this.state.setHide}>
        <TouchableOpacity 
            style={styles.button}
            backgroundColor='#fff'
            onPress={() => this.addRoom()}
            >
            <Text style ={styles.title1}>
                방 생성
            </Text>
            </TouchableOpacity>
        </View>
        
        
            <TouchableOpacity 
            style={styles.button}
            backgroundColor='#fff'
            onPress={this.onPress2}>
            <Text style ={styles.title1}>
                회원가입
            </Text>
            </TouchableOpacity>
        


      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: '#fff',
    flexDirection : 'column',
  
  },

  header: {
    height : '20%',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent : 'center',
    
  }, 

  section1: {
    height : '20%',
    backgroundColor : '#fff',
    alignItems : 'center',
    alignContent : 'center',
    flexDirection : 'row',
    borderWidth : 0.5,
    borderColor : 'black'
    
  },

  section2: {
    height : '20%',
    backgroundColor : '#fff',
    alignItems : 'center',
    alignContent : 'center',
    flexDirection : 'row',
    borderWidth : 0.5,
    borderColor : 'black'
  },

  section3: {
    height : '20%',
    backgroundColor : '#fff',
    alignItems : 'center',
    alignContent : 'center',
    flexDirection : 'row',
    borderWidth : 0.5,
    borderColor : 'black'
  },


  ImageIcon1 : {
    alignItems : 'center',
    alignContent : 'center',
    width : '70%',
    height : '70%',
    resizeMode : 'contain',
    marginLeft : '15%'
  },  

  ImageIcon2 : {
    alignItems : 'center',
    alignContent : 'center',
    width : '70%',
    height : '70%',
    resizeMode : 'contain',
    marginLeft : '52%'
  }, 

  ImageIcon3 : {
    alignItems : 'center',
    alignContent : 'center',
    width : '70%',
    height : '70%',
    resizeMode : 'contain',
    marginLeft : '25%'
  }, 

  footer: {
    height : '20%',
    width : '100%',
    backgroundColor : '#fff',
    alignItems : 'center',
    alignContent : 'center',
  },

  title : {
    fontSize : 30,
    fontWeight : "700",
    color : "black",
    padding : 55,
  },
  imagetext : {
    fontSize : 15,
    color : "blue",
    fontWeight : "700",

  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
    width : '100%',
    marginTop : 15,
    borderWidth : 2,
    borderColor : 'black'
  },

  title1: {
    fontSize: 25,
    fontWeight : "bold",
    
  },

});

export default Home;