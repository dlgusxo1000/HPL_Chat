import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component{
  static defaultProps = {
    title: '빈칸',
    buttonColor: 'white',
    titleColor: 'black',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity style={[
        styles.button,
        {backgroundColor: this.props.buttonColor}
      ]}
      onPress={this.props.onPress}>
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {

    alignContent : 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop : 0,
    marginBottom: '10%',
    borderRadius: 15,
    width : '60%',
    height : '100%',
    //marginTop : -20,
    borderWidth : 1.5,
    borderColor : 'black'
  },

  title: {
    fontSize: 25,
    fontWeight : "bold",
    marginBottom: '10%',
  },
});