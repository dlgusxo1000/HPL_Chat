import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_REGISTRATION_ENDPOINT = 'http://8ed2511faddc.ngrok.io/token';
const MESSAGE_ENPOINT = 'http://8ed2511faddc.ngrok.io/message';

export default class Push extends React.Component {
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      notification: null,
      messageText: '',
      adress: ''
 
    }
 
  }

 // Defined in following steps

 registerForPushNotificationsAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  // Defined in following steps
  return fetch(PUSH_REGISTRATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'warly',
        name: 'Dan Ward'
      },
    }),
  });

   this.notificationSubscription = Notifications.addListener(this.handleNotification);
}
handleNotification = (notification) => {
  this.setState({ notification });
}

componentDidMount() {
  this.registerForPushNotificationsAsync();
}

handleChangeText = (text) => {
  this.setState({ 
    messageText: text,
    
  });
}

/*sendMessage = async () => {
  fetch(MESSAGE_ENPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: this.state.messageText,
    }),
  });
  this.setState({ messageText: '' });
}*/

checkAddress = () => {

  const { adress }  = this.state ;
  
 fetch('http://192.168.43.18/react/push_notification.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    user_adress: adress
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        
        if(responseJson === 'Data Matched')
        {
          Alert.alert('로그인 성공');

        }
        else{
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        console.error(error);
      });
 
 
 
}

render() {
  return (
    <View style={styles.container}>
      <TextInput
        //value={this.state.messageText}
        
        onChangeText={adress => this.setState({adress})}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={this.checkAddress}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {this.state.notification ?
        this.renderNotification()
      : null}
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  button: {
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  label: {
    fontSize: 18
  }
});
