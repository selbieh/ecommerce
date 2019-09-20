import * as actionsType from './actionType';

const initialState ={
    showMain:'auto'
}

const uiReducer=(state=initialState,action)=>{
    const newState={...state}

    switch(action.type){
        case actionsType.hideMainPic:
            newState.showMain=0;
            return newState
        case actionsType.showMainPic:
            newState.showMain='auto';
            return newState    
        default:return newState
    }
   
}

export default uiReducer;