import React, { useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import * as Linking from 'expo-linking';
import {captureRef} from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';


function Capture () {

    const cardRef = useRef();
  
    const saveAsImage = async () => {
      try {
        const result = await captureRef(cardRef, {
          result: "tmpfile",
          quality: 1,
          format: "png",
        });
        MediaLibrary.saveToLibraryAsync(result);
      } catch (e) {
        console.log(e);
      }
    };
    if(cardRef) {
      return <TouchableOpacity
          onPress={() => {saveAsImage();}}
          activeOpacity={0.7}
          style={{
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
            
    }}>  
          <Text style={styles.TextStyle2}> 저장하기</Text>
      </TouchableOpacity>
    }

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

  export default Capture;