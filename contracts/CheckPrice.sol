// This example code is designed to quickly deploy an example contract using Remix.

// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract PriceConsumer {

    AggregatorInterface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor()  {
        priceFeed = AggregatorInterface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
  

    uint LastPrice;
    function getLatestPrice()public payable {
        LastPrice = ( 500000 * tx.gasprice * (uint(priceFeed.latestAnswer()) / 100000000) ) / 1000000000000000000 ;
    }
    /**
     * Returns the timestamp of the latest price update
     */
    function getLatestPriceTimestamp() public view returns (uint256) {
        return priceFeed.latestTimestamp();
    }
}