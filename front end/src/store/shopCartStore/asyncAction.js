import axios from "../../components/Axios/axios";

export const addFetchedItem=(data)=>{
    return{
        type:'ADDFETCHEDITEMS',
        data:data
    }
}


//const editShopCart=(shopCartProduct)=>{
//    return{
//        type:'EDIT_SHOP_CART',
//        data:shopCartProduct
//    }
//}

export const fetchShopCartFromServer=(token)=>{
    return dispatch=>{
        axios({
            method:'get',
            url:'/shopcart/',
            headers: {
                Authorization:'Token '.concat(token),
            }
        })
        .then(response=>{
            console.log(response)

            dispatch(addFetchedItem(response.data.result))
        })
        .catch(er=>{
            console.error(er.data)
        })
    }
}


export const addProductToShopCart=(productId,token,shopCartId)=>{
  return dispatch=>{
      axios({
          url:`/shopcart/${shopCartId}/`,
          method:'put',
          headers:{
              Authorization:'Token '.concat(token)
          },
          data:{
            //"id": shopCartId,
            //"user": userId,
            "id": productId
        }

      })
      .then(re=>{
          dispatch(fetchShopCartFromServer(token)) 
      })
}}




export const deletItem =(id,token)=>{
    return dispath=>{

        axios({
            method:'delete',
            url:`/prodctObject/${id}`,
            headers: {
                Authorization:'Token '.concat(token),
            },
   
        })  
        .then(res=>{
            dispath(fetchShopCartFromServer(token))
            //console.log(res)
        })
        .catch(er=>{
        })
}
}


export const  incObject=(id,quantity,token)=>{
        return dispatch=>{
            if (quantity >= 1){

            axios({
                url:`http://127.0.0.1:8000/prodctObject/${id}/`,
                method:'patch',
                headers: {
                    Authorization:'Token '.concat(token),
                },
                data:{quantity:quantity}
       
    
            }).then(res=>{
                dispatch(fetchShopCartFromServer(token))
            })
    
        }
}}
    
  