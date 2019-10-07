import React, { Component } from 'react';
import classes from './Quntity.module.css';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import {connect} from 'react-redux';
import * as actionsType from '../../store/shopCartStore/asyncAction'



class Quntity extends Component {
   

    changeQuntityHandler=(id,type)=>{
            if(type === 'inc'){
                this.props.incObject(id,this.props.q+1,localStorage.getItem('tokenKey'))

            }else if (type === 'dec'){
                this.props.incObject(id,this.props.q-1,localStorage.getItem('tokenKey'))

            }
            }
          
    render() {
        return (

            <div className={classes.Quntity}>
                    <div onClick={()=>this.changeQuntityHandler(this.props.objectID,'inc')} className={classes.c}><Add className={classes.ico} /></div>
                        <p> {this.props.q}</p>
                    <div onClick={()=>this.changeQuntityHandler(this.props.objectID,'dec')} className={classes.c}><Remove className={classes.ico} /></div>                  
            </div>
        );
    }
}


const mapActionToProps=(dispatch)=>{
    return{
        incObject:(id,quantity,token)=>dispatch(actionsType.incObject(id,quantity,token)),
        decObject:()=>dispatch()
    }
}


export default connect(null,mapActionToProps) (Quntity);
