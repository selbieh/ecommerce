

const initState={
    lang:'en'
}



const langReducer =(state=initState,action)=>{

    const newState={...state}

    switch(action.type){
        case ('en'):
            newState.lang='ar' 
            return newState
        
        case('ar'):
            newState.lang='en' 
            return newState

        default:return newState
    }
}



export default langReducer;