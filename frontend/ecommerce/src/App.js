import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ShopCart from './components/ShopCart/ShopCart';
import AllProdduct from "./components/AllProdduct/AllProdduct";
import MainPic from "./components/MainPic/MainPic";
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';



import {Route,withRouter} from 'react-router-dom';


class App extends Component {
  render() {
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

              

              <Footer/>
              </div>
      </React.Fragment>
      
    );
  }
}

export default withRouter (App);
