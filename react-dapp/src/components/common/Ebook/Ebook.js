import React, { useGlobal } from "reactn";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import superagent from 'superagent';

import BookIcon from "../../../styles/book-icon.png";
import Confirm from "../../Confirm";

import { withContract } from "../withContract";
import PaidAccessAbi from '../../../contracts/PaidAccessAbi';
import PaidAccessAddress from '../../../contracts/PaidAccessAddress';

const styles = {
  card: {
    width: 345,
    margin: 10
  },
  media: {
    height: 140,
    backgroundSize: "contain"
  }
};

function Ebook(props) {
  const { classes, id, labelHash, title, image, desc, price, purchase, view } = props;
  const [account] = useGlobal('account');
  const [displayWeb3, setDisplayWeb3] = useGlobal('displayWeb3');
  const ConfirmAndSend = withContract(Confirm, PaidAccessAbi, PaidAccessAddress);

  async function recordInDB(txn) {
      try {
        const res = await superagent.post('http://localhost:8080/purchase')
        .send({
          bookId: id,
          ethAddress: account,
          labelHash,
          txn
        });
        console.log('purchase recorded!', res.body);
        // display component ...
      } catch (err) {
        console.log(err);
        console.log('The server is not running. Using test data...');
        // this.setState({ books: bookDataObjects });
      }
    };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image ? image : BookIcon}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">{desc}</Typography>
          <Typography component="p">$ {price} Eth</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {purchase && (
          <div>
            {account ? (
              <ConfirmAndSend
                account={account}
                labelHash={labelHash}
                price={price}
                recordInDB={recordInDB}
              />
            ) : (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={event => setDisplayWeb3(true)}
                >
                  Buy
                </Button>
            )}
          </div>
        )}
        {view && (
          <Button size="small" color="primary" onClick={event => view(id)}>
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

Ebook.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Ebook);
