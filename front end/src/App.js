import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ShopCart from './components/ShopCart/ShopCart';
import AllProdduct from "./components/AllProdduct/AllProdduct";
import HomeWithAnimate from "./components/HomeWithAnimate/HomeWithAnimate";
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {asyncAuthAppStart} from './store/authStore/asyncActions';
import {connect} from 'react-redux';
import Spinner from './components/spinner/spinner';
import {Route,withRouter} from 'react-router-dom';
import {asyncFetchProduct} from './store/productStore/asyncActions';
import RegisterConfirmMail from './components/Auth/RegisterConfirmMail/RegisterConfirmMail';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword';
import productDetails from './components/productDetails/productDetails';
import ContatactUs from './components/contactUs/contatctUs';
import CheckOut from './components/checkOut/CheckOut';
import MyOrders from './components/MyOrders/MyOrders';
import OrderDetails from './components/MyOrders/OrderDetails/OrderDetails';
import AboutUS from './components/AboutUs/AboutUs';
import ForgetPAssword from './components/Auth/ForgetPassword/ForgetPasswrd';
import ResetPasswordConfirme from './components/Auth/ResetPasswordConfirme/ResetPasswordConfirme';
import Message from './components/Auth/AuthMessage/AuthMessage';
import * as uiAsyncActions from './store/uiReducer/asyncActions';
import Error404 from './components/404/404';
import {Switch} from 'react-router-dom';





class App extends Component {

  componentDidMount(){
    this.props.checkToken()
    this.props.fetchProduct()
    
  }

  render() {

    if(!this.props.showSpinner){

    
    return (





      <React.Fragment>
         <Navbar {...this.props}/>
         <CssBaseline />
         <div className="App">
        <HomeWithAnimate {...this.props}/>

  
    {this.props.logedIn ?<Switch> 
        <Route path='/allproducts' component={AllProdduct} {...this.props}/>
        <Route path='/cart'  component={ShopCart}/>
        <Route path='/message' component={Message} exact />
        <Route path='/product-details' exact component={productDetails}/>
        <Route path='/contactus' exact component={ContatactUs}/>
        <Route path='/about-us' component={AboutUS} exact />
        <Route path='/my-orders' exact component={MyOrders} {...this.props}/>
        <Route path='/login' exact component={Login} {...this.props}/>
        <Route path='/register' exact component={Register}  {...this.props}/>    



        <Route path='/change-password' exact component={ChangePassword} {...this.props}/>
        <Route path='/registration-confirm-mail/:token/' exact component={RegisterConfirmMail} {...this.props}/>
        <Route path='/check-out' exact component={CheckOut}/>
        <Route path='/order-detail' component={OrderDetails} exact {...this.props}/>
        <Route path='/' exact component={Home} {...this.props}/>

          
       <Route  component={Error404}  />

    </Switch> :<Switch>
        <Route path='/allproducts' component={AllProdduct} {...this.props}/>
        <Route path='/cart'  component={ShopCart}/>
        <Route path='/message' component={Message} exact />
        <Route path='/product-details' exact component={productDetails}/>
        <Route path='/contactus' exact component={ContatactUs}/>
        <Route path='/about-us' component={AboutUS} exact />
        <Route path='/my-orders' exact component={MyOrders} {...this.props}/>


        <Route path='/login' exact component={Login} {...this.props}/>
        <Route path='/register' exact component={Register}  {...this.props}/>    
        <Route path='/forget-password' component={ForgetPAssword} exact />
        <Route path='/rest-auth/password/reset/:Uid/:Token' component={ResetPasswordConfirme} exact />
        <Route path='/' exact component={Home} {...this.props}/>  

          
        <Route  component={Error404}  /> 

    </Switch>  
}
    



   
      </div>
      <Footer/>

      
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
    fetchProduct:()=>dispatch(asyncFetchProduct()),
    hideMainOic:()=>dispatch(uiAsyncActions.hideMain()),
    showMainPic:()=>dispatch(uiAsyncActions.showMain())


  }
}

const mapStateAsProps=state=>{
  return{
    showSpinner:state.product.showSpinner,
    token:state.auth.token,
    logedIn:state.auth.token !== null,

  }
}

export default connect(mapStateAsProps,mapActionAsProps) (withRouter (App));
