// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./tokens/ACDM.sol";
import "./tokens/ERC721.sol";

contract NFTMarket is Ownable, Pausable{
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;
    //Counter for items id 
    Counters.Counter private _itemIds;
    //Counter for amount of sold items
    Counters.Counter private _itemsSold;
    //Counter for auctions
    Counters.Counter private _auctionIds; 
    
    address private nftContract;
    ACDM private token;

    constructor(address _nftContract, address _voteToken) {
        token = ACDM(_voteToken);
        nftContract = _nftContract;
    }

    struct MarketItem {
        uint256 itemId;
        uint256 price;
        address nftContract;
        address owner;
        bool sale;
    }

    struct Auction{
        address owner;
        address lastBidder;
        uint256 price;
        uint256 amountOfBids;
        uint256 minBidStep;
        uint256 finishTime;
        uint256 idItem;
        bool open;
    }

    mapping(uint256 => Auction) auctions; //auctionID => Auction

    mapping(uint256 => MarketItem) private idToMarketItem;//itemId => MarketItem
    

    //question1
    //Emitted when auction finished, if result == true auction succesfully finished
    //if result == false auction canceled
    event AuctionFinished(uint256 auctionId, bool result);

    //Emitted when maked a bid
    event BidMaked(address bidder, uint256 newPrice, uint256 auctioId, uint256 amountOfBids);

    //Emitted when created auction for item
    event AuctionStarted(
        address owner,
        uint256 startPrice,
        uint256 minBidStep,
        uint256 finishTime,
        uint256 idAuction,
        uint256 idItem
    );

    //Emitted when created token for item
    event ItemCreated(
        address indexed owner,
        uint256 tokenId
    );
    
    //Emitted when item listed
    event MarketItemCreated (
        address indexed nftContract,
        address indexed owner,
        uint256 indexed itemId,
        uint256 price,
        bool sale
    );
    
    //Emitted when item bought by new user
    event ItemBought(address _newOwner, uint256 _itemId, uint256 _price);
    
    //Emitted when listed item cancelled without buying
    event MarketItemCanceled(uint256 _itemId);
    
    modifier auctionExist(uint256 _auctionId){
        uint256 auctionIds = _auctionIds.current();
        require(
            _auctionId <= auctionIds &&
            auctions[_auctionId].open == true, 
        "Auction not exist"
        );
        _;
    }

    modifier auctionTimeOwner(uint256 _auctionId){
        require(
            auctions[_auctionId].finishTime <= block.timestamp &&
            auctions[_auctionId].owner == msg.sender,
            "Can not finish auction");
        _;
    }

    modifier itemSale(uint256 _itemId){
        require(idToMarketItem[_itemId].sale == true, "Item sale");
        _;
    }

    modifier itemOwner(uint256 _itemId){
        require(idToMarketItem[_itemId].owner == msg.sender,"Not token owner");
        _;
    }

    
    /** @notice Create token on ERC721 contract and on this.
     * @dev Create idToMarketItem, emit ItemCreated event.
     * @param _to Address of receiver of nft.
     * @param tokenURI URI of mintable token.
    */
    function createItem(
        address _to,
        string memory tokenURI
    ) external 
    onlyOwner
    whenNotPaused{
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        
        MonkeyVision(nftContract).createToken(_to, tokenURI);

        idToMarketItem[itemId] = MarketItem(
            itemId,
            0,
            nftContract,
            _to,
            false
        );

        emit ItemCreated(
            _to,
            itemId 
        );
    }

    /** @notice List item on marketplace.
     * @dev Update itemsId, emit MarketItemCreated event.
     * @param _itemId Id of listed item.
     * @param _price Price in EIP20 tokens for item.
    */
    function listItem(
        uint256 _itemId, 
        uint256 _price
    ) external 
    whenNotPaused
    itemOwner(_itemId)
    {
        require(_price > 0,"Price must be bigger then zero");

        _listItem(_itemId);
        idToMarketItem[_itemId].price = _price;

        emit MarketItemCreated(
            nftContract, 
            msg.sender,  
            _itemId,
            _price,
            true
        ); 
    }

    /** @notice Buy item for price in ACDM tokens.
     * @dev Market item have price more then zero, emit ItemBought event.
     * @param _itemId Id of listed item.
    */
    function buyItem(uint256 _itemId) external whenNotPaused
    itemSale(_itemId){
        require(idToMarketItem[_itemId].price <= IERC20(token).balanceOf(msg.sender), "Insufficent funds");
        require(idToMarketItem[_itemId].owner != msg.sender, "Can not buy by himself");
       
        IERC20(token).safeTransferFrom(msg.sender, idToMarketItem[_itemId].owner, idToMarketItem[_itemId].price);
        
        cancelItem_( _itemId,  msg.sender);
        
        idToMarketItem[_itemId].owner = msg.sender;
        
        emit ItemBought(
            msg.sender,  
            _itemId,
            idToMarketItem[_itemId].price
        );
        idToMarketItem[_itemId].price = 0;
    }

    /** @notice Cancel item sale for price in ACDM tokens.
     * @dev Non market items have zero price, emit MarketItemCanceled event.
     * @param _itemId Id of listed item.
    */
    function cancel(uint256 _itemId) external whenNotPaused
    itemSale(_itemId)
    itemOwner(_itemId){
        require(idToMarketItem[_itemId].price > 0, "Item not sale");
       //item sale
        cancelItem_( _itemId,  msg.sender);
        idToMarketItem[_itemId].price = 0;

        emit MarketItemCanceled( _itemId);
    }
    // comments

    function listItemOnAuction(
            uint256 _idItem, 
            uint256 _minBidStep, 
            uint256 _startPrice
        ) external
        itemOwner(_idItem){
        //if item owner exist, item also exist ?
        require(idToMarketItem[_idItem].sale == false,"Item already sale");
        
        _listItem(_idItem);
    
        _auctionIds.increment();
        uint256 auctionIds = _auctionIds.current();
        
        auctions[auctionIds] = Auction(
            msg.sender,
            address(0),
            _startPrice,
            0,
            _minBidStep,
            (block.timestamp + (3 * 24 * 3600)),
            _idItem,
            true
        );
        
        emit AuctionStarted(
            msg.sender,
            _startPrice,
            _minBidStep,
            (block.timestamp + (3 * 24 * 3600)),
            auctionIds,
            _idItem
        );
       
    }

    function makeBid(
        uint256 _auctionId, 
        uint256 _newPrice
        ) external 
        auctionExist(_auctionId)
        {
        require(
            auctions[_auctionId].owner != msg.sender &&
            auctions[_auctionId].finishTime > block.timestamp, 
            "Can not make bid");
        require(
            (auctions[_auctionId].price + auctions[_auctionId].minBidStep) <= _newPrice && 
            (_newPrice) <= IERC20(token).balanceOf(msg.sender), 
            "Insufficent funds"
        );

        IERC20(token).safeTransferFrom(msg.sender, address(this), _newPrice);

        transferToLastBidder(auctions[_auctionId]);
        
        auctions[_auctionId].amountOfBids ++;
        auctions[_auctionId].lastBidder = msg.sender;
        auctions[_auctionId].price = _newPrice;
        
        emit BidMaked(msg.sender, _newPrice, _auctionId, auctions[_auctionId].amountOfBids);
    }

    //getter for market auctions
    //read storage
    function finishAuction(
        uint256 _auctionId
    ) external 
    auctionExist(_auctionId)
    auctionTimeOwner(_auctionId){
        require(auctions[_auctionId].amountOfBids > 2, "Insufficent bids");
        
        IERC20(token).safeTransfer(auctions[_auctionId].owner, auctions[_auctionId].price);
        
        idToMarketItem[auctions[_auctionId].idItem].owner = auctions[_auctionId].lastBidder;
        
        _cancelAuction(_auctionId, auctions[_auctionId].lastBidder);

        emit AuctionFinished(_auctionId, true);
    }   

    function cancelAuction(
        uint256 _auctionId
    ) external
    auctionExist(_auctionId)
    auctionTimeOwner(_auctionId){
        require(auctions[_auctionId].amountOfBids <= 2, "Too many bids");
        
        transferToLastBidder(auctions[_auctionId]);
        _cancelAuction(_auctionId, auctions[_auctionId].owner);

        emit AuctionFinished(_auctionId, false);
    }

    function transferToLastBidder(Auction memory _auction) private{
        if(_auction.lastBidder != address(0)){
            IERC20(token).safeTransfer(_auction.lastBidder, _auction.price);
        }
    }

    function _cancelAuction(uint256 _auctionId, address _to) private{
        auctions[_auctionId].open = false;
        cancelItem_(auctions[_auctionId].idItem, _to);
    }

    function cancelItem_(uint256 _itemId, address _to) private{
        IERC721(nftContract).transferFrom(address(this), _to, _itemId);
        idToMarketItem[_itemId].sale = false;
    }

    function _listItem(uint256 _itemId) private{
         IERC721(nftContract).transferFrom(msg.sender, address(this), _itemId);
        idToMarketItem[_itemId].sale = true;
    }

    /** @notice Getter for auctions array.
    */
    function getAuction(uint256 _auctionId) external view returns(Auction memory){
        return auctions[_auctionId];
    }

    /** @notice Getter for choisen item.
    */
    function getItem(uint256 _itemId) public view returns(MarketItem memory){
        return idToMarketItem[_itemId];
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
    
    /** @notice Fetch array of market items.
    */
    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++){
            if(idToMarketItem[i + 1].price > 0) {
                unsoldItemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++){
            if(idToMarketItem[i + 1].price > 0){
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
            }
        } 
        return items;
    }
}

