import React,{Component} from 'react';
import img from './office.jpg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing (2),
    paddingBottom: theme.spacing (2),
    opacity:'0.75'
  },
  SelectRouteContaier:{

  }
});




class MainPic extends Component {



    
    render() {
      const { classes } = this.props;

        return (
          <div style={{width:'100%',height:'auto',textAlign:'center',position:'relative'}} onClick={this.props.scroll}>
            <img src={img} alt='pic' style={{width:'100%',height:'auto',border:'0px'}}/>
            
            <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)' }}>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>



            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                  .جلاس اوفيس
                </Typography>
                <Typography component="p">
                   .دلوقتي افرش مكتبك مع جلاس اوفيس واستمتع ب 30% خصم
                   مع ضمان استبدال لمده سنتين ضد عيوب الصناعه
                </Typography>
          </Paper>
          <br></br>
          <br></br>

          <Button variant="outlined"  style={{backgroundColor:'#7b1fa2',color:'white'}}>عرض المنتجات</Button>

          </div>
              
          </div>  
        );
    }
}

export default withStyles(styles)(MainPic);