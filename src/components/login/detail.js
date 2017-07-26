import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'
import * as Actions from '../../action';

let loanDetail = [] 
let prefix = []

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag : false,
            check: false
        }
        
    }
    static navigationOptions = {
        title: 'Welcome',
    };

    
    getCredit = (detail, credit, prefix) => {
         const { navigate } = this.props.navigation;
                    
            console.log("credit", credit)
            console.log("prefixlaon", prefix)
            // if (!!credit && !!prefix) { 
            //     console.log('ttttttt');
                if (credit.length > 0 && credit.length < prefix.max_per_user_loan && credit[0].status == "Active")
                    navigate('Active', {name: 'Active'})
                else if (detail.min_availalble_amount>0 && detail.available_amount>0 && credit.length == 0 && credit == {})
                    navigate('Success', {name: 'Success'})
                else if (detail.min_availalble_amount == 0 && detail.available_amount>0)
                    navigate('Fail', {name: 'fail'})
                else if (credit[0].status == "Defaulted") 
                    navigate('Default', {name: 'Default'})
            // }
      
    }
    
    screenRouting = (nextProps) => {
        
        const { navigate } = this.props.navigation;
      
        detail = nextProps.detail
        console.log("detail",detail);
        console.log("prefix",nextProps.prefix);
        console.log("loanDetail",nextProps.loanDetail);
        pays = detail.user_payment_methods
        if(detail.status != "Active" /*&& this.props.info.age_range.min <= 21*/)
        {
            navigate('Underage', {name: 'Underage'});
        }
        else if(detail.phone_number == "" && detail.email != undefined)
        {   console.log("phone", detail.phone_number) 
            navigate('Account', {name: 'Account'}); }
        else if (detail.verified == false)
        {   navigate('Mobile', {name: 'Mobile'});   }
        
        else if (detail.user_payment_methods == "")
        {   navigate('Bank', {name: 'Bank'});   }
      
        else if(pays[0].status != "Active")
            { navigate('Wait', {name: 'Wait'});   }
        else if (pays[0].status == "Active" && detail.verified == true && pays[0]!={} && pays[0].status == "Active")
        { 
            console.log("aaaaaa")
            this.getCredit(detail, nextProps.loanDetail, nextProps.prefix);
        }
    }

    componentWillMount() {
        this.props.getUserdetails();
        this.props.getPhoneCode();
        this.props.getLoanDetail();
       
    }

    componentWillReceiveProps(nextProps, prevProps) {
        //   if(this.props.loanDetail !== nextProps.loanDetail && nextProps.loanDetail) {
        //        console.log("LOANDETIAL", nextProps.loanDetail);
               
        //   }
       
        // if(this.props.prefix !== nextProps.prefix && nextProps.prefix) {
        //     console.log("PREFIX", nextProps.prefix)
       
        // }
            
        console.log("PROPSDETAIL", nextProps.detail)
        if(prevProps.detail !== nextProps.detail && nextProps.detail && this.state.flag === false) {
            console.log("NEXTDETAIL", nextProps)
            this.screenRouting(nextProps)
            this.setState({flag: true});
        }
    }
    
   
    componnentDidMount() {
        
    }   
    render() {
        
        return(
                <View style={{flex:1, backgroundColor: 'white',justifyContent:'center', alignItems:'center'}}>
                 
                </View>    
        )
    }
}

const mapStateToProps = (state) => {
   
    return {
        detail: state.detail.detail,
        prefix: state.prefix.prefix,
        loanDetail: state.loanDetail.loanDetail,
        info: state.info.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserdetails: () => dispatch(Actions.getUserdetails()),
      getPhoneCode: () => dispatch(Actions.getPhoneCode()),
       getLoanDetail: () => dispatch(Actions.getLoanDetail()),
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)



