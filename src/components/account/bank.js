import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import axios from 'axios';
import * as Actions from '../../action';
import $HOST from '../../common'

import {
  Select,
  Option,
  OptionList,
  updatePosition,
} from 'react-native-dropdown-latest';

import { connect } from 'react-redux';
import Dropdown from 'react-native-modal-select-option';
 
class Bank extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props) {
        super(props);

        this.state = {
            bank: [],
            first:'',
            last:'',
            num:'',
            language: '',
            name: [],
            flag: true,
            selectedOption: '',
            isShowingOptions: false,
            dropDownOptions: [],

        };
    }

    componentWillMount() {
        axios.get($HOST+'/api/credit/options')
        .then(res => {
           console.log("credit", res.data);
           this.setState({name: res.data})

           res.data.map(data => {
                this.setState({ dropDownOptions: [...this.state.dropDownOptions, { value: data.id, label: data.name }] })
                
           })
       
           
        })
        .catch(err => {
              console.log("creerr", err)
           
        });            
    }

  _onShow(value){
    this.setState({
      isShowingOptions: value,
    });
  }
  _onSelect(item,isShow) {
    this.setState({
      isShowingOptions: isShow,
      selectedOption: item,
    });
  }
  addbank = (name) => {
      const { navigate } = this.props.navigation;
      const config = {
            "headers": {'content-type': 'application/json'}
        };
       
        console.log("id", name)
        console.log("account", name.bank_code)
        
        var data = {
           'payment_method_id': name.id,
           'account': '234567',
           'simulated': true,
           'name': this.state.first +' ' + this.state.last,
           'bank_name': name.name,
           
        }
        
       axios.post($HOST+'/api/bank', data, config)
       .then(res => {
            console.log("addbank", res)
            navigate('Wait', {name: 'wait'})
        })
        .catch(err => {
              console.log("email", err)
           
        });  
  }    
   
    render() {
      
        let { first } = this.state;
        let { last } = this.state;
        let { num } = this.state;
         let {isShowingOptions, selectedOption} = this.state;
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View style={{flex:1}}>
                    <Text style={styles.text1}>Thank you! Now, We{"\n"}
                        need your Bank Details
                    </Text>
                                  
                </View>
                <View  style={{width:'90%', flex:2}}>
                    <View style={{marginLeft:40, }}>
                        <Dropdown style={{paddingLeft:-50}} 
                            options={ this.state.dropDownOptions }
                            onSelect={this._onSelect.bind(this)}
                            onShow={this._onShow.bind(this)}
                            isShowingOptions={isShowingOptions}
                            selectedOption={selectedOption}
                        />

                    </View>
                    <Text style={[styles.text5, {marginTop:5}]}>BANK NAME</Text>
                    <View style={{marginLeft:40,marginTop:7}}>
                       <TextInput underlineColorAndroid="transparent"
                            style={styles.text4}
                            value={first}
                            onChangeText={ (first) => this.setState({ first }) }
                        />
                    </View>
                     
                    <Text style={styles.text5}>FIRST NAME</Text>
                    <View style={{marginLeft:40, marginTop:9}}>
                       <TextInput
                            underlineColorAndroid="transparent" 
                            style={styles.text4}
                            value={last}
                            onChangeText={ (last) => this.setState({ last }) }
                        />
                    </View>
                    <Text style={styles.text5}>LAST NAME</Text>
                    {!this.state.flag ?
                     <View style={{alignItems:"flex-end", marginTop: -20}}>
                        <Text style={{color:"#F3402E", fontFamily:"Avenir"}}>Something seems {"\n"}
                          to be wrong {"\n"}
                          Please re-enter {"\n"}
                          the details!
                        </Text>
                    </View>
                    :<View style={{marginTop:29}}/>}
                    <View style={{marginLeft:40, marginTop: -23}}>
                       <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.text4}
                            value={num}
                            onChangeText={ (num) => this.setState({ num }) }
                        />
                    </View>
                    <Text style={styles.text5}>ACCOUNT NUMBER</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity style={[styles.textInput]} 
                        onPress={() =>
                            {
                                console.log("SELECT", this.state.selectedOption.value)
                                 console.log("SELECT1", this.state.dropDownOptions)
                                if(this.state.selectedOption.value == undefined || !this.state.first || !this.state.last )
                                    this.setState({flag:false})
                                else {   
                                    this.state.name.map((credit) => {
                                       if(this.state.first && this.state.last && this.state.selectedOption.value == credit.id) this.addbank(credit)
                                    })
                                }
                            }
                        } >
                        <Text style={styles.font}>CONFIRM</Text>
                       
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#7FD6F6',
        marginTop: 60,
        height: 53,
        marginLeft: 40,
        width:'40%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        
    },
    font: {
        fontSize: 15,
        fontFamily: "avenir_medium",
        color:'#222222'
        
    },
    text1: {
        marginLeft: 40,
        fontFamily: "avenir_medium",
        marginTop:60, 
        fontSize: 24, 
        color:'#6BA624',
        lineHeight: 37
    },
    text2: {
        marginLeft: 40, 
        fontFamily: "Avenir",
        marginTop:30, 
        fontSize: 20,
    },
    text3: {
        marginLeft:10, 
        marginTop:64, 
        fontFamily: "Avenir"
    },
    text4: {
        borderBottomWidth:1, 
        paddingLeft:-7, 
        fontSize:17, 
        fontFamily:"Avenir"
    },
    text5: {
        marginTop:9, 
        paddingLeft:40,
        fontFamily:"avenir_medium", 
        color:"#222222",
        fontSize: 13
    }
})

const mapStateToProps = (state) => {
   return {
        detail: state.detail.detail,
    }
}

export default connect(mapStateToProps)(Bank)