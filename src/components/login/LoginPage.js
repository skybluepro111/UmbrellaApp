
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import FBSDK from 'react-native-fbsdk';
import axios from 'axios';
import { connect } from 'react-redux'
import * as Actions from '../../action';
import * as Animatable from 'react-native-animatable';

const {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class LoginPage extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
           isLoading: false,
           viewOne: true
        }
    }

    changeView() {
        this.setState({viewOne: !this.state.viewOne})
    }
    
    _handleLogin= () => {
        var _this = this;
        LoginManager.logInWithReadPermissions(
            ['public_profile', 
            'user_birthday', 
            'email', 
            'user_photos', 
            'pages_messaging_phone_number',
            'user_location',
            ])

        .then((result) => {
            if (result.isCancelled) {
                alert('Login cancelled');
            } 
            else {
                this.setState({isLoading: false})
                this.props.getToken();
            }          
        },
        (error) => {
            alert('Login fail with error: ' + error);
        })
    
    }


    componentWillReceiveProps(nextProps) {
        const { navigate } = this.props.navigation;
      
        if(nextProps.token) {
           this.setState({isLoading: true}) 
           AsyncStorage.setItem('token', nextProps.token.accessToken)
        }
        if ((this.props.status.status !== nextProps.status.status) && nextProps.status.status) {
             this.props.getUserInfo();
             navigate('Detail');       
        }   
            
        
    }
      

    render() {
         const { navigate } = this.props.navigation;
         var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large' color= 'red'/>) :
            ( <View/>)

          
        return(
            <View style={{flex:1}}>
             {this.state.viewOne ?     
            <Animatable.View animation="slideInDown" style={styles.backgroundColor} >
                <View style={{flex:1}}></View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>{spinner}</View>
                <View style={styles.container}>
                     <TouchableOpacity style={[styles.textInput]}
                        onPress={() =>
                            this._handleLogin()}> 
                         <Text style={styles.font}>LOG IN WITH FACEBOOK</Text>
                     </TouchableOpacity> 
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        <Text style={{fontFamily: "Avenir"}}>We don't post anything to</Text>
                        <TouchableOpacity 
                            onPress={() => this.changeView()}>
                            <Text style={styles.text1}> Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontFamily: "Avenir"}}>&nbsp;&nbsp;&nbsp;By signing in, you agree to our</Text>
                        <TouchableOpacity>
                            <Text style={styles.text2}> Teams of Service & Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Animatable.View> :
            <Animatable.View animation="slideInUp" style={styles.backgroundColor}>
                {spinner}
                <TouchableOpacity style={{marginTop:30, alignItems: 'center'}}
                    onPress={() =>
                            navigate('Login', { name: 'Jane' })}>
                    <Image style={styles.xImage} source={require('../../img/X.png')} />
                </TouchableOpacity>
               
                <View style={styles.container}>
                    <TouchableOpacity style={[styles.textInput, {marginTop: 20}]}
                                    onPress={() => this._handleLogin()}>
                        <Text style={styles.font}>LOG IN WITH FACEBOOK</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 35}}>
                        <Text style={{fontFamily: "Avenir", fontSize: 17}}>We take your privacy policy seriously.</Text>
                        
                    </View>
                     <View style={{marginTop: 35}}>
                        <Text style={{fontFamily: "Avenir", fontSize: 17, lineHeight:27}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We don't post anything to {"\n"}
                            Facebook. Other users will never {"\n"}
                            &nbsp;&nbsp;know about loan details. Other {"\n"}
                            users cannot contact you via this {"\n"}
                            &nbsp;&nbsp;&nbsp;app. Your location and other {"\n"}
                            &nbsp;&nbsp;personal details will never be {"\n"}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shared to other users.
                        </Text>
                                                 
                    </View>
                </View>
            </Animatable.View>}
            </View>
            
        )
    }
}


        
   


const styles = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#7FD6F6',
        // backgroundColor: '#00AEEF',
        flex:1,
        
    },
    container: {
        flex:1, 
        alignItems: 'center'
    },

    xImage: {
        width:20,
        height: 20
    },
    textInput: {
        height: 55,
        backgroundColor: 'white',
        borderRadius: 25,
        width:'70%',
        justifyContent: 'center',
        alignItems:'center'
    },
    font: {
        fontFamily: "avenir_medium",
        // fontWeight: "bold",
        fontSize: 15,
        color: '#222222'
        // letterSpacing: 90
        
    },
    text1: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir"
    },
    text2: {
        fontFamily: "Avenir", 
        textDecorationLine: 'underline', 
        marginLeft: -5
    }
})

const mapStateToProps = (state) => {
  return {
        status: state.status,
        token: state.token.token,
        prefix: state.prefix.prefix
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getToken: () => dispatch(Actions.getToken()),
    //   getUserdetails: () => dispatch(Actions.getUserdetails()),
      getPhoneCode: () => dispatch(Actions.getPhoneCode()),
      getLoanDetail: () => dispatch(Actions.getLoanDetail()),
      getUserInfo: () => dispatch(Actions.getUserInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


        
       
   