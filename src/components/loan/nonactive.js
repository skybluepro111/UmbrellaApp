import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import Hr  from 'react-native-hr'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import {connect} from 'react-redux'

class Nonactive extends Component {
    static navigationOptions = {
        title: 'Success',
    };

    numberWithCommas=(x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text1}>Welcome back</Text>
                    <View style={{marginTop:25, width:'17%'}}>
                        <Hr lineColor='#7FD6F6' />
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
                        <Text style={styles.font}>APPLY LOAN</Text>
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
        marginTop: 80, 
        marginLeft: 40
    },
    view2: {
        flexDirection: 'row',
        marginTop: 45, 
        marginLeft: 50
    },
    text1: {
        fontSize: 27, 
        fontFamily:'avenir_medium', 
        color: '#6BA624'
    },
    text2: {
        color: '#222222',
        marginTop:30,
        fontSize: 19,
        fontFamily:'Avenir',
        lineHeight:30
    },
    text3: {
        fontSize: 27,
        fontFamily:'Avenir', 
        color: '#00AEEF',
        marginRight:3
    },
    text4: {
        color: '#585D62', 
        marginTop:1,
        
    },
    textInput: {
        backgroundColor: '#7FD6F6',
        marginTop: 40,
        height: 53,
        marginLeft: 40,
        width:'50%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        fontSize: 14,
        fontFamily: "avenir_medium",
        paddingHorizontal: 10,
        color: '#222222'
    },
})

const mapStateToProps = (state) => {
    console.log("credit", state)
    return {
        credit: state.credit.credit,
        prefix: state.prefix.prefix
    }
}

export default connect(mapStateToProps)(Nonactive)
