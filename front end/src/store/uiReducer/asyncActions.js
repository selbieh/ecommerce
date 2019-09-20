import * as actionsType from './actionType';

export const showMain=()=>{
    return{
        type:actionsType.showMainPic,
    }
}

export const hideMain=()=>{
    return{
        type:actionsType.hideMainPic,
    }
}