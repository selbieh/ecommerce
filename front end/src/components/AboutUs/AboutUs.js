import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper/Paper';
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
            <div className={classes.MainDiv}>

            <Paper className={classes.Bigpaper}>
                 <Paper className={classes.Smallpaper}>
                     <Typography variant='h5' align='center' color='primary'>
                         {trans.aboutGlassOffice[this.props.lang]}
                     </Typography>
                     <Typography variant='h6' align='center' color='initial'>
                     {trans.wellcome[this.props.lang]}

                     </Typography>

                     <br/>
                     <br/>
                     <br/>
                     <Grid container spacing={10}  alignContent='center' alignItems='center' item justify='center'>
                        <Grid item xs={3}  container >
                            <AboutUsPic/>
                        </Grid>
                        <Grid item xs={6}>
                                        
                            <Typography variant='h6' align='justify' color='primary'>
                                {trans.glassOfficeDefind[this.props.lang]}
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </Paper>
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