import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import Box from '@material-ui/core/Box/Box';
import {Redirect} from 'react-router-dom';

class Message extends Component {
    render(){
        if (this.props.location.state ){

        return(
                <React.Fragment>
                <Modal {...this.props} >
                  <Container component="main" maxWidth="xs" >
                      <div align='center' >
                            <Box>
                                {this.props.location.state.message}
                            </Box>
                      </div>
                  </Container>
                </Modal>
                </React.Fragment>
        
        )
    }else{
        return (
            <Redirect to='/'/>
        )
    }
}
}

    



export default Message;