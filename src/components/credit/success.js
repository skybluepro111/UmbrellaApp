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

import {connect} from 'react-redux'

class Success extends Component {
    static navigationOptions = {
        title: 'Success',
    };

    numberWithCommas=(x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    componentWillMount() {
        
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
         
            <View style={styles.container}>
                <View style={styles.view1}>
                     <TouchableOpacity style={{borderBottomColor:'#979797', borderBottomWidth:1, width:'21%'}}
                        onPress={()=>navigate('Settings', { name: 'Settings' })}>
                        <Text style={styles.text5}>SETTINGS</Text>
                    </TouchableOpacity>
                    <Text style={styles.text1}>Congratulations</Text>
                    <View style={{marginLeft:2, marginTop:25, width:'15%', borderBottomWidth:2, borderBottomColor:'#7FD6F6'}}>
                    </View>
                    <Text style={styles.text2}>
                        We have great news for you. {"\n"}
                        {"\n"}
                        You have earned a nice little {"\n"}
                        credit limit based on your{"\n"}
                        social credit score and it is {"\n"}
                        available for use now. {"\n"}
                        {"\n"}
                        Spend responsibly!     
                    </Text>
                </View>
              
                <View style={styles.view2}>
                     <Text style={styles.text3}>
                       {this.numberWithCommas(this.props.credit.available_amount)}
                                                
                    </Text> 
                   
                    <Text style={styles.text4}>{this.props.prefix.currency}</Text>
                    
                </View>

                <TouchableOpacity style={[styles.textInput]} 
                        onPress={() =>
                            navigate('Apply', { name: 'Apply' })} >
                        <Text style={styles.font}>APPLY  LOAN</Text>
                </TouchableOpacity>
            </View>
          
        )
    }
}
             
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    view1: {
        marginTop: 30, 
        marginLeft: 40
    },
    view2: {
        flexDirection: 'row',
        marginTop: 45, 
        marginLeft: 50
    },
    text1: {
        fontSize: 25, 
        fontFamily:'avenir_medium', 
        color: '#6BA624',
        marginTop:30
       
    },
    text2: {
        color: '#222222',
        marginTop:30,
        fontSize: 18,
        fontFamily:'Avenir',
        lineHeight:29
    },
    text3: {
        fontSize: 24,
        fontFamily:'avenir_medium', 
        color: '#00AEEF',
        marginTop:1,
        marginLeft:-8,
        marginRight:2
    },
    text4: {
        color: '#585D62',
        fontSize:12 
        
    },
    text5: {
        fontFamily: "avenir_medium",
        color: '#00AEEF',
        alignSelf:'stretch',
        letterSpacing:5
    },
    textInput: {
        backgroundColor: '#7FD6F6',
        marginTop: 50,
        height: 63,
        marginLeft: 40,
        width:'55%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
              
    },
    font: {
        fontSize: 15,
        fontFamily: "avenir_medium",
        color:'#222222',
        paddingHorizontal: 10
    },
})

const mapStateToProps = (state) => {
    console.log("credit", state)
    return {
        credit: state.credit.credit,
        prefix: state.prefix.prefix
    }
}

export default connect(mapStateToProps)(Success)
