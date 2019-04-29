import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProcessDisplay from "../common/ProcessDisplay";
import TitleDisplay from "../common/TitleDisplay";
import AuthorDisplay from "../common/AuthorDisplay";
import Description from "../common/Description";
import Price from "../common/Price";
import TotalSales from "../common/TotalSales";

const styles = theme => ({
  root: {
    height: 780,
    width: "94%",
    margin: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  listingStatusSection: {
    border: "2px solid black",
    height: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  section1: {
    flexBasis: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  section2: { display: "flex" },
  processSection: {
    border: "2px solid black",
    height: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  listingInfoSection: {
    border: "2px solid black",
    height: 180,
    display: "flex",
    flexDirection: "row"
  },
  sellerInterfaceSection: {
    border: "2px solid black",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  processDisplay: { display: "flex", justifyContent: "center" }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.listingStatusSection}>
        <Typography variant="headline" component="h3" align="center">
          This Listing is {`ACTIVE`}.
        </Typography>
      </div>
      <div className={classes.processSection}>
        <div className={classes.processDisplay}>
          <ProcessDisplay />
        </div>
      </div>
      <div className={classes.listingInfoSection}>
        <div className={classes.section1}>
          <TitleDisplay />
          <AuthorDisplay />
          <Price />
        </div>
        <div className={classes.section2}>
          <Description />
        </div>
      </div>
      <div className={classes.sellerInterfaceSection}>
        <TotalSales total={"4.50"} />
        <li>Active/Inactive</li>
      </div>
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
