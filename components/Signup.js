import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import CustomButton from './CustomButton';


class Signup extends Component {

  
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      password: '',
      name: '',
      adress: ''
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

        user_password: this.state.password,

        user_name: this.state.name,

        user_adress: this.state.adress        

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });


  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{fontSize:35,paddingBottom:20}}>
            회원가입
            </Text>
          <View style={{width:"100%",borderBottomWidth:0.5,borderColor:'#444'}} />
        </View>
        <View style={styles.content}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>아이디</Text>
            <TextInput
          
          onChangeText={data => this.setState({ id: data })}
          underlineColorAndroid='transparent'
          style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
        />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>비밀번호</Text>
            <TextInput 
            palceholder = "Password" 
            onChangeText={data => this.setState({ password: data })}
            style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
            />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>이름</Text>
            <TextInput
          
          onChangeText={data => this.setState({ name: data })}
          underlineColorAndroid='transparent'
          style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
        />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}>
            <Text style={{fontSize:15}}>주소</Text>
            <TextInput
          
          onChangeText={data => this.setState({ adress: data })}
          underlineColorAndroid='transparent'
          style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}
        />
          </View>
        </View>
        <View style={styles.footer}>
          <CustomButton
            buttonColor={'white'}
            titleColor = {'black'}
            title={'회원가입'}
            onPress={this.registration_Function}/>

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
    height:'15%',
    //backgroundColor: '#1ad657',
  },
});
export default Signup;