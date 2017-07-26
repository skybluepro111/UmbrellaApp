export const positionReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_POSITION_SUCCESS':
            return {
                ...state,
                position: action.position
            }
        default:
            return state;
    }
}


export const loginReducer = (state = { status: false }, action) => {
    switch(action.type) {
        case 'GET_LOGIN_SUCCESS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const countryReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_COUNTRY_SUCCESS':
            console.log("res", action.country)
            return {
                ...state,
                country: action.country
            }
        default:
            return state;
    }
}

export const tokenReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_ACCESS_TOKEN':
            // console.log("actoken", action.token)
            return {
                ...state,
                token: action.token
            }    
        default:
            return state;
    }
}

export const infoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_USER_INFO':
            
            return {
                ...state,
                info: action.info
            }    
        default:
            return state;
    }
}

export const userDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_USER_DETAILS':
            // console.log("INFO", action.detail)
            return {
                ...state,
                detail: action.detail
            }    
        default:
            return state;
    }
}

export const userDetailsReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_DETAILS':
           return {
                ...state,
                details: action.details
            }    
        default:
            return state;
    }
}


export const phoneCodeReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_COUNTRY_SETTINGS':
           return {
                ...state,
                prefix: action.prefix
            }    
        default:
            return state;
    }
}

export const phoneNumberReducer = (state = [], action) => {
    switch(action.type) {
        case 'PHONE_NUMBER':
           return {
                ...state,
                phoneNum: action.phoneNum
            }    
        default:
            return state;
    }
}

export const creditReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_CREDIT_START':
            return {
                isLoading: true,
                credit: null
            }
        case 'GET_CREDIT_SUCCESS':
           return {
                ...state,
                isLoading: false,
                credit: action.credit
            }    
        case 'GET_CREDIT_FAILED':
           return {
                ...state,
                isLoading: false,
                credit: null
            }  
        default:
            return state;
    }
}

export const creditCalReducer = (state = {}, action) => {
    switch(action.type) {
        case 'CREDIT_CALCULATE_START':
            return {
                ...state,
                isLoading: true,
                calculate: {}
            }
        case 'CREDIT_CALCULATE_SUCCESS':       
           return {
                ...state,
                 isLoading: false,
                calculate: action.calculate
            }  
        case 'CREDIT_CALCULATE_FAIL':
            return {
                ...state,
                isLoading: false,
                calculate: {}
            }  
        default:
            return state;
    }
}

export const creditApplyReducer = (state = [], action) => {
    switch(action.type) {
       
        case 'CREDIT_APPLY_SUCCESS':       
           return {
                ...state,
                loanId: action.loanId
            }  
        
        default:
            return state;
    }
}

export const amountReducer = (state = [], action) => {
    switch(action.type) {
       
        case 'GET_AMOUNT':       
           return {
                ...state,
                amount: action.amount
            }  
        
        default:
            return state;
    }
}

export const loanDetailReducer = (state = {}, action) => {
    switch(action.type) {
       
        case 'GET_LOAN_DETAIL':       
           return {
                ...state,
                loanDetail: action.loanDetail
            }  
        
        default:
            return state;
    }
}



