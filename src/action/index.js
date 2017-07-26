import * as actionTypes from './actionTypes';
import axios from 'axios';
import FBSDK from 'react-native-fbsdk';
import  HOST  from '../common'
const {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export const getPositionSuccess = (position) => {
    return {
        type: actionTypes.GET_POSITION_SUCCESS,
        position
    }
}

export const getPosition = () => {
     return(dispatch) => {     
        navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(getPositionSuccess(position));
                });
     }
}

export const getCountrySuccess = (country) => {
    return {
        type: actionTypes.GET_COUNTRY_SUCCESS,
        country
    }
}

export const getCountry = (lon, lat) => {
     return(dispatch) => {            
        const config = {
            "headers": {'content-type': 'application/json'}
        };

        const data = {
            'lon': lon,
            'lat': lat
        }
       axios.post(HOST+'/api/country', data, config)
        .then(res => {
            
            dispatch(getCountrySuccess(res.data));
        })
        .catch(err => console.log(err));           
    }
}

export const getAccessToken = (token) => {
    return {
        type: actionTypes.GET_ACCESS_TOKEN,
        token
    }
}

export const getUserInfo = (info) => {
  
   return {
        type: actionTypes.GET_USER_INFO,
        info
    }
}

export const getLoginSuccess = (status) => {
  
   return {
        type: actionTypes.GET_LOGIN_SUCCESS,
        status
    }
}

export const getToken = () => {
    // console.log("pos1");    
    return(dispatch) => {            
            AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    dispatch(getAccessToken(data));
                     const responseInfoCallback = (error, result) => {
                        if (error) {
                          alert('Error fetching data: ' + error.toString());
                        } else {
                      
                            dispatch(getUserInfo(result));
                            const config = {
                                "headers": {'content-type': 'application/json'}
                            };
                            
                            var info1 = {
                                'fname': result.first_name,
                                'mname': result.middle_name,
                                'lname': result.last_name,
                                'email': result.email,
                                'dob': result.birthday,
                                'user_location': "{103.851959, 1.290270}",
                                'access_token': result.id,
                                'phone_number':'',
                                'accept': '1',
                                'sex': "",
                                'profilepic': 'profilepic',
                                'relationship': 'married',
                                'signupByMob': false

                            }
                            axios.post(HOST+'/api/user/api', info1, config)
                            .then(res => {
                            //    this.getLogin(data.accessToken, data.userID)
                                var info2 = {
                                    'fbToken': data.accessToken,
                                    'access_token': info1.access_token
                                }
                                
                                axios.post(HOST+'/api/user/login-via-fb', info2, config)
                                .then(res => {                 
                                    dispatch(getLoginSuccess(res.data));
                                       
                                    })               
                            })
                            
                        }
                    }

                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                        accessToken: data.accessToken,
                        parameters: {
                            fields: {
                            string: 'email,name,first_name,middle_name,last_name, birthday, gender, age_range'
                            }
                        }
                        },
                        responseInfoCallback
                    );

                  
                    new GraphRequestManager().addRequest(infoRequest).start()
               
                  }
            )
           
    }
                 
}

export const getUserdetailsSuccess = (detail) => {
    // console.log("pos3333", detail)
    return {
        type: actionTypes.GET_USER_DETAILS,
        detail
    }
}

export const getUserdetails = () => {
    return(dispatch) => {            
        axios.get(HOST+'/api/user/details')
        .then(res => {
         dispatch(getUserdetailsSuccess(res.data))
        })
        .catch(err => {
              console.log("em", err)
           
        });             
    }
}

export const getPhoneCodeSuccess = (prefix) => {
   return {
        type: actionTypes.GET_COUNTRY_SETTINGS,
        prefix
    }
}

export const getPhoneCode = () => {
    return(dispatch) => {            
        axios.get(HOST+'/api/country/settings')
        .then(res => {
           dispatch(getPhoneCodeSuccess(res.data))
        })
                   
    }
}

export const phoneNumber = (phoneNum) => {
   
    return {
        type: actionTypes.PHONE_NUMBER,
        phoneNum
    }
}


export const getCreditSuccess = (credit) => {
   return {
        type: actionTypes.GET_CREDIT_SUCCESS,
        credit
    }
}

export const getCredit = () => {
    return(dispatch) => {            
        axios.get(HOST+'/api/credit/available')
        .then(res => {
           dispatch(getCreditSuccess(res.data))
        })
                   
    }
}

export const creditCalculateSuccess = (calculate) => {
   return {
        type: actionTypes.CREDIT_CALCULATE_SUCCESS,
        calculate
    }
}

export const creditCalculate = (amount, term) => {
    
    return(dispatch) => {            
        const config = {
            "headers": {'content-type': 'application/json'}
        };
        // console.log("[AMOUNT, TERM]", amount,term) 
        data = {
            apply_loan_amount: amount,
            payment_term: term
        }
     
        
        axios.post(HOST+'/api/credit/calculate', data, config)
        .then(res => {            
     
            dispatch(creditCalculateSuccess(res.data));
        })
        .catch(err => {
            // console.log(err);            
            dispatch({ type: 'CREDIT_CALCULATE_FAIL' });
        });           
    }
                   
    
}

export const creditApplySuccess = (loanId) => {
    return {
        type: actionTypes.CREDIT_APPLY_SUCCESS,
        loanId
    }
}

export const creditApply = (amount, term, id) => {
    return(dispatch) => {            
        const config = {
            "headers": {'content-type': 'application/json'}
        };
        
        data = {
            apply_loan_amount: amount,
            payment_term: term,
            user_payment_method_id: id
        }
        // dispatch({ type: 'CREDIT_CALCULATE_START' });
        axios.post(HOST+'/api/credit/apply', data, config)
        .then(res => {            
            dispatch(creditApplySuccess(res.data));
        })
        .catch(err => {
            console.log(err);            
            // dispatch({ type: 'CREDIT_CALCULATE_FAIL' });
        });           
    }
}

export const getAmount = (amount) => {
    return {
        type: actionTypes.GET_AMOUNT,
        amount
    }
}

export const getLoanSuccess = (loanDetail) => {
   return {
        type: actionTypes.GET_LOAN_DETAIL,
        loanDetail
    }
}

export const getLoanDetail = () => {
    return(dispatch) => {            
        axios.get(HOST+'/api/credit')
        .then(res => {
           dispatch(getLoanSuccess(res.data))
        })
                   
    }
}









