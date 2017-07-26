import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Hr  from 'react-native-hr'
import { connect } from 'react-redux'


class Sample extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.backgroundColor}>
                <TouchableOpacity onPress={() => navigate('Fail')}>
                    <Text style={styles.text4}>CLOSE</Text>
                </TouchableOpacity>
                <View style={styles.view1}>
                    <Text style={styles.text2}>
                        Title of the take over {"\n"} 
                        goes here. Avenir {"\n"}
                        Medium size 70{"\n"}
                    </Text>
                    <View style={{ width:'17%'}}>
                        <Hr lineColor='white' />
                    </View>
                    <Text style={styles.text3}>
                        Copy of the take over goes{"\n"}
                        here. It is anchored at this  {"\n"}
                        point and scrolls till the words  {"\n"}
                        end. It could run more than a  {"\n"}
                        page. In that case, a scroller  {"\n"}
                        will appear like the one here in  {"\n"}
                        this screen. The white bar  {"\n"}
                        progresses horizontally  {"\n"}
                         {"\n"}
                        Avenir Book size 50 with line  {"\n"}
                        spacing of 70 and paragraph  {"\n"}
                        break of 36
                      
                    </Text>
                </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#7FD6F6',
        flex:1,
        
    },
    text1: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        marginTop: 80,
        color: '#8E969F'
    },
    container: {
        flex:1, 
        backgroundColor: 'white'
    },
    text2: {
        fontWeight: '600',
        fontSize: 25, 
        fontFamily:'Avenir', 
        
    },
    text3 :{
        marginTop:20,
        fontSize: 20, 
        fontFamily:'Avenir', 
        color:'#222222'
    },
    view1: {
        flex:2, 
        marginTop: 10, 
        marginLeft: 40
    },
    
    text4: {
        color: '#585D62', 
        padding: 30, 
        fontSize: 18
    }
    
})

const mapStateToProps = (state) => {
   
    return {
        detail: state.detail.detail,
        prefix: state.prefix.prefix,
        
    }
}

export default connect(mapStateToProps)(Sample)
