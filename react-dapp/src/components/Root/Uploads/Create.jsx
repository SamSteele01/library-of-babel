import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import superagent from 'superagent';

import './uploads.css'

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

class Create extends React.Component {

  static propTypes = {
    account: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      label: '',
      labelHash: '',
      pubKey: '',
      title: '',
      // content: '',
      buffer: '',
      finneyPrice: '',
      usd: '',
      ipfsPath: null,
      message: ''
    };
  }

  handleChange = state => event => {
    this.setState({ [state]: event.target.value });
  };

  getPubKey = async (event, label) => {
    try {
      event.preventDefault();
      const res = await superagent.post('http://localhost:8080/get-encrypt-key')
      .send({ label });
      console.log(res.body);
      this.setState({
        labelHash: res.body.labelHash,
        pubKey: res.body.pubKey
       });
    } catch (err) {
      console.log(err);
      console.log('The server is not running. Using test data...');
      this.setState({ message: err.message });
    }
  };

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer });
  };

  saveToDB = async (event) => {
    try {
      event.preventDefault();
      const res = await superagent.post('http://localhost:8080/books')
      .send({
        labelHash: this.state.labelHash,
        ethAddress: this.props.account,
        content: this.state.buffer,
        ethPrice: this.state.finneyPrice,
        title: this.state.title
      });
      console.log(res.body);
      this.setState({
        message: res.body.message,
        ipfsPath: res.body.ipfsPath
        // bookId
      });
    } catch (err) {
      console.log(err);
      console.log('The server is not running. Using test data...');
      this.setState({ message: err.message });
    }
  };

  render() {
    const { classes } = this.props;
    const { label, labelHash, pubKey, buffer, title, finneyPrice, usd, message, ipfsPath } = this.state;

    return (
      <div className='upload-create-container'>

        <div className='upload-create'>
          <TextField
            id="outlined-adornment-weight"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Label"
            value={label}
            onChange={this.handleChange('label')}
            // helperText="Input"
            // multiline={this.props.multiline}
            // rows="6"
          />
          <Button size="small" color="primary"
            onClick={(event) => this.getPubKey(event, label)}
          >
            Get Key
          </Button>
        </div>

        <div className='upload-create'>

          <TextField
            id="outlined-read-only-input"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="LabelHash"
            value={labelHash}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="pubKey"
            value={pubKey}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div className='upload-create'>
          <form
            // onSubmit={this.onSubmit}
            >
            <input
              type = "file"
              onChange = {this.captureFile}
            />
             {/* <Button
               bsStyle="primary"
               type="submit">
             Select File
             </Button> */}
          </form>
          {/* {buffer && <FileIcon />} */}
        </div>

        <div className='upload-create'>

          <TextField
            id="outlined-adornment-weight"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Title"
            value={title}
            onChange={this.handleChange('title')}
            // helperText="Input"
            // multiline={this.props.multiline}
            // rows="6"

          />
          <TextField
            id="outlined-adornment-amount"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Price"
            value={finneyPrice}
            onChange={this.handleChange('finneyPrice')}
            helperText="Price in Finney (Eth)"
            // multiline={this.props.multiline}
            // rows="6"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          {/* usd */}
        </div>

        <div className='upload-create'>
          <Button size="small" color="primary" onClick={this.saveToDB}>
            Upload
          </Button>
          {message && <div>{message}</div>}
        </div>

        {ipfsPath &&
          <div className='upload-create'>
            <TextField
              id="outlined-read-only-input"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              label="IpfsPath"
              value={ipfsPath}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        }

      </div>
    );
  }

}
export default withStyles(styles)(Create);
