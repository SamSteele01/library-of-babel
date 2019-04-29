import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    border: "2px solid black",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    alignContent: "center"
  }
});

function Price(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h6">Sales: ${props.total}</Typography>
    </div>
  );
}

Price.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Price);
