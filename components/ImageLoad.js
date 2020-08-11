import * as React from 'react';
import { Text, Button, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImageLoad extends React.Component {
  state = {
    data : '',
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
        <TouchableOpacity 
            style={styles.button} 
            onPress = {this._pickImage}>
          <Text style = {styles.text}>사진 불러오기</Text>
        </TouchableOpacity >
        
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('이 작업을 수행하려면 카메라 롤 권한이 필요합니다!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri, data : result.data});
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

const styles = StyleSheet.create({
  
  button : {
    marginTop : 10,
    marginBottom : 5,
    borderColor: '#aaa', 
    height:35, 
    borderWidth: 1, 
    borderRadius: 5, 
    padding:5
  },

  text : {
    fontSize: 15,
    fontWeight : "300",
  },
});