import React, { Component } from 'react';
import Container from './components/ScreenContainer';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import DeepLinking from 'react-native-deep-link';


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



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
    DeepLinking.addScheme('myapp://');
    Linking.addEventListener('url', this.handleUrl);

    DeepLinking.addRoute('/info/:id', (user_id) => {
      // example://test/23
      this.setState({ user_id });
    });
  }
  

  render() {
    return (
      <Container />
    );
  }
}


