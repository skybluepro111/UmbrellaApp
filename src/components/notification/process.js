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

import { connect } from 'react-redux'
import axios from 'axios'
import * as Actions from '../../action';
import $HOST from '../../common'

class Process extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            res: false
        }
    }

    componentWillMount() {
         const config = {
            "headers": {'content-type': 'application/json'}
        };
        console.log("IDD", this.props.loanId.loan_id)
        var data = {
            'loan_id': this.props.loanId.loan_id,
        }
      
        axios.post($HOST+'/api/credit/process',data, config)
        .then(res => {                 
            console.log("aaa", res.data)
            this.setState({res: res.data})
             console.log("RESPONSE", res.data)
           
                            
        })
        .catch(err => {
                    alert(err.message);
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: false})
        console.log("LoanDetail", nextProps.loanDetail)
        nextProps.loanDetail.map((data) => {
            if((data.id == this.props.loanId.loan_id)) {
                this.setState({isLoading: true})
            }
        })
    }

    getLoanDetail = () =>
    {
        // this.setState({isLoading: false})
        this.props.getLoanDetail()
        this.setState({res: false})
    }
    
    numberWithCommas=(x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { navigate } = this.props.navigation;
        const name = this.props.detail.user_payment_methods[0].bank_name
        const account = this.props.detail.user_payment_methods[0].account
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.text2}>
                       We just have to deposit {"\n"}
                       {this.props.prefix.currency.slice(0,3)}{this.numberWithCommas(this.props.amount)} in <Text style={{color:'#7FD6F6'}}>{name} and </Text>{"\n"}
                       <Text style={{color:'#7FD6F6'}}>{account}</Text> {"\n"}
                       {"\n"}
                       It may take anywhere between {"\n"}
                       5 secs to 30 minutes. {"\n"}
                       {"\n"}
                       Meanwhile enjoy this video!  
                    </Text>
                     <View>
                         {this.state.isLoading ?  
                            <TouchableOpacity style={{borderBottomColor:'#D8D8D8', borderBottomWidth:1,width:'15%' }}>
                                <Text style ={styles.text6} onPress={() => navigate('Active', { name: 'Active' })}>NEXT</Text>
                            </TouchableOpacity>
                            : <Text></Text>}
                    </View>
                </View>
                <View style={styles.view2}>
                    {(this.state.res == true) &&       
                        this.getLoanDetail()}                    
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
        flex:1, 
        marginTop: 30, 
        marginLeft: 40
    },
    text1: {
        fontWeight: '600',
        fontSize: 27, 
        fontFamily:'Avenir', 
        color: 'red'
    },
    text2: {
        marginTop:30,
        fontSize: 18, 
        fontFamily:'Avenir',
        color: '#222222',
        lineHeight: 29
    },
    view2: {
        flex:1, 
        backgroundColor:'#D8D8D8'
    },
    text6: {
        fontFamily: "avenir_medium",
        color: '#222222',
        fontSize: 13,
        marginTop:18,
        
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
        getLoanDetail: () => dispatch(Actions.getLoanDetail()),
        // creditApply: (amount, term, id) => dispatch(Actions.creditApply(amount,term, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process)