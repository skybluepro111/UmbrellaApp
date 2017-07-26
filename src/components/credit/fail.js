import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import Hr  from 'react-native-hr'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux'
import axios from 'axios'
import FBSDK from 'react-native-fbsdk';
import $HOST from '../../common'

const {
  LoginManager,
} = FBSDK;

export default class Fail extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    improveScore() {
      const { navigate } = this.props.navigation;  
      const config = {
                "headers": {'content-type': 'application/json'}
      };
      axios.post($HOST+'/api/content/improve-score', config)
        .then(res => {
            console.log("Score", res.data)
            navigate('Sample')
        })
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
        AsyncStorage.removeItem('token');
        // AsyncStorage.removeItem('Detail')
            navigate('Login', {name: 'Login'})
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text2}>Sorry</Text>
                    <View style={{marginLeft: 3,marginTop:20, width:'15%', borderBottomWidth:2, borderBottomColor:'#7FD6F6'}}>
                        {/* <Hr lineColor='#7FD6F6' /> */}
                    </View>
                    <Text style={styles.text3}>
                        We have not so great news for you.{"\n"}
                        {"\n"}
                        Looks like your social credit score is {"\n"}
                        not enough to qualify for a loan {"\n"}
                        value. But that may change. So, {"\n"}
                        please come back and check again {"\n"} 
                        at a later date to see if you qualify {"\n"}
                        for a loan.{"\n"}
                        {"\n"}
                        Meanwhile, spend responsibly!
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text style={styles.text4}>
                       You will be logged out of the app{"\n"}
                       automatically
                         
                    </Text>
                    <TouchableOpacity 
                                onPress={() =>this.improveScore()} >
                                <Text style={styles.text1}> IMPROVE YOUR SOCIAL CREDIT</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    text1: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        marginTop: 80,
        color: '#8E969F'
    },
    container: {
        flex:1, 
        backgroundColor: 'white'
    },
    text2: {
        fontSize: 25, 
        fontFamily:'avenir_medium', 
        color: 'red'
    },
    text3 :{
        marginTop:25,
        fontSize: 18, 
        fontFamily:'Avenir', 
        color:'#222222',
        lineHeight:29
    },
    view1: {
        flex:2, 
        marginTop: 50, 
        marginLeft: 40
    },
    view2: {
        flex:1, 
        marginTop: 30, 
        marginLeft: 40
    },
    text4: {
        fontFamily:'Avenir', 
        color: '#585D62'
    }
})