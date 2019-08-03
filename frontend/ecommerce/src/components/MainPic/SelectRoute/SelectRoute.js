import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Classes from './SelectRoute.module.css';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';





class SelectRoute extends Component {
  render() {

    const allClasses=['btn btn-secondary',Classes.CustomNavi].join(' ')
    return (
      <div className="btn-group"  role="group" aria-label="Basic example" >
          <NavLink className={allClasses}  to='/' activeStyle={{backgroundColor:'#7b1fa2'}} exact onClick={this.props.homeToggel}>
          <Home/>
          الرئيسيه</NavLink>
          <NavLink className={allClasses} to='/products' activeStyle={{backgroundColor:'#7b1fa2'}} onClick={this.props.redirectToggel}>
          عرض المنتجات</NavLink>
          <NavLink className={allClasses} to='/cart' activeStyle={{backgroundColor:'#7b1fa2'}} onClick={this.props.redirectToggel}>
            <Badge badgeContent={this.props.shopCartLen} color="secondary">
              <ShoppingCart />
            </Badge>
          عربه التسوق</NavLink>
      </div>
    );
  }
}



const mapStateToProps=state=>{
  return{
    shopCartLen:state.shopCart.shopCartItems.length

  }
}

export default connect(mapStateToProps)(SelectRoute);

