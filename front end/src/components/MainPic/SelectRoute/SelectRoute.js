import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Classes from './SelectRoute.module.css';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ContactMail from '@material-ui/icons/ContactMail';
import List from '@material-ui/icons/List';
import EventSeatIcon from '@material-ui/icons/EventSeat';


import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import {trans} from '../../../store/language/LangObject';
import { Typography } from '@material-ui/core';




class SelectRoute extends Component {
  render() {

    const allClasses=['btn btn-secondary',Classes.CustomNavi].join(' ')
    return (
      <div className="btn-group" role="group" aria-label="Basic example" style={{marginTop:'auto'}}>
          <NavLink className={allClasses}  to='/' activeStyle={{backgroundColor:'#7b1fa2'}} exact >
          <Home fontSize='small'/>
         <Typography fontSize='small'>{trans.home[this.props.lang]}</Typography> </NavLink>
          <NavLink className={allClasses} to='/allproducts' activeStyle={{backgroundColor:'#7b1fa2'}} >
          <EventSeatIcon/>
         <Typography>{trans.showProd[this.props.lang]}</Typography> </NavLink>
          <NavLink className={allClasses} to='/cart' activeStyle={{backgroundColor:'#7b1fa2'}} >
            <Badge badgeContent={this.props.shopCartLen} color="secondary">
              <ShoppingCart fontSize='small'/>
            </Badge>
            <Typography>{trans.shopCart[this.props.lang]}</Typography> </NavLink>

          <NavLink className={allClasses}  to='/my-orders' activeStyle={{backgroundColor:'#7b1fa2'}} exact >
            <List fontSize='small'/>
              <Typography>{trans.prevOrder[this.props.lang]}</Typography>
             </NavLink>

          <NavLink className={allClasses}  to='/contactus' activeStyle={{backgroundColor:'#7b1fa2'}} exact >
          <ContactMail fontSize='small'/>
            <Typography> {trans.contactUs[this.props.lang]}</Typography>
             </NavLink> 
      </div>
    );
  }
}



const mapStateToProps=state=>{
  return{
    shopCartLen:state.shopCart.shopCartItems.length,
    lang:state.lang.lang

  }
}

export default connect(mapStateToProps)(SelectRoute);

