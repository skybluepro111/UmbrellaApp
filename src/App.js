import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Image, AsyncStorage, ActivityIndicator, } from 'react-native'  
import {StackNavigator} from 'react-navigation';
import Email from './components/login/Email';
import Detail from './components/login/detail';
import LoginPage from './components/login/LoginPage';
import Account from './components/account/account';
import Underage from './components/account/underage';
import Error from './components/account/error';
import Mobile from './components/account/mobile';
import Bank from './components/account/bank';
import Before from './components/setup/before';
import Wait from './components/setup/wait';
import Success from './components/credit/success';
import Fail from './components/credit/fail';
import Sample from './components/credit/sample';
import Apply from './components/loan/apply';
import Confirm from './components/loan/confirm';
import On from './components/notification/on';
import Off from './components/notification/off';
import Process from './components/notification/process';
import Active from './components/loan/active';
import Default from './components/loan/default';
import Nonactive from './components/loan/nonactive';
import Settings from './components/loan/settings';
import Edit from './components/account/edit';
import Blank from './components/blank';
import Splash from './components/splash';
import axios from 'axios'

const Route = StackNavigator(
    {   
        Splash: { screen: Splash },
        Blank: { screen: Blank },
        Email: { screen: Email },
        Detail: { screen: Detail },
        Login: { screen: LoginPage },
        Account: {screen: Account},
        Underage: { screen: Underage},
        Error: { screen: Error},
        Mobile: { screen: Mobile},
        Bank: { screen: Bank},
        Wait: { screen: Wait},
        Success: {screen: Success},
        Fail: {screen: Fail},
        Sample: {screen: Sample},
        Apply: {screen: Apply},
        Confirm: {screen: Confirm},
        On: {screen: On},
        Off: {screen: Off},
        Process: {screen: Process},
        Active: {screen: Active},
        Default: {screen: Default},
        Nonactive: {screen: Nonactive},
        Settings: {screen: Settings},
        Edit: {screen: Edit},
        Before: {screen: Before}
    },
    {
        // initialRouteName: 'On',
        initialRouteName: 'Splash',            
        headerMode: 'none', 
        mode: 'card',
    }
);

class App extends Component {
   render() { 
        return(
            <Route />
         )
    }
}
export default App;
