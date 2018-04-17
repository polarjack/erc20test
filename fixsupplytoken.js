var Web3 = require("web3");
var resource = require("./resource");
var { admin } = require("./keyStore");
var { remix, local } = require("./log");

var _ = require('underscore');

var web3 = new Web3("http://localhost:8545");
var eth = web3.eth;

// var FixSupplyToken = require('./FixSupplyToken.json')

// web3.eth.getCoinbase()
// .then(console.log);

// web3.eth.getGasPrice()
// .then(console.log);

const user = {
  address: "0xC63A4547cF3AD50227870ec55FF2A2942b7B84ee",
  privateKey:
    "0xc8e36013f810befc332ee843c4da0bdc6caf3eca122ee8a207d3ee98ce9d8a35"
};
const user1 = {
  address: "0x1835C071c339Fc1946f334CE8e2531B65545f203",
  privateKey:
    "0xe7e98d541030a2258b937a2ea461bed29a96e770d5497e2ece59f617aa8e5538"
};

const rentAddress = "0x144F5096638E246ce09172D2917b5603bC21aba2";

const tokenAddressFirst = "0xad728b56377e54869e8131406745986d16ed2655";
// const tokenAddressSecond  = "0x144F5096638E246ce09172D2917b5603bC21aba2";

async function deploy() {
  var myContract = new web3.eth.Contract(resource.ERC20abi);
  var toSign = myContract
    .deploy({
      data: resource.ERC20bytecode,
      arguments: ["AAA", "A Token", 0, 10000000]
    })
    .encodeABI();

  var keyInfo = await web3.eth.accounts.wallet.decrypt([admin], "techfin");
  keyInfo = keyInfo["0"];

  var result = keyInfo
    .signTransaction({
      data: toSign,
      gas: 2034183,
      gasPrice: '20000000000',
    })
    .then(response => {
      console.log(response);
      return web3.eth.sendSignedTransaction(response.rawTransaction);
    })
    .catch(err => {
      console.log(err);
    });

  console.log(result);

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
  myContract.methods
    .balanceOf("0x52da64497cc678d5fe56379e93fbc3a25293b0cc")
    .call()
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}
// address to send address ,privateKey who want to send?
function transfer(address, privateKey) {
  var myContract = new web3.eth.Contract(FixSupplyToken, tokenAddressFirst);
  var toSign = myContract.methods
    .transfer(address, web3.utils.toWei("10", "ether"))
    .encodeABI();

  web3.eth.accounts
    .signTransaction(
      {
        to: tokenAddressFirst,
        data: toSign,
        gas: 2000000,
        gasPrice: "0x0"
      },
      privateKey
    )
    .then(response => {
      console.log(response);
      return web3.eth.sendSignedTransaction(response.rawTransaction);
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

// eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value: web3.toWei('888888', "ether")})
// personal.unlockAccount("31dea4eb995d7b4f0527cb6f2681d0a21e6671f4", "techfin", 999999)

function createUser() {
  let newUser = web3.eth.accounts.create();
  console.log(newUser);
}

async function compare() {
  let remixFind_0 = await web3.eth.getTransaction(remix.ERC20contract[0])
  let remixFind_1 = await web3.eth.getTransaction(remix.ERC20contract[1])
  
  // console.log(remixFind_0.input == remixFind_1.input);

  // console.log('remix ', remixFind_0 == resource.ERC20bytecode);

  console.log(remixFind_0);
  
  let localFind = await web3.eth.getTransaction(local.ERC20contract[0])
  // console.log('local', localFind);

  // console.log('local ', localFind.input == resource.ERC20bytecode);

}
// compare();
// web3.eth.getCoinbase()

// var result = web3.eth.accounts.wallet.decrypt([admin], "techfin");
// console.log(result['0'].signTransaction);

// createUser();
deploy();
// balanceOf();


// bytecode 要加0x WTF

// console.log('compare', resource.ERC20bytecode == resource.fromRemix);

// transfer("0x52da64497cc678d5fe56379e93fbc3a25293b0cc", );
