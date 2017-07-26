import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import { connect } from 'react-redux'
import axios from 'axios'
import * as Actions from '../../action';
import $HOST from '../../common'

class Edit extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.detail.email,
            phone: '+'+this.props.detail.phone_number
        };
    }    
        

    userUpdate = (email, phone) => {
        const config = {
                        "headers": {'content-type': 'application/json'}
        };
        var data = {
            'email': email,
            'phone_number': phone
                

        }
        axios.put($HOST+'/api/user/update', data, config)
        .then(res => {                 
            console.log("update", res.data )
                            
        })
    }

    validate = (text) => {
        console.log("TEXT", text);
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({email:text})
        return reg.test(text);
    }

    render() {
        let  email  = this.state.email;
        let  phone  = this.state.phone;
        console.log("EMAIL", email)
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View style={{flex:2}}>
                    <Text style={styles.text1}>You are about to edit {"\n"}
                        your Mobile number
                    </Text>
                                  
                </View>
                <View  style={{width:'90%', flex:3}}>
                    <View style={{marginLeft:40, marginTop:40}}>
                        <TextInput style={styles.text4}
                            value={email}
                            onChangeText={(text) => this.validate(text)}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Text style={{marginTop:9, paddingLeft:40,fontFamily:"avenir_medium", color:"#222222"}}>EMAIL</Text>
                    <View style={{marginLeft:40, marginTop:40}}>
                        <TextInput style={styles.text4}
                            label='MOBILE NUMBER'
                            value = {phone}
                            onChangeText={ (phone) => this.setState({ phone }) }
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Text style={{marginTop:9, paddingLeft:40,fontFamily:"avenir_medium", color:"#222222"}}>MOBILE NUMBER</Text>
                </View>
                <View style={{flex:3}}>
                    <Text style={styles.text3}>
                        We will send you a 6 digit code to your {"\n"}
                        mobile phone for validation
                    </Text>
                    <TouchableOpacity style={[styles.textInput]} 
                        onPress={() =>
                        {
                             if (!this.validate(this.state.email) ) {
                                alert('Email is not correct')
                            }
                            else if (this.state.phone.length < 8) {
                                 alert('Phone Number is not correct')    
                            }
                            else {   
                                this.userUpdate(this.state.email, this.state.phone),
                                this.props.phoneNumber(this.state.phone),
                                navigate('Mobile', { name: 'Mobile' })}
                            }
                        }>
                        <Text style={styles.font}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#7FD6F6',
        marginTop: 50,
        height: 57,
        marginLeft: 40,
        width:'40%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        fontSize: 16,
        fontFamily: "avenir_medium",
        
    },
    text1: {
        marginLeft: 40,
        fontFamily: "avenir_medium",
        marginTop:60, 
        fontSize: 25, 
        color:'#6BA624',
        lineHeight: 37
    },
    text2: {
        marginLeft: 40, 
        fontFamily: "Avenir",
        marginTop:25, 
        fontSize: 20,
    },
    text3: {
        marginLeft:40, 
        marginTop:30, 
        fontFamily: "Avenir"
    },
    text4: {
        borderBottomWidth:1, 
        paddingLeft:-7, 
        fontSize:17,
        fontFamily:"Avenir"
    },
})
const mapStateToProps = (state) => {
    console.log("DETAIL",state)
    return {
       
        detail: state.detail.detail,
       
    }
}
const mapDispatchToProps = (dispatch) => {
   return {
        phoneNumber: phoneNum => dispatch(Actions.phoneNumber(phoneNum))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)