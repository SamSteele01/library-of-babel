

class Validate {

  ethAddressBody = (req) => {
      req.checkBody('ethAddress', 'The ethAddress cannot be empty').notEmpty();
      let errors = req.validationErrors();
      if (errors) throw errors;
  }

  ethAddressParam = (req) => {
      req
        .checkParams('ethAddress', 'The ethAddress cannot be empty').notEmpty();
      let errors = req.validationErrors();
      if (errors) throw errors;
  }

  labelHashAndEthAddress = (req) => {
    req.checkBody('labelHash', 'The labelHash cannot be empty').notEmpty();
    req.checkBody('ethAddress', 'The ethAddress cannot be empty').notEmpty();
    let errors = req.validationErrors();
    if (errors) throw errors;
  }

  id = (req) => {
      req.checkParams('id', 'The id cannot be empty').notEmpty();
      let errors = req.validationErrors();
      if (errors) throw errors;
  }

  label = (req) => {
      req.checkBody('label', 'The label cannot be empty').notEmpty();
      let errors = req.validationErrors();
      if (errors) throw errors;
  }

  createBook = (req) => {
    req.checkBody('content', 'The content cannot be empty').notEmpty();
    req.checkBody('ethPrice', 'The ethPrice cannot be empty').notEmpty();
    let errors = req.validationErrors();
    if (errors) throw errors;
  }

  purchase = (req) => {
    req.checkBody('bookId', 'The bookId cannot be empty').notEmpty();
    req.checkBody('txn', 'The txn cannot be empty').notEmpty();
    let errors = req.validationErrors();
    if (errors) throw errors;
  }

  purchaseId = (req) => {
      req.checkBody('purchaseId', 'The purchaseId cannot be empty').notEmpty();
      let errors = req.validationErrors();
      if (errors) throw errors;
  }

}
export default new Validate();
