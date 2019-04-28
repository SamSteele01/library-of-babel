import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    height: 780,
    width: "94%",
    margin: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  titleSection: { border: "2px solid black", height: 180 },
  processSection: { border: "2px solid black", height: 180 },
  statusSection: { border: "2px solid black", height: 180 },
  readerSection: { border: "2px solid black", height: 180 }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.titleSection}>
        <Typography variant="h5" component="h3">
          This is the DecryptionStatus component.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </div>
      <div className={classes.processSection}>Process Section</div>
      <div className={classes.statusSection}>Status Section</div>
      <div className={classes.readerSection}>Reader Actions Section</div>
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
