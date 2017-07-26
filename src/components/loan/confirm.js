import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import Hr  from 'react-native-hr'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image, 

} from 'react-native';
// import SnapSlider from 'react-native-snap-slider';
import { connect } from 'react-redux'
import axios from 'axios'
import Slider from 'react-native-slider'
import $HOST from '../../common'

let textname;

class Confirm extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    
    constructor(props) {
        super(props)
        this.state = { 
            age:  this.props.credit.min_availalble_amount,
            textStyle:[styles._text, styles._text, styles._text, styles._text]
        }
  } 
   
     
     changecolor (index) {
            textname=styles.text;
            let temp=[styles._text, styles._text, styles._text, styles._text];
           
            temp[index]=textname;
            this.setState({textStyle:temp});
    }

    creditApply = () => {
        const { navigate } = this.props.navigation;
         let amount = this.props.prefix.payment_terms_loan_range[1].max
         let term = this.props.prefix.payment_terms_loan_range[1].terms[0]
         console.log("amount", amount),
         console.log(term),
         console.log("id", this.props.detail.user_payment_methods[0].payment_method_id
)
        const config = {
            "headers": {'content-type': 'application/json'}
        };
        var data = {
            'apply_loan_amount': amount,
            'payment_term': term,
            'user_payment_method_id': this.props.detail.user_payment_methods[0].payment_method_id

        }
        axios.post($HOST+'/api/credit/apply',data, config)
        .then(res => {                 
            console.log("aaa", res.data)
            
            // navigate('On', { name: 'On' })
           
                            
        })
        .catch(err => {
                    alert(err.message);
        })
    }


    render() {
       
       
        const { navigate } = this.props.navigation;
       
        return(
            <View style={styles.container}>
                <View style={{flex:3, borderBottomWidth: 1, borderBottomColor: '#979797'}}>
                    <View style={{padding:30}}>
                        <Text style={styles.text1}>Choose your loan amount</Text>
                        
                         <Slider
                            style={{ width: 250 }}
                            minimumValue = {this.props.credit.min_availalble_amount}
                            maximumValue = {this.props.credit.available_amount}                    
                            value={this.state.age}
                            step = {30}
                            onValueChange={(value) => this.setState({ age: value })}
                           
                            />
                            <Text style={styles.welcome}> {this.state.age} </Text>           
                        <Text style={[styles.text1, {marginTop:35}]}>Choose your repayment duration {"\n"}
                            (in weeks)
                        </Text>
                        <View style={{flexDirection:'row', marginTop:20}}>
                            
                                <View style={[this.state.textStyle[0], {marginLeft: 20}]}>
                                    <Text  style={styles.text2} onPress={()=>this.changecolor(0)}>3</Text>
                                </View>
                                <View style={[this.state.textStyle[1],{marginLeft: 20}]}>
                                    <Text style={styles.text2} onPress={()=>this.changecolor(1)}>4</Text>
                                </View>

                                <View style={[this.state.textStyle[2], {marginLeft: 20}]}>
                                    <Text style={styles.text2} onPress={()=>this.changecolor(2)}>5</Text>
                                </View>
                                <View style={[this.state.textStyle[3], {marginLeft: 20}]}>
                                    <Text style={styles.text2} onPress={()=>this.changecolor(3)}>6</Text>
                                </View>
                        
                        </View>
                        
                    </View>

                    
                </View>
                    {/*<View><Hr lineColor='#979797'/></View>*/}
                <View style={{flex:2, borderBottomWidth: 1, paddingTop: 20,borderBottomColor: '#979797'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:3,paddingLeft:30}}>
                            <Text style={{fontWeight:'600',fontSize:13,color:'#8E969F', fontFamily:"Avenir"}}>SERVICE FEE</Text>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{marginTop: 27,fontSize:19,fontFamily:"Avenir"}}></Text>
                                <Text style={{marginLeft:5,marginTop: 29,fontSize:11,color:'#8E969F'}}>{this.props.prefix.currency}</Text>
                            </View>
                            <Text style={{marginTop:28,fontWeight:'600',fontSize:13,color:'#8E969F', fontFamily:"Avenir"}}>INTEREST RATE</Text>
                            <Text style={{marginTop: 10,fontSize:19,fontFamily:"Avenir"}}>%</Text>
                        </View>
                        <View style={{flex:5,marginLeft:60}}>
                            <Text style={{color:'#8E969F', fontWeight:'600',fontSize:13,fontFamily:"Avenir"}}>REPAYMENT START DATE {"\n"}
                            (DD/MM/YYYY)</Text>
                            <Text style={{marginTop: 10,fontSize:19,fontFamily:"Avenir"}}>112</Text>
                             <Text style={{marginTop:28,fontWeight:'600',fontSize:13,color:'#8E969F', fontFamily:"Avenir"}}>TOTAL LOAN FEE</Text>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{marginTop: 10,fontSize:19,fontFamily:"Avenir"}}></Text>
                                <Text style={{marginLeft:5,marginTop: 10,fontSize:11,color:'#8E969F'}}>{this.props.prefix.currency}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                <View style={{flex:2, marginTop:30}}>
                    <Text style={[{paddingLeft:40}, styles.text1]}>Your weekly payment will be {"\n"}
                        {this.props.prefix.currency} starting 05/05/2017
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={[styles.textInput,{backgroundColor:'#F3402E', marginLeft: 50,}]} 
                            onPress={() =>
                           navigate('Apply', { name: 'Apply' })} >
                            <Text style={styles.font}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.textInput, {backgroundColor:'#85CA32',marginLeft: 10}]} 
                            onPress={() =>
                            navigate('On', { name: 'On' })} >
                            <Text style={styles.font}>CONFIRM</Text>
                            {this.creditApply()}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5
    },
    welcome: {
        fontSize: 10,
        textAlign: 'right',
        
    },
   
    text1: {
        color: '#00AEEF', 
        fontWeight:'700',
        fontSize:19, 
        fontFamily:"Avenir"
    },
    text: {
        width:36,
        height:36,
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'#7FD6F6',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#7FD6F6',
        alignSelf:'stretch',
        
    },
    view: {
        flex:1, 
         
        justifyContent:'center', 
        alignItems:'center'
    },
    text2: {
        fontSize:18,
        color:"#8E969F"
    },
    textInput: {
        
        marginTop: 30,
        height: 53,
        
        width:'35%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    _text: {
        width:36,
        height:36,
        justifyContent:'center', 
        alignItems:'center',
        alignSelf:'stretch'
    },
});

const mapStateToProps = (state) => {
    console.log("calculate", state)
    return {
        credit: state.credit.credit,
        prefix: state.prefix.prefix,
        calculate: state.calculate.calculate,
        detail: state.detail.detail
        
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        // creditCalculate: (amount, term) => dispatch(Actions.creditCalculate(amount,term))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)