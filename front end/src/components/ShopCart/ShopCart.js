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
import {fetchShopCartFromServer,deletItem} from '../../store/shopCartStore/asyncAction';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography';
import Quntity from '../Quntity/Quntity'




const TAX_RATE = 500;



function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


class ShopCart extends Component{

 

    showForm=()=>{
        this.props.history.push('/check-out')
    }

    deletProduct=(id)=>{
        //const filtered =this.props.ShopCartItems.filter(e=>e.id !== id)
        //const filterId=filtered.map(e=>e.id)
        this.props.deletItemFromCart(id,this.props.token,this.props.userId)

    }
    productDetails=(row)=>{
        const data=row.product
        data['hideTab']=true
        this.props.history.push('/product-details',data)
    }
   
    render(){
        const { classes } = this.props;
        let productPriceRow=[]
        this.props.ShopCartItems.map(item=>{
        return productPriceRow.push(item.product.price * item.quantity)
        })
       
        
      const totalPriceValue= productPriceRow.reduce((a,b)=>{
         return a+b
       },0)


       if(!this.props.isAuthed && !localStorage.getItem('tokenKey')){

        return <Redirect to='/login'/>

       }else if (this.props.ShopCartItems.length ===0 ){
            return <Typography variant='h3' color='primary' align='center' gutterBottom={true} style={{marginTop:'65px'}} >عربه التسوق فارغه  </Typography>
       

       }else{
        return(
            <React.Fragment>
                <div className={classes.root}>
            <Paper  elevation={1} className={classes.paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>PIC</TableCell>
                        <TableCell align="right">ألاسم</TableCell>
                        <TableCell align="center">سعر القطعه</TableCell>
                        <TableCell align="center">الكميه</TableCell>
                        <TableCell align="right">اجمالى</TableCell>

                        <TableCell align="right">حذف</TableCell>
    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.ShopCartItems.map(row => (
                        <TableRow key={row.id}>
                        <TableCell>
                        <img src={(`${row.product.image_1}`)} alt={row.product.name} style={{width:'120px',height:'auto'}} onClick={()=>this.productDetails(row)}/>
                        
                        
                        </TableCell>
                        <TableCell align="right">{row.product.name}</TableCell>
                        <TableCell align="center">{row.product.price.toFixed(0)}</TableCell>
                        <TableCell align="center"><Quntity objectID={row.id} q={row.quantity}/></TableCell>
                        <TableCell align="right">{row.quantity.toFixed(0)*row.product.price.toFixed(0)}</TableCell>


                        <TableCell align="right">
                              <IconButton  aria-label="Delete" onClick={()=>this.deletProduct(row.id)}>
                                  <DeleteIcon style={{color:'secondary'}} />
                              </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>مجموع السعر</TableCell>
                        <TableCell align="right">{ccyFormat(totalPriceValue)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>شحن</TableCell>
                        <TableCell align="right">{`${TAX_RATE.toFixed(0)}`}</TableCell>
                        <TableCell align="right">{ccyFormat(TAX_RATE)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>ألاجمالي</TableCell>
                        <TableCell align="right">{ccyFormat(TAX_RATE+totalPriceValue)}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
             </Paper>
             </div>
             <br/>
            <Typography align='center' >
                <Button variant="contained" color="primary" className={classes.button} onClick={this.showForm}>CHECK OUT</Button>
            </Typography>


    </React.Fragment>
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
        deletItemFromCart:(productObjectId,token,shopCartId,userId)=>dispatch(deletItem(productObjectId,token,shopCartId,userId)),

    }
}




export default connect(mapeStateToProps,mapActionsToProps)(withStyles(styles)(ShopCart));
