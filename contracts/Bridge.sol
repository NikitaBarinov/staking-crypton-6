// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Bridge is ERC721Holder {
    //Emitted then token swap initialized 
    event SwapInitialized(address sender, uint256 tokenId, uint256 chainFrom, uint256 chainTo, uint256 nonce);
    
    //Emitted then token redeemed  
    event SwapRedeemed(address sender, uint256 tokenId, uint256 chainFrom, uint256 chainTo, uint256 nonce);

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
     * @param tokenId Id of redeemed token.
     * @param chainTo Id of chain to which token came.
     * @param nonce.
    */
    function swap(uint256 tokenId, uint256 chainTo, uint256 nonce) external {        
        IERC721(erc721_CONTRACT).transferFrom(msg.sender, address(this), tokenId);
        
        emit SwapInitialized(msg.sender, tokenId, block.chainid, chainTo, nonce);
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
    function redeem(uint256 _tokenId, uint256 chainFrom, uint256 nonce, uint8 v, bytes32 r, bytes32 s) public {
        bytes32 hash = keccak256(abi.encodePacked(
            msg.sender, _tokenId, chainFrom, block.chainid, nonce
        ));

      //  bool isValidator = checkValidator(hash, v, r, s);
        if (checkValidator(hash, v, r, s) == true ){
            revert("dadsadaa");
        }
        require(checkValidator(hash, v, r, s) == true, "Invalid validator signature");
        
        IERC721(erc721_CONTRACT).safeTransferFrom(address(this), msg.sender, _tokenId);

        emit SwapRedeemed(msg.sender, _tokenId, chainFrom, block.chainid, nonce);
    }
    // хеши не совпадают
    /** @notice Check that validator sign message.
     * @dev  recovered signer from hash.
     * @param hash hash of message.
     * @param v Part of signature.
     * @param r Part of signature.
     * @param s Part of signature.
     * @return true if sender == validator
    */
    function checkValidator(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view  returns(bool){
        bytes32 a = getEthSignedMessageHash(hash);
        address signer = ecrecover(a, v, r, s);
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
}