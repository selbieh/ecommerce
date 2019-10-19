import React,{Component} from 'react';
import axios from '../../Axios/axios';
import Spinner from '../../spinner/spinner';
import Modal from '../../Modal/Modal';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router';
import {trans} from '../../../store/language/LangObject';
import { connect } from 'react-redux';


 

class RegisterConfirmMail extends Component {

    state={
        showSpinner:true
    }

    componentDidMount(){
        const token =this.props.match.params.token
        axios.post('/rest-auth/registration/verify-email/',{key:token })
         
        .then(res=>{
            //condetional setState to prevent infint loop warning and memory los 
            if(this.state.showSpinner){
                this.setState((prev)=>{
                    return ({showSpinner:!prev.showSpinner})
                })
            }
           

          
        })
    }
    componentWillMount(){
        //to clear setState prefix
        this.setState((prev)=>{
            return ({showSpinner:!prev.showSpinner})
        })
    }

    render() {
           
                  
                  
      if (!this.state.showSpinner){
        return <Redirect to={{
            pathname: '/message',
            state: { message: `${trans.accountActivated[this.props.lang]}` }
        }}
/>
      }else{
              
    return (
        <Modal >
        <Container component="main" maxWidth="xs" >
                <div align='center' >
                    <Spinner  align='center' />
                    </div>
            </Container>
     </Modal>
         );
      }
   
    }
}

const mapsStateToProps=state=>{
    return{
     
      lang:state.lang.lang
  
    }
  }

export default connect(mapsStateToProps) (RegisterConfirmMail);