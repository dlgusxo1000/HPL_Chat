import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { captureScreen } from "react-native-view-shot";
export default class App extends Component {
  constructor(){
    super();
    this.state={
      //initial image to the <Image>
      imageURI : 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
    }
  }
  takeScreenShot=()=>{
    //handler to take screnshot
    captureScreen({
      //either png or jpg or webm (Android). Defaults to png
      format: "jpg",
      //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
      quality: 0.8
    })
    .then(
      //callback function to get the result URL of the screnshot
      uri => this.setState({ imageURI : uri }),
      error => console.error("Oops, Something Went Wrong", error)
    );
  }
  render() {
    return (
      <View style={styles.MainContainer}>
          <Text style={{fontSize:20}}>Click on Button Below to Take ScreenShot</Text>
          <Image 
              source={{uri : this.state.imageURI}} 
              style={{width: 200, height: 300, resizeMode: 'contain', marginTop: 5}} />
          <Button title="Take Screenshot" onPress={this.takeScreenShot} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  }
});