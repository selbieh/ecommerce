import * as actionType from './actionType';


const initialState={
    showSpinner:false,
    products:[],
    bestSeller:[],
    newlyLunched:[],
    numberOfpages:null,
    nextPage:null,
    prevPage:null,
    error:null,
   
}

 const productStore=(state=initialState ,action)=>{
    const newState={...state}
   
    switch(action.type){
        
        case actionType.fetchProductStart:
            newState.showSpinner=true
            newState.error=null
            break;
        case actionType.fetchProductEnd:
            newState.showSpinner=false
            break;    
        case actionType.fetchProductFail:
            newState.showSpinner=false
            newState.error=action.error
            break;
        case actionType.fetchProduct:
            newState.products=action.data.results
            newState.showSpinner=false
            newState.nextPage=action.data.next
            newState.prevPage=action.data.previous
            newState.newlyLunched=action.data.results.slice(0,3)
            newState.bestSeller=action.data.results.slice(3,6)

           // newState.numberOfpages=action.data.count
            break;
        case actionType.paginate:
            newState.products=action.data.results
            newState.showSpinner=false
            newState.nextPage=action.data.next
            newState.prevPage=action.data.previous
           // newState.numberOfpages=action.data.count
            break;                            

        default:
            return newState
    }
    
    return newState;
}

export default productStore;