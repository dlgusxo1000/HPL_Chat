import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import CustomButton from './CustomButton';
import firebaseApp from './firebaseConfig';



class Login extends Component {

  

  constructor(props) {
 
    super(props)
 
    this.state = {
 
      user_id: '',
      user_password: '',
      isLoaded : false
      
    }
 
  }
  
  
  
  goSignup = () => {
    
    this.props.navigation.navigate('SignUp');
  }
 
UserLoginFunction = () =>{

  
 
 const { user_id }  = this.state ;
 const { user_password }  = this.state ;
 
 
fetch('http://192.168.43.18/react/login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    user_id: user_id,
 
    user_password: user_password
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        { 
          this.props.navigation.navigate("Chat",  {
            user_id: user_id,
         });
          this.props.navigation.navigate("Home", {
            user_id: user_id,
          });
          this.props.navigation.navigate("Rooms", {
            user_id: user_id,
          });

          this.props.navigation.navigate('Home');
          
        }
        else{
          Alert.alert(responseJson);
        }
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
        

        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{fontSize:35,paddingBottom:20}}>로그인</Text>
          <View style={{width:"100%",borderBottomWidth:0.5,borderColor:'#444'}} />
        </View>
        <View style={styles.content}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>아이디</Text>
            <TextInput 
            style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
            onChangeText={user_id => this.setState({user_id})}
            />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>비밀번호</Text>
            <TextInput 
            style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
            onChangeText={user_password => this.setState({user_password})}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <CustomButton
            buttonColor={'white'}
            titleColor = {'black'}
            title={'로그인'}
            onPress={this.signIn.bind(this)}/>
        </View>
        <View style={styles.footer}>
          <CustomButton
            buttonColor={'white'}
            titleColor = {'black'}
            title={'회원가입'}
            onPress={this.goSignup}/>
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
export default Login;