// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EduCrypt is ERC20 {
      IERC20 public s_stakingToken;
     constructor(address stakingToken){
    s_stakingToken=IERC20(stakingToken);
  }
   function decreaseBalance() public {
        _burn(msg.sender, 10 * (10 ** TOKEN_DECIMALS));
    }

}