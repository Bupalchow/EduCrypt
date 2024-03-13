// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EduCrypt is ERC20 {
    uint256 private constant TOKEN_DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 50000 * (10 ** TOKEN_DECIMALS);

    constructor() ERC20("EduCrypt", "ECR") {
        _mint(address(this), INITIAL_SUPPLY); 
    }

    function claimToken() public {
        require(totalSupply() >= INITIAL_SUPPLY, "All tokens claimed");
        _mint(msg.sender, 1 * (10 ** TOKEN_DECIMALS)); 
    }
}