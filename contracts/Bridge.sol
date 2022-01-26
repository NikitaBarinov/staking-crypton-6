// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./assets/ERC721.sol";

contract Bridge is ERC721Holder, Ownable, Pausable {
    //Emitted then token swap initialized 
    event SwapInitialized(
        address indexed sender, 
        uint256 indexed tokenId, 
        uint256 chainFrom, 
        uint256 chainTo, 
        uint256 nonce, 
        string uri
    );
    
    //Emitted then token redeemed  
    event SwapRedeemed(address indexed sender, uint256 indexed tokenId, uint256 chainFrom, uint256 chainTo, uint256 nonce);

    //Address of ERC721 token contract
    address public erc721_CONTRACT;

    //Address of validator
    address public validator;
    
    constructor(address _validator, address _erc721_contract) {
        require(_validator != address(0), 'Invalid validator address');
        require(_erc721_contract != address(0), 'Invalid NFT contract address');

        validator = _validator;
        erc721_CONTRACT = _erc721_contract;
    }

    /** @notice Initialize token swap.
     * @dev  emit SwapInitialized event.
     * @param _tokenId Id of redeemed token.
     * @param chainTo Id of chain to which token came.
     * @param nonce.
    */
    function swap(uint256 _tokenId, uint256 chainTo, uint256 nonce) external whenNotPaused{        
        IERC721(erc721_CONTRACT).transferFrom(msg.sender, address(this), _tokenId);

        emit SwapInitialized(
            msg.sender, 
            _tokenId, 
            block.chainid, 
            chainTo, 
            nonce, 
            ACDM721(erc721_CONTRACT).tokenURI(_tokenId));
    }
    

    /** @notice Redeem token to address.
     * @dev  emit Swapredeemed event.
     * @param _tokenId Id of redeemed token.
     * @param chainFrom Id of chain from which token came.
     * @param nonce.
     * @param v Part of signature.
     * @param r Part of signature.
     * @param s Part of signature.
    */
    function redeem(bytes32 hash, uint256 _tokenId, string memory _uri, uint256 chainFrom, uint256 nonce, uint8 v, bytes32 r, bytes32 s) external whenNotPaused{
        require(checkValidator(hash, v, r, s) == true, "Invalid validator signature");
        
        if(ACDM721(erc721_CONTRACT).tokenExist(_tokenId)){
            IERC721(erc721_CONTRACT).safeTransferFrom(address(this), msg.sender, _tokenId);
        } else{
            ACDM721(erc721_CONTRACT).createSweepedToken(msg.sender, _tokenId, _uri);
        }
    
        emit SwapRedeemed(msg.sender, _tokenId, chainFrom, block.chainid, nonce);
    }

    /** @notice Check that validator sign message.
     * @dev  recover signer from hash.
     * @param hash hash of message.
     * @param v Part of signature.
     * @param r Part of signature.
     * @param s Part of signature.
     * @return true if sender == validator
    */
    function checkValidator(bytes32 hash, uint8 v, bytes32 r, bytes32 s) private view  returns(bool){
        address signer = ecrecover(getEthSignedMessageHash(hash), v, r, s);
        return (signer == validator);
    }
    
    /** @notice Getter for signed message hash.
     * @param _messageHash hash of message.
     * @return signed message hash
    */
    function getEthSignedMessageHash(bytes32 _messageHash)
        private
        view
        returns (bytes32)
    {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    /** Always returns `IERC721Receiver.onERC721Received.selector`. */
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
    return this.onERC721Received.selector;
    }

    /** @notice Unpausing functions of contract.
    * @dev Available only to admin
    * Allows calls to functions with `whenNotPaused` modifier.
    */
    function unpause() external onlyOwner {
        _unpause();
    }

    /** @notice Pausing some functions of contract.
    * @dev Available only to owner.
    * Prevents calls to functions with `whenNotPaused` modifier.
    */
    function pause() external onlyOwner {
        _pause();
    }
}