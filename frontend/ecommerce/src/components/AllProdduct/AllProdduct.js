import React, { Component } from 'react';
import classes from './AllProdduct.module.css';
import ProductCard from './ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'



class AllProdduct extends Component {
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
      products:state.product.products
    }
  }

export default  connect(mapeStateToProps) (AllProdduct);