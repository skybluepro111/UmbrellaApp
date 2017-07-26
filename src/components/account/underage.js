import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import Hr  from 'react-native-hr'
import FBSDK from 'react-native-fbsdk';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

var FBLoginManager = require('NativeModules').FBLoginManager;
const {
  LoginManager,
} = FBSDK;

export default class Underage extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        var _this = this
        LoginManager.logOut((error, data) => {
            if (!error) {
               _this.props.onLogout && _this.props.onLogout();
               

            } else {
                console.log(error, data);
            }
        });
        // navigate('Login', {name: 'Login'})
        AsyncStorage.removeItem('token');
        // AsyncStorage.removeItem('Detail')

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text1}>Account Blocked</Text>
                    <View style={{marginTop:20, width:'17%'}}>
                        <Hr lineColor='#7FD6F6' />
                    </View>
                    <Text style={styles.text2}>
                        Your account has been blocked
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text style={{fontFamily:'Avenir', color: '#585D62'}}>
                       You will be logged out of the app{"\n"}
                       automatically
                         
                    </Text>
                    
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: 'white'
    },
    view1: {
        flex:2, 
        marginTop: 80, 
        marginLeft: 40
    },
    text1: {
        fontWeight: '600',
        fontSize: 27, 
        fontFamily:'Avenir', 
        color: 'red'
    },
    text2: {
        marginTop:30,
        fontSize: 20, 
        fontFamily:'Avenir',
        color: '#222222'
    },
    view2: {
        flex:1, 
        marginTop: 30, 
        marginLeft: 40
    }
})