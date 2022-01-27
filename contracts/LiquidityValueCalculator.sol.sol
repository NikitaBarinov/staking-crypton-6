// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import './interfaces/ILiquidityValueCalculator.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {        
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));        
        totalSupply = pair.totalSupply();        
        (uint reserves0, uint reserves1,) = pair.getReserves();        
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);    
    }

     function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external override returns (uint tokenAAmount, uint tokenBAmount) {        
        revert('TODO');    
     }
}