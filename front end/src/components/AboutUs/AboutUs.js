import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './Stylee.js';
import Typography from '@material-ui/core/Typography/Typography';
import AboutUsPic from './AboutUsPic/AboutUsPic';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {trans} from '../../store/language/LangObject'



class AboutUs extends Component {
    render() {

        const { classes } = this.props;
        return (
            <div className={classes.MainDiv} style={{marginTop:'65px'}}>
            <Grid container spacing={10}  alignContent='center' alignItems='center' item justify='center'>
                    <Grid item xs={12} >
                            <Typography variant='h4' align='center' color='primary'>
                                {trans.aboutGlassOffice[this.props.lang]}
                            </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                            <Typography variant='h5' align='center' color='initial'>
                                {trans.wellcome[this.props.lang]}
                            </Typography>
                     </Grid>
                        <Grid item xs={12} align='center'sm={6}>
                            <AboutUsPic/>
                        </Grid>
                        <Grid item xs={12} align='center'  sm={6}>
                                        
                            <Typography variant='h6' align='justify' color='primary'>
                                {trans.glassOfficeDefind[this.props.lang]}
                            </Typography>
                        </Grid>

                    </Grid>
        
            </div>

        );
    }
}


const mapeStateToProps=state=>{
    return{
        lang:state.lang.lang
    }
}


export default connect(mapeStateToProps)(withStyles(styles)(AboutUs));