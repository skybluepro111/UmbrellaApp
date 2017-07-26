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

export default class Error extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text1}>ERROR TITLE</Text>
                    <View style={{marginTop:20, width:'17%'}}>
                        <Hr lineColor='#7FD6F6' />
                    </View>
                    <Text style={styles.text2}>
                        No GPS detected
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text style={{fontFamily:'Avenir', color: '#585D62'}}>
                       You will be able to enjoy the full{"\n"}
                       capability of our application without{"\n"}
                       solving this issue
                         
                    </Text>
                    
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: 'white'
    },
    view1: {
        flex:2, 
        marginTop: 80, 
        marginLeft: 40
    },
    text1: {
        fontSize: 27, 
        fontFamily:'avenir_medium', 
        color: 'red'
    },
    text2: {
        marginTop:30,
        fontSize: 20, 
        fontFamily:'Avenir',
        color: '#222222'
    },
    view2: {
        flex:1, 
        marginTop: 30, 
        marginLeft: 40
    }
})