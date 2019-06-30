import React,{Component} from 'react';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import Box from '@material-ui/core/Box/Box';


class CheckMailToActivate extends Component {

     render(){

    
    return(
        <React.Fragment>
        <Modal >
          <Container component="main" maxWidth="xs" >
              <div align='center' >
                    <Box>
                        من فضلك اضغط على لينك تفعيل الحساب المرسل لبريدك الالكتروني 
                    </Box>
              </div>
          </Container>
        </Modal>
        </React.Fragment>

 )}}



export default CheckMailToActivate;