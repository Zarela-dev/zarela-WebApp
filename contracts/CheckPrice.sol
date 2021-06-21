// This example code is designed to quickly deploy an example contract using Remix.

// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./AggregatorInterface.sol";

contract PriceConsumer {

    AggregatorInterface internal priceFeed;
    AggregatorInterface internal BTCFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() {
        priceFeed = AggregatorInterface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
    int ETHPrice;
    uint public LastPrice;
    uint256 public Gas_Used;
    uint256 constant MIN_COMMIT = 21000 + 396; // TX cost + initial gas spent reaching assignment of token_amt
    uint256 constant MIN_FINAL  = 1110;       // Required gas for finalizing mint
    uint256 constant MIN_WITH_NON_ZERO = 5000 + MIN_FINAL;
    uint256 constant MIN_WITH_ZERO = 20000 + MIN_FINAL;
    mapping (address => uint256) private _balances;
    
    function getLatestPrice()public  {
        Gas_Used = gasleft() + MIN_COMMIT;
        LastPrice = (tx.gasprice * (uint(priceFeed.latestAnswer()) / 100000000) ) ;
        LastPrice = (Gas_Used * LastPrice)/1000000000000000000;
    }
    
    function GetETHPrice()public view returns(int256) {
        return priceFeed.latestAnswer();
    }
}