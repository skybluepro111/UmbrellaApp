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
import * as Actions from '../../action';
import axios from 'axios';
import $HOST from '../../common'

class Account extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
        constructor(props) {
            super(props);
            this.state = {
            // email: '',
                phone:props.phoneNum ? props.phoneNum: '+'+'65',
                info: [],
                detail: this.props.detail,
                email: this.props.detail.email,
                // sphone: props.prefix.phone_code
            };
       }

    validate = (text) => {
        console.log("TEXT", text);
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({email:text})
        return reg.test(text);
    }

    userUpdate = (email, phone) => {
        const config = {
                        "headers": {'content-type': 'application/json'}
        };
        console.log('PHONE', phone )            
        let res = phone.split('+')[1];
        console.log("RES", res)            
        var data = {
            'email': email,
            'phone_number': res
                

        }
        axios.put($HOST+'/api/user/update', data, config)
        .then(res => {                 
            console.log("update", res.data )
                            
        })
    }
       
    render() {
       
        phoneNum = this.state.phone;
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View style={{flex:1}}>
                    <Text style={styles.text1}>Let's set you up {"\n"}
                        on your way!
                    </Text>
                
                    <Text style={styles.text2}>We need a few details before {"\n"}
                        you could get the loan
                    </Text>
                </View>
                <View  style={{ width:'90%', flex:1}}>
                    
                    <View style={{marginLeft:40,}}>
                      <TextInput style={styles.text4}
                            value={this.state.email}
                            onChangeText={(text) => this.validate(text)}
                            underlineColorAndroid="transparent" />
                    </View>
                    <Text style={{marginTop:9, paddingLeft:40,fontFamily:"avenir_medium", color:"#222222"}}>EMAIL</Text>
                    
                    <View style={{marginLeft:40, marginTop:40}}>
                        {this.props.phoneNum ?
                        <TextInput style={styles.text4}
                            label='MOBILE NUMBER'
                            value = {this.state.phone}
                            onChangeText={ (phone) => this.setState({ phone }) }
                            underlineColorAndroid="transparent"
                        />:
                        <TextInput style={styles.text4}
                            label='MOBILE NUMBER'
                            value = {this.state.phone}
                            onChangeText={ (phone) => this.setState({ phone }) }
                            underlineColorAndroid="transparent"
                        /> }
                        
                    </View>
                    <Text style={styles.text5}>MOBILE NUMBER</Text>
                </View>
                <View style={{flex:1}}>
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
                            else  {
                                this.userUpdate(this.state.email, this.state.phone);
                                this.props.phoneNumber(this.state.phone);
                                navigate('Mobile');}
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
        height: 58,
        marginLeft: 40,
        width:'40%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        fontSize: 16,
        fontFamily: "avenir_medium",
        color: "#222222"
    },
    text1: {
        marginLeft: 40,
        fontFamily: "avenir_medium",
        marginTop:45, 
        fontSize: 27, 
        color:'#6BA624'
    },
    text2: {
        marginLeft: 40, 
        fontFamily: "Avenir",
        marginTop:25, 
        fontSize: 17,
    },
    text3: {
        marginLeft:40, 
        marginTop:20, 
        fontFamily: "Avenir"
    },
    text4: {
        borderBottomWidth:1, 
        paddingLeft:-7, 
        fontSize:17,
        fontFamily:"Avenir"
    },
    text5: {
        marginTop:9, 
        paddingLeft:40,
        fontFamily:"avenir_medium", 
        color:"#222222"
    }
})

const mapStateToProps = (state) => {
   return {
        detail: state.detail.detail,
        prefix: state.prefix.prefix,
        phoneNum: state.phoneNum.phoneNum
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        phoneNumber: phoneNum => dispatch(Actions.phoneNumber(phoneNum))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Account)