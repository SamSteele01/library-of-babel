import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    border: "2px solid black",
    backgroundColor: theme.palette.background.paper
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  }
});

function TitleDisplay(props) {
  const { classes } = props;
  if (props.prominent) {
    return (
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                THIS IS A BOOK TITLE
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="p">THIS IS A BOOK TITLE</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

TitleDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitleDisplay);
