import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from './Stylee';
import {Redirect} from 'react-router';
import Typography from '@material-ui/core/Typography';



const TAX_RATE = 500;


function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  
  class OrderDetails extends Component{
      componentDidMount(){
          console.log(this.props)
      }
      
  
      showForm=()=>{
          this.props.history.push('/check-out')
      }
  
      deletProduct=(id)=>{
          const filtered =this.props.ShopCartItems.filter(e=>e.id !== id)
          const filterId=filtered.map(e=>e.id)
          this.props.changeProductList(filterId,this.props.token,this.props.shopCartId,this.props.userId)
  
      }
      productDetails=(row)=>{
          row['hideTab']=true       
          this.props.history.push('/product-details',row)
      }
     
      render(){
          const { classes } = this.props;
          let productPriceRow=[]
          if (this.props.location.state){
            this.props.location.state.orderProduct.map(item=>{
                return productPriceRow.push(item.price)
                })
          }
         
         
          
        const totalPriceValue= productPriceRow.reduce((a,b)=>{
           return a+b
         },0)
  
  
         if(!this.props.isAuthed && !localStorage.getItem('tokenKey')){
  
          return <Redirect to='/login'/>
  
         }else if ( this.props.location.state===undefined ||this.props.location.state.orderProduct.length ===0 ){
              return <Redirect to='/'/>
         
  
         }else{
          return(
              <React.Fragment>
                  <div className={classes.root}>
              <Paper  elevation={1} className={classes.paper}>
                  <Table className={classes.table} size="small">
                      <TableHead>
                      <TableRow>
                      <TableCell align='left'>ID</TableCell>

                          <TableCell>PIC</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Price</TableCell>
      
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.props.location.state.orderProduct.map(row => (
                          <TableRow key={row.id}>
                         <TableCell align="left">{row.id}</TableCell>
                          <TableCell>
                          <img src={(`${row.image_1}`)} alt={row.name} style={{width:'120px',height:'auto'}} onClick={()=>this.productDetails(row)}/>
                          
                          
                          </TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.price.toFixed(0)}</TableCell>
                              
                          
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
               </div>
               <br/>
               <Paper>
                    <Typography align='center' variant='h4'>
                    <Typography color='secondary' >  العنوان كاملا :</Typography>     {this.props.location.state.fullAdresse}
                    </Typography>
                    <Typography align='center' variant='h4'>
                    <Typography color='secondary' > رقم الموبايل :</Typography>     {this.props.location.state.mobiel}
                    </Typography>
              </Paper>
  
      </React.Fragment>
              )
  
         }
  
          
      }
  
  }

  export default withStyles(styles)(OrderDetails);