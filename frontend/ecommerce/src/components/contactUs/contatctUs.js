import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box/Box';
import { red } from '@material-ui/core/colors';
import {styles} from './styles';
import { withStyles } from '@material-ui/core/styles';
import ContactMail from '@material-ui/icons/ContactMail';
import joi from '@hapi/joi';
import axios from "axios";
import Spinner from '../spinner/spinner';








class contatctUs extends Component {
    state = {
        value:{
          username:'',
          email:'',
          subject:'',
          message:''
    
        },
        error:{
          username:'',
          email:'',
          subject:'',
          message:''
    
        },
        showSpinner:false,
        submited:false
        }
        
        schema={
          username:joi.string().regex(/^[0][0-9]{10}$/).error(errors => {
            return {
              message: "رقم المحمول غير صحيح "
            };
          }),
      
          subject:joi.string().required().min(5).max(30).error(errors => {
            return {
              message: "على الاقل خمس عناصر "
            };
          }),
          message:joi.string().required().min(15).max(255).error(errors => {
            return {
              message: "على الاقل خمسه عشر حرف  "
            };
          }),


          email:joi.string().email({ minDomainSegments: 2 }).error(errors => {
            return {
              message: " البريد الألكتروني غير صحيح "
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
           }else{
             this.setState({error:{}})
              }
            }    

        componentDidUpdate(_, prevState){
  
          if (prevState.value.username !==  this.state.value.username ||
             prevState.value.subject !==this.state.value.subject||
             prevState.value.message !==this.state.value.message||
             prevState.value.email !==this.state.value.email ){
           this.formValidate()
      
          }
         }      


        submitHandler=(event)=>{
          event.preventDefault();
          this.setState({showSpinner:true})
          axios.post('http://127.0.0.1:8000/contact-us/',this.state.value)
          .then(res=>{
            this.setState({showSpinner:false,submited:true})
          })
          .catch(er=>{
            console.log('faild')

          })
         
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
            
            
            
    render() {
        const {classes}= this.props
        let isButtuDisabled=true;
        if(!this.state.error.username && 
          !this.state.error.message && !this.state.error.subject && 
          !this.state.error.email && 
          this.state.value.subject.trim().length !== 0 &&
          this.state.value.message.trim().length !== 0 &&
          this.state.value.email.trim().length !== 0 &&
          this.state.value.username.trim().length ){
          isButtuDisabled=false;
        }
        let form= <form className={classes.form} onSubmit={this.submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="رقم المحمول"
              autoFocus
              onChange={(e)=>this.valueInputHandler(e,'username')}

            />
          </Grid>
          
          { this.props.backendError? <Box color={red}>
            {this.props.backendError.username}
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
              label="بريد الكتروني"
              name="email"
              autoComplete="email"
              onChange={(e)=>this.valueInputHandler(e,'email')}

            />
          </Grid>
          <Box color={red}> 
          {this.state.error.email}
        </Box>
        { this.props.backendError? <Box color={red}>
              {this.props.backendError.email}
          </Box> :null}
          
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="subject"
              label="عنوان الرساله"
              type="input"
              id="subject"
              onChange={(e)=>this.valueInputHandler(e,'subject')}

            />
          </Grid>
          <Box color={red}>
              {this.state.error.subject}
          </Box>
          <Grid item xs={12} style={{height:'150px',width:'100%'}}>
            <textarea
              variant="outlined"
              required
              name="message"
              label="الرساله"
              type="textarea"
              id="message"
              autoComplete="current-password"
              onChange={(e)=>this.valueInputHandler(e,'message')}
              style={{height:'150px',width:'100%'}}

            />
          </Grid>
          <Box color={red} style={{marginTop:'15px'}}>
              {this.state.error.message}
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
          ارسل
        </Button>
        
      </form>
      if (this.state.showSpinner){
        form=<Spinner/>
      }else if (!this.state.showSpinner && this.state.submited){
          form=<p>نشكركم على تواصلكم معنا وسنقوم بالرد عليك فى اسرع وقت </p>
      }


     

        return (
            <Container component="main" maxWidth="xs">
  
          <CssBaseline />
          <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ContactMail />
                </Avatar>
                
                <Typography component="h1" variant="h5">
                     اتصل بنا
                </Typography>
                    {form}         
          </div>
          
        </Container>
        );
    }
}

export default withStyles(styles)(contatctUs);