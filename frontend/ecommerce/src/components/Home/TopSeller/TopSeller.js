import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ImgMediaCard from './TopSellerCard/TopSellerCard';
import Typography from '@material-ui/core/Typography';
import { connect} from 'react-redux';



class TopSeller extends Component {


    
    render() {
       
    
        return (
            <div >
                 <Typography component="h2" variant="h3" align='center' style={{margin:'120px',color:'gray'}} gutterBottom>
                        .  ألأكثر <span style={{color:"#7b1fa2"}}>مبيعات</span> خلال الشهر
                        </Typography>
                       

                    <Grid container spacing={10} justify='center'  >
                        {this.props.products.slice(0,3).map(product => (
                        <Grid key={product.id} item >
                            <ImgMediaCard image={product.image_1} xs={3}
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
        products:state.product.products
    }
}


export default connect (mapeStateToProps,null)( TopSeller);