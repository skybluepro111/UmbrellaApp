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

export default class Off extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text1}>Turn on your notifications</Text>
                    <View style={{marginTop:20, width:'17%'}}>
                        <Hr lineColor='#7FD6F6' />
                    </View>
                    <Text style={styles.text2}>
                        You live a busy life. You may {"\n"}
                        not know when the payments {"\n"}
                        are due and turning the {"\n"}
                        notifictions on will actually {"\n"}
                        help you keep track of it {"\n"}
                        {"\n"}
                        You can always change your {"\n"}
                        preference using the Settings {"\n"}
                        on your phone     
                    </Text>
                </View>
                <View style={styles.view2}>
                    
                        <TouchableOpacity style={styles.textInput} 
                            onPress={() =>
                           navigate('Apply', { name: 'Apply' })} >
                            <Text style={styles.font}>ON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.textInput, {marginLeft: 40}]} 
                            onPress={() =>
                            navigate('On', { name: 'On' })} >
                            <Text style={styles.font}>OFF</Text>
                        </TouchableOpacity>
                    
                    
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
        fontWeight: '600',
        fontSize: 27, 
        fontFamily:'Avenir', 
        color: '#6BA624'
    },
    text2: {
        marginTop:30,
        fontSize: 20, 
        fontFamily:'Avenir',
        color: '#222222'
    },
    view2: {
        flex:1, 
        marginTop: 45, 
        marginLeft: 40,
        flexDirection:'row'
    },
    textInput: {
        
        marginTop: 30,
        height: 53,
        backgroundColor:'#7FD6F6',
        width:'20%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
})