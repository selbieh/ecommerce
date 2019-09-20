import React, { Component } from 'react';
import {styles} from './stylee';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import {connect} from "react-redux";
import {changeProductInCart} from '../../store/shopCartStore/asyncAction';
import Modal from './modal';
import { withStyles } from '@material-ui/core/styles';
import { Zoom } from '@material-ui/core';
import { Redirect } from 'react-router-dom'





class productDetails extends Component {
    state = { 
        image:null,
        showPic:false,
        shouldRedirect:false
     }

      
    addItem=(product)=>{
        const shopCartList=this.props.ShopCartItems
        const updatedList=shopCartList.concat(product)
        const updatedIdList=updatedList.map(e=>e.id)
        this.props.changeProductList(updatedIdList,this.props.token,this.props.shopCartId,this.props.userId)

    }
    removeItem=(id)=>{
        const filtered =this.props.ShopCartItems.filter(e=>e.id !== id)
        const filterId=filtered.map(e=>e.id)
        this.props.changeProductList(filterId,this.props.token,this.props.shopCartId,this.props.userId)
        //console.log('fillterd',filterId)
    }



     onChangePicHandler=(passedImage)=>{
         this.setState({image:passedImage})
     }

     componentDidMount(){
         if (this.props.location.state){
             this.setState({image:this.props.location.state.image_1})
         }
     }
     onZoomHandler=()=>{
        console.log('opend')

         this.setState({showPic:true})
     }
     hideZoomHandler=()=>{
         console.log('closed')
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
                                
                                    اضف الي عربه التسوق
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
                حذف من عربه التسوق ؟ 
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
                            {this.props.location.state.name}
                        </Typography >
                        <Typography variant={'h5'} color={"primary"} align={'right'} style={{margin:'25px'}} display='block' >
                            {this.props.location.state.detail}
                        </Typography>
                    </Grid>

                    </Grid>   
                    

                <Grid container  spacing={0} className={classes.TheGrid}>
                {this.props.location.state.image_1 ?  <Grid item xs={3}>
                        <div>
                            <img src={this.props.location.state.image_1} alt='hi1' className={classes.smallImage} 
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

                    {addOrRemoveItem}  
                </React.Fragment>

        );    }

    }
}




const mapStateToProps=state=>{
    return{
      shopCartIdList:state.shopCart.shopCartItems.map(e=>e.id),
      ShopCartItems:state.shopCart.shopCartItems,
      shopCartId:state.shopCart.shopCartId,
      userId:state.shopCart.userId,
      token:state.auth.token,

    }
  }




  const mapActionTpProps=dispatch=>{
    return{
      changeProductList:(productId,token,shopCartId,userId)=>dispatch(changeProductInCart(productId,token,shopCartId,userId))
  
    }
  }


export default  connect(mapStateToProps,mapActionTpProps) (withStyles(styles)(productDetails));
(withStyles(styles)(productDetails))