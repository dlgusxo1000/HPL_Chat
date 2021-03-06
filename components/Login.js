import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert, ImageBackground} from 'react-native';
import LoginButton from './LoginButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebaseApp from './firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class Login extends React.Component {


  constructor(props) {
 
    super(props);

    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');
 
    this.state = {
 
      user_id: '',
      user_password: '',
      rooms: [],
 
    }
 
  }
 
  goSignUp = () => {
    
    this.props.navigation.navigate('SignUp');
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

  addRoom() {

    this.roomsRef.orderByChild('name').equalTo(this.state.user_id).once('value', snapshot => {
      if(snapshot.exists()){
        
      }
      else {
        this.roomsRef.push({ name: this.state.user_id });
        
        this.checkRoomkey(this.state.rooms, this.state.user_id);
      }
    })
  }

  checkRoomkey(rooms, user_id){

    for(var i in rooms) {
      if(user_id == rooms[i].name){
        console.log(rooms[i].key);
        this.pushRoomkey(rooms[i].key);
      }
    }
  }

  pushRoomkey = (roomKey) => {
    //Alert.alert(this.state.user_id);
    fetch('http://192.168.43.18/react/pushRoomkey.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          roomKey : roomKey,
          user_id : this.state.user_id

        })

      }).then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
         Alert.alert(responseJson);
        }).catch((error) => {
          console.error(error);
        });

  }


  async signIn() {
   // const { user_id }  = this.state ;

    if (this.state.user_id != '' && this.state.password != '') {
      try {
        await firebaseApp.auth().signInWithEmailAndPassword(this.state.user_id, this.state.user_password);
        console.log(this.state.user_id + ' signed in');
        this.addRoom();
        this.props.navigation.navigate('Home', { 
          user_id: this.state.user_id 
        });
      } catch(error) {
        console.log(error.toString());
        Alert.alert(error.toString());
      }
    }
    else {
      Alert.alert(
        'Invalid Sign In',
        'The Email and Password fields cannot be blank.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
              style = {{ width: "100%", height: "100%" }}
              source = {require("./Photo/background7.jpg")}>
                <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Text style={styles.title}> 
              <Icon name="dog" size={35} color="white" />HPL
            </Text>
          </View>        
          <View style={styles.login}>
            <Text style = {{fontSize:32,
                            paddingBottom:20,
                            color:'white'}}>
                            <Icon name="user" size={30} color="white" />로그인
                            </Text>
            {/*<View style={{width:"100%",borderBottomWidth:1,borderColor:'white'}} />*/}
          </View>
        <View style={styles.content}>
          <View style={{flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        paddingBottom:10}}>
            <Text style={{fontSize:20,color : 'white',fontWeight : "bold"}}>아이디</Text>
            <TextInput 
              style={{
                      width:'70%', 
                      height:35, 
                      borderWidth: 2, 
                      borderRadius: 10, 
                      padding:5, 
                      borderColor :'white'}}
                      onChangeText={user_id => this.setState({user_id})}
            />
          </View>
          <View style={{flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        paddingBottom:10}}>
            <Text style={{fontSize:20,color : 'white', fontWeight : "bold"}}>비밀번호</Text>
            <TextInput 
             style={{
                    width:'70%', 
                    height:35,
                    borderWidth: 2, 
                    borderRadius: 10,
                    padding:5,
                    borderColor :'white'}}
                    secureTextEntry = {true}
                    onChangeText={user_password => this.setState({user_password})}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <LoginButton
            buttonColor={'null'}
            titleColor = {'white'}
            title={'Login'}
            onPress={this.signIn.bind(this)}/>
            <LoginButton
            buttonColor={'null'}
            titleColor = {'white'}
            title={'Sign up'}
            onPress={this.goSignUp}
            />
        </View>
        </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height : '10%',
   // backgroundColor: '#fff',
    alignItems: 'center',
    alignContent : 'center',
    marginBottom : '5%',
  }, 
  title : {
    fontSize : 35,
    fontWeight : "700",
    color : "white",
    marginTop : '6%',
    //marginLeft : '-3%',
  },
  login: {
    flex : 0.23,
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    flex :0.2 ,
    marginTop : '10%',
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20,
   // backgroundColor: '#d6ca1a',
  },
  footer: {
    flex : 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'20%',
    marginTop : '10%',
    //backgroundColor: '#1ad657',
  },
  oror : {
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});
export default Login;