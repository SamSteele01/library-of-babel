import React, { useGlobal } from "reactn";
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "inherit",
    color: "white",
  },
  label: {
    textColor: "inherit"
  }
});

function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [route, setRoute] = useGlobal('route');

  function handleChange(event, newValue) {
    console.log('NEWVALUE', newValue);
    if (newValue === 0) setRoute('listings');
    if (newValue === 1) setRoute('purchases');
    if (newValue === 2) setRoute('uploads');
    setValue(newValue);
  }

  return (
    // <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="white"
        centered
      >
        <Tab
          className={classes.root}
          // classes="textColorInherit"
          label="Listings" />
        <Tab
          className={classes.root}
          // classes={{ root: "header-tabs"  }}
          label="My Purchases" />
        <Tab
          className={classes.root}
          // classes={{ textColor: "inherit" }}
          label="My Uploads" />
      </Tabs>
    // </Paper>
  );
}

export default CenteredTabs;
