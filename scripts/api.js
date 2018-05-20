/**
  To use this API, Just copy&paste this in eth node Js console.
**/

var ethnodeapi = (function() {

/////////////////////////////SMART CONTRACTS////////////////////////////////////
/**
Steps:
1. write contract with solidity
2. compile sol file to bin (hex code of EVM bye code)
3. call to 'initContract' method and save transaction adress, this is the contract address
4. compile abi file and use it with contract address to create JS proxy object to interact with the contract by using 'getJsObjToContract'
5. invokde methods by 'invokeMehtodOnContract'
**/

/**
  Usage example:
  solcjs --bin contract.sol --> contract.bin
  var contractBin = "2AF443B455CEE............." (contract.bin)
  toolsAPI.initContract(eth.accounts[0],contractBin,100000);
**/
function initContract(from, contractHex, gas) {
  personal.unlockAccount(from);
  eth.sendTransaction(
    {
      from: from,
      data: "0x" + contractHex,
      gas: gas
    },
    function(err, tx) {
      console.log("err:" + err);
      console.log("tx:" + tx);
    }
  );
  //smartMine();
}

/**
  After 'initContract', we can check if the contract was sent as expected.
  by checking the code of the contractAdress.
**/
function getContractCode(contractAddress) {
  return eth.getCode(contractAddress);
};

/**
  After submit of the contract to the blockchain we got an address of the contract.
  we use this unique address togheter with the abi file to create a javascript proxy object to
  invoke methods of the contract.
  Usage example:
  var conObj = ethNodeAPI.getJsObjToContract(abiObj,"0xc8f90187592312546Aa283ecA0C4Ac4E301fd14C");
**/
function getJsObjToContract(abiStrOutput, contractAdress) {
    //check if contract is valid
    if (getContractCode(contractAdress) === '0x') {
      console.log("contract is not valid!");
      return null;
    }
    var abiObj = JSON.parse(abiStrOutput);
    var contractClass = eth.contract(abiObj); //create javascript contract "class" from the specific contract structure
    //we need to know where in the blockchain this instance lives
    var createJsProxyObjToContract = contractClass.at(contractAdress);
    console.log(createJsProxyObjToContract);
    return createJsProxyObjToContract;
};

/**
**/
function invokeMehtodOnContract(from, jsProxyObj, methodName) {
  personal.unlockAccount(from);
  jsProxyObj[methodName].sendTransaction({from : from});
  //smartMine();
}

/////////////////////////////SMART CONTRACTS////////////////////////////////////

/**
  Usage exmaple:
  toolsAPI.sendTransaction(eth.accounts[0],eth.accounts[1],5,1000000);
**/
function sendTransaction(from, to, amount, gas) {
  personal.unlockAccount(from);
  eth.sendTransaction(
    {
      from: from,
      to: to,
      value: web3.toWei(amount, "ether"),
      gas: gas
    },
    function(err, tx) {
      console.log("err:" + err);
      console.log("tx:" + tx);
    }
  );
  //smartMine();
};

function smartMine() {
  console.log("start mininig!");
  miner.start(1);
  setTimeout(function() {
    console.log("stop mininig!");
    miner.stop();
  },20000)
};

function getBalance(account) {
  console.log(web3.eth.getBalance(account));
}

function printAllBalances() {
  web3.eth.accounts.forEach(function (account) {
      console.log(account + " --> " +  web3.fromWei(web3.eth.getBalance(account), "ether"));
  });
}

function createAccount(password) {
  web3.personal.newAccount((password ? password : "abc123"));
}

function unlockAccount(accountAddress,password) {
  personal.unlockAccount(
    accountAddress,
    password,
    60 * 60 * 24
  );

}

//Public API

return {
  initContract            : initContract,
  getContractCode         : getContractCode
  sendTransaction         : sendTransaction,
  smartMine               : smartMine,
  getJsObjToContract      : getJsObjToContract,
  invokeMehtodOnContract  : invokeMehtodOnContract,
  getBalance              : getBalance,
  printAllBalances        : printAllBalances,
  createAccount           : createAccount
  unlockAccount           : unlockAccount

}



})();
