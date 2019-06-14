import React, { Component } from 'react';
import classes from './AllProdduct.module.css';
import ProductCard from './ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';



class AllProdduct extends Component {
    render() {
        return (
            <div className={classes.AllProdduct}>
               <Grid container className={classes.root} spacing={10} justify='center' alignItems='center'>
                    <Grid item lg={4} >
                        <ProductCard/>
                    </Grid>
                    <Grid item lg={4} >
                        <ProductCard/>
                    </Grid>
                    <Grid item lg={4} >
                        <ProductCard/>
                    </Grid>
                </Grid> 


            </div>
           


        );
    }
}

export default AllProdduct;