import axios from 'axios';
import {fetchShopCartFromServer} from '../../store/shopCartStore/asyncAction'

export const asyncOrdernow =(data,token)=>{
    return dispatch=>{
        axios({
            method:"post",
            baseURL:'http://127.0.0.1:8000/orders/',   
            headers:{
              Authorization:'Token '.concat(token)
          },
            data:data
          })
          .then(re=>{
            dispatch(fetchShopCartFromServer(token))
            })
        .catch(err=>{
          console.log(err.response.data)
        })

    }
}


