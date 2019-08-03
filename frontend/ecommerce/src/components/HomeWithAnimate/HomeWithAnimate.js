import React, { Component } from 'react';
import {connect} from 'react-redux'
import AnimateHeight from 'react-animate-height';
import Mainpic from '../MainPic/MainPic';
import SelectRoute from '../MainPic/SelectRoute/SelectRoute';
import * as actions from '../../store/uiReducer/asyncActions';


 class HomeWithAnimate extends Component {
  state = {
    height: 'auto',
  };
 
  homeToggle = () => {
 
   this.props.showMainNow()
  };
 
redirectToggel=()=>{
    
    this.props.hideMainNow()
}

  render() {
 
    return (
      <div>
       
 
        <AnimateHeight
          duration={ 500 }
          height={ this.props.showMain } // see props documentation bellow
        >
         <Mainpic  />
        </AnimateHeight>
        <div style={{textAlign:'center'}}>
        <SelectRoute homeToggel={this.homeToggle}
        redirectToggel={this.redirectToggel}
        />

        </div>
      </div>
    );
  }
}

const mapeStateToProps=(state)=>{
  return{
    showMain:state.UI.showMain
  }
}

const mapeActionToProps=(dispatch)=>{
  return {
    showMainNow:()=>dispatch(actions.showMain()),
    hideMainNow:()=>dispatch(actions.hideMain())

  }
}



export default connect(mapeStateToProps,mapeActionToProps) (HomeWithAnimate)