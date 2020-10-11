import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class PetMOButton extends Component{
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop : 0,
    marginBottom: 20,
    borderRadius: 11,
    width : '60%',
    height : 50,
    //marginTop : -20,
    borderWidth : 1.5,
    borderColor : 'black'
  },

  title: {
    fontSize: 25,
    fontWeight : "bold",
    
  },
});