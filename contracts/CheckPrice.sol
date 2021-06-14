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

    uint LastPrice;
    function getLatestPrice()public payable {
        LastPrice = ( 500000 * tx.gasprice * (uint(priceFeed.latestAnswer()) / 100000000) ) / 1000000000000000000 ;
    }
    
    function GetETHPrice()public view returns(int256) {
        return priceFeed.latestAnswer();
    }
}