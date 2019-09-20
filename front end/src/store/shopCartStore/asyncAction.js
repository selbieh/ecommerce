import axios from 'axios';

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
            url:'http://127.0.0.1:8000/shopcart/',
            headers: {
                Authorization:'Token '.concat(token),
            }
        })
        .then(response=>{
            dispatch(addFetchedItem(response.data.result))
        })
        .catch(er=>{
            console.error(er.data)
        })
    }
}


export const changeProductInCart=(productId,token,shopCartId,userId)=>{
  return dispatch=>{
      axios({
          url:`http://127.0.0.1:8000/shopcart/${shopCartId}/`,
          method:'put',
          headers:{
              Authorization:'Token '.concat(token)
          },
          data:{
            //"id": shopCartId,
            "user": userId,
            "shopCartProduct": productId
        }

      })
      .then(re=>{
          dispatch(fetchShopCartFromServer(token)) 
      })
}}