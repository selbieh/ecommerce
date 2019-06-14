import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Subscribe from './Subscribe/subscribe';
import Contacts from './Contacts/Contacts';


const style={
    containerUper:{
        marginBottoms:'0px',
        backgroundColor:'#7b1fa2',
        marginTop:'160px',
        textAlign:'center',
        align:'center'

    },
    Toolbar:{

        align:'center',
        height:'auto',
        textAlign:'center',
        margin:'auto',

    },
    line:{
        width:'100%',
        height:'1px',
        backgroundColor:'white',
        color:'white',
        zIndex:'300'
    }
}

class Footer extends Component {

     
        
    render() {
      

        return (

           <React.Fragment>
               <AppBar position='static' style={style.containerUper}>
                   <Toolbar style={style.Toolbar} >
                         <Subscribe />
                   </Toolbar>
                   <Toolbar style={style.Toolbar} >
                        <h3 style={{color:'white'}}>جهات الاتصال</h3>
                   </Toolbar>             
                 
                   <Toolbar style={style.Toolbar} >
                   <Contacts/>
                   </Toolbar>
               </AppBar>
              
                    

           
            </React.Fragment>

            
        );
    }
}

export default Footer;