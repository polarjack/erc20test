var Web3 = require('web3');

var web3 = new Web3('http://localhost:8545');

var FixSupplyToken = require('./FixSupplyToken.json')

const contractBinary = "0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104148061005e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806379ba5097146100675780638da5cb5b1461007c578063d4ee1d90146100d1578063f2fde38b14610126575b600080fd5b341561007257600080fd5b61007a61015f565b005b341561008757600080fd5b61008f6102fe565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100dc57600080fd5b6100e4610323565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013157600080fd5b61015d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610349565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101bb57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103a457600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820a1c94b0847b8f227f22009c789185fce346077d991586bff2e26ea9ca371d5c10029";

// web3.eth.getCoinbase()
// .then(console.log);

// web3.eth.getGasPrice()
// .then(console.log);


const tokenAddressFirst   = "0x7a9cB08F907f4086A6d70C1A08e865C13907F041";
// const tokenAddressSecond  = "0x144F5096638E246ce09172D2917b5603bC21aba2";

function deploy() {
  var myContract = new web3.eth.Contract(FixSupplyToken, null, {data: contractBinary});
  myContract.deploy({
    // data: contractBinary,
    arguments: ["AAA", "A Token", "18", "10000000"],
  })
  .send({
    from: '0x52da64497cc678d5fe56379e93fbc3a25293b0cc',
    gas: 806816,
    gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
    // gasPrice: '0x0',
  })
  .then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
  });
}

function balanceOf() {
  var myContract = new web3.eth.Contract(FixSupplyToken, tokenAddressFirst);
  myContract.methods.balanceOf("0x52da64497cc678d5fe56379e93fbc3a25293b0cc")
    .call()
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
}


// deploy()
balanceOf();