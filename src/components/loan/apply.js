import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image, 
    Slider
} from 'react-native';

import SnapSlider from 'react-native-snap-slider';
import { connect } from 'react-redux'
import * as Actions from '../../action';
import axios from 'axios'
import Hr  from 'react-native-hr'

let textname;

class Apply extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
  
    constructor(props){
        super(props);
        this.state =  {
          calc:props.calculate,
          defaultItem: 3,
          textStyle:[styles._text, styles._text, styles._text, styles._text],
          terms: 5,
          loan:  this.props.credit.min_availalble_amount,
          creditCal: [],
          Id: '',
          sliderOptions: [],
          value: 310,
        }  
    
    }
     slidingComplete = () => {
        let label = this.state.sliderOptions[this.refs.slider.state.item].label
        if(label <= 300 && this.state.terms > 5) {
            this.setState({value: label})
            this.props.creditCalculate(label,35)
        }
                   
        else this.props.creditCalculate(label,(this.state.terms) * 7) 
        this.setState({value: label})

        
    }

    numberWithCommas=(x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

     changecolor (index) {
            textname=styles.text;
            let temp=[styles._text, styles._text, styles._text, styles._text];
            temp[index]=textname;
            this.setState({textStyle:temp, terms: (index + 3), id: index});
    }

    componentWillMount() {
        let term = this.props.prefix.payment_terms_loan_range
        let amount = this.props.credit.available_amount
        let min = this.props.credit.min_availalble_amount
        this.setState({ sliderOptions: [...this.state.sliderOptions, { value: 0, label: this.numberWithCommas(min) },
                                                                        {value: 1, label: this.numberWithCommas(Math.ceil(min + (amount-min)/3))},
                                                                        {value: 2, label: this.numberWithCommas(Math.ceil(amount - (amount-min)/3))},
                                                                        { value: 3, label: this.numberWithCommas(amount)}] })
        if( amount <= 300) {
            this.props.creditCalculate(amount, term[0].terms[0])
        } else {
            this.props.creditCalculate(amount, term[1].terms[0])
        }     
    }
    
    creditCal(term) {
       if(term > 35 && this.state.value <=300)       
            this.props.creditCalculate(this.state.value, 35)
      
        else  this.props.creditCalculate(this.state.value, term)
        
      
    }

    componentWillReceiveProps(nextProps) {
         const { navigate } = this.props.navigation;
         if(this.props.calculate != nextProps.calculate && nextProps.calculate)
          
            this.setState({calc:nextProps.calculate});
         if(this.props.loanId !== nextProps.loanId && nextProps.loanId) {
            if(typeof (nextProps.loanId.loan_id) === 'number')
            {   
              navigate('On', { name: 'On' })   
            }                
            else  alert(nextProps.loanId)
        }
                  
    }

    creditApply = () => {
       
         let amount = this.state.value
         let term = (this.state.terms) * 7
         let payId = this.props.detail.user_payment_methods
         if(amount <= 300 && term >35)
            this.props.creditApply(amount, 35, payId[0].id)
         else this.props.creditApply(amount, term, payId[0].id)
         this.props.getAmount(amount)       
    }

    formatDate = (str) => {
        let a = new Date(str);
        let newDate = '0'+a.getDate()+"/"+'0'+(a.getMonth()+1)+"/"+a.getFullYear();
        return newDate
    }
        
    render() {
        
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={{flex:3, paddingTop:40, paddingBottom:40}}>
                    <Text style={styles.text1}>Choose your loan amount</Text>
                    <View style={{paddingLeft:40,  paddingRight:40}}>
                    <SnapSlider ref="slider"
                        items={this.state.sliderOptions}
                        defaultItem={this.state.defaultItem}
                        onSlidingComplete={this.slidingComplete}   
                        itemWrapperStyle={styles.snapsliderItemWrapper}  
                        itemStyle={styles.snapsliderItem} 
                        containerStyle={styles.snapsliderContainer}
                    /> 
                    </View>
                     <Text style={[styles.text1, {marginTop:5}]}>Choose your repayment duration {"\n"}
                         (in weeks)
                     </Text>
                     {this.props.credit.available_amount<=300 ?
                     <View style={{flexDirection:'row', marginTop:10, borderBottomColor: '#979797', marginLeft:40}}>
                        
                           <View style={[this.state.textStyle[0], {marginLeft: 20}]}>
                                <Text  style={styles.text2} onPress={() => { this.changecolor(0); 
                                    this.creditCal((21)) }}>3</Text>
                            </View>
                             <View style={[this.state.textStyle[1], {marginLeft: 20}]}>
                                <Text style={styles.text2} onPress={()=>{this.changecolor(1); 
                                    this.creditCal(28)}} >4</Text>
                            </View>
                            {this.state.terms == 5 ?
                                <View style={[styles.text,{marginLeft: 20}]}>
                                        <Text style={styles.text2}>5</Text>
                                </View>
                                :<View style={[this.state.textStyle[2], {marginLeft: 20}]}>
                                    <Text style={styles.text2} onPress={()=>{this.changecolor(2);
                                        this.creditCal((35))}}>5</Text>
                                </View>
                             }
                            <View style={{marginLeft: 29, marginTop: 8}}>
                                <Text style={[styles.text2,{color:'#979797'}]}>6</Text>
                            </View>
                       
                     </View> : 
                     <View style={{flexDirection:'row', marginTop:20, borderBottomColor: '#979797', marginLeft:40}}>
                            <View style={{marginLeft: 18, marginTop: 7}}>
                                <Text  style={[styles.text2,{color:'#979797', marginRight:4}]}>3</Text>
                            </View>
                          
                             <View style={[this.state.textStyle[1], {marginLeft: 20}]}>
                                <Text style={styles.text2} onPress={()=>{this.changecolor(1); 
                                    this.creditCal(28)}}>4</Text>
                            </View>

                           {this.state.terms == 5 ?
                            <View style={[styles.text,{marginLeft: 20}]}>
                                    <Text style={styles.text2}>5</Text>
                            </View>
                            :<View style={[this.state.textStyle[2], {marginLeft: 20}]}>
                                <Text style={styles.text2} onPress={()=>{this.changecolor(2);
                                    this.creditCal((35))}}>5</Text>
                            </View>
                             }
                             <View style={[this.state.textStyle[3], {marginLeft: 20}]}>
                                <Text style={styles.text2} onPress={()=>{this.changecolor(3);
                                    this.creditCal(42)}}>6</Text>
                            </View>
                       
                     </View> 

                     }
                
                 {this.props.isCalculating ?
                 <View></View>
                 : <View style ={{width: '100%', borderBottomWidth:1, marginTop:15, position:'relative', borderBottomColor:'grey'}}></View>
                  }
                </View> 
               {(!this.props.isCalculating && this.state.calc !== undefined) ? 
               <View style ={{flex: 5, marginTop: -50, position: 'relative'}}>               
                <View style={{flex:1, borderBottomWidth: 1,borderBottomColor: '#979797'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:3,paddingLeft:30}}>
                            <Text style={{fontSize:10,color:'#8E969F', fontFamily:"avenir_medium"}}>SERVICE FEE</Text>
                             <View style={{flexDirection: 'row'}}>
                               <Text style={{marginTop: 27,fontSize:18,fontFamily:"avenir_medium"}}>{this.numberWithCommas(parseFloat(this.state.calc.interestFee,10).toFixed(2))}</Text>
                                <Text style={{marginLeft:5,marginTop: 27,fontFamily:"avenir_medium",fontSize:10,color:'#8E969F'}}>{this.props.prefix.currency}</Text>
                            </View>
                            <Text style={{marginTop:28,fontSize:10,color:'#8E969F', fontFamily:"avenir_medium"}}>INTEREST RATE</Text>
                            <Text style={{marginTop: 10,fontSize:18,fontFamily:"avenir_medium"}}>{this.numberWithCommas(parseFloat(this.state.calc.countryInterestFee.percentage, 10).toFixed(2))}%</Text>
                        </View>
                        <View style={{flex:5,marginLeft:60}}>
                            <Text style={{color:'#8E969F',fontSize:10,fontFamily:"avenir_medium"}}>REPAYMENT START DATE {"\n"}
                            (DD/MM/YYYY)</Text>
                            
                            <Text style={{marginTop: 16,fontSize:18,fontFamily:"avenir_medium"}}>{this.formatDate(Object.keys(this.state.calc.schedule)[0])}</Text>
                             <Text style={{marginTop:28,fontSize:10,color:'#8E969F', fontFamily:"avenir_medium"}}>TOTAL LOAN FEE</Text>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{marginTop: 10,fontSize:18,fontFamily:"Avenir"}}>{(this.numberWithCommas(parseFloat(this.state.calc.serviceFee, 10).toFixed(2)))}</Text>
                                <Text style={{marginLeft:5,marginTop: 10,fontSize:10,color:'#8E969F'}}>{this.props.prefix.currency}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                <View style={{flex:1, marginTop:20}}>
                    <Text style={[styles.text1,{paddingLeft:40, fontSize:17, lineHeight:28}]}>Your weekly payment will be {"\n"}
                        {this.props.prefix.currency.slice(0,3)}{this.numberWithCommas((parseFloat(this.state.calc.recurringPaymentValue,10)).toFixed(2))} starting {this.formatDate(Object.keys(this.state.calc.schedule)[0])}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                       
                        <TouchableOpacity style={[styles.textInput, {backgroundColor:'#85CA32',marginLeft: 40}]}
                            onPress = {()=>{this.creditApply()}}>
                            <Text style={styles.font}>CONFIRM</Text>
                            
                        </TouchableOpacity>
                         <TouchableOpacity style={[styles.textInput,{marginLeft: 5,}]} 
                            onPress={() =>
                           navigate('Success', { name: 'success' })} >
                            <Text style={styles.font}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
                </View>:

                 <View style={styles.view}>
                        <Text style={{color: '#8E969F'}}>
                            Please wait while we are gathering {"\n"}
                            the numbers from our locker…
                        </Text>                   
                </View> 
                
              }
          </View> 
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 10,
        textAlign: 'right',
        
    },
    text1: {
        color: '#00AEEF', 
        fontSize:18, 
        fontFamily:"avenir_medium",
        paddingLeft:40
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
        alignSelf:'stretch'
    },
    _text: {
        width:36,
        height:36,
        justifyContent:'center', 
        alignItems:'center',
        alignSelf:'stretch'
    },
    view: {
        flex:7, 
        backgroundColor:'rgba(127, 214, 246, 0.15)', 
        justifyContent:'center', 
        alignItems:'center'
    },
    text2: {
        fontSize:18,
        color:"#585D62",
        fontFamily:'avenir_medium'
    },
    textInput: {
        
        marginTop: 30,
        height: 45,
        
        width:'33%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    
});

const mapStateToProps = (state) => {
   return {
        credit: state.credit.credit,
        prefix: state.prefix.prefix,
        calculate: state.calculate.calculate,
        isCalculating: state.calculate.isLoading,
        detail: state.detail.detail,
        loanId: state.loanId.loanId
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        creditCalculate: (amount, term) => dispatch(Actions.creditCalculate(amount,term)),
        creditApply: (amount, term, id) => dispatch(Actions.creditApply(amount,term, id)),
        getAmount: amount => dispatch(Actions.getAmount(amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply)