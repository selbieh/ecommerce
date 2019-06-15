import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './styles';
import Box from '@material-ui/core/Box/Box';
import { red } from '@material-ui/core/colors';
import joi from '@hapi/joi';
import Close from '@material-ui/icons/Close';











class SignUp extends Component {
  state = {
    value:{
      userName:'',
      email:'',
      password:''

    },
    error:{
      userName:'',
      email:'',
      password:''
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
        
        
        
        schema={
          userName:joi.string().regex(/^[0][0-9]{10}$/).error(errors => {
            return {
              message: "رقم المحمول غير صحيح "
            };
          }),
      
          password:joi.string().required().min(5).max(30).error(errors => {
            return {
              message: "على الاقل خمس عناصر "
            };
          }),

          email:joi.string().email({ minDomainSegments: 2 }).error(errors => {
            return {
              message: " البريد الألكتروني غير صحيح "
            };
          })
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
             prevState.value.password !==this.state.value.password||
             prevState.value.email !==this.state.value.email ){
           this.formValidate()
      
          }
         }      

         cancelFormHandler=()=>{
          this.props.history.push('/')
        }
        
  render() {


    const {classes}= this.props

      return (


        <Modal >
    
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
              سجل الان
            </Typography>
            <form className={classes.form} onSubmit={this.submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="fname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="رقم المحمول"
                    autoFocus
                    onChange={(e)=>this.valueInputHandler(e,'userName')}

                  />
                </Grid>
                
                <Box color={red}>
                    {this.state.error.userName}
                </Box>
                
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="بريد الكتروني"
                    name="email"
                    autoComplete="email"
                    onChange={(e)=>this.valueInputHandler(e,'email')}

                  />
                </Grid>

                <Box color={red}>
                    {this.state.error.email}
                </Box>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="كلمه السر"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e)=>this.valueInputHandler(e,'password')}

                  />
                </Grid>
                <Box color={red}>
                    {this.state.error.password}
                </Box>
 
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                
                سجل الان
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    لديك حساب بالفعل ؟ سجل دخول
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

export default withStyles(styles)(SignUp);


