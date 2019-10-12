import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import {styles} from './NavBarStyle';
import {connect} from 'react-redux';
import * as asynAction from '../../store/authStore/asyncActions';
import * as actions from '../../store/uiReducer/asyncActions';
import {trans} from '../../store/language/LangObject';
import LanguageIcon from '@material-ui/icons/Language';
import {asyncChangeLang} from '../../store/language/Actions'



class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();

  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });

  };
  handelLogInRedirect=()=>{
    this.props.history.push('/login')
    this.handleMenuClose()
  }
  handelRegisterRedirect=()=>{
     this.props.history.push('/register')
     this.handleMenuClose()
   }

   handelCartRedirect=()=>{
    this.props.history.push('/cart')
    this.handleMobileMenuClose();
    this.props.hideMainNow() 
   }

   logoutHandler=()=>{
     this.props.logout()
   }

   changePassword=()=>{
    this.props.history.push('/change-password')
  }
  langugeChangeHandler=()=>{
    this.props.changeLang(this.props.lang)
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >

        {!this.props.isAuthed?
        <div>
        <MenuItem onClick={this.handelLogInRedirect}>{trans.login[this.props.lang]}</MenuItem>
        <MenuItem onClick={this.handelRegisterRedirect} >{trans.registerNow[this.props.lang]}</MenuItem>

        </div>:<div>
        <MenuItem onClick={this.logoutHandler} >{trans.logout[this.props.lang]}</MenuItem>
        <MenuItem onClick={this.changePassword} >{trans.changePassword[this.props.lang]}</MenuItem>
</div>}
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        
        <MenuItem onClick={this.handelCartRedirect} >
          <IconButton color="inherit" >
            <Badge badgeContent={this.props.shopCartLen} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p >{trans.shopCart[this.props.lang]}</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>{trans.myAccount[this.props.lang]}</p>
        </MenuItem>
       
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static"  style={{backgroundColor:'#7b1fa2'}}>
          <Toolbar>
           
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Glass-Office
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={trans.search[this.props.lang]}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              
              <IconButton color="inherit" onClick={this.handelCartRedirect}>
                <Badge badgeContent={this.props.shopCartLen} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={this.langugeChangeHandler}>
              <Badge badgeContent={this.props.lang ==='ar'?'en':'ar' } color="secondary">
                  <LanguageIcon  />
                  </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
              <IconButton color="inherit" onClick={this.langugeChangeHandler}>
              <Badge badgeContent={this.props.lang ==='ar'?'en':'ar' } color="secondary">

                  <LanguageIcon  />
                  </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthed:state.auth.token !==null,
    showMain:state.UI.showMain,
    shopCartLen:state.shopCart.shopCartItems.length,
    lang:state.lang.lang

  }
}

const mapActionsToProps=dispatch=>{
  return{
    logout:()=>dispatch(asynAction.asyncLougout()),
    hideMainNow:()=>dispatch(actions.hideMain()),
    changeLang:(lang)=>dispatch(asyncChangeLang(lang))

  }
}

export default connect(mapStateToProps,mapActionsToProps) (withStyles(styles)(PrimarySearchAppBar));
