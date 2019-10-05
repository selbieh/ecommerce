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
 

componentDidMount(){
  if(this.props.location.pathname === '/'){
    this.props.showMainNow()

  }else{
    this.props.hideMainNow()

  }
  
}


componentDidUpdate(){
  if(this.props.location.pathname === '/'){
    this.props.showMainNow()

  }else{
    this.props.hideMainNow()

  }
  
}

  render() {
 
    return (
      <div>
       
 
        <AnimateHeight
          duration={ 500 }
          height={ this.props.showMain } 
        >
         <Mainpic  {...this.props}/>
        </AnimateHeight>
        <div style={{textAlign:'center'}}>
        <SelectRoute/>
        

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