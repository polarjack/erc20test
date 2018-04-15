var Web3 = require('web3');

var web3 = new Web3('ws://140.119.163.105:8546');

web3.eth.getBalance("0x52da64497cc678d5fe56379e93fbc3a25293b0cc")
  .then(input => {
    console.log(input);
    console.log('fuck');
  });
