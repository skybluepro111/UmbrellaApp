import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux'
import * as Actions from '../../action';

class Wait extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
           
        }
    }
    
    componentWillReceiveProps(nextProps) {
        const { navigate } = this.props.navigation;
        if(nextProps.detail.min_availalble_amount == 0 && this.state.isLoading == false) {
            clearInterval(this.interval);
            navigate('Fail')
        }
        this.setState({isLoading: true})
        if(nextProps.detail.email && nextProps.detail.phone_number && nextProps.detail.user_payment_methods[0].status == "Active")
        {   
           clearInterval(this.interval);
           setTimeout (() => {
                navigate('Before')
            }, 2000) 
                    
        }
    }
    
    componentWillMount() {
       
       this.interval = setInterval(()=>{
           console.log("WAIT")
           this.props.getDetails();
       },2000)
    }
   
    componentDidMount() {
        this.props.getCredit()
    }

    render() {
        let email, num, payments;
            email = this.props.detail.email
            num = this.props.detail.phone_number
            payments = this.props.detail.user_payment_methods
        
        console.log("pay", payments)
         const { navigate } = this.props.navigation;       

        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                 
                <View>
                    { (payments.length > 0 && payments[0].status == "Active") ? 
                     <Text style={[styles.text1, {color:'#6BA624', marginTop:100}]}>You are all set! </Text>
                    :<Text style={styles.text1}>We are waiting for your {"\n"}
                        bank to confirm Details {"\n"}
                        Just sit tight! 
               
                    </Text>}
                    <View style={{flexDirection:'row', marginTop:55}}> 
                        <View style={{flex:2}}> 
                            <Text style={styles.text2}>Email Address
                            </Text>
                        </View>
                        <View style={{flex:1}}> 
                            {email ? (
                                <Image style={styles.checkimage} source={require('../../img/check.png')} />
                            ): (
                                <Image style={styles.checkimage} source={require('../../img/x1.png')} />
                            )}
                            
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row', marginTop:15}}> 
                        <View style={{flex:2}}> 
                            <Text style={styles.text2}>Mobile Number
                            </Text>
                        </View>
                        <View style={{flex:1}}> 
                            {num ? (
                                <Image style={styles.checkimage} source={require('../../img/check.png')} />
                            ): (
                                <Image style={styles.checkimage} source={require('../../img/x1.png')} />
                            )}
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row', marginTop:15}}> 
                        <View style={{flex:2}}> 
                            <Text style={styles.text2}>Bank Details
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            { (payments.length > 0 && payments[0].status == "Active") ? 
                                    <Image style={styles.checkimage} source={require('../../img/check.png')} />
                                    :                                    
                                    <Text style={styles.text4}> PENDING</Text>                                
                            }
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row', marginTop:45}}> 
                        <View>
                             { (payments.length > 0 && payments[0].status == "Active") ? 
                             <Text></Text>
                            :<TouchableOpacity onPress={()=>{clearInterval(this.interval);navigate('Bank')}}>
                                 <Text style={styles.text2}>Back
                                </Text> 
                            </TouchableOpacity> 
                             }
                        </View>
                        
                        
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
    text1: {
        marginLeft: 40,
        fontFamily: "avenir_medium",
        marginTop:80, 
        fontSize: 24, 
        color: '#FF8400',
        lineHeight:40
    },
    text2: {
        marginLeft: 40, 
        fontFamily: "Avenir",
        marginTop:30, 
        fontSize: 16,
    },
   
    checkimage: {
        marginTop: 33,
        width: 11,
        height: 11,
        
             
    },
    text3: {
        fontFamily: "Avenir",
        marginTop:35, 
        fontSize: 14,
        color: '#FF8400',
        fontWeight: '700'
    },
    text4:{
        marginTop:33,
        color:'#FF8400',
        fontFamily:'avenir_medium',
        marginLeft:-7,
        position: 'relative',
        fontSize: 12,
    }

})

const mapStateToProps = (state) => {   
    return {
        detail: state.detail.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getDetails: () => dispatch(Actions.getUserdetails()),
      getCredit: () =>dispatch(Actions.getCredit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wait)