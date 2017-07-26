import { combineReducers } from 'redux';
import 
{ 
    countryReducer, 
    tokenReducer, 
    infoReducer,
    userDetailReducer, 
    phoneCodeReducer, 
    phoneNumberReducer,
    creditReducer,
    creditCalReducer,
    creditApplyReducer,
    amountReducer,
    loanDetailReducer,
    loginReducer,
    positionReducer 
} from './reducer';

export default combineReducers({
    country: countryReducer,
    token: tokenReducer,
    info: infoReducer,
    detail: userDetailReducer,
    prefix: phoneCodeReducer,
    phoneNum: phoneNumberReducer,
    credit: creditReducer,
    calculate: creditCalReducer,
    loanId: creditApplyReducer,
    amount: amountReducer,
    loanDetail: loanDetailReducer,
    status: loginReducer,
    position: positionReducer
});
