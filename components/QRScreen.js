
import React from 'react'
import QRCode from 'react-native-qrcode-svg';


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
  };

  componentDidMount() {
    if(this.props.navigation.state.params){
      const roomKey = this.props.navigation.state.params.roomKey;
      this.setState({roomKey: roomKey});
      
    }
  }

  getTextInputValue = () => {
    const value = 'myapp://info/';
    const temt = value + this.state.roomKey;
   
    this.setState({ valueForQRCode: temt });
    
  };
 
  render() {
    return (
      <View style={styles.container}>
        
        

        <QRCode
          
          value={this.state.valueForQRCode}
          size={200}
          bgColor='#000000'
          fgColor='#FFFFFF'/>

        <TouchableOpacity 
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> QR코드 생성 </Text>
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