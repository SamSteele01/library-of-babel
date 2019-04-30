pragma solidity ^0.5.7;

/*
 *  Author... Sam Steele
 *  Email.... ssteele017@gmail.com
 *  Date..... 4.28.19
 */

  import "./Ownable.sol"; // openZeppelin

 contract PaidAccess is Ownable {

     /**************************************************
      *  Events
      */
     event ContentAdded(string labelHash, string ipfsPath, uint256 price);

     event PriceChanged(string labelHash, uint256 price);

     event ContentPurchased(string labelHash, address sender);

     /**************************************************
      *  Storage
      */

    // NOTE Label == labelHash

    struct Content {
      // string labelHash;
      string ipfsPath;
      address owner;
      uint256 price;
      mapping (address => bool) hasPaid;
    }

    mapping (string => Content) contents; // labelHash

    // Inventory
    uint256 public numberOfContents;
    mapping (uint256 => string) contentRegistry; // labelHash

    uint8 public feePercent; // 1 - 100

    constructor () public {
        feePercent = 3;
    }


    /**************************************************
      *  Fallback
      */

     function() external payable {
          revert();
     }

    /**************************************************
      *  External
      */

      function addContent(string calldata labelHash, string calldata ipfsPath, uint256 price) external {
          contents[labelHash] = Content(ipfsPath, msg.sender, price);
          numberOfContents += 1;
          contentRegistry[numberOfContents] = labelHash;
          emit ContentAdded(labelHash, ipfsPath, price);
      }

      function changePrice(string calldata labelHash, uint256 price) external {
          require(contents[labelHash].owner == msg.sender);
          contents[labelHash].price = price;
          emit PriceChanged(labelHash, price);
      }

      function purchaseContent(string calldata labelHash) external payable {
          require(msg.value >= contents[labelHash].price);
          require(!contents[labelHash].hasPaid[msg.sender], "You have already paid for this.");
          _forwardPayment(contents[labelHash].owner, msg.value);
          contents[labelHash].hasPaid[msg.sender] = true;
          emit ContentPurchased(labelHash, msg.sender);
      }

      function changeFee(uint8 newFeePercent) external onlyOwner {
          require(newFeePercent <= 100, "New fee is too high.");
          require(newFeePercent >= 0, "Fee can not be negative.");
          feePercent = newFeePercent;
      }

     /**************************************************
      *  Public
      */

      // check resource - returns properties [price, locationURL, forwardingAddress?]
      function getContentByLabel(string memory labelHash) public view
      returns (string memory _ipfsPath, uint256 _price) {
          _ipfsPath = contents[labelHash].ipfsPath;
          _price = contents[labelHash].price;
      }

      function getLabelByIndex(uint256 index) public view returns(string memory) {
        return contentRegistry[index];
      }

      function checkHasPaid(string memory labelHash, address buyer) public view returns(bool) {
          return contents[labelHash].hasPaid[buyer];
      }

      function withdraw(uint256 amount) public onlyOwner {
          require(amount <= address(this).balance);
          msg.sender.transfer(amount);
      }

     /**************************************************
      *  Internal
      */

      function _forwardPayment(address receiver, uint256 payment) private {
          // take fee
          uint256 forwardAmount = payment - payment * feePercent / 100;
          address(uint160(receiver)).transfer(forwardAmount);
      }

 }
