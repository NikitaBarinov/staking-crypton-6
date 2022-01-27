// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract WETH is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    event Deposit(address indexed _sender, uint256 _amount);
    mapping(address => uint256) balancesETH;

    constructor() ERC20("wETH", "WTH") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function deposit() external payable {
        require(msg.value > 0, "Insufficent funds");

        balancesETH[msg.sender] += msg.value;  
        _mint(msg.sender, msg.value);

        emit Deposit(msg.sender, msg.value);
    }

    function withDraw(address payable _to, uint256 _amount) external{
        require(balanceOf(msg.sender) >= _amount, "Insufficent funds");
        _to.transfer(_amount);
        burn(_amount);
        balancesETH[msg.sender] -= _amount;
    }

    function getBalanceETH(address _sender) external view returns(uint256){
        return balancesETH[_sender];
    }
}
   