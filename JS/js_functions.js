
var ethNodeAPI = (function() {

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
}

function getContractCode(contractAddress) {
  return eth.getCode(contractAddress);
}

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
};

function smartMine() {
  console.log("start mininig!");
  miner.start(1);
  setTimeout(function() {
    console.log("stop mininig!");
    miner.stop();
  },20000)
};

//Public API

return {
  initContract    : initContract,
  getContractCode : getContractCode
  sendTransaction : sendTransaction,
  smartMine       : smartMine
}



})();
