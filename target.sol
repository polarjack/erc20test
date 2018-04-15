pragma solidity ^0.4.19;
 
contract ERC223Token {
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes _data);
    event Approval(address _third, uint _value);
    
    // Function that is called when a user or another contract wants to transfer funds .
    // function transfer(address _to, uint _value, bytes _data, string _custom_fallback) public returns (bool success);

    // Function that is called when a user or another contract wants to transfer funds .
    function transfer(address _to, uint _value, bytes _data) public returns (bool success);
    // Standard function transfer similar to ERC20 transfer with no _data .
    // Added due to backwards compatibility reasons .
    function transfer(address _to, uint _value) public returns (bool success);

    //assemble the given address bytecode. If bytecode exists then the _addr is a contract.
    // function isContract(address _addr) private view returns (bool is_contract);

    //function that is called when transaction target is an address
    // function transferToAddress(address _to, uint _value, bytes _data) private returns (bool success);
    
    //function that is called when transaction target is a contract
    // function transferToContract(address _to, uint _value, bytes _data) private returns (bool success);
    
    // function transferFromAtoB(address _from, address _to, uint _value) isOwner public returns (bool success);
    // function transferFromAuth(address _to, uint _value) isAuth public returns (bool success);    
    // function approve(address _third, uint _value) isOwner public;
    // function time(uint64 _now) isOwner public;
    function balanceOf(address _owner) public constant returns (uint balance);
}
