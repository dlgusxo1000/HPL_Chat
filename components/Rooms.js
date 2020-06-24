
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  FlatList,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import firebaseApp from './firebaseConfig';
import styles from './Styles.js';

class Rooms extends Component {

  constructor(props) {
    
    super(props);
    
    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');
    this.state = {
      rooms: [],
      newRoom: '',
      user_id: ''
    }
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.on('value', (dataSnapshot) => {
      var roomsFB = [];
      dataSnapshot.forEach((child) => {
        roomsFB.push({
          name: child.val().name,
          key: child.key
        });
      });
      this.setState({ rooms: roomsFB });
    });
  }

  _getName() {
    const {user_id} = this.state;

    if(this.props.navigation.state.params){
      const user_id = this.props.navigation.state.params.user_id;
      this.user_id = user_id;
      
    }
  }

  addRoom() {
    
    this._getName();
    //Alert.alert(this.state.user_id);
    this.roomsRef.push({ name: this.user_id });
    this.setState({ newRoom: '' });
  }

  openMessages(room) {
    this.props.navigation.navigate('Chat', {roomKey: room.key, roomName: room.name});
  }

  renderRow(item) {
    return (
      <TouchableHighlight style={styles.roomLi}
      underlayColor="#fff"
      onPress={() => this.openMessages(item)}
      >
        <Text style={styles.roomLiText}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.roomsContainer}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.roomsHeader}>Chatypus</Text>
        <View style={styles.roomsInputContainer}>
          <TextInput
            style={styles.roomsInput}
            placeholder={"New Room Name"}
            
            onChangeText={(text) => this.setState({newRoom: text})}
            value={this.state.newRoom}
          />
          <TouchableOpacity style={styles.roomsNewButton}
            underlayColor="#fff"
            onPress={() => this.addRoom()}
          >
            <Text style={styles.roomsNewButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.roomsListContainer}>
          <FlatList
            data={this.state.rooms}
            renderItem={({item}) => (this.renderRow(item)
            )}
          />
        </View>
      </View>
    );
  }
}

export default Rooms;