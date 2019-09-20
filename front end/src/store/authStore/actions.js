import * as actionType from './actionType' ;


export const register=(data)=>{

    return{
        type:actionType.register,
        token:data
    }
}



export const registerStart=()=>{

    return{
        type:actionType.registerStart,
        
    }
}


export const registerEnd=()=>{

    return{
        type:actionType.registerEnd
    }
}

export const registerFail=(errors)=>{

   return{
    type:actionType.registerFail,
    error:errors
   } 
}







//login actios


export const login=(data)=>{

    return{
        type:actionType.login,
        token:data
    }
}



export const loginStart=()=>{

    return{
        type:actionType.loginStart,
        
    }
}


export const loginEnd=()=>{

    return{
        type:actionType.loginEnd
    }
}

export const loginFail=(errors)=>{

   return{
    type:actionType.loginFail,
    error:errors
   } 
}


//logout

export const logout=()=>{
    return{
        type:actionType.logout
    }
}

//add token
export const tokenAdd=(token)=>{
    return{
        type:actionType.tokenAdd,
        token:token
    }
}



//change password actions


export const changePassword=()=>{

    return{
        type:actionType.changePassword,
        
    }
}



export const changePasswordStart=()=>{

    return{
        type:actionType.changePasswordStart,
        
    }
}


export const changePasswordEnd=()=>{

    return{
        type:actionType.changePasswordEnd
    }
}

export const changePasswordFail=(errors)=>{

   return{
    type:actionType.changePasswordFail,
    error:errors
   } 
}