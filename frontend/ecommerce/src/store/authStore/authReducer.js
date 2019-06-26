import * as actionType from './actionType';


const initialState={
    token:null,
    showSpiner:false,
    registerBackendError:null,
    loginBackendError:null,
    
}

 const authStore=(state=initialState ,action)=>{
    const newState={...state}
   
    switch(action.type){
        //register process
        case actionType.registerEnd:
            newState.showSpiner=false;
            break;

        case actionType.register:
            newState.token=action.token;
            break;
        case actionType.registerFail:
            newState.showSpiner=false;
            newState.registerBackendError=action.error
            break;
        case actionType.registerStart:
            newState.showSpiner=true;
            newState.token=null;
            newState.registerBackendError=null;
            break;
            
        //login process
        case actionType.loginEnd:
            newState.showSpiner=false;
            break;

        case actionType.login:
            newState.token=action.token;
            break;
        case actionType.loginFail:
            newState.showSpiner=false;
            newState.loginBackendError=action.error
            break;
        case actionType.loginStart:
            newState.showSpiner=true;
            newState.token=null;
            newState.loginBackendError=null;
            break;

        //logout
        case actionType.logout:
            newState.token=null;
            break;
        //app Start auth ckeck 
            case actionType.tokenAdd:
                newState.token=action.token;
                break;
    
        default:
            return newState
    }
    
    return newState;
}

export default authStore;