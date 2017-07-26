import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading: false,
           
        }

    }
    static navigationOptions = {
        title: 'Welcome',
    };
    componentWillMount() {
        const { navigate } = this.props.navigation;
          
           setTimeout (() => {
                navigate('Blank')
            }, 2000)
             
    }

    render() {
         var spinner = 
            ( <ActivityIndicator
                size='large' color= 'red'/>) 
        return(
           <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
               {spinner}
            </View>
        )
        
    }
}