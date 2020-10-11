import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground,
  TouchableOpacity, 
  Alert, 
  BackHandler,
  ToastAndroid} from 'react-native';
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

  componentWillUnmount(){
    this.exitApp = false;
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton);
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
  }

  handleBackButton = () =>{
    if(this.exitApp == undefined || !this.exitApp){
      ToastAndroid.show('한번 더 누르시면 종료됩니다.',ToastAndroid.SHORT);
      this.exitApp = true;

      this.timeout = setTimeout(
        ()=> {
          this.exitApp = false;
        },
        2000
      );
    } else {
      clearTimeout(this.timeout);

      BackHandler.exitApp();
    }
    return true;
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
    this.props.navigation.navigate('Pet', {user_id : this.state.user_id});
     
    onPress1 = () =>
     this.props.navigation.navigate('Login');

     onPress2 = () =>
     this.props.navigation.navigate('Signup');
     
     onPress3 = () => {
      this.goQrscreen(this.state.rooms, this.state.user_id);
     }
     
     onPress4 = () =>
     this.props.navigation.navigate('Setting', {user_id : this.state.user_id});

     render(){
      
      const screenProps = {
        user_id : this.state.user_id
      }

      return (
        <View style={styles.container}>
          
          <ImageBackground
                style = {{ width: "100%", height: "100%" }}
                source = {require("./Photo/background7.jpg")}>
  
          <View style={styles.header}>
            <Text style={styles.title}> <Icon name="dog" size={35} color="white" />HPL</Text>
  
          </View>
          
        <View style={styles.buttonHeight}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.onPress3} style={styles.buttonGroup}>
              <View>
                <Icon name="qrcode" size={75} color="white" /> 
                <Text style={styles.imagetext}>QR코드 생성</Text>
  
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this.onPress} 
              style={styles.buttonGroup}>
              <View>
                <Icon name="comments" size={75} color="white" /> 
                <Text style={styles.imagetext}>채팅방 입장</Text>
  
              </View>
            </TouchableOpacity>
          </View>
  
          <View style={{flex: 1, flexDirection: 'row'}}>
  
            <TouchableOpacity 
            onPress={this.onPress4} 
            style={styles.buttonGroup}>
              <View>
                <Icon name="bell" size={75} color="white" /> 
                <Text style={styles.imagetext}>Push 알림</Text>
  
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity 
            onPress={() => this.addRoom()} 
            style = {styles.buttonGroup}>
              <View >
                <Icon name="comment" size={75} color="white" /> 
                <Text style={styles.imagetext}>채팅방 생성</Text>
              </View>
            </TouchableOpacity>
          </View>
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
      height :430,
    },
    header: {
      height : '10%',
     // backgroundColor: '#fff',
      alignItems: 'center',
      alignContent : 'center',
      marginBottom : '5%',
    }, 
    title : {
      fontSize : 30,
      fontWeight : "700",
      color : "white",
      marginTop : '6%',
      //marginLeft : '-3%',
    },
    
    buttonGroup : {
      flex: 1, 
      height: 200, 
      borderWidth: 1,
      borderRadius : 15,
      borderColor : 'white',
      alignItems : 'center',
      justifyContent : 'center',    
      margin : 5,
  
    },
    imagetext : {
      fontSize : 15,
      color : "blue",
      fontWeight : "700",
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
  
  });
  
  export default Home;