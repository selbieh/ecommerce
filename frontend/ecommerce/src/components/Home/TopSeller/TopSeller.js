import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ImgMediaCard from './TopSellerCard/TopSellerCard';
import Typography from '@material-ui/core/Typography';

import img1 from '../TopSeller/TopSellerCard/1.jpg';
import img2 from '../TopSeller/TopSellerCard/2.jpg';
import img3 from '../TopSeller/TopSellerCard/3.jpg';







class TopSeller extends Component {

   imgs=[img1,img2,img3];

        


    
    render() {
       
    
        return (
            <div >
                 <Typography component="h2" variant="h3" align='center' style={{margin:'120px',color:'gray'}} gutterBottom>
                        .  ألأكثر <span style={{color:"#7b1fa2"}}>مبيعات</span> خلال الشهر
                        </Typography>
                       

                    <Grid container spacing={10} justify='center'  >
                        {this.imgs.map(value => (
                        <Grid key={value} item >
                            <ImgMediaCard image={value} xs={3}/>
                        </Grid>
                        ))}
                    </Grid>
                    

                    
                
            
            </div>
            
        );
    }
}

export default TopSeller;