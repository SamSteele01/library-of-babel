import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextInput from "../../../common/TextInput";
import Upload from "../../../common/Upload";
import InfoSheet from "../../../common/InfoSheet";
import TitleDisplay from "../../../common/TitleDisplay";

const styles = theme => ({
  root: {
    width: "94%",
    margin: "3%",
    border: "2px solid black"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row"
  },
  sectionLeft: { flexBasis: "50%", display: "flex", flexDirection: "column" },
  sectionRight: { flexBasis: "50%", display: "flex", flexDirection: "column" }
});

function Sell(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.details}>
          <TitleDisplay prominent />
        </div>
        <Divider />
        <div className={classes.sectionContainer}>
          <div className={classes.sectionLeft}>
            <div>
              art upload component
              <Upload />
            </div>
            <div>
              test file upload component
              <Upload />
            </div>
            <div>
              listing instructions component
              <InfoSheet />
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice
                <br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
                </a>
              </Typography>
            </div>
          </div>
          <div className={classes.sectionRight}>
            <div>
              <TextInput />
            </div>
            <div>
              <TextInput />
            </div>
            <div>
              <TextInput />
            </div>
            <div>
              <TextInput multiline={true} />
            </div>
          </div>
        </div>
        <div>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
          <div className={classes.column}>
            <Chip
              label="Barbados"
              className={classes.chip}
              onDelete={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Sell.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sell);
