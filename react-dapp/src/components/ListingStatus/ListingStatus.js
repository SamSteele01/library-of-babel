import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    height: 780,
    width: "94%",
    margin: "3%"
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.listingStatusSection}>
        <Typography variant="h5" component="h3">
          This is the ListingStatus component.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </div>
      <div className={classes.processSection}>Process Section</div>
      <div className={classes.listingInfoSection}>Listing Info Section</div>
      <div className={classes.sellerInterfaceSection}>
        Seller Actions Section
      </div>
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
