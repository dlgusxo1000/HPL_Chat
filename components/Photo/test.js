import React,{useRef} from 'react'
import QRCode from 'react-native-qrcode-svg';
import * as Linking from 'expo-linking';
import { captureScreen,  captureRef } from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';
import firebaseApp from './firebaseConfig';
import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';



class QRScreen extends React.Component {
  viewshot = React.createRef();
  qrCode = '';
  state = {
    inputT: '',
    roomKey: this.props.navigation.state.params.roomKey,
    valueForQRCode: 'myapp://info',
    user_id : this.props.navigation.state.params.user_id,
    url : '',
    snapshot : '',
  };


  getTextInputValue = () => {
    const value = 'myapp://info/';
    const temt = value + this.state.roomKey;
    this.setState({ valueForQRCode: temt });
    
  };

  goInfo = () => {
   // this.props.navigation.navigate('info', {roomKey : this.state.roomKey, user_id : this.state.user_id});
   Alert.alert(this.state.roomKey);
  }



  capitureScreen = () => {

    

    captureRef(viewRef, {     
      }).then(
        (uri) => this.setState({ url : uri }),
        error => console.error("Oops, snapshot failed", error)
      );
      console.log(this.state.url);
      this.uploadImage(this.state.url);
   
}

uploadImage = async (uri) => {

 
  const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
  });

  const ref = firebaseApp
      .storage()
      .ref()
      .child(`userImages/${this.state.user_id}+qr`);

  let snapshot = await ref.put(blob);

  return await snapshot.ref.getDownloadURL();
};

  render() {

    return (
      <View style={styles.container}>
        <View style = {styles.div}>
          
          <View style = {styles.content}>
          <ViewShot ref={viewShot} options={{ width: 100, height: 100, format: "jpg", quality: 1.0 }}>
            <View style={{ padding: 10, backgroundColor: '#FFFFFF' }}>
              <QRCode
                value={this.state.valueForQRCode}
                size={200}
                bgColor='#000000'
                fgColor='#FFFFFF'
              />
            </View>
            </ViewShot>
              
     
        
        <TouchableOpacity 
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> QR코드 생성</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.capitureScreen}
          activeOpacity={0.7}
          style={styles.button2}>
          <Text style={styles.TextStyle2}> 저장하기</Text>
        </TouchableOpacity>
        
        </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'rgb(161,175,210)',
    },
    div : {
      backgroundColor : 'white',
      height : '80%',
      marginTop : '19%',
      marginBottom : '0%',
      marginRight : '7%',
      marginLeft : '7%',
      //opacity : 0.5,
  
    },
    content : {
      justifyContent:'center',
      alignItems: 'center',
      alignContent : 'center',
      marginTop : '40%',
    },
    button: {
      width: '65%',
      backgroundColor: 'rgb(62,180,209)',
      height : '20%',
      justifyContent:'center',
      alignItems: 'center',
      alignContent : 'center',
      borderRadius: 9,
      marginTop :'10%',
    },
    button2 : {
      width: '65%',
      backgroundColor: 'white',
      borderColor : 'rgb(62,180,209)',
      height : '20%',
      justifyContent:'center',
      alignItems: 'center',
      alignContent : 'center',
      borderRadius: 9,
      marginTop :'10%',
      borderWidth : 1,

    },
  
    TextStyle: {
      color: '#fff',
      fontSize: 18,
      marginBottom : '5%'
    },
    TextStyle2: {
      color: 'rgb(62,180,209)',
      fontSize: 18,
      marginBottom : '5%'
    },

    input: {
        width: '65%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        textAlign: 'center'
    },

});

export default QRScreen;