import React, { Component } from 'react';
import {styles} from './stylee';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import {connect} from "react-redux";
import {addProductToShopCart, deletItem} from '../../store/shopCartStore/asyncAction';
import Modal from './modal';
import { withStyles } from '@material-ui/core/styles';
import { Zoom } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {trans} from '../../store/language/LangObject';





class productDetails extends Component {
    state = { 
        image:null,
        showPic:false,
        shouldRedirect:false
     }

 

      
    addItem=(product)=>{
        if (localStorage.getItem('tokenKey')){
           
            this.props.addItemToShopCart(product.id,this.props.token,this.props.shopCartId,this.props.userId)
            
        }else{
            this.props.history.push('/login')
        }
       

    }
    removeItem=(id)=>{
        const shopCartIdList=this.props.ShopCartItems
        const theProduct=shopCartIdList.filter(e=>e.product.id===id)[0]
        const theProductId=theProduct.id       
        this.props.deletItemFromCart(theProductId,this.props.token)
    }

   

     onChangePicHandler=(passedImage)=>{
         this.setState({image:passedImage})
         
     }

     componentDidMount(){
        // console.log(this.props)
         if (this.props.location.state){
             this.setState({image:this.props.location.state.image_1})
         }
     }
     onZoomHandler=()=>{
        //console.log('opend')

         this.setState({showPic:true})
     }
     hideZoomHandler=()=>{
         //console.log('closed')
        this.setState({showPic:false})

     }
    render() {
        const {classes}=this.props
        let addOrRemoveItem=<CardContent>           
                                <Typography paragraph align='center' >
                                    <IconButton onClick={()=>this.addItem(this.props.location.state)}>
                                        <AddShoppingCart style={{color:'blue'}}  />
                                    </IconButton>
                                </Typography>
                                <Typography paragraph align='center'>  
                                  {trans.addToCart[this.props.lang]}
                                </Typography>
                            </CardContent>           

            if (this.props.location.state && this.props.shopCartIdList.includes(this.props.location.state.id)){

            addOrRemoveItem=
            <CardContent> 
            <Typography paragraph align='center' >
                            <IconButton onClick={()=>this.removeItem(this.props.location.state.id)}>
                            <RemoveShoppingCart style={{color:'red'}}  />
                            </IconButton>
            </Typography>          
                <Typography paragraph align='center' >
                {trans.removeFromCart[this.props.lang]}
                </Typography>
            </CardContent>           


            }
        
    if (this.props.location.state === undefined){
        return (
            <Redirect to='/' />
        )
    }else {


        return (
            
            <React.Fragment>

      {this.state.showPic ? 
                    <div align='center' onClick={this.hideZoomHandler}>

      <Modal >
            <Zoom in> 

              <div align='center'>
                    <div >
                            <img src={this.state.image} alt='hi' className={classes.Image} />
                    </div>
              </div>
              </Zoom>

              </Modal>

              </div> :null}

                 <Grid container  spacing={0} className={classes.TheGrid}>
                    <Grid item xs={6}>
                    {this.props.location.state.image_1?
                            <div>
                                <img src={this.state.image} alt='hi'  className={classes.Image} onClick={this.onZoomHandler}/>
                            </div>:null}
                    </Grid>
                    <Grid item xs={6} >
                        <Typography variant={'h4'} color={"secondary"}>
                            {this.props.lang ==='en'? this.props.location.state.name:this.props.location.state.name_ar}
                        </Typography >
                        <Typography variant={'h5'} color={"primary"} align={'right'} style={{margin:'25px'}} display='block' >
                            {this.props.lang ==='en'? this.props.location.state.detail:this.props.location.state.detail_ar}
                        </Typography>
                    </Grid>

                    </Grid>   
                    

                <Grid container  spacing={0} className={classes.TheGrid}>
                {this.props.location.state.image_1 ?  <Grid item xs={3}>
                        <div >
                            <img src={this.props.location.state.image_1}  alt='hi1' className={classes.smallImage} 
                            onClick={()=>this.onChangePicHandler(this.props.location.state.image_1)}/>
                        </div>
                    </Grid>:null}


                    {this.props.location.state.image_2 ?  <Grid item xs={3}>
                        <div>
                            <img src={this.props.location.state.image_2} alt='hi2'   className={classes.smallImage}  
                            onClick={()=>this.onChangePicHandler(this.props.location.state.image_2)}/>
                        </div>
                    </Grid>:null}

                   { this.props.location.state.image_3 ?<Grid item xs={3}>
                        <div>
                            <img src={this.props.location.state.image_3} alt='hi3'   className={classes.smallImage} 
                            onClick={()=>this.onChangePicHandler(this.props.location.state.image_3)}/>
                        </div>
                    </Grid>:null}
                    { this.props.location.state.image_4 ?  <Grid item xs={3}>
                        <div>
                            <img src={this.props.location.state.image_4} alt='hi4'   className={classes.smallImage} 
                            onClick={()=>this.onChangePicHandler(this.props.location.state.image_4)}/>
                        </div>
                    </Grid>:null}
                    </Grid>
                        { this.props.location.state.hideTab ?null:<React.Fragment>{addOrRemoveItem}</React.Fragment>}
                    
                </React.Fragment>

        );    }

    }
}




const mapStateToProps=state=>{
    return{
      shopCartIdList:state.shopCart.shopCartItems.map(e=>e.product.id),
      ShopCartItems:state.shopCart.shopCartItems,
      shopCartId:state.shopCart.shopCartId,
      userId:state.shopCart.userId,
      token:state.auth.token,
      lang:state.lang.lang

    }
  }




  const mapActionTpProps=dispatch=>{
    return{
      addItemToShopCart:(productId,token,shopCartId,userId)=>dispatch(addProductToShopCart(productId,token,shopCartId,userId)),
      deletItemFromCart:(id,token)=>dispatch(deletItem(id,token))
  
    }
  }


export default  connect(mapStateToProps,mapActionTpProps) (withStyles(styles)(productDetails));
(withStyles(styles)(productDetails))