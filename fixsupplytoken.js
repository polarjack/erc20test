var Web3 = require('web3');

var web3 = new Web3('http://localhost:8545');

var FixSupplyToken = require('./FixSupplyToken.json')

const contractBinary = "0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104148061005e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806379ba5097146100675780638da5cb5b1461007c578063d4ee1d90146100d1578063f2fde38b14610126575b600080fd5b341561007257600080fd5b61007a61015f565b005b341561008757600080fd5b61008f6102fe565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100dc57600080fd5b6100e4610323565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013157600080fd5b61015d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610349565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101bb57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103a457600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820a1c94b0847b8f227f22009c789185fce346077d991586bff2e26ea9ca371d5c10029";

// web3.eth.getCoinbase()
// .then(console.log);

// web3.eth.getGasPrice()
// .then(console.log);

const user = {
  address: "0xC63A4547cF3AD50227870ec55FF2A2942b7B84ee",
  privateKey: "0xc8e36013f810befc332ee843c4da0bdc6caf3eca122ee8a207d3ee98ce9d8a35",
};
const user1 = {
  address: '0x1835C071c339Fc1946f334CE8e2531B65545f203',
  privateKey: '0xe7e98d541030a2258b937a2ea461bed29a96e770d5497e2ece59f617aa8e5538',
}

const rentAddress = "0x144F5096638E246ce09172D2917b5603bC21aba2"


const tokenAddressFirst   = "0xad728b56377e54869e8131406745986d16ed2655";
// const tokenAddressSecond  = "0x144F5096638E246ce09172D2917b5603bC21aba2";

function deploy() {
  var myContract = new web3.eth.Contract(FixSupplyToken);
  var toSign = myContract.deploy({
    data: contractBinary,
    arguments: ["AAA", "A Token", 18, 10000000],
  }).encodeABI();

  web3.eth.accounts.signTransaction({
    to: null,
    data: toSign,
    gas: 2000000,
    gasPrice: '0x0',
  }, user.privateKey)
    .then(response => {
      console.log(response)
      return web3.eth.sendSignedTransaction(response.rawTransaction);
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
  });
  
  // web3.eth.sendSignedTransaction(afterSign.rawTransaction).then(console.log);
  
  // .send({
  //   from: '0x52da64497cc678d5fe56379e93fbc3a25293b0cc',
  //   gas: 806816,
  //   gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
  //   // gasPrice: '0x0',
  // })
  // .then(function(newContractInstance){
  //   console.log(newContractInstance.options.address) // instance with the new contract address
  // });
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
// address to send address ,privateKey who want to send?
function transfer(address, privateKey) {  
  var myContract = new web3.eth.Contract(FixSupplyToken, tokenAddressFirst);
  var toSign = myContract.methods.transfer(address, web3.utils.toWei('10', 'ether')).encodeABI();
  
  web3.eth.accounts.signTransaction({
    to: tokenAddressFirst,
    data: toSign,
    gas: 2000000,
    gasPrice: '0x0',
  }, privateKey)
    .then(response => {
      console.log(response)
      return web3.eth.sendSignedTransaction(response.rawTransaction);
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  
}

eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value: web3.toWei('888888', "ether")})
personal.unlockAccount("31dea4eb995d7b4f0527cb6f2681d0a21e6671f4", "techfin", 999999)


function createUser() {
  let newUser = web3.eth.accounts.create();
  console.log(newUser);
}

// createUser();
// deploy();
balanceOf();

transfer("0x52da64497cc678d5fe56379e93fbc3a25293b0cc", );