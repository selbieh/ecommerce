import * as actions from './actions';
//import * as actionType from './actionType';
import axios from "../../components/Axios/axios";
import {fetchShopCartFromServer,addFetchedItem} from '../shopCartStore/asyncAction';

export const asyncRegister=(data)=>{
    
    return dispatch=>{
        dispatch(actions.registerStart());

        axios.post('/rest-auth/registration/',data)
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

        axios.post('/rest-auth/login/',data)
        .then(res=>{
            dispatch(actions.login(res.data.key));
            dispatch(actions.loginEnd()) ; 
            localStorage.setItem('tokenKey',res.data.key);
            dispatch(fetchShopCartFromServer(localStorage.getItem('tokenKey')))

        }).catch(err=>{
            if (err.response){   
                dispatch(actions.loginFail('رقم المحمول  او كلمه السر غيرصحيحه'))
            }
    
            })

    }
}

export const asyncLougout=()=>{
    return dispatch=>{
        const token=localStorage.getItem('tokenKey')
        axios({
            url:'/rest-auth/logout/',
            method:'post',
            Authorization:'Token '.concat(token),    
        })
        .then(res=>{
            localStorage.removeItem('tokenKey')
            dispatch(actions.logout());
            dispatch(addFetchedItem({id:null,user:null,products:[]}))
        }).catch(er=>{
            console.log(er)
        })
       

    }
   
}


export const asyncAuthAppStart=()=>{
    return dispatch=>{
        if(localStorage.getItem('tokenKey') ){
            dispatch(actions.tokenAdd(localStorage.getItem('tokenKey')));
            dispatch(fetchShopCartFromServer(localStorage.getItem('tokenKey')))
            
        }
    }
}


export const asynChangePassword=(data,token)=>{
    return dispatch=>{
        dispatch(actions.changePasswordStart())

        axios({
            method: 'post',
            data:data,
            url: '/rest-auth/password/change/',
            headers: {
                Authorization:'Token '.concat(token),
            
            }
          
        })
        .then(res=>{
            dispatch(actions.changePassword())
            dispatch(actions.changePasswordEnd())
        })
        .catch(err=>{
            console.log(err.response.data)
            dispatch(actions.changePasswordFail(err.response.data))
        })
            

    }
}





export const asynChangePasswordWithUID=(data)=>{
    return dispatch=>{
        dispatch(actions.changePasswordStart())
        axios.post('rest-auth/password/reset/confirm/',data)
        .then(res=>{
            dispatch(actions.changePassword())
            dispatch(actions.changePasswordEnd())
        })

        .catch(err=>{
            dispatch(actions.changePasswordFail(err.response.data))

        })
    }
}