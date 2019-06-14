import React, { Component } from 'react';
import NewlyCard from './NewlyCard/NewlyCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';




class NewlyLunched extends Component {

    state={
         images : [
            {
              url: `url(${image1})`,
              title: 'مكتب صغير',
              width: '100%',
            },
            {
              url: `url(${image2})`,
              title: 'مكتب 3',
              width: '100%',
            },
            {
              url: `url(${image3})`,
              title: 'مكتب ستيرو',
              width: '100%',
            },
          ]
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
                        {this.state.images.map(value => (
                        <Grid key={value.title} item  >
                            <NewlyCard title={value.title}
                            width={value.width}
                            img={value.url}/>
                        </Grid>
                        ))}
                    </Grid> 
                    </Grid>
                    </Grid>

            </div>
            
        );
    }
}

export default NewlyLunched;

