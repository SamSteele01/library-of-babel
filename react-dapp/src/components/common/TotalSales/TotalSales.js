import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    border: "2px solid black",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  }
});

function Sales(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h6">Sales: ${props.total}</Typography>
    </div>
  );
}

Sales.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sales);
