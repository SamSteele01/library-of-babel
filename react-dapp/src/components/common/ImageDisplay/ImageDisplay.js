import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import img from "../../../images/World-Whisperer.jpg";

const styles = theme => ({
  root: {
    border: "2px solid black",
    height: 300,
    width: 200
  },

  media: {
    height: 300,
    width: 200
  }
});

function ImageDisplay(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CardMedia className={classes.media} image={img} title="Paella dish" />
    </div>
  );
}

ImageDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageDisplay);
