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

import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import * as Actions from '../action';



class Blank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: '',
            lon: '',
            err: '',
            isLoading: false,
            flag: false
        };
    }
    static navigationOptions = {
        title: 'Welcome',
    };
    componentWillMount() {
        this.setState({isLoading: false})
        navigator.geolocation.getCurrentPosition(
            (position) => {
               this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    error: null,
                });
                this.props.getCountry(position.coords.latitude, position.coords.longitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      
    }
  

    componentWillReceiveProps(nextProps) {
        const { navigate } = this.props.navigation;
        if(this.props.country !== nextProps.country && nextProps.country )
        {
            this.setState({isLoading: true})
            if(nextProps.country.msg  == "Country not supported") {
                navigate('Email', {name: 'Email'})
               
            }
            else 
                // navigate('Login')
                AsyncStorage.getItem('token')
                    .then((value) => {
                        if(value)
                            navigate('Detail')
                        else
                            navigate('Login', {name: 'Login'})
                    }) 
              

        }
    }
    


   render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large' color= 'red'/>) :
            ( <View/>)
         const { navigate } = this.props.navigation;    
       
        return(
                <View style={{flex:1, backgroundColor: 'white',justifyContent:'center', alignItems:'center'}}>
                     {this.state.error && navigate('Error') }      
                     {spinner}
                </View>   
              ) 
        }
}

I18n.fallbacks = true

I18n.translations = {
  en: {
    greeting: 'Hi!',
    goodbye: 'Bye'
  },
  fr: {
    greeting: 'Bonjour!',
    goodbye: 'Au Revoir'
  },
  ma: {
    greeting: 'Hi',
    goodbye: 'Selamat tinggal'
  },
  ru: {
      greeting: 'Здравствуй',
      goodbye: 'до свидания'
  }
}

import { getLanguages } from 'react-native-i18n'

getLanguages().then(languages => {
  console.log(languages) // ['en-US', 'en']
})


const mapStateToProps = (state) => {
    console.log("STATE")   
    return {
        country: state.country.country
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getCountry: (x,y) => dispatch(Actions.getCountry(x, y)),
  
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Blank)


