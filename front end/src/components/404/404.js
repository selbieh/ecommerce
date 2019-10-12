import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import {trans} from '../../store/language/LangObject'


class Error404 extends Component {
    render() {
        return (
            <Paper>
                <Typography color='primary' align='center' variant='h3' style={{marginTop:'85px'}}>
                    {trans.erorr404[this.props.lang]}
                </Typography>
            </Paper>
        );
    }
}

const mapeStateToProps=state=>{
    return{
        lang:state.lang.lang
    }
}

export default connect(mapeStateToProps) (Error404) ;