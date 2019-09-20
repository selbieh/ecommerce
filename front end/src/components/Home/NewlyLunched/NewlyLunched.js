

import React, { Component } from 'react';
import NewlyCard from './NewlyCard/NewlyCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {hideMain} from '../../../store/uiReducer/asyncActions' 




class NewlyLunched extends Component {
    prdoductDetailsRedirect=(product)=>{
        this.props.hideMain()
        this.props.history.push('/product-details',product)
        //console.log(product)
      }


    
    render() {
        return (
            <div >
                 <Grid container  spacing={10} justify="center">
                    <Grid item xs={10} >
                    <Typography component="h2" variant="h3" align='center' style={{margin:'120px',color:'gray'}} gutterBottom>
                    .  قائمه <span style={{color:"#7b1fa2"}}>المعروض</span> حديثا
                    </Typography>

                    <Grid container  justify="center" spacing={10}>
                        {this.props.products.map(product => (
                        <Grid key={product.id} item 
                        onClick={()=>this.prdoductDetailsRedirect(product)}  >
                            <NewlyCard title={product.name}
                            img= {product.image_1}/>
                        </Grid>
                        ))}
                    </Grid> 
                    </Grid>
                    </Grid>

            </div>
            
        );
    }
}

const mapStateToProps=state=>{
  return{
    products:state.product.newlyLunched
  }
}



const mapActionToProps=(dispatch)=>{
  return{
    hideMain:()=>dispatch(hideMain())
  }

}
export default connect(mapStateToProps,mapActionToProps)(NewlyLunched);

