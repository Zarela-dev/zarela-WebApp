// This example code is designed to quickly deploy an example contract using Remix.

// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     * 0x6135b13325bfC4B00278B4abC5e20bbce2D6580e
     * BAT/USD 0x8e67A0CFfbbF6A346ce87DFe06daE2dc782b3219
     * KNC / ETH : 0xb8E8130d244CFd13a75D6B9Aee029B1C33c808A7
     * BTC / USD : 0x6135b13325bfC4B00278B4abC5e20bbce2D6580e
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return (price);
    }
    
}