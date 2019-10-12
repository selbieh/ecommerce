import React, { Component } from 'react';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box/Box';
import { TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import {styles} from './stylee';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from '../../Axios/axios';
import joi from '@hapi/joi';
import {connect} from 'react-redux';
import {trans} from '../../../store/language/LangObject'





class ForgetPasswrd extends Component {
    state = { 
        email:'',
        frontEntError:null
     }


     schema={
        email:joi.string().email({ minDomainSegments: 2 }).error(errors => {
            return {
              message: `${trans.wrongEmail[this.props.lang]}`
            };
          })
        }
    
        formValidate=()=>{
            const errorOject={}
            const result=joi.validate({email:this.state.email},this.schema,{abortEarly:false})
           
            if(result.error){
              for (let i of result.error.details){
                errorOject[i.path[0]]=i.message
              }
              this.setState({frontEntError:errorOject}) 
             } else{
                this.setState({frontEntError:null})

              }}


              componentDidUpdate(_, prevState){
  
                if (prevState.email !==  this.state.email ){
                 this.formValidate()
            
                }
               }      

     valueInputHandler=(e)=>{
         //console.log(this.state.email)
        this.setState({email:e.target.value})

     }

     submitHandler=(event)=>{
         event.preventDefault()
         const email = this.state.email
         axios.post('/rest-auth/password/reset/',{email:email})
         .then(res=>{
             console.log(res)
             if(res.status === 200){
                this.props.history.push('/message',{message:`${trans.checkMailRestPassword[this.props.lang]}`})
             }
         }
         )
         .catch(er=>{
             if (er.response.data){
                console.log(er.response.data)

             }
         })
     }


    render() {


        const {classes}=this.props;
        let buttonDisabled=true
        if(this.state.email.trim().length >5 && !this.state.frontEntError){
            buttonDisabled=false;
        }

        return (
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MailIcon />
                </Avatar>
       

                <Typography component="h1" variant="h5">
                    {trans.enterEmail[this.props.lang]}
                </Typography>
                        <form className={classes.form} noValidate onSubmit={this.submitHandler}>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            type='email'
                            required
                            fullWidth
                            id="email"
                            value={this.state.email}

                            label={trans.enterEmail[this.props.lang]}
                            name="email"
                            autoFocus
                            autoComplete="email"
                            placeholder='exampel@exampel.xxx'
                            onChange={(e)=>this.valueInputHandler(e)}
                            />

                           
                           {this.state.frontEntError ? <Box color={red}>
                                 {this.state.frontEntError.email}
                            </Box>:null} 




                            <Button
                                disabled={buttonDisabled}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                    {trans.sendNow[this.props.lang]}
                                </Button>

                         </form>
             </div>
        );
    }
}


const mapeStateToProps=state=>{
    return{
      lang:state.lang.lang
    }
  }

export default connect(mapeStateToProps) (withStyles(styles) (ForgetPasswrd));