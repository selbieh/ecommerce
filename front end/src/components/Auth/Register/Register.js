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
import {connect} from 'react-redux';
import Spinner from '../../spinner/spinner';
import * as asyncAction from '../../../store/authStore/asyncActions';
import {Redirect} from 'react-router';
import Zoom from '@material-ui/core/Zoom';
import { Link as RouterLink } from 'react-router-dom';
import {trans} from '../../../store/language/LangObject.js';
import DjangoCSRFToken from 'django-react-csrftoken';






class SignUp extends Component {
  state = {
    value:{
      username:'',
      email:'',
      password1:'',
      password2:''

    },
    error:{
      username:'',
      email:'',
      password1:'',
      password2:''

    }    }

    Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

   
   
    submitHandler=(event)=>{
      event.preventDefault();
      
      this.props.register(this.state.value)
     
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
          username:joi.string().regex(/^[0][0-9]{10}$/).error(errors => {
            return {
              message: `${trans.wrongPhone[this.props.lang]}`
            };
          }),
      
          password1:joi.string().required().min(5).max(30).error(errors => {
            return {
              message: `${trans.minEle[this.props.lang]}`
            };
          }),
          password2:joi.string().required().min(5).max(30).error(errors => {
            return {
              message: `${trans.minEle[this.props.lang]}`
            };
          }),


          email:joi.string().email({ minDomainSegments: 2 }).error(errors => {
            return {
              message: `${trans.wrongEmail[this.props.lang]}`
            };
          })
        }
      
        formValidate=()=>{
          const errorOject={}
          const result=joi.validate(this.state.value,this.schema,{abortEarly:false})
         
          if(result.error){
            for (let i of result.error.details){
              errorOject[i.path[0]]=i.message
            }
            this.setState({error:errorOject}) 
      
            }else if(this.state.value.password1 !==this.state.value.password2){
                errorOject['password2']=`${trans.samePassword[this.props.lang]}`
                this.setState({error:errorOject}) 
           }else{
             this.setState({error:{}})
              }
            }    

            componentDidMount(){
              if (localStorage.getItem("tokenKey")){
                this.props.history.push("/")
              }
            }

        componentDidUpdate(_, prevState){
  
          if (prevState.value.username !==  this.state.value.username ||
             prevState.value.password1 !==this.state.value.password1||
             prevState.value.password2 !==this.state.value.password2||
             prevState.value.email !==this.state.value.email ){
           this.formValidate()
      
          }
         }      

         cancelFormHandler=()=>{
          this.props.history.push('/')
        }
        
  render() {


    const {classes}= this.props

    

    
  let isButtuDisabled=true;
  if(!this.state.error.username && 
    !this.state.error.password1 && 
    !this.state.error.password2 && 
    !this.state.error.email && 
    this.state.value.password1.trim().length !== 0 &&
    this.state.value.password2.trim().length !== 0 &&
    this.state.value.email.trim().length !== 0 &&
    this.state.value.username.trim().length ){
    isButtuDisabled=false;
  }

  let redirect=null;
  if (this.props.showSpiner && !this.props.backendError && this.props.isAuthed){
    redirect=<Redirect to = {{
      pathname:'/message',
      state:{message:`${trans.activateAcountCheckMail[this.props.lang]}`}
    }}/>
  }

  if (!this.props.showSpiner){
    return (

      <Modal >
  <Zoom in timeout={2000}>

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
           {trans.registerNow[this.props.lang]}
          </Typography>
       
          <form className={classes.form} onSubmit={this.submitHandler}>

            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label={trans.Mobile[this.props.lang]}
                  value={this.state.value.username}
                  autoFocus
                  onChange={(e)=>this.valueInputHandler(e,'username')}

                />
              </Grid>
              
              { this.props.backendError? <Box color={red}>
                { this.props.backendError.username? trans.userUsedBefor[this.props.lang]:null}
              </Box> :null}

              <Box color={red}>
                  {this.state.error.username}
              </Box>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={trans.enterEmail[this.props.lang]}
                  value={this.state.value.email}
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>this.valueInputHandler(e,'email')}

                />
              </Grid>
              <Box color={red}> 
              {this.state.error.email}
            </Box>
            { this.props.backendError ? <Box color={red}>
                  {this.props.backendError.email ? trans.mailUsedBefor[this.props.lang]:null}
              </Box> :null}
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password1"
                  label={trans.password[this.props.lang]}
                  value={this.state.value.password1}

                  type="password"
                  id="password1"
                  autoComplete="current-password"
                  onChange={(e)=>this.valueInputHandler(e,'password1')}

                />
              </Grid>
              <Box color={red}>
                  {this.state.error.password1}
              </Box>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label={trans.reWritePassword[this.props.lang]}
                  value={this.state.value.password2}

                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  onChange={(e)=>this.valueInputHandler(e,'password2')}

                />
              </Grid>
              <Box color={red}>
                  {this.state.error.password2}
              </Box>

              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isButtuDisabled}

            >
              
             {trans.registerNow[this.props.lang]}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to='/login' component={this.Link1} variant="body2">
                 {trans.alreadyHaveAccount[this.props.lang]}
                </Link>
              </Grid>
            </Grid>
            <DjangoCSRFToken/>

          </form>
        </div>
        
      </Container>
      </Zoom>
      </Modal>
  
    )
    
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

const mapsStateToProps=state=>{
  return{
    backendError:state.auth.registerBackendError,
    showSpiner:state.auth.showSpiner,
    isAuthed:state.auth.token !==null,
    lang:state.lang.lang

  }
}

const mapActionsToProps=(dispatch)=>{
  return{
  
    register:(data)=> dispatch(asyncAction.asyncRegister(data))
  }

}

export default connect(mapsStateToProps,mapActionsToProps) (withStyles(styles)(SignUp));


