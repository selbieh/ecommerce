

const initState={

    shopCartId:null,
    userId:null,
    shopCartItems:[]

}




const shopCartReducer=(state=initState,action)=>{

    const newState={...state}

    switch(action.type){
        case 'ADDFETCHEDITEMS':
            newState.shopCartId=action.data.id
            newState.userId=action.data.user
            newState.shopCartItems=action.data.products
            return newState
        
        case 'EDIT_SHOP_CART':
            newState.shopCartItems=action.data
            //console.log(action.data)   
            return newState 
        default:return newState    
    }

}

export default shopCartReducer;