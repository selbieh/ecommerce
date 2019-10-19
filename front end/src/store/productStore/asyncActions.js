import * as actions from './actions';
import axios from "../../components/Axios/axios";


export const asyncFetchProduct=()=>{
    return dispatch=>{
        dispatch(actions.getProductStart());
        axios.get('/products/')
        .then(re=>{
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
            //console.log(re.data)
            dispatch(actions.paginate(re.data))
            dispatch(actions.getProductEnd())
        })
    }
}