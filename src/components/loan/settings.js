import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image, 
    Slider,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from '../../action';
import axios from 'axios'
import FBSDK from 'react-native-fbsdk';
import $HOST from '../../common'

var FBLoginManager = require('NativeModules').FBLoginManager;
const {  LoginManager,} = FBSDK;


class Settings extends Component {

    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleLogout = () => {
        const { navigate } = this.props.navigation;
        LoginManager.logOut((error, data) => {
            if (!error) {
              this.props.onLogout && this.props.onLogout();
              
            } else {
                 console.log(error, data);
            }
        });
         AsyncStorage.removeItem('token');
         navigate('Login', {name: 'Login'})
    }

    deleteAccount = () => {
       const config = {
                        "headers": {'content-type': 'application/json'}
        };
       
        axios.delete($HOST+'/api/user/delete')
        .then(res => {                 
            console.log("delete", res.data )
                            
        })
    }
  

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.edit}>
                    <TouchableOpacity style={[styles.textInput]}>
                            <Text style={styles.font}>SETTINGS</Text>
                             
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                            {console.log("LOANID", this.props.loanId);this.props.loanId ?  navigate('Active') : navigate('Success')}}>
                           <Image style={styles.checkimage} source={require('../../img/x1.png')} />      
                     </TouchableOpacity>
                   
                </View>
                <View style={{flex:6}}>
                    <View>
                        <Text style={styles.text1}>{this.props.detail.fname}</Text>
                        <Text style={styles.text2}>FIRST NAME</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={styles.text1}>{this.props.detail.lname}</Text>
                        <Text style={styles.text2}>LAST NAME</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={styles.text1}>{this.props.detail.email}</Text>
                        <Text style={styles.text2}>EMAIL</Text>
                    </View>
                    <View>
                        <View style={[{marginTop:20}, styles.edit1]}>
                            <Text style={styles.text1}>{this.props.detail.phone_number}</Text>
                            <TouchableOpacity 
                                onPress = {()=>navigate('Edit')}>
                                <Text style={styles.text2}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text2}>MOBILE NUMBER</Text>
                    </View>
                    <View>
                        <View style={[{marginTop:20}, styles.edit1]}>
                            <Text style={styles.text1}>{this.props.detail.user_payment_methods[0].bank_name}</Text>
                            <TouchableOpacity 
                                onPress = {()=>navigate('Bank')}>
                                <Text style={styles.text2}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text2}>BANK NAME</Text>
                    </View>
                    <View style = {{marginTop:20}}>
                        <Text style={styles.text1}>{this.props.detail.user_payment_methods[0].account}</Text>
                        <Text style={styles.text2}>ACCOUNT NUMBER</Text>
                    </View>
                </View>
                <View style={[{marginTop:20}, styles.edit]}>
                        <TouchableOpacity 
                            onPress = {()=>this.handleLogout()}>
                            <Text style={styles.text3}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {()=> this.deleteAccount()}>
                            <Text style={styles.text3}>Delete Account</Text>
                        </TouchableOpacity>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        padding:25
    },
    textInput: {
        marginTop:5,
        backgroundColor: '#00AEEF',
        height: 34,
        width:'30%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        color: 'white',
        fontFamily: 'avenir_medium',
        letterSpacing:2,
        fontSize:13
    },
    checkimage: {
        marginTop:11,
        width: 14,
        height: 14,
            
    },
    text1: {
        color: '#00AEEF',
        fontFamily: 'Avenir',
        fontSize:20
    },
    text2: {
        color: '#8E969F',
        fontFamily: 'avenir_medium',
        fontSize:10,
        marginTop:7,
        letterSpacing:2
    },
    edit: {
        flexDirection:'row', 
        justifyContent:'space-between',
        flex:1
    },
     edit1: {
        flexDirection:'row', 
        justifyContent:'space-between',
        
    },
    text3: {
        color: '#8E969F',
        fontFamily: 'Avenir',
        fontSize:16,
        marginTop:47,
        textDecorationLine:'underline'
        // fontWeight:'600',
        // letterSpacing:2
    },
})

const mapStateToProps = (state) => {
    console.log("calculate", state)
    return {
        loanId: state.loanId.loanId,
        detail: state.detail.detail,
       
    }
}


const mapDispatchToProps = (dispatch) => {
   return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)