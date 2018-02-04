pragma solidity ^0.4.11;

contract Counter {
    uint count; //counter is stored on every miner node on the network. this is not free!

    /* C'tor
     * Instance of the class is created when a transaction is submitted and triggers a creation.
     * this is when the c'tor is called.
    */
    function Counter() public {
        count = 1;
    }

    function increment() public {
     count = count+=2;
    }

    /*
     *  constant - means that the functions not modifies data of the contract.
    */
    function get() constant public returns (uint) {
        return count;
    }
}
