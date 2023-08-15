// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BHealth is ERC20, Ownable {
    constructor() ERC20("B-Health", "BHT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferTokens(address _to, uint256 amount) public returns(bool){
        uint256 senderBalance = balanceOf(msg.sender);
        if(senderBalance<amount){
            uint256 mintAmount = amount - senderBalance;
            mint(_to,mintAmount);
        }
        _transfer(msg.sender, _to, amount);
        return true;
    }
}