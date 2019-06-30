import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../../spinner/spinner';
import Modal from '../../Modal/Modal';
import Container from '@material-ui/core/Container';


 

class RegisterConfirmMail extends Component {
    state = { 
        redirectNow:false
     }
    componentDidMount(){
        const id=this.props.match.params.id
        const token =this.props.match.params.token
        axios.post('http://127.0.0.1:8000/auth/users/activate/',{uid:id,token:token})
        .then(res=>{
           this.setState((prev)=>{
               return {redirectNow:!prev.redirectNow}
           })
        })
    }


    render() {
           
       let redirectComponent=  <Modal {...this.props}>
                                    <Container component="main" maxWidth="xs" >
                                        <div align='center' >
                                                <Spinner  align='center' />
                                        </div>
                                    </Container>
                                </Modal>;
       if(!this.state.redirectNow){
            redirectComponent=<Redirect to='/'/>
       }
    return (
          
            <p>{redirectComponent}</p>
        );
    }
}

export default RegisterConfirmMail;