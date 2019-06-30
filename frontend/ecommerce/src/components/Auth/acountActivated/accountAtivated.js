import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import Box from '@material-ui/core/Box/Box';

class AccountActivated extends Component {
    render(){
        return(
                <React.Fragment>
                <Modal {...this.props} >
                  <Container component="main" maxWidth="xs" >
                      <div align='center' >
                            <Box>
                                تم تفعيل حسابك بنجاح
                            </Box>
                      </div>
                  </Container>
                </Modal>
                </React.Fragment>
        
        )
    }
}

    



export default AccountActivated;