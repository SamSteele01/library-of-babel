import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Description from "../common/Description";
import TitleDisplay from "../common/TitleDisplay";
import ImageDisplay from "../common/ImageDisplay";
import AuthorDisplay from "../common/AuthorDisplay";
import Price from "../common/Price";

const styles = theme => ({
  root: {
    width: "94%",
    margin: "3%",
    border: "2px solid black",
    backgroundColor: theme.palette.background.paper
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `16px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    justifyContent: "center",
    alignContent: "space-evenly"
  }
});

function MiddleDividers(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center" direction="column">
          <Grid item xs>
            <TitleDisplay />
          </Grid>
          <Grid item xs>
            <ImageDisplay />
          </Grid>
          <Grid item xs>
            <AuthorDisplay />
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Description />
      </div>
      <Divider variant="middle" />
      <div className={classes.section3}>
        <Price />
        <Button variant="contained" color="primary">
          Purchase
        </Button>
      </div>
    </div>
  );
}

MiddleDividers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MiddleDividers);
