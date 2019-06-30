import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ShopCart from './components/ShopCart/ShopCart';
import AllProdduct from "./components/AllProdduct/AllProdduct";
import MainPic from "./components/HomeWithAnimate/HomeWithAnimate";
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {asyncAuthAppStart} from './store/authStore/asyncActions';
import {connect} from 'react-redux';
import Spinner from './components/spinner/spinner';
import {Route,withRouter} from 'react-router-dom';
import {asyncFetchProduct} from './store/productStore/asyncActions';
//import axios from 'axios';
//import RegisterConfirmMail from './components/Auth/RegisterConfirmMail/RegisterConfirmMail';
import AccountActivated from './components/Auth/acountActivated/accountAtivated';
import CheckMailToActivate from './components/Auth/checkMailToActivate/checkMailToActivate';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword';


class App extends Component {

  componentDidMount(){
    this.props.checkToken()
    this.props.fetchProduct()
    
  }

  render() {

    if(!this.props.showSpinner){

    
    return (
      <React.Fragment>
              <CssBaseline />
              <div className="App">
                <Navbar {...this.props}/>
                <MainPic {...this.props}/>
                <Route path='/products' component={AllProdduct}/>
                <Route path='/cart'  component={ShopCart}/>
                <Route path='/' exact component={Home}/>
                <Route path='/login' exact component={Login} {...this.props}/>
                <Route path='/register' exact component={Register}  {...this.props}/>
                <Route path='/acount-activated' exact component={AccountActivated} {...this.props}/>
                <Route path='/check-mail-toActivate' exact component={CheckMailToActivate} {...this.props}/>
                <Route path='/change-password' exact component={ChangePassword} {...this.props}/>


                <Footer/>
              </div>
      </React.Fragment>
      
    );
  }else{
    return( 
       <React.Fragment>
              <div align='center' style={{marginTop:'150px'}}>
                    <Spinner  align='center' />
              </div>
</React.Fragment>
     ) }
  }
}

const mapActionAsProps=dispatch=>{
  return{
    checkToken:()=>dispatch(asyncAuthAppStart()),
    fetchProduct:()=>dispatch(asyncFetchProduct())
  }
}

const mapStateAsProps=state=>{
  return{
    showSpinner:state.product.showSpinner
  }
}

export default connect(mapStateAsProps,mapActionAsProps) (withRouter (App));
