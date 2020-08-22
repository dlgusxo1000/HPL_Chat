import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  Alert,
  ImageBackground} from 'react-native';
import Singupbutton from './Singupbutton';
import firebaseApp from './firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class SignUp extends Component {

  
    constructor(props) {
      super(props);
 

      this.state = {
        id: '',
        password: '',
        name: '',
        address: '',
        phone: '',
     
      }
    }
  
   
  

    registration_Function = () => {

      fetch('http://192.168.43.18/react/registration_api.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          user_id: this.state.id,

          user_name: this.state.name,

          user_address: this.state.address,
          
          user_phone: this.state.phone 

        })

      }).then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          //Alert.alert(responseJson);
        }).catch((error) => {
          console.error(error);
        });


    }

    async signUp() {
      if (this.state.id != '' && this.state.password != '') {
        try {
          await firebaseApp.auth().createUserWithEmailAndPassword(this.state.id, this.state.password);
          console.log(this.state.id + ' signed up');
          this.props.navigation.navigate('Login');

          this.registration_Function();
        
        } catch(error) {
          console.log(error.toString());
          Alert.alert(error.toString());
        }
      }
      else {
        Alert.alert(
          'Invalid Sign Up',
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
            <Text style={{fontSize:32,
                          paddingBottom:20,
                          color : 'white'}}><Icon name="user-plus" size={35} color="white" />Sing Up</Text>
            {/*<View style={{width:"100%",
                          borderBottomWidth:0.5,
            borderColor:'white'}} />*/}
          </View>
          <View style={styles.content}>
            <View style={{flexDirection:'row',
                          justifyContent:'space-between',
                          alignItems:'center',
                          paddingBottom:10}}>
              <Text style={{fontSize:20,
                            color : 'white',
                            fontWeight : "bold"}}>ID</Text>
              <TextInput 
                style={{borderColor: '#aaa',
                        width:'70%',
                        height:35, 
                        borderWidth: 2,
                        borderRadius: 10, 
                        borderColor : 'white',
                        padding:5}}
                onChangeText={data => this.setState({ id: data})}
              />
            </View>
            <View style={{flexDirection:'row',
                          justifyContent:'space-between',
                          alignItems:'center',
                          paddingBottom:10}}>
              <Text style={{fontSize:20,
                            color : 'white',
                            fontWeight : "bold"}}>Password</Text>
              <TextInput 
                style={{borderColor: '#aaa', 
                        width:'70%', 
                        height:35, 
                        borderWidth: 2, 
                        borderRadius: 10, 
                        borderColor : 'white',
                        padding:5}}
                onChangeText={data => this.setState({password : data})}
              />
            </View>
            <View style={{flexDirection:'row',
                          justifyContent:'space-between',
                          alignItems:'center',
                          paddingBottom:10}}>
              <Text style={{fontSize:20,
                            color : 'white',
                            fontWeight : "bold"}}>Name</Text>
              <TextInput 
                style={{borderColor: '#aaa', 
                        width:'70%', 
                        height:35, 
                        borderWidth: 2, 
                        borderRadius: 10, 
                        borderColor : 'white',
                        padding:5}}
                onChangeText={data => this.setState({name : data})}
              />
            </View>
            <View style={{flexDirection:'row',
                          justifyContent:'space-between',
                          alignItems:'center',
                          paddingBottom:10}}>
              <Text style={{fontSize:20,
                            color : 'white',
                            fontWeight : "bold"}}>Address</Text>
              <TextInput 
                style={{borderColor: '#aaa', 
                        width:'70%',
                        height:35,
                        borderWidth: 2, 
                        borderRadius: 10, 
                        borderColor : 'white',
                        padding:5}}
                onChangeText={data => this.setState({address : data})}
              />
            </View>
            <View style={{flexDirection:'row',
                          justifyContent:'space-between',
                          alignItems:'center',
                          paddingBottom:10}}>
              <Text style={{fontSize:20,
                            color : 'white',
                            fontWeight : "bold"}}>Phone</Text>
              <TextInput 
                style={{borderColor: '#aaa', 
                        width:'70%',
                        height:35,
                        borderWidth: 2, 
                        borderRadius: 10, 
                        borderColor : 'white',
                        padding:5}}
                onChangeText={data => this.setState({phone : data})}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Singupbutton
              buttonColor={'null'}
              titleColor = {'white'}
              title={'Sign up'}
              onPress={this.signUp.bind(this)}/>
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
      //padding : 10,
      backgroundColor: 'white',
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
      flex : 0.25,
      width:'100%',
      height:'18%',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop : '10%', 
      //backgroundColor: '#9aa9ff',
    },
    content: {
      flex :0.25 ,
      paddingLeft:10,
      paddingRight:10,
      marginTop : '7%',
      paddingBottom:100,
    // backgroundColor: '#d6ca1a',
    },
    footer: {
      marginBottom : '45%',
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#1ad657',
    },
  });
  export default SignUp;