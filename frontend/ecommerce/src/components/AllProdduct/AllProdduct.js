import React, { Component } from 'react';
import classes from './AllProdduct.module.css';
import ProductCard from './ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {changeProductInCart} from '../../store/shopCartStore/asyncAction';



class AllProdduct extends Component {

    
    addItem=(product)=>{
        const shopCartList=this.props.ShopCartItems
        const updatedList=shopCartList.concat(product)
        const updatedIdList=updatedList.map(e=>e.id)
        this.props.changeProductList(updatedIdList,this.props.token,this.props.shopCartId,this.props.userId)

    }
    removeItem=(id)=>{
        const filtered =this.props.ShopCartItems.filter(e=>e.id !== id)
        const filterId=filtered.map(e=>e.id)
        this.props.changeProductList(filterId,this.props.token,this.props.shopCartId,this.props.userId)
        //console.log('fillterd',filterId)
    }


    render() {
        return (
            <div className={classes.AllProdduct}>
               <Grid container className={classes.root} spacing={10} justify='center' alignItems='center'>

                   {this.props.products.map(product=>{
                       return  <Grid item lg={4}   key={product.id}>
                                    <ProductCard 
                                    title={product.title}
                                    details={product.detail}
                                    image={product.image_1}
                                    addItem={()=>this.addItem(product)}
                                    id={product.id}
                                    removeItem={()=>this.removeItem(product.id)}
                                  
                                    />
                                 </Grid>
                   })}
                   
                </Grid> 


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

    }
  }


  const mapActionTpProps=dispatch=>{
    return{
      changeProductList:(productId,token,shopCartId,userId)=>dispatch(changeProductInCart(productId,token,shopCartId,userId))
  
    }
  }

export default  connect(mapeStateToProps,mapActionTpProps) (AllProdduct);