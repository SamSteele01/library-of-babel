import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import img from "../../../images/World-Whisperer.jpg";

const styles = theme => ({
  root: {
    border: "2px solid black",
    backgroundColor: theme.palette.background.paper
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

function ImageDisplay(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <CardMedia
              className={classes.media}
              image={img}
              title="Paella dish"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ImageDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageDisplay);
