import React ,{Component}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import {styles} from './useStyles';
import Box from '@material-ui/core/Box/Box';
import { red } from '@material-ui/core/colors';
import joi from '@hapi/joi';
import Close from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import * as asyncActions from '../../../store/authStore/asyncActions';
import Spinner from '../../spinner/spinner';
import {Redirect} from 'react-router';
import {trans} from '../../../store/language/LangObject.js';
import DjangoCSRFToken from 'django-react-csrftoken';









class ChangePassword extends Component {


  state = { 
    error:{
        new_password1:'',
        new_password2:'',
    },
    value:{
        new_password1:'',
        new_password2:'',
    }
   }


   //joi schema
   schema={
   
    new_password1:joi.string().required().min(5).max(30).error(errors => {
        return {
          message: `${trans.minEle[this.props.lang]}`
        };
      }),

    new_password2:joi.string().required().min(5).max(30).error(errors => {
      return {
        message: `${trans.samePassword[this.props.lang]}`
      };
    })
  }


  //form validation
  formValidate=()=>{
    const result=joi.validate(this.state.value,this.schema,{abortEarly:false})
    const errorOject={}
      
      if(result.error){

      for (let i of result.error.details){
        errorOject[i.path[0]]=i.message
      }
      this.setState({error:errorOject}) 

      }else{
        this.setState({error:{}}) 

      }    
  }

//form validate due to input chages

   componentDidUpdate(_, prevState){
  
    if (prevState.value.new_password1 !==  this.state.value.new_password1 ||
       prevState.value.new_password2 !==this.state.value.new_password2 ){
     this.formValidate()

    }
   }

  
  
//form submit
 
   submitHandler=(event)=>{
    event.preventDefault();
    const data={
      uid:this.props.match.params.Uid,
      token:this.props.match.params.Token,
      new_password1:this.state.value.new_password1,
      new_password2:this.state.value.new_password2,


    }
    this.props.sumitNewPassword(data)


       }



//   valueInputHandler    
   valueInputHandler=(e,name)=>{
     const cloneState={
       ...this.state,
      }
      const clonedValue={...cloneState.value}
      clonedValue[name]=e.target.value
    this.setState({
      value:clonedValue
    })
   }

//cancel redidreict 
   cancelFormHandler=()=>{
     this.props.history.push('/')
   }
   
   
  render() {

  const {classes}= this.props;

  let isButtuDisabled=true;
  if(!this.state.error.new_password1 && 
    !this.state.error.new_password2 && 
    this.state.value.new_password1.trim().length !== 0 &&
    this.state.value.new_password2.trim().length !== 0 
    ){
    isButtuDisabled=false;
  }

 let redirect=null;
  if ( this.props.passwordChanged)
    {
    redirect=<Redirect to={{
      pathname: '/message',
      state: { message: `${trans.passwordResetSucc[this.props.lang]}` }
  }}
/>
  }

  if (!this.props.showSpiner ){
    return (

      <Modal>

     
      <Container component="main" maxWidth="xs">
      <Typography align="right" >
            <Close color="inherit" onClick={this.cancelFormHandler}/>
      </Typography>

        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
     

          <Typography component="h1" variant="h5">
              {trans.changePassword[this.props.lang]}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitHandler}>
            
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new_password1"
              label={trans.newPassword[this.props.lang]}
              type="password"
              id="new_password1"
              autoComplete="current-password"
              onChange={(e)=>this.valueInputHandler(e,'new_password1')}

              
            />
             
            <Box color={red}>
              {this.state.error.new_password1}
           </Box>
  
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new_password2"
              label={trans.reWritePassword[this.props.lang]}
              type="password"
              id="new_password2"
              autoComplete="current-password"
              onChange={(e)=>this.valueInputHandler(e,'new_password2')}

              
            />

            <Box color={red}>
              {this.state.error.new_password2}
           </Box>
  

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isButtuDisabled}
            >
              {trans.changePassword[this.props.lang]}
            </Button>
            <DjangoCSRFToken/>

            
          </form>
        </div>
       
      </Container>
  
      </Modal>
      
    );
  }else{
    return ( 
    <React.Fragment>
        <Modal >
          <Container component="main" maxWidth="xs" >
              <div align='center' >
                    <Spinner  align='center' />
              </div>
          </Container>
        </Modal>

          {redirect}

    </React.Fragment>
   
    )}
     
  }
}

const mapeStateToProps=state=>{
  return{
    showSpiner:state.auth.showSpiner,
    isAuthed:state.auth.token !==null ,
    changePasswordError:state.auth.changePasswordError,
    token:state.auth.token,
    passwordChanged:state.auth.passwordChanged,
    lang:state.lang.lang
  }
}




const mapActionToProps=dispatch=>{
  return{
   sumitNewPassword:(data)=>dispatch(asyncActions.asynChangePasswordWithUID(data))
  }
}


export default connect(mapeStateToProps,mapActionToProps) ( withStyles(styles)(ChangePassword));

