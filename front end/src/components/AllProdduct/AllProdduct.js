import React, { Component } from 'react';
import classes from './AllProdduct.module.css';
import ProductCard from './ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {addProductToShopCart,deletItem} from '../../store/shopCartStore/asyncAction';
import Button from '@material-ui/core/Button';
import {asyncFetchPaginate} from '../../store/productStore/asyncActions';




class AllProdduct extends Component {


    paginate=(url)=>{
      this.props.paginate(url)
    }
    
    addItem=(product)=>{
       
        this.props.addProductToCart(product.id,this.props.token,this.props.shopCartId)

    }
    removeItem=(id)=>{
      const ShopCart=this.props.ShopCartItems
      console.log(ShopCart)
      const productObjct=ShopCart.filter(e=>e.product.id===id)[0]
      console.log(productObjct)
      
      this.props.removeItemFromCart(productObjct.id,this.props.token)
    }


    render() {
      //console.log(this.props.prevPage)
        return (
            <div className={classes.AllProdduct}>
               <Grid container className={classes.root} spacing={10} justify='center' alignItems='center'>

                   {this.props.products.map(product=>{
                       return  <Grid item lg={4}   key={product.id} >
                                    <ProductCard 
                                    title={product.title}
                                    details={product.detail}
                                    image={product.image_1}
                                    addItem={()=>this.addItem(product)}
                                    id={product.id}
                                    removeItem={()=>this.removeItem(product.id)}
                                    product={product} 
                                    {...this.props}                             
                                    />
                                 </Grid>
                   })}
                   
                </Grid> 
                <Button variant="contained" color="primary" style={{margin:'15px'}} onClick={()=>this.paginate(this.props.nextPage)} disabled={this.props.nextPage===null} >
                  التالي
                </Button>
            
              


                <Button variant="contained" color="primary" style={{margin:'15px'}} onClick={()=>this.paginate(this.props.prevPage)} disabled={this.props.prevPage===null} >
                  السابق
                </Button>



            </div>
            


        );
    }
}

const mapeStateToProps=state=>{
    return{
      products:state.product.products,
      token:state.auth.token,
      isAuthed:state.auth.token!==null,
      shopCartId:state.shopCart.shopCartId,
      userId:state.shopCart.userId,
      ShopCartItems:state.shopCart.shopCartItems,
      nextPage:state.product.nextPage,
      prevPage:state.product.prevPage,

    }
  }


  const mapActionTpProps=dispatch=>{
    return{
      addProductToCart:(productId,token,shopCartId,userId)=>dispatch(addProductToShopCart(productId,token,shopCartId,userId)),
      paginate:(url)=>dispatch(asyncFetchPaginate(url)),
      removeItemFromCart:(productId,token)=>dispatch(deletItem(productId,token))
  
    }
  }

export default  connect(mapeStateToProps,mapActionTpProps) (AllProdduct);