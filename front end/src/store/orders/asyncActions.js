import axios from "../../components/Axios/axios";
import {fetchShopCartFromServer} from '../../store/shopCartStore/asyncAction'

export const asyncOrdernow =(data,token)=>{
    return dispatch=>{
        axios({
            method:"post",
            url:'/orders/',   
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


