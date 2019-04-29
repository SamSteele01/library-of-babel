import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProcessDisplay from "../common/ProcessDisplay";
import TitleDisplay from "../common/TitleDisplay";
import AuthorDisplay from "../common/AuthorDisplay";

const styles = theme => ({
  root: {
    height: 780,
    width: "94%",
    margin: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  listingStatusSection: { border: "2px solid black", height: 80 },
  processSection: { border: "2px solid black", height: 380 },
  listingInfoSection: { border: "2px solid black", height: 180 },
  sellerInterfaceSection: { border: "2px solid black", height: 80 },
  processDisplay: { display: "flex", justifyContent: "center" }
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
      <div className={classes.processSection}>
        <div>Process Section</div>
        <div className={classes.processDisplay}>
          <ProcessDisplay />
        </div>
      </div>
      <div className={classes.listingInfoSection}>
        Listing Info Section
        <TitleDisplay />
        <AuthorDisplay />
        <li>Description</li>
        <li>Price</li>
      </div>
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
