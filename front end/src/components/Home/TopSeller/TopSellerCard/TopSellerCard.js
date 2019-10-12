import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {styles} from './styles';
import { connect } from 'react-redux';
import {trans} from '../../../../store/language/LangObject';



function ImgMediaCard(props) {
  return (
    <Card style={styles.card} >
      <CardActionArea >
      <CardContent>

        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          style={styles.media}
          height="140"
          image={props.image}
          title="Contemplative Reptile"
        />
          <Typography gutterBottom variant="h5" component="h2" style={{color:'#7b1fa2'}}>
            {props.title}
          </Typography>
          <Typography component="p">
           {props.detail}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Button size="small" color="primary">
          {trans.details[props.lang]}
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps=state=>{
  return{
    lang:state.lang.lang
  }
}


export default connect (mapStateToProps)(withStyles(styles)(ImgMediaCard));
