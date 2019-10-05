import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';

class Error404 extends Component {
    render() {
        return (
            <Paper>
                <Typography color='primary' align='center' variant='h3' style={{marginTop:'85px'}}>
                   لا يمكن عرض هذه الصفحه
                </Typography>
            </Paper>
        );
    }
}

export default Error404 ;