import * as actions from './actions';
//import * as actionType from './actionType';
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