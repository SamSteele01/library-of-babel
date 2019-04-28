import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Description from "../common/Description";
import Typography from "@material-ui/core/Typography";
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
  chip: {
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  }
});

function MiddleDividers(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <TitleDisplay />
          </Grid>
          <Grid item xs>
            <ImageDisplay />
          </Grid>
          <Grid item xs>
            <AuthorDisplay />
          </Grid>
          <Grid item xs>
            <Description />
          </Grid>
        </Grid>
      </div>
      <Description />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Select type
        </Typography>
        <div>
          <Price />
          <Chip className={classes.chip} label="Extra Soft" />
          <Chip className={classes.chip} label="Soft" />
          <Chip className={classes.chip} label="Medium" />
          <Chip className={classes.chip} label="Hard" />
        </div>
      </div>
      <Divider variant="middle" />
      <div className={classes.section3}>
        <Button variant="contained" color="primary" fullWidth>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

MiddleDividers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MiddleDividers);
