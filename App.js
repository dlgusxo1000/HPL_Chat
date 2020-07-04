import React, { Component } from 'react';
import Container from './components/ScreenContainer';
import { YellowBox , } from 'react-native';
import _ from 'lodash';
import { Linking } from 'expo';


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const uriPrefix = Linking.makeUrl('/');



export default class App extends Component {

  constructor() {

    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      user_id : '',
    }
  }

  componentDidMount() {
    Linking.getInitialURL().then(url => {
      // const { path, queryParams } = Linking.parse(url);
      // Linking.openURL(url);
    });
    Linking.addEventListener("url", this._handleUrl);
  }
  _handleUrl = url => {
    const { path, queryParams } = Linking.parse(url);
    
  };

  render() {
    return (
      <Container uriPrefix={uriPrefix}/>
    );
  }
}


