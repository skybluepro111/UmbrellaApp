import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux'
import axios from 'axios';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import * as Actions from '../../action';
import $HOST from '../../common'

class Mobile extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    
    state = {
        digit: '',
        flag: true
    };
    
    componentWillMount() {
        this.getUsercode();
    }

    componentDidMount() {
        this.props.phoneNumber(this.props.phoneNum)
    }

    getUsercode = () => {
        const config = {
            "headers": {'content-type': 'application/json'}
        };
        
        axios.post($HOST+'/api/user/code',config)
        .then(res => {                 
            console.log("verify", res.data )
            
                            
        })
    }

    verifyCode = (code) => 
    {
        console.log("CODE", code)
        const { navigate } = this.props.navigation;
        const config = {
            "headers": {'content-type': 'application/json'}
        };
        var data = {
            "code": code
        }
        axios.post($HOST+'/api/user/verify',data, config)
        .then(res => {                 
            console.log("aaa", res)
            if(res.data.message == "done")
            {    navigate('Bank', { name: 'Bank' }) }
            else this.setState({flag: false})
                            
        })
        .catch(err => {
                    alert("mberr",err.message);
                                       
        });  
    }

    render() {
        let { digit } = this.state;
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View>
                    <Text style={styles.text1}>Mobile number{"\n"}
                        Verification
                    </Text>
                
                    <Text style={styles.text2}>Please enter the 6-digit code{"\n"}
                        we sent to {this.props.phoneNum} 
                    </Text>
                </View>
                <View  style={{marginTop: 20, width:'90%'}}>
                    <View style={{marginLeft:40}}>
                        
                            <TextInput underlineColorAndroid="transparent"
                                style={{ borderBottomWidth:1, paddingLeft:-7, fontSize:17, fontFamily:"Avenir"}}
                                value={digit}
                                onChangeText={ (digit) => {this.setState({ digit });
                                         console.log("LENGTH", digit);
                                         if(digit && digit.length == 6) {
                                               console.log("LENGTH1", digit);
                                            this.verifyCode(digit)
                                        }}}
                                   
                                   
                            />
                    </View>
                    <Text style={{marginTop:9, paddingLeft:40,fontFamily:"avenir_medium", color:"#222222", fontSize:13}}>6-DIGIT CODE</Text>
                    {this.state.flag == false ?
                    <View style={{alignItems:"flex-end"}}>
                        <Text style={{color:"#F3402E", fontFamily:"Avenir"}}>Something seems {"\n"}
                          to be wrong {"\n"}
                          Please re-enter {"\n"}
                          the details!
                        </Text>
                    </View>:
                    <View style={{marginTop:60}}></View>}
                    <TouchableOpacity onPress={() => {this.getUsercode()}}>
                            <Text style={styles.text4}> Re-send code</Text>
                            
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() =>
                            navigate('Account', { name: 'Account' })}>
                            <Text style={styles.text5}> Re-enter mobile number</Text>
                    </TouchableOpacity>
                    
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#7FD6F6',
        marginTop: 60,
        height: 63,
        marginLeft: 40,
        width:'40%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        fontSize: 16,
        fontFamily: "Avenir",
        fontWeight: 'bold'
    },
    text1: {
        marginLeft: 40,
        fontFamily: "avenir_medium",
        marginTop:70, 
        fontSize: 24, 
        color:'#6BA624',
        lineHeight: 35
    },
    text2: {
        marginLeft: 40, 
        fontFamily: "Avenir",
        marginTop:30, 
        fontSize: 18,
        lineHeight:30
    },
    text3: {
        marginLeft:40, 
        marginTop:64, 
        fontFamily: "Avenir"
    },
    text4: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        marginTop:20,
        marginLeft: 40
    },
    text5: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        marginTop:30,
        marginLeft: 40
    },
})

const mapStateToProps = (state) => {
    console.log("mobile", state )
    return {
        phoneNum: state.phoneNum.phoneNum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        phoneNumber: phoneNum => dispatch(Actions.phoneNumber(phoneNum))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mobile)