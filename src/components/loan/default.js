import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import Hr  from 'react-native-hr'
import axios from 'axios'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import { connect } from 'react-redux'
import $HOST from '../../common'

class Default extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    defaultedMsg = () => {
        const { navigate } = this.props.navigation;
        axios.get($HOST+'/api/defaulted/msg') 
            .then(res => {
                console.log("MSG",res.data)
                 navigate('Sample', {name: 'detail' }) 
            })
        
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                 <Image style={styles.checkimage} source={require('../../img/warning.png')} />
                 <Text style={styles.fontColor}>
                     We love to help people {"\n"}
                     with their emergency   {"\n"}
                     needs. We can only do {"\n"}
                     that if people pay {"\n"}
                     promptly. We operate  {"\n"}
                     on small margins. So, {"\n"}
                     at the moment, your {"\n"}
                     account is blocked. {"\n"}
                     {"\n"}
                    You have to pay {"\n"}
                    {this.props.prefix.currency}10,067.20 in full {"\n"}
                 </Text>
                 <TouchableOpacity onPress={this.defaultedMsg()}>
                      <Text style={styles.text1}>WHAT HAPPENS NEXT</Text>
                 </TouchableOpacity>
                
            </View> 
        )
    }
}

const styles = StyleSheet.create ({
     checkimage: {
        marginTop:17,
        width: 57,
        height: 57,
             
    },
    container:{
        padding:60, 
        backgroundColor:'white', 
        flex:1
    },
    fontColor: {
        color:'#F3402E',
        fontSize:23,
        fontFamily:'Avenir',
        marginTop:30,
        
    },
    text1: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        marginTop:30,
        color:'#8E969F',
        letterSpacing:2,
        fontWeight:'bold'
    },
})

const mapStateToProps = (state) => {
   
    return {
        detail: state.detail.detail,
        prefix: state.prefix.prefix,
        
    }
}

export default connect(mapStateToProps)(Default)