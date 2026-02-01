// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PaymentRouter is Ownable, ReentrancyGuard {
    IERC20 public usdcToken;
    address public treasuryAddress;

    event UtilityPayment(
        address indexed payer,
        string serviceType,
        string recipient,
        uint256 amount,
        string reference,
        uint256 timestamp
    );

    event Deposit(
        address indexed user,
        uint256 amount,
        string mobileMoneyRef,
        uint256 timestamp
    );

    event Withdrawal(
        address indexed user,
        uint256 amount,
        string phoneNumber,
        string reference,
        uint256 timestamp
    );

    constructor(address _usdcToken, address _treasuryAddress) {
        usdcToken = IERC20(_usdcToken);
        treasuryAddress = _treasuryAddress;
    }

    // Pay for utilities (airtime, data, electricity, school fees)
    function payUtility(
        string memory serviceType,
        string memory recipient,
        uint256 amount,
        string memory reference
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            usdcToken.transferFrom(msg.sender, treasuryAddress, amount),
            "USDC transfer failed"
        );

        emit UtilityPayment(
            msg.sender,
            serviceType,
            recipient,
            amount,
            reference,
            block.timestamp
        );
    }

    // Credit user after mobile money deposit (called by backend)
    function creditDeposit(
        address user,
        uint256 amount,
        string memory mobileMoneyRef
    ) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(
            usdcToken.transferFrom(treasuryAddress, user, amount),
            "USDC transfer failed"
        );

        emit Deposit(user, amount, mobileMoneyRef, block.timestamp);
    }

    // Lock USDC for withdrawal (user → treasury)
    function requestWithdrawal(
        uint256 amount,
        string memory phoneNumber,
        string memory reference
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            usdcToken.transferFrom(msg.sender, treasuryAddress, amount),
            "USDC transfer failed"
        );

        emit Withdrawal(
            msg.sender,
            amount,
            phoneNumber,
            reference,
            block.timestamp
        );
    }

    // Update treasury address
    function setTreasuryAddress(address _newTreasury) external onlyOwner {
        treasuryAddress = _newTreasury;
    }

    // Emergency withdraw (owner only)
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = usdcToken.balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");
        require(
            usdcToken.transfer(owner(), balance),
            "Transfer failed"
        );
    }
}
