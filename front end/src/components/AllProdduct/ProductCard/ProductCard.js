import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import {styles} from './styles';
import {connect} from "react-redux";
import {trans} from '../../../store/language/LangObject'





class ProductCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  prdoductDetailsRedirect=(product)=>{
    this.props.history.push('/product-details',product)
  }

  render() {
    //console.log(this.props.product)
    const { classes } = this.props;
    let addOrRemoveItem=<CardContent>           
                  <Typography paragraph align='center' >
                        <IconButton onClick={this.props.addItem}>
                          <AddShoppingCart style={{color:'blue'}}  />
                        </IconButton>
                  </Typography>
                    <Typography paragraph align='center' color='primary'>
                    {trans.addToCart[this.props.lang]}
                    </Typography>
                </CardContent>           

    if (this.props.shopCartIdList.includes(this.props.id)){

      addOrRemoveItem=
                <CardContent> 
                  <Typography paragraph align='center' >
                                    <IconButton onClick={this.props.removeItem}>
                                      <RemoveShoppingCart style={{color:'red'}}  />
                                    </IconButton>
                    </Typography>          
                        <Typography paragraph align='center' color='primary' >
                        {trans.removeFromCart[this.props.lang]}
                        </Typography>
                </CardContent>           


    }
  
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Glass-office" className={classes.avatar}>
              G.O
            </Avatar>
          }
        
          title={this.props.title}
          subheader= {trans.dim[this.props.lang]+" 15 * 16* 22"}
        />
        <CardMedia
         onClick={()=>this.prdoductDetailsRedirect(this.props.product)}
          className={classes.media}
          image={this.props.image}
          title="Paella dish"
        />
        <CardContent>

          <Typography style={{maxHeight:'120px',minHeight:'120px',textOverflow: "ellipsis", overflow: "hidden"}}  >
           {this.props.details}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} >
          
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            {addOrRemoveItem}  
        </Collapse>
      </Card>
    );
  }
}


const mapStateToProps=state=>{
  return{
    shopCartIdList:state.shopCart.shopCartItems.map(e=>e.product.id),
    lang:state.lang.lang
    

  }
}


export default connect(mapStateToProps) (withStyles(styles)(ProductCard));
