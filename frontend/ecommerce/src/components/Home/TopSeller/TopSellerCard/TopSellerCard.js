import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    maxWidth: 345,
    justify:'center'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    justify:'center'
  },
};

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
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Button size="small" color="primary">
          تفاصيل
        </Button>
      </CardActions>
    </Card>
  );
}


export default withStyles(styles)(ImgMediaCard);
