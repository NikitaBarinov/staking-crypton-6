// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ACDM721 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    //Counter for increment tokens id 
    Counters.Counter private _tokenIds; 

    event TokenCreated(address owner, uint256 _itemId, string _tokenURI);
    constructor () ERC721("Metaverse Token", "MET") {

    }

    function createToken(address _to,string memory tokenURI) public onlyOwner returns(uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit TokenCreated(_to, newItemId, tokenURI);
        return newItemId;
    }
}


