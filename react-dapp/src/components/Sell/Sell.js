import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BookIcon from "../../styles/book-icon.png";

const styles = {
  card: {
    width: "94%",
    margin: "3%"
  },
  media: {
    height: 140,
    backgroundSize: "contain"
  }
};

function Sell(props) {
  const { classes, index, title, image, desc, price, purchase, view } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Typography gutterBottom variant="h5" component="h2">
          SELL CARD
        </Typography>
        <CardMedia
          className={classes.media}
          image={image ? image : BookIcon}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">{desc}</Typography>
          <Typography component="p">$ {price} Eth</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {purchase && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={event => purchase(true)}
          >
            Buy
          </Button>
        )}
        {view && (
          <Button size="small" color="primary" onClick={event => view(index)}>
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

Sell.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Sell);
