import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Image,
    Alert
} from 'react-native';
import { connect } from 'react-redux'
import * as Actions from '../../action';
import $HOST from '../../common'

class Email extends Component {
   constructor(props) {
       super(props);
       this.state = {text: '' }
   }
   
   validate = (text) => {
        console.log("TEXT", text);
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({text:text})
        return reg.test(text);
    }
   
   countryInfo() {
       let lat =  this.props.position.coords.latitude
       let lon =  this.props.position.coords.longitude
        console.log("POS", lat, lon)
       const config = {
            "headers": {'content-type': 'application/json'}
        };
        var info = {
            'country': this.props.country.country,
            'gps_location': `${lon}, ${lat}`,
            'email': this.state.text
        }
        axios.put($HOST+'/api/country/not-support', info, config)
        .then(res => {
            console.log("put",res.data);
            alert("Thanks")
           
        })
        .catch(err => {
            console.log("put.err",err);
            
        });  
   }

   componentWillMount() {
       this.props.getPosition();
   }
   
    render() {
       return(
                <Image style={styles.backgroundImage} source={require('../../img/email.png')} >
                {/* <View style={styles.backgroundColor}> */}
                    <View style={styles.overlay}>
                        <View style={styles.mainText}>
                            <Text style={styles.text}>
                                We love <Text style={{fontWeight: "bold"}}>{this.props.country != undefined && <Text>{this.props.country.country}</Text>}{"\n"}</Text>
                                That's where we are {"\n"}
                                headed next. Leave your {"\n"}
                                email here and as soon as 
                                we set foot, we will let {"\n"}
                                you know. {"\n"}
                            </Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={styles.second}>
                                <TextInput style={styles.textinput} underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.validate(text)}
                                    value = {this.state.text} />
                                
                                 <View style={styles.image}>
                                      {this.state.text == "" && 
                                    <TouchableOpacity activeOpacity={1}>
                                        <Image style={[styles.arrowimage, {opacity: 0.7}]} source={require('../../img/arrow.png')} />
                                    </TouchableOpacity> }
                                 
                                    <TouchableOpacity onPress={() => 
                                        {
                                              if (!this.validate(this.state.text) ) {
                                                    alert('Email is not correct')
                                               }
                                               else this.countryInfo()
                                        }
                                    }>
                                        <Image style={styles.arrowimage} source={require('../../img/arrow.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.pad}>
                                <Text style={styles.text1} >EMAIL</Text>
                            </View>
                        </View>
                        
                    </View>
                {/* </View> */}
                </Image>
              
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundColor: {
        backgroundColor: '#7FD6F6',
        flex:1,
        
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      width: null,
      height: null,
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        width: undefined,
        height: undefined,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,0)',
       
    },
    text: {
        paddingTop: 50,
        fontSize: 23,
        fontFamily:"Avenir",
        lineHeight:40
        
    },
    textinput: {
        width: '70%',
        height: 55,
        fontSize: 18,
        paddingLeft: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
       
    },
    arrowimage: {
        marginTop: 17,
        width: 25,
        height: 25,
        // marginLeft: -45,
        zIndex: 100
    },
    mainText: {
        flex: 1, 
        paddingLeft:45, 
        paddingRight: 45
    },
    second: {
        width: '100%', 
        flexDirection:'row', 
        justifyContent: 'center',
        
    },
    text1: {
        fontSize:13,
        fontFamily:"Avenir", 
        fontWeight:"500"
    },
    pad: {
        paddingVertical:10, 
        paddingHorizontal:70
    },
    image: {
        height: 55,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        paddingLeft: 10,
        paddingRight: 10
    }
});

const mapStateToProps = (state) => {
  console.log("COU", state)  
  return {
        country: state.country.country,
        position: state.position.position
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         getPosition: () => dispatch(Actions.getPosition())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Email)