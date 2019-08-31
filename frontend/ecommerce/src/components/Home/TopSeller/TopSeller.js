import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TopSellerCard from './TopSellerCard/TopSellerCard';
import Typography from '@material-ui/core/Typography';
import { connect} from 'react-redux';
import {hideMain} from '../../../store/uiReducer/asyncActions' 



class TopSeller extends Component {

    prdoductDetailsRedirect=(product)=>{
        this.props.hideMain()
        this.props.history.push('/product-details',product)
        //console.log(product)
      }


    
    render() {
       
    
        return (
            <div >
                 <Typography component="h2" variant="h3" align='center' style={{margin:'120px',color:'gray'}} gutterBottom>
                        .  ألأكثر <span style={{color:"#7b1fa2"}}>مبيعات</span> خلال الشهر
                        </Typography>
                       

                    <Grid container spacing={10} justify='center'  >
                        {this.props.products.map(product => (
                        <Grid key={product.id} item
                        onClick={()=>this.prdoductDetailsRedirect(product)} >
                            <TopSellerCard image={product.image_1} xs={3}
                            title={product.name}
                            detail={product.detail}
                            
                            />
                        </Grid>
                        ))}
                    </Grid>
                    

                    
                
            
            </div>
            
        );
    }
}

const mapeStateToProps=state=>{
    return{
        products:state.product.bestSeller
    }
}

const mapActionToProps=(dispatch)=>{
    return{
      hideMain:()=>dispatch(hideMain())
    }
  
  }

export default connect (mapeStateToProps,mapActionToProps)( TopSeller);