import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import axios from "../Axios/axios";
import { Typography } from '@material-ui/core';
import {Zoom} from '@material-ui/core'
import { trans } from '../../store/language/LangObject';
import { connect } from 'react-redux';




class MyOrders extends Component {
    state = { 
        orders:[]
     }

     _isMounted = false;

    fetchMyOrders=()=>{
       const token=localStorage.getItem('tokenKey')


        axios({
            method:'get',
            url:'/orders/',
            headers:{
                Authorization:'Token '.concat(token)

            }
        })
        .then(res=>{
            if (this._isMounted)
                
                this.setState({orders:res.data.resulte})
                //console.log(this.state.orders )


        })
    }
    componentDidMount(){
        this._isMounted = true;

    
        this.fetchMyOrders();

    }
    componentWillUnmount(){
        this._isMounted = false;

    }

    orderDetails=(el)=>{
        //console.log(el)
        const token=localStorage.getItem('tokenKey')
        //console.log(`http://127.0.0.1:8000/orders/${el}/`)


        axios({
            method:'get',
            url:`/orders/${el}/`,
            headers:{
                Authorization:'Token '.concat(token)
            }
        })
        .then(res=>{   
                this.props.history.push('/order-detail',res.data)
        })
    }
    render() {
        if(localStorage.getItem('tokenKey') && this.state.orders.length > 0){
        return (
           <Paper style={{marginTop:'56px'}} >
               <Table >
               <TableBody>
                        {this.state.orders.map(el=>{
                           return <TableRow key={el.id} hover={true}>
                                             <TableCell >
                                                 <Typography color='primary' style={{cursor:'pointer'}}  onClick={()=>this.orderDetails(el.id)}>
                                                 { el.orderDate}
                                                 </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography color='primary' style={{cursor:'pointer'}} onClick={()=>this.orderDetails(el.id)}>
                                                    { el.fullAdresse}
                                                </Typography>
                                            </TableCell>
                                            
                                            <TableCell >
                                                <Typography color='primary' style={{cursor:'pointer'}} onClick={()=>this.orderDetails(el.id)}>
                                                    { el.mobiel}
                                                </Typography>
                                            </TableCell>
                                   </TableRow>                           
                        })}
                </TableBody> 
                </Table>
           </Paper>
        );
            }else if (! localStorage.getItem('tokenKey')){
            return <Zoom in timeout={2000}>
                        <Paper align='center' style={{marginTop:'65px'}}>
                                <Typography align='center' color='secondary'>
                                {this.props.lang === 'en'? 'please login first':'من فضلك سجل دخول اولا'}
                                </Typography>
                        </Paper>
            </Zoom>
             
        }else{
            return <Zoom in timeout={2000}>
                        <Paper align='center' style={{marginTop:'65px'}}>
                                <Typography align='center' color='secondary'>
                                  {trans.noOrders[this.props.lang]}
                                </Typography>
                                </Paper>
                        </Zoom>
            
        }

    }
}

const mapeStateToProps=state=>{
    return{
        lang:state.lang.lang
    }
}


export default connect(mapeStateToProps)  (MyOrders);