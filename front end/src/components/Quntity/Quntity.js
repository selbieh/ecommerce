import React, { Component } from 'react';
import classes from './Quntity.module.css';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';



class Quntity extends Component {
    state = {
        vlaue:0
      }

        AddHandler=()=>{
            this.setState((prevState)=>{
                return ({vlaue:prevState.vlaue+1})
            })
            }
        removeHandler=()=>{
            if(this.state.vlaue > 0){

                this.setState((prevState)=>{
                    return ({vlaue:prevState.vlaue-1})
                })

            }
            
           
        }
    render() {
        return (

            <div className={classes.Quntity}>
                    <div onClick={this.AddHandler}><Add className={classes.ico} /></div>
                        <p>عدد {this.state.vlaue}</p>
                    <div onClick={this.removeHandler}><Remove className={classes.ico} /></div>                  
            </div>
        );
    }
}

export default Quntity;
