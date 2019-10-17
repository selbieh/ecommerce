import React ,{Component}from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {styles} from './useStyles';
import Box from '@material-ui/core/Box/Box';
import { red } from '@material-ui/core/colors';
import joi from '@hapi/joi';
import {connect} from 'react-redux';
import Link from '@material-ui/core/Link';
import * as asyncActions from '../../store/orders/asyncActions';
import {trans} from '../../store/language/LangObject.js';
import { Paper } from '@material-ui/core';



class CheckOut extends Component {


  state = { 
    error:{
      mobiel:'',
      fullAdresse:''
    },
    value:{
      mobiel:'',
      fullAdresse:''
    },
    sending:false
   }


   //joi schema
   schema={
    mobiel:joi.string().required().regex(/^[0][0-9]{10}$/).error(errors => {
      return {
        message: `${trans.wrongPhone[this.props.lang]}`
      };
    }),

    fullAdresse:joi.string().required().min(15).max(255).error(errors => {
      return {
        message: `${trans.minEle[this.props.lang]}`
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
  
    if (prevState.value.mobiel !==  this.state.value.mobiel ||
       prevState.value.fullAdresse !==this.state.value.fullAdresse){
     this.formValidate()

    }
   }

  
  
//form submit
 
   submitHandler=(event)=>{

    event.preventDefault();
    const data={
        ...this.state.value
    }
    data['orderProduct']=this.props.orderProductIdList
    //console.log(data)
    //console.log(this.props.token)
  this.props.orederNow(data,this.props.token)
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
  if(!this.state.error.mobiel && 
    !this.state.error.fullAdresse && 
    this.state.value.fullAdresse.trim().length !== 0 &&
    this.state.value.mobiel.trim().length ){
    isButtuDisabled=false;
  }

 

  if (this.props.shopCartItems.length >0){
    return (


     
      <Container component="main" maxWidth="xs">
     

        <CssBaseline />
        <div className={classes.paper}>
          
      
          <Typography component="h1" variant="h5" color='secondary'
 >
           {trans.orderData[this.props.lang]}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobiel"
              label={trans.Mobile[this.props.lang]}
              name="mobiel"
              autoFocus
              placeholder={trans.mobileExampel[this.props.lang]}
              onChange={(e)=>this.valueInputHandler(e,'mobiel')}
            />

  <Box color={red}>
       {this.state.error.mobiel}
  </Box>
 

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="fullAdresse"
              label={trans.fullAdresse[this.props.lang]}
              type="textarea"
              id="fullAdresse"
              autoComplete="current-fullAdresse"
              onChange={(e)=>this.valueInputHandler(e,'fullAdresse')}

              
            />

            <Box color={red}>
              {this.state.error.fullAdresse}
           </Box>
 
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={isButtuDisabled}
              color='primary'

            >
              {trans.buyNow[this.props.lang]}
            </Button>
           
           
          </form>
          <Link
          component="button"
          variant="body2"
          onClick={this.cancelFormHandler}
          color='secondary'
            >
            {trans.cancelBuy[this.props.lang]}
            </Link>
        </div>
       
      </Container>
  
      
    );
  }else{
    return ( 
    <React.Fragment>
      <br/>
      <br/>
<Paper>
      <Typography variant="h5" color='textSecondary' align='center' style={{marginTop:'90px'}}>
            {trans.orderSucs[this.props.lang]}
      </Typography>
      </Paper>
    </React.Fragment>
   
    )}
     
  }
}

const mapeStateToProps=state=>{
  return{
    showSpiner:state.auth.showSpiner,
    isAuthed:state.auth.token !==null ,
    token:state.auth.token,
    orderProductIdList:state.shopCart.shopCartItems.map(e=>e.id),
    shopCartItems:state.shopCart.shopCartItems,
    lang:state.lang.lang
  }
}

const mapActionToProps=dispatch=>{
  return{
    
    orederNow:(data,token)=>dispatch(asyncActions.asyncOrdernow(data,token))
  }
}


export default connect(mapeStateToProps,mapActionToProps) ( withStyles(styles)(CheckOut));

