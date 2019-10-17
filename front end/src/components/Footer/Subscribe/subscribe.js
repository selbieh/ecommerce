import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Email from '@material-ui/icons/Email';
import {connect} from 'react-redux';
import {trans} from '../../../store/language/LangObject.js';
import axios from '../../Axios/axios'
import { Typography } from '@material-ui/core';


const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class suscribe extends Component  {

  state={
    email:'',
    valid:false,
    subscribed:false
  }


  emailSubscribe=()=>{
    axios.post('subscribe/',{'email':this.state.email})
    .then(res=>{
      this.setState((prevState=>({subscribed:!prevState.subscribed})))
    })
    .catch(er=>{
      this.setState((prevState=>({subscribed:!prevState.subscribed})))

    })
  }

  emailHandler=(e)=>{
    this.setState({email:e.target.value})
  }

  emailValidateHandler=(email)=>{
    var re = /\S+@\S+\.\S+/
    
    if ( re.test(String(email).toLowerCase()) ){
     this.setState((prevState)=>({valid:!prevState.valid}))
    }
  }

  componentDidUpdate(_,prevState){
    if (this.state.email !== prevState.email){
      const email=this.state.email
      this.emailValidateHandler(email)

    }
  
    
  }

  render (){

    const { classes } = this.props;

    if (this.state.subscribed){

      return (
        <Typography>
            {trans.thanksForSubscribe[this.props.lang]}
        </Typography>
      )

    }else{
      return(

        <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input} placeholder={trans.suscribeNewProduct[this.props.lang]} type="email" onChange={(e)=>this.emailHandler(e)}/>
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions" disabled={! this.state.valid}onClick={this.emailSubscribe}>
          <Email />
        </IconButton>
      </Paper>
      )

    }
   
  }}
  

const mapeStateToProps=state=>{
  return{
    
    lang:state.lang.lang
  }
}


export default connect (mapeStateToProps)(withStyles(styles)(suscribe));
