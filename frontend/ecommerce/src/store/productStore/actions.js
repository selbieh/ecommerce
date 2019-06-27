import * as actionType from './actionType' ;


export const getProductStart=()=>{
    return {
        type:actionType.fetchProductStart
    }
}

export const getProductEnd=()=>{
    return {
        type:actionType.fetchProductEnd
    }
}

export const getProductFail=(erorr)=>{
    return {
        type:actionType.fetchProductFail,
        erorr:erorr
    }
}

export const getProduct=(data)=>{
    return {
        type:actionType.fetchProduct,
        data:data
    }
}