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
import { connect } from 'react-redux'
import * as Actions from '../../action';
import $HOST from '../../common'

export default class Before extends Component {
    constructor(props) {
        super(props);

        
    }
     
    static navigationOptions = {
        title: 'Welcome',
    }; 

    componentWillMount() {
         
         const { navigate } = this.props.navigation;
        axios.get($HOST+'/api/credit')
        .then(res => {
            console.log("BEFORE", res.data)
            if(res.data.length > 0)
                navigate('Nonactive', { name: 'nonactive' })
            else  navigate('Success', { name: 'success' })
        })
        .catch(err => {
              console.log("em", err)
           
        });
    }

       
    render() {
        
        return(
                <View style={{flex:1, backgroundColor: 'white',justifyContent:'center', alignItems:'center'}}>
                    
                </View>    
        )
    }
}



// const mapDispatchToProps = (dispatch) => {
//     return {
//         getCredit: () => dispatch(Actions.getCredit())
//     }
// }
// export default connect(null,mapDispatchToProps)(Before)



