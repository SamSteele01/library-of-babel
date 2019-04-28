import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  }
});

class TextInput extends React.Component {
  state = {
    input: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-adornment-weight"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Input"
          value={this.state.Input}
          onChange={this.handleChange("input")}
          helperText="Input"
          multiline={this.props.multiline}
          rows="6"
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextInput);
