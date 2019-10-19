import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Subscribe from './Subscribe/subscribe';
import Contacts from './Contacts/Contacts';
import {connect} from 'react-redux';
import {trans} from '../../store/language/LangObject.js';


const style={
    containerUper:{
        marginBottoms:'0px',
        backgroundColor:'#7b1fa2',
        marginTop:'160px',
        textAlign:'center',
        align:'center',
        width:'auto'

    },
    Toolbar:{
        align:'center',
        height:'auto',
        textAlign:'center',
        margin:'auto',
        

    },
    Subscribe:{
        margin:'auto'
    }
    
}

class Footer extends Component {

     
        
    render() {
      

        return (

           <React.Fragment>
               <AppBar position='static' style={style.containerUper}>
                   <Toolbar style={style.Subscribe} >
                         <Subscribe />
                   </Toolbar>
                   <Toolbar style={style.Toolbar} >
                        <h3 style={{color:'white'}}>{trans.contacts[this.props.lang]}</h3>
                   </Toolbar>             
                 
                   <Toolbar style={style.Toolbar} >
                   <Contacts/>
                   </Toolbar>
               </AppBar>
            </React.Fragment>

            
        );
    }
}


const mapeStateToProps=state=>{
    return{
      
      lang:state.lang.lang
    }
  }
  

export default connect(mapeStateToProps)(Footer) ;