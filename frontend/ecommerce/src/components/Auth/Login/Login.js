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






class Login extends Component {


  state = { 
    error:{
      userName:'',
      password:''
    },
    value:{
      userName:'',
      password:''
    }
   }

   schema={
    userName:joi.string().required().regex(/^[0][0-9]{10}$/).error(errors => {
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


   componentDidUpdate(_, prevState){
  
    if (prevState.value.userName !==  this.state.value.userName ||
       prevState.value.password !==this.state.value.password){
     this.formValidate()

    }
   }

  
  

 
   submitHandler=(event)=>{
    event.preventDefault();
       }


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


   cancelFormHandler=()=>{
     this.props.history.push('/')
   }
   
   
  render() {

  const {classes}= this.props;
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="رقم المحمول"
              name="userName"
              autoFocus
              placeholder=' 0122XXXXXXX مثال'
              onChange={(e)=>this.valueInputHandler(e,'userName')}
            />

  <Box color={red}>
       {this.state.error.userName}
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
  }
}

export default withStyles(styles)(Login);

