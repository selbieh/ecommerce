import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './Stylee.js';
import Typography from '@material-ui/core/Typography/Typography';
import AboutUsPic from './AboutUsPic/AboutUsPic';
import Grid from '@material-ui/core/Grid';



class AboutUs extends Component {
    render() {

        const { classes } = this.props;
        return (
            <div className={classes.MainDiv}>

            <Paper className={classes.Bigpaper}>
                 <Paper className={classes.Smallpaper}>
                     <Typography variant='h5' align='center' color='primary'>
                         عن جلاس اوفيس 
                     </Typography>
                     <Typography variant='h6' align='center' color='initial'>
                            اهلا بكم في عالم جلاس اوفيس للاثاث المكتبي
                     </Typography>

                     <br/>
                     <br/>
                     <br/>
                     <Grid container spacing={10}  alignContent='center' alignItems='center' item justify='center'>
                        <Grid item xs={3}  container >
                            <AboutUsPic/>
                        </Grid>
                        <Grid item xs={6}>
                                        
                            <Typography variant='h6' align='center' color='primary'>
                            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديوا
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </Paper>
            </div>

        );
    }
}

export default withStyles(styles)(AboutUs);