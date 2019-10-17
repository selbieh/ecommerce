import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MobileScreenShare from '@material-ui/icons/MobileScreenShare';
import PersonAdd from '@material-ui/icons/PersonAdd';
import {trans} from '../../../store/language/LangObject.js';
import {connect} from 'react-redux'


import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  root: {
    width: 'auto',
    opacity:'0.75',
    backgroundColor:'#7b1fa2',
    color:'white',
    
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label={trans.facebook[this.props.lang]} icon={<PersonAdd />} style={{color:'white'}} href='https://www.facebook.com/youssef.elbieh/'/>
        <BottomNavigationAction label="01003345516" icon={<MobileScreenShare />} style={{color:'white'}}/>
        <BottomNavigationAction label={trans.nearby[this.props.lang]} icon={<LocationOnIcon />} style={{color:'white'}} href='https://www.google.com.eg/maps/place/%D9%85%D8%AF%D9%8A%D9%86%D9%87+%D9%86%D8%B5%D8%B1%D8%8C+%D8%A7%D9%84%D9%85%D9%86%D8%B7%D9%82%D8%A9+%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%89%D8%8C+%D9%85%D8%AF%D9%8A%D9%86%D8%A9+%D9%86%D8%B5%D8%B1%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%E2%80%AC%E2%80%AD/@30.0566282,31.3388624,15z/data=!3m1!4b1!4m5!3m4!1s0x14583e5d94c66301:0xddddf100de42206c!8m2!3d30.0566104!4d31.3301076'/>
      </BottomNavigation>
    );
  }
}

const mapeStateToProps=(state)=>{
  return{
    lang:state.lang.lang
}}

export default connect(mapeStateToProps)(withStyles(styles)(SimpleBottomNavigation));
