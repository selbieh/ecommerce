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
        <BottomNavigationAction label={trans.facebook[this.props.lang]} icon={<PersonAdd />} style={{color:'white'}}/>
        <BottomNavigationAction label="01003345516" icon={<MobileScreenShare />} style={{color:'white'}}/>
        <BottomNavigationAction label={trans.nearby[this.props.lang]} icon={<LocationOnIcon />} style={{color:'white'}}/>
      </BottomNavigation>
    );
  }
}

const mapeStateToProps=(state)=>{
  return{
    lang:state.lang.lang
}}

export default connect(mapeStateToProps)(withStyles(styles)(SimpleBottomNavigation));
