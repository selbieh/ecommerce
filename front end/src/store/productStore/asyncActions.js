import * as actions from './actions';
import axios from 'axios';


export const asyncFetchProduct=()=>{
    return dispatch=>{
        dispatch(actions.getProductStart());
        axios.get('http://127.0.0.1:8000/products/')
        .then(re=>{
            console.log(re.data)
            dispatch(actions.getProduct(re.data))
            dispatch(actions.getProductEnd())
        })
    }
}


export const asyncFetchPaginate=(url)=>{
    return dispatch=>{
        dispatch(actions.getProductStart());
        axios.get(url)
        .then(re=>{
            console.log(re.data)
            dispatch(actions.paginate(re.data))
            dispatch(actions.getProductEnd())
        })
    }
}