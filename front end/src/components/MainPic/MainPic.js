import React,{Component} from 'react';
import img from './office.jpg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {styles} from './MainPicStyle';
import * as actionsType from '../../store/uiReducer/asyncActions';
import {connect} from 'react-redux';
import {trans} from '../../store/language/LangObject'





class MainPic extends Component {


  aboutUs=()=>{
    this.props.hideMain()
    this.props.history.push('/about-us')


  }
    
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



            <Paper className={classes.root} elevation={1}  style={{width:'90%',margin:'auto'}}>
                <Typography variant="h5" component="h3" style={{marginTop:'auto'}}>
                 {trans.glassOffice[this.props.lang]}
                </Typography>
                <Typography component="p" >
                  {trans.glassOfficeIntro[this.props.lang]}
                </Typography>
          </Paper>
         
          <Button variant="outlined"  style={{backgroundColor:'#7b1fa2',color:'white',marginBottom:'auto',marginTop:'auto'}}
          onClick={this.aboutUs}
          >{trans.aboutGlassOffice[this.props.lang]} </Button>

          </div>
              
          </div>  
        );
    }
}

const mapeStateToProps=state=>{
  return{
    lang:state.lang.lang
  }
}

const mapeActionsToProps=(dispatch)=>{
  return {
      hideMain:()=>dispatch(actionsType.hideMain())
  }
}

export default connect(mapeStateToProps,mapeActionsToProps) (withStyles(styles)(MainPic));