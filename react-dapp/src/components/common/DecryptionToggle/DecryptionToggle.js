import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

function OutlinedChips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip
        label={props.label}
        className={classes.chip}
        color={props.label !== "Decrypted" ? "secondary" : "primary"}
        variant="outlined"
      />
    </div>
  );
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedChips);
