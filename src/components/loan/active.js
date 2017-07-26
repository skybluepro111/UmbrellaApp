import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image, 
    Slider,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux'
import axios from 'axios'
import * as Actions from '../../action';

let textname;

class Active extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    numberWithCommas=(x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    formatDate = (str) => {
        var a = new Date(str)
        var b = a.toString().slice(4,7)
        let newDate = a.getDate()+"th"+"  "+b+"  "+a.getFullYear();
        return newDate
    }

    componentWillMount() {
        console.log("LOANDETAIL", this.props.loanDetail)
        AsyncStorage.setItem('loanDetail', JSON.stringify(this.props.loanDetail))
    }   

    render() {
       
       const { navigate } = this.props.navigation;
       
        return(
            <View style={styles.container}>
                <View style={{flex:3}}>
                    <View  style={{borderBottomWidth:1, width:'24%', borderBottomColor:'#D8D8D8'}}>
                    <TouchableOpacity
                        onPress={()=>navigate('Settings', { name: 'Settings' })}>
                        <Text style={styles.text1}>SETTINGS</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>&nbsp;Your pending total loan value</Text>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        {this.props.loanDetail[0].collection[0].status == "Need to Retry" ?
                        <Text style={[styles.text9, {marginTop:7}]}>&nbsp;{this.numberWithCommas(this.props.loanDetail[0].amount_pending.toFixed(2))}</Text>
                        :<Text style={[styles.text3, {marginTop:7}]}>&nbsp;{this.numberWithCommas(this.props.loanDetail[0].amount_pending.toFixed(2))}</Text>}
                        <Text style={styles.text4}>{this.props.loanDetail[0].currency}</Text>
                    </View>
                </View>  
                <View style={{flex:4, marginTop:4}}>  
                    <Text style={styles.text7}>&nbsp;Next payment date</Text>
                    {this.props.loanDetail[0].collection[0].status == "Need to Retry" ?
                    <Text style={[styles.text9, {marginTop:5}]}>&nbsp;{this.formatDate(this.props.loanDetail[0].collection[0].retry_date)}</Text>
                     :<Text style={[styles.text3, {marginTop:5}]}>&nbsp;{this.formatDate(this.props.loanDetail[0].collection[0].date)}</Text>}
                    <Text style={styles.text8}>&nbsp;Next payment value</Text>
                    <View style={{flexDirection:'row'}}>
                        {this.props.loanDetail[0].collection[0].status == "Need to Retry" ?   
                        <Text style={[styles.text9, {marginTop:12}]}>&nbsp;{this.numberWithCommas((this.props.loanDetail[0].collection[0].amount).toFixed(2))}</Text>
                        :<Text style={[styles.text3, {marginTop:12}]}>&nbsp;{this.numberWithCommas((this.props.loanDetail[0].collection[0].amount).toFixed(2))}</Text>}
                        <Text style={styles.text4}>{this.props.prefix.currency}</Text>
                    </View>
                </View>
                <View style={{flex:6, marginTop:10}}>
                     { this.props.loanDetail[0].collection.map((data, index) => ( 
                    <View key={index} style={{flexDirection:'row'}}>
                             <Text style={styles.text10}>Week {index+1}</Text>
                             {data.status == "To-be-Collected" &&
                             <Text style={{fontSize: 14,color: '#8E969F',marginTop:24, marginLeft:43}}>{this.formatDate(data.date)}</Text>}

                            {data.status == "Collected" && 
                             <Image style={styles.checkimage} source={require('../../img/check.png')} />}

                            {data.status == "Need to Retry" &&
                             <View style={{flexDirection: 'row'}}> 
                                 <Image style={[styles.checkimage, {marginTop:29}]} source={require('../../img/x1.png')} />
                                  <Text style={{fontSize: 14, color: '#8E969F',marginTop:24, marginLeft:20}}>{this.formatDate(data.retry_date)}</Text> 
                             </View>}
                             
                    </View> ))}
                    
                  
                    <Text style={styles.text6}>Close the loan in full?</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        padding:40, 
        backgroundColor:'white',
        flex:1
    },
    text1: {
        // textDecorationLine: 'underline', 
        fontFamily: "avenir_medium",
        color: '#00AEEF',
        alignSelf:'stretch',
        letterSpacing:2
    },
    text2: {
        marginTop:25,
        fontFamily: "Avenir",
        color: '#222222',
        fontSize: 17,
        fontWeight:'400',
    },
    text3: {
        fontSize:26,
        color: '#85CA32',
        fontFamily: "Avenir",
        
    },
    text4: {
        color:'#8E969F',
        marginTop:7,
        marginLeft:5,
        fontFamily: "avenir_medium",
        fontSize: 12
    },
    text5: {
        marginTop: 13,
        fontFamily: "Avenir",
        color: '#222222',
        fontSize: 17,
        fontWeight:'400',
    },
    checkimage: {
        marginTop: 27,
        width: 11,
        height: 11,
        marginLeft:50     
    },
    text6: {
        textDecorationLine: 'underline', 
        fontFamily: "Avenir",
        color: '#222222',
        // alignSelf:'stretch',
        textAlign: 'right',
        marginTop:20
    },
    text7: {
        marginTop:10,
        fontFamily: "Avenir",
        color: '#222222',
        fontSize: 17,
        fontWeight:'400',
    },
    text8: {
        marginTop:28,
        fontFamily: "Avenir",
        color: '#222222',
        fontSize: 17,
        fontWeight:'400',
    },
    text9: {
        fontSize:26,
        color: '#FF8400',
        fontFamily: "Avenir",
        
    },
    text10: {
        marginTop:25,
        fontFamily: "Avenir",
        color: '#222222',
        fontSize: 14,
        fontWeight:'400',
    },
})

const mapStateToProps = (state) => {
    console.log("calculate", state)
    return {
        credit: state.credit.credit,
        prefix: state.prefix.prefix,
        calculate: state.calculate.calculate,
        detail: state.detail.detail,
        loanId: state.loanId.loanId,
        amount: state.amount.amount,
        loanDetail: state.loanDetail.loanDetail
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        // getLoanDetail: () => dispatch(Actions.getLoanDetail()),
        // creditApply: (amount, term, id) => dispatch(Actions.creditApply(amount,term, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Active)