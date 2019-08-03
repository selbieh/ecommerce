import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from './ShopCartStyles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {fetchShopCartFromServer,changeProductInCart} from '../../store/shopCartStore/asyncAction';
import {Redirect} from 'react-router';


const TAX_RATE = 500;



function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


class ShopCart extends Component{
    

    

    deletProduct=(id)=>{
        const filtered =this.props.ShopCartItems.filter(e=>e.id !== id)
        const filterId=filtered.map(e=>e.id)
        this.props.changeProductList(filterId,this.props.token,this.props.shopCartId,this.props.userId)

    }
    render(){
        const { classes } = this.props;
        let productPriceRow=[]
        this.props.ShopCartItems.map(item=>{
        return productPriceRow.push(item.price)
        })
       
        
      const totalPriceValue= productPriceRow.reduce((a,b)=>{
         return a+b
       },0)


       if(!this.props.isAuthed && !localStorage.getItem('tokenKey')){

        return <Redirect to='/login'/>

       }else{
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>PIC</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Delete</TableCell>
    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.ShopCartItems.map(row => (
                        <TableRow key={row.id}>
                        <TableCell>
                        <img src={(`${row.image_1}`)} alt={row.name} style={{width:'120px',height:'auto'}}/>
                        
                        
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.price.toFixed(0)}</TableCell>
                        <TableCell align="right">
                              <IconButton  aria-label="Delete" onClick={()=>this.deletProduct(row.id)}>
                                  <DeleteIcon style={{color:'secondary'}} />
                              </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(totalPriceValue)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${TAX_RATE.toFixed(0)}`}</TableCell>
                        <TableCell align="right">{ccyFormat(TAX_RATE)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(TAX_RATE+totalPriceValue)}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
             </Paper>
    
            )

       }

        
    }

}

const mapeStateToProps=state=>{
  return{
    ShopCartItems:state.shopCart.shopCartItems,
    token:state.auth.token,
    isAuthed:state.auth.token!==null,
    shopCartId:state.shopCart.shopCartId,
    userId:state.shopCart.userId
  }
}


const mapActionsToProps=dispatch=>{
    return{
        fetchShopCart:(token)=>dispatch(fetchShopCartFromServer(token)),
        changeProductList:(productId,token,shopCartId,userId)=>dispatch(changeProductInCart(productId,token,shopCartId,userId))
    }
}
export default connect(mapeStateToProps,mapActionsToProps)(withStyles(styles)(ShopCart));
