
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import * as Linking from 'expo-linking';


import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
 
class QRScreen extends React.Component {

  state = {
    inputT: '',
    roomKey: '',
    valueForQRCode: 'myapp://info',
    user_id : this.props.navigation.state.params.user_id,
  };

  componentDidMount() {
    if(this.props.navigation.state.params){
      const roomKey = this.props.navigation.state.params.roomKey;
      const user_id = this.props.navigation.state.params.user_id;
      this.setState({roomKey : roomKey, user_id : user_id});
      
      
    }
  }

  getTextInputValue = () => {
    const value = 'myapp://info/';
    const temt = value + this.state.roomKey;
   
    this.setState({ valueForQRCode: temt });
    
  };
 
  goInfo = () => {
    this.props.navigation.navigate('info', {roomKey : this.state.roomKey, user_id : this.state.user_id});
  // Alert.alert(this.state.user_id);
  }

  render() {
    return (
      <View style={styles.container}>
        
        

        <QRCode
          
          value={this.state.valueForQRCode}
          size={200}
          bgColor='#000000'
          fgColor='#FFFFFF'/>

        <TouchableOpacity 
          onPress={this.goInfo}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> QR코드 생성</Text>
        </TouchableOpacity>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
      width: '65%',
      height: '10%',
      backgroundColor: 'blue',
      margin: 10,
      borderRadius: 5,
      padding: 5,
    },
  
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 30,
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