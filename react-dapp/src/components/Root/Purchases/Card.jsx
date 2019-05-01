import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import BookIcon from "../../../styles/book-icon.png";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes, theme, id, labelHash, ipfsPath, title, image, decryptKey, getDecryptKey, viewFile } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={image ? image : BookIcon}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Lorem ipsum dolor amet thundercats deep v trust fund, freegan hammock pop-up godard hella forage.
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button size="small" color="primary" onClick={getDecryptKey}>
            Get Key
          </Button>
          <TextField
            id="outlined-read-only-input"
            // className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Decrypt Key"
            value={decryptKey}
            InputProps={{
              readOnly: true,
            }}
          />

          <Button size="small" color="primary" onClick={viewFile}>
            View File
          </Button>
        </div>
      </div>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
