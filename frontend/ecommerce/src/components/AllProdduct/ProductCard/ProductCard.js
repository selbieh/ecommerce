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
import Quntity from '../../Quntity/Quntity';
import {styles} from './styles';



class ProductCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Glass-office" className={classes.avatar}>
              G.O
            </Avatar>
          }
        
          title={this.props.title}
          subheader="ألابعاد 15 * 16* 22"
        />
        <CardMedia
          className={classes.media}
          image={this.props.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
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
          <CardContent>
            <Typography paragraph>عربه التسوق:</Typography>
            <Typography paragraph>
                <Quntity/>
            </Typography>
            <Typography paragraph align='center' >
                <IconButton >
                   <AddShoppingCart style={{color:'red'}}  />
                </IconButton>
            </Typography>
            <Typography paragraph align='center'>
                اضف الي عربه التسوق
            </Typography>
            
            <Typography align='center'>
              تم اضافه 0 مكتب بسعر 0 جنيه الي عربه التسوق 
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}



export default withStyles(styles)(ProductCard);
