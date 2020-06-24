
import React from 'react'
import QRCode from 'react-native-qrcode-svg';


import {
    
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
 
class QRScreen extends React.Component {

  state = {
    inputT: '',
    valueForQRCode: 'https://www.choolab.com',
  };

  getTextInputValue = () => {

    this.setState({ valueForQRCode: this.state.inputT });
  };
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={(text) => this.setState({inputT: text})}
          value={this.state.inputT}
        />

        <TouchableOpacity
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> QR코드 생성 </Text>
        </TouchableOpacity>

        <QRCode
          
          value={this.state.valueForQRCode}
          size={200}
          bgColor='#000000'
          fgColor='#FFFFFF'/>

          
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
      
      backgroundColor: 'blue',
      margin: 10,
      borderRadius: 5,
      padding: 5,
    },
  
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
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