// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ACDM721 is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    //Counter for increment tokens id 
    Counters.Counter private _tokenIds; 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event TokenCreated(address owner, uint256 _itemId, string _tokenURI);
    constructor () ERC721("Metaverse Token", "MET") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function createToken(address _to,string memory tokenURI) public onlyRole(MINTER_ROLE) returns(uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit TokenCreated(_to, newItemId, tokenURI);
        return newItemId;
    }

    function createSweepedToken(address _to, uint256 tokenId, string memory tokenURI) public onlyRole(MINTER_ROLE) returns(uint256){
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit TokenCreated(_to, tokenId, tokenURI);
        return tokenId;
    }

    function incrementId() external onlyRole(MINTER_ROLE){
        _tokenIds.increment();
    }


    function tokenExist(uint256 _tokenId) external view returns(bool){
        return _exists(_tokenId);    
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
    }
}


