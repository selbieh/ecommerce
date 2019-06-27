import React ,{Component}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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








class Login extends Component {


  state = { 
    error:{
      username:'',
      password:''
    },
    value:{
      username:'',
      password:''
    }
   }


   //joi schema
   schema={
    username:joi.string().required().regex(/^[0][0-9]{10}$/).error(errors => {
      return {
        message: "رقم المحمول غير صحيح "
      };
    }),

    password:joi.string().required().min(5).max(30).error(errors => {
      return {
        message: "على الاقل خمس عناصر "
      };
    }),
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
  
    if (prevState.value.username !==  this.state.value.username ||
       prevState.value.password !==this.state.value.password){
     this.formValidate()

    }
   }

  
  
//form submit
 
   submitHandler=(event)=>{
    event.preventDefault();
    this.props.login(this.state.value)

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
  if(!this.state.error.username && 
    !this.state.error.password && 
    this.state.value.password.trim().length !== 0 &&
    this.state.value.username.trim().length ){
    isButtuDisabled=false;
  }

 let redirect=null;
  if (this.props.isAuthed && this.props.loginBackendError ===null){
    redirect=<Redirect to = '/'/>
  }

  if (!this.props.showSpiner ){
    return (

      <Modal  >

     
      <Container component="main" maxWidth="xs">
      <Typography align="right" >
            <Close color="inherit" onClick={this.cancelFormHandler}/>
      </Typography>

        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        <Box color={red}> 
            {this.props.loginBackendError}
      </Box>

          <Typography component="h1" variant="h5">
            تسجيل دخول
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="رقم المحمول"
              name="username"
              autoFocus
              placeholder=' 0122XXXXXXX مثال'
              onChange={(e)=>this.valueInputHandler(e,'username')}
            />

  <Box color={red}>
       {this.state.error.username}
  </Box>
 

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمه السر"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>this.valueInputHandler(e,'password')}

              
            />

            <Box color={red}>
              {this.state.error.password}
           </Box>
 
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="تذكرني"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isButtuDisabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  نسيت كلمه السر؟
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"ليس لديك حساب ؟ للتسجيل "}
                </Link>
              </Grid>
            </Grid>
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
    loginBackendError:state.auth.loginBackendError,
  }
}

const mapActionToProps=dispatch=>{
  return{
    login:(data)=>dispatch(asyncActions.asyncLogin(data))
  }
}


export default connect(mapeStateToProps,mapActionToProps) ( withStyles(styles)(Login));

