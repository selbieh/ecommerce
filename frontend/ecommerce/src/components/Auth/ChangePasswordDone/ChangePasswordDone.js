import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import Box from '@material-ui/core/Box/Box';

class ChangePasswordDone extends Component {
    render(){
        return(
                <React.Fragment>
                <Modal {...this.props} >
                  <Container component="main" maxWidth="xs" >
                      <div align='center' >
                            <Box>
                        تم تغيير كلمه السر بنجاح
                            </Box>
                      </div>
                  </Container>
                </Modal>
                </React.Fragment>
        
        )
    }
}

    



export default ChangePasswordDone;