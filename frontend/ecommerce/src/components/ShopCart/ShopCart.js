import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.07;

const styles = theme => ({
  root: {
    width: '80%',
    margin:'auto',
    marginTop: theme.spacing (15),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  ['Paperclips (Box)', 100, 1.15],
  ['Paper (Case)', 10, 45.99],
  ['Waste Basket', 2, 17.99],
].map((row, id) => createRow(id, ...row));

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

class ShopCart extends Component{

    state={
        rows:[]
    }
    render(){
        const { classes } = this.props;

        return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Delete</TableCell>
                    <TableCell align="right">Price</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
         </Paper>

        )
    }

}


export default withStyles(styles)(ShopCart);
