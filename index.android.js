import React, { Component } from 'react';
import {AppRegistry, Text, View} from 'react-native';
import App from './src/App';
import { Provider }     from 'react-redux'
import configureStore from './src/store/configureStore';
import { connect } from 'react-redux'
import * as actions from './src/action/index';
const store = configureStore();

export default class umbrella extends Component {
  constructor(props){
    super(props);
  }
   
  
  render() {
    console.log("hjghghhghgh")
    return (
      <Provider store = {store}>

        <App />

      </Provider>
    )
  }
}

AppRegistry.registerComponent('umbrella', () => umbrella);
