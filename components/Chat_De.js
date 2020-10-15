'use strict'
import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Alert
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseApp from './firebaseConfig.js';



class Chat extends Component {
  

  constructor(props) {
    super(props);
  
    var firebaseDB = firebaseApp.database();
    var roomKey = this.props.navigation.state.params.roomKey;
    this.messagesRef = firebaseDB.ref(`messages/${roomKey}`);
    this.state = {
      user: '',
      messages: [],
      name : ''
    }
    
  }



  

  observeAuth = () =>
  firebaseApp.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
   if (!user) {
     try {
      firebaseApp.auth().signInAnonymously();
      } catch ({ message }) {
       alert(message);
      }
   }
  };

  get uid() {
     return (firebaseApp.auth().currentUser || {}).uid;
  }

  get user(){

    if(this.props.navigation.state.params) {
        const name = this.props.navigation.state.params.user_id;
        this.name = name;
    }

    return {
        name: this.name,
        _id : this.uid,
    }
}

  componentDidMount() {
    this.observeAuth();
    this.listenForMessages(this.messagesRef);
    
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name
          }
        }), ...messagesFB];
      });
      this.setState({ messages: messagesFB });
    });
  }

  addMessage(message = {}) {
    var message = message[0]
    this.messagesRef.push({
      text: message.text,
      createdAt: Date.now(),
      user: {
        _id: message.user._id,
        name: message.user.name
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.addMessage.bind(this)}
          user={this.user}
        />
      </View>
    );
  }
}

export default Chat;