import React, { Component } from 'react';

import AnimateHeight from 'react-animate-height';
import Mainpic from '../MainPic/MainPic';
import SelectRoute from '../MainPic/SelectRoute/SelectRoute';

export default class Example extends Component {
  state = {
    height: 'auto',
  };
 
  homeToggle = () => {
 
    this.setState({
      height:  'auto',
    });
  };
 
redirectToggel=()=>{
    
    this.setState({
        height:  0,
      });
}

  render() {
    const { height } = this.state;
 
    return (
      <div>
       
 
        <AnimateHeight
          duration={ 500 }
          height={ height } // see props documentation bellow
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