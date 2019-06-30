import * as actions from './actions';
//import * as actionType from './actionType';
import axios from 'axios';

export const asyncRegister=(data)=>{
    
    return dispatch=>{
        dispatch(actions.registerStart());

        axios.post('http://127.0.0.1:8000/rest-auth/registration/',data)
        .then(res=>{

            dispatch(actions.register(res.data.key));
            dispatch(actions.registerEnd()) ; 
            localStorage.setItem('tokenKey',res.data.key);

        }).catch(err=>{
            console.log(err.response.data)
            if (err.response.data){
                
                const registerBackendError=err.response.data;
                const errors={}
                Object.keys(registerBackendError).map(obj=>{
                  return  errors[obj]=registerBackendError[obj][0]                 
                })
                dispatch(actions.registerFail(errors))
            }
    
            })

    }
}




export const asyncLogin=(data)=>{
    
    return dispatch=>{
        dispatch(actions.loginStart());

        axios.post('http://127.0.0.1:8000/rest-auth/login/',data)
        .then(res=>{
            dispatch(actions.login(res.data.key));
            dispatch(actions.loginEnd()) ; 
            localStorage.setItem('tokenKey',res.data.key);

        }).catch(err=>{
            if (err.response){   
                dispatch(actions.loginFail('اسم المستخدم او كلمه السر غيرصحيحه'))
            }
    
            })

    }
}

export const asyncLougout=()=>{
    return dispatch=>{
        localStorage.removeItem('tokenKey')
        // request header should be add to delete user login token from backend
        //https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
        dispatch(actions.logout());
    }
   
}


export const asyncAuthAppStart=()=>{
    return dispatch=>{
        if(localStorage.getItem('tokenKey') ){
            dispatch(actions.tokenAdd(localStorage.getItem('tokenKey')))
        }
    }
}