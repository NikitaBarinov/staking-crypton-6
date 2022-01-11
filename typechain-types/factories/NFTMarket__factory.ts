/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTMarket, NFTMarketInterface } from "../NFTMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_voteToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "AuctionFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minBidStep",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "finishTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "idAuction",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "idItem",
        type: "uint256",
      },
    ],
    name: "AuctionStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "auctioId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOfBids",
        type: "uint256",
      },
    ],
    name: "BidMaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "ItemBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ItemCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "MarketItemCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sale",
        type: "bool",
      },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "cancelAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "createItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sale",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "finishAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "getAuction",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "lastBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOfBids",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minBidStep",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "finishTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "idItem",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "open",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.Auction",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "getItem",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sale",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idItem",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minBidStep",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startPrice",
        type: "uint256",
      },
    ],
    name: "listItemOnAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newPrice",
        type: "uint256",
      },
    ],
    name: "makeBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620023f1380380620023f18339810160408190526200003491620000ee565b6200003f3362000081565b6000805460ff60a01b19169055600580546001600160a01b039283166001600160a01b0319918216179091556004805493909216921691909117905562000125565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b0381168114620000e957600080fd5b919050565b6000806040838503121562000101578182fd5b6200010c83620000d1565b91506200011c60208401620000d1565b90509250929050565b6122bc80620001356000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806378bd7935116100a257806396b5a7551161007157806396b5a755146102f7578063adfcdc111461030a578063cf266ed01461031d578063e7fb74c714610330578063f2fde38b1461034357600080fd5b806378bd79351461023f5780638456cb59146102c1578063883efa67146102c95780638da5cb5b146102dc57600080fd5b80633f4ba83a116100de5780633f4ba83a146101ff57806340e58ee5146102075780635c975abb1461021a578063715018a61461023757600080fd5b80630b951ee7146101105780630f08efe01461012557806326fb76c2146101435780633129e77314610156575b600080fd5b61012361011e366004612001565b610356565b005b61012d610668565b60405161013a91906120fc565b60405180910390f35b610123610151366004611ed3565b610862565b6101f2610164366004611fb0565b6040805160a08101825260008082526020820181905291810182905260608101829052608081019190915250600090815260076020908152604091829020825160a0810184528154815260018201549281019290925260028101546001600160a01b0390811693830193909352600301549182166060820152600160a01b90910460ff161515608082015290565b60405161013a91906121e7565b610123610a2b565b610123610215366004611fb0565b610a5f565b600054600160a01b900460ff16604051901515815260200161013a565b610123610c00565b61025261024d366004611fb0565b610c34565b60405161013a919060006101008201905060018060a01b038084511683528060208501511660208401525060408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e0830151151560e083015292915050565b610123610d0e565b6101236102d7366004611fe0565b610d40565b6000546040516001600160a01b03909116815260200161013a565b610123610305366004611fb0565b610f51565b610123610318366004611fe0565b611157565b61012361032b366004611fb0565b61143c565b61012361033e366004611fb0565b61161a565b610123610351366004611eb9565b6118f2565b600061036160015490565b9050808411156103ae5760405162461bcd60e51b8152602060048201526013602482015272125d195b48191bd95cc81b9bdd08195e1a5cdd606a1b60448201526064015b60405180910390fd5b6000848152600760205260409020600301546001600160a01b031633146104095760405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b60448201526064016103a5565b600084815260076020526040902060030154600160a01b900460ff16156104665760405162461bcd60e51b81526020600482015260116024820152704974656d20616c72656164792073616c6560781b60448201526064016103a5565b600480546040516323b872dd60e01b81526001600160a01b03909116916323b872dd9161049991339130918a91016120b4565b600060405180830381600087803b1580156104b357600080fd5b505af11580156104c7573d6000803e3d6000fd5b50505060008581526007602052604090206003908101805460ff60a01b1916600160a01b1790556104fc915080546001019055565b600061050760035490565b9050604051806101000160405280336001600160a01b0316815260200160006001600160a01b0316815260200184815260200160008152602001858152602001426203f48061055691906121fb565b81526020808201889052600160409283018190526000858152600680845290849020855181546001600160a01b03199081166001600160a01b03928316178355948701519382018054909516931692909217909255918301516002830155606083015160038301556080830151600483015560a0830151600583015560c08301519082015560e0909101516007909101805460ff19169115159190911790557f7200cf48839ab2613af9e8f2cd3b2a89664b6b7fc52ee433f4d5637500612bba338486610626426203f4806121fb565b604080516001600160a01b03909516855260208501939093529183015260608201526080810183905260a0810187905260c00160405180910390a15050505050565b6060600061067560015490565b9050600080805b838110156106cc5760006007816106948460016121fb565b81526020019081526020016000206001015411156106ba576106b76001846121fb565b92505b806106c48161223f565b91505061067c565b5060008267ffffffffffffffff8111156106f657634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561074f57816020015b6040805160a0810182526000808252602080830182905292820181905260608201819052608082015282526000199092019101816107145790505b50905060005b8481101561085957600060078161076d8460016121fb565b81526020019081526020016000206001015411156108475760006007816107958460016121fb565b815260208082019290925260409081016000908120548082526007845290829020825160a0810184528154815260018201549481019490945260028101546001600160a01b039081169385019390935260038101549283166060850152600160a01b90920460ff1615156080840152855190935090919085908790811061082c57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526108426001866121fb565b945050505b806108518161223f565b915050610755565b50949350505050565b6000546001600160a01b0316331461088c5760405162461bcd60e51b81526004016103a5906121b2565b600054600160a01b900460ff16156108b65760405162461bcd60e51b81526004016103a59061215d565b6108c4600180546001019055565b60006108cf60015490565b60048054604051630138280760e01b81529293506001600160a01b0316916301382807916109019187918791016120d8565b602060405180830381600087803b15801561091b57600080fd5b505af115801561092f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109539190611fc8565b506040805160a081018252828152600060208083018281526004546001600160a01b0390811685870190815289821660608701818152608088018781528a88526007909652958890209651875592516001870155516002860180549183166001600160a01b031990921691909117905592516003909401805492511515600160a01b026001600160a81b0319909316949093169390931717905590517fa9a8fc8429e9d4b8fe54b38fd34cb56aaa1a9bf6eb605f45b223b08b58b9761890610a1e9084815260200190565b60405180910390a2505050565b6000546001600160a01b03163314610a555760405162461bcd60e51b81526004016103a5906121b2565b610a5d61198d565b565b600054600160a01b900460ff1615610a895760405162461bcd60e51b81526004016103a59061215d565b6000818152600760205260409020600301546001600160a01b03163314610aeb5760405162461bcd60e51b81526020600482015260166024820152752cb7ba9030b932903737ba1034ba32b69037bbb732b960511b60448201526064016103a5565b600081815260076020526040902060010154610b395760405162461bcd60e51b815260206004820152600d60248201526c4974656d206e6f742073616c6560981b60448201526064016103a5565b600480546040516323b872dd60e01b81526001600160a01b03909116916323b872dd91610b6c91309133918791016120b4565b600060405180830381600087803b158015610b8657600080fd5b505af1158015610b9a573d6000803e3d6000fd5b50505060008281526007602052604080822060018101929092556003909101805460ff60a01b19169055517fb1a176800c8fd3678d67204dac70aeb48aa9bb90b068dd8d94810161f12c68a99150610bf59083815260200190565b60405180910390a150565b6000546001600160a01b03163314610c2a5760405162461bcd60e51b81526004016103a5906121b2565b610a5d6000611a2a565b610c9060405180610100016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160008152602001600081526020016000815260200160008152602001600081526020016000151581525090565b5060009081526006602081815260409283902083516101008101855281546001600160a01b039081168252600183015416928101929092526002810154938201939093526003830154606082015260048301546080820152600583015460a08201529082015460c082015260079091015460ff16151560e082015290565b6000546001600160a01b03163314610d385760405162461bcd60e51b81526004016103a5906121b2565b610a5d611a7a565b600054600160a01b900460ff1615610d6a5760405162461bcd60e51b81526004016103a59061215d565b6000610d7560015490565b905080831115610dbd5760405162461bcd60e51b8152602060048201526013602482015272125d195b48191bd95cc81b9bdd08195e1a5cdd606a1b60448201526064016103a5565b6000838152600760205260409020600301546001600160a01b03163314610e185760405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b60448201526064016103a5565b60008211610e685760405162461bcd60e51b815260206004820152601e60248201527f5072696365206d75737420626520626967676572207468656e207a65726f000060448201526064016103a5565b600480546040516323b872dd60e01b81526001600160a01b03909116916323b872dd91610e9b91339130918991016120b4565b600060405180830381600087803b158015610eb557600080fd5b505af1158015610ec9573d6000803e3d6000fd5b5050506000848152600760205260409081902060018082018690556003909101805460ff60a01b1916600160a01b179055600454915186935033926001600160a01b0316917f67f82fabf39fcad1b894cde13b20cc40a6bb0d526b67fb2e90e4de4a662b4f1a91610f44918882521515602082015260400190565b60405180910390a4505050565b806000610f5d60035490565b9050808211158015610f85575060008281526006602052604090206007015460ff1615156001145b610fa15760405162461bcd60e51b81526004016103a590612187565b60008381526006602052604090206005015483904210801590610fda57506000818152600660205260409020546001600160a01b031633145b61101f5760405162461bcd60e51b815260206004820152601660248201527521b0b7103737ba103334b734b9b41030bab1ba34b7b760511b60448201526064016103a5565b600084815260066020526040902060030154600210156110715760405162461bcd60e51b815260206004820152600d60248201526c546f6f206d616e79206269647360981b60448201526064016103a5565b60008481526006602081815260409283902083516101008101855281546001600160a01b039081168252600183015416928101929092526002810154938201939093526003830154606082015260048301546080820152600583015460a08201529082015460c082015260079091015460ff16151560e08201526110f490611adf565b6000848152600660205260409020546111179085906001600160a01b0316611b14565b60408051858152600060208201527f2f81cf470cf5a3743bd234181b55ac11ea2319fbeeb52664407d65075436599291015b60405180910390a150505050565b81600061116360035490565b905080821115801561118b575060008281526006602052604090206007015460ff1615156001145b6111a75760405162461bcd60e51b81526004016103a590612187565b6000848152600660205260409020546001600160a01b031633148015906111de575060008481526006602052604090206005015442105b61121d5760405162461bcd60e51b815260206004820152601060248201526f10d85b881b9bdd081b585ad948189a5960821b60448201526064016103a5565b600084815260066020526040902060048101546002909101548491611241916121fb565b111580156112c957506005546040516370a0823160e01b81523360048201526001600160a01b03909116906370a082319060240160206040518083038186803b15801561128d57600080fd5b505afa1580156112a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112c59190611fc8565b8311155b6113095760405162461bcd60e51b8152602060048201526011602482015270496e737566666963656e742066756e647360781b60448201526064016103a5565b600554611321906001600160a01b0316333086611bbe565b60008481526006602081815260409283902083516101008101855281546001600160a01b039081168252600183015416928101929092526002810154938201939093526003830154606082015260048301546080820152600583015460a08201529082015460c082015260079091015460ff16151560e08201526113a490611adf565b60008481526006602052604081206003018054916113c18361223f565b90915550506000848152600660209081526040918290206001810180546001600160a01b0319163390811790915560028201879055600390910154835191825291810186905291820186905260608201527f3b9d0913796994cfc81e0a405eaed0c7ca6c9b57dcbe0eb583cb98eab9df951390608001611149565b80600061144860035490565b9050808211158015611470575060008281526006602052604090206007015460ff1615156001145b61148c5760405162461bcd60e51b81526004016103a590612187565b600083815260066020526040902060050154839042108015906114c557506000818152600660205260409020546001600160a01b031633145b61150a5760405162461bcd60e51b815260206004820152601660248201527521b0b7103737ba103334b734b9b41030bab1ba34b7b760511b60448201526064016103a5565b60008481526006602052604090206003015460021061155e5760405162461bcd60e51b815260206004820152601060248201526f496e737566666963656e74206269647360801b60448201526064016103a5565b6000848152600660205260409020805460029091015460055461158f926001600160a01b0391821692911690611c1c565b60008481526006602081815260408084206001810180549185015486526007845291852060030180546001600160a01b0319166001600160a01b0392831617905593889052919052546115e491869116611b14565b60408051858152600160208201527f2f81cf470cf5a3743bd234181b55ac11ea2319fbeeb52664407d6507543659929101611149565b600054600160a01b900460ff16156116445760405162461bcd60e51b81526004016103a59061215d565b600081815260076020526040902060030154600160a01b900460ff1615156001146116a55760405162461bcd60e51b8152602060048201526011602482015270125d195b48185b1c9958591e481cdbdb19607a1b60448201526064016103a5565b6005546040516370a0823160e01b81523360048201526001600160a01b03909116906370a082319060240160206040518083038186803b1580156116e857600080fd5b505afa1580156116fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117209190611fc8565b60008281526007602052604090206001015411156117745760405162461bcd60e51b8152602060048201526011602482015270496e737566666963656e742066756e647360781b60448201526064016103a5565b6000818152600760205260409020600301546001600160a01b03163314156117d75760405162461bcd60e51b815260206004820152601660248201527521b0b7103737ba10313abc90313c903434b6b9b2b63360511b60448201526064016103a5565b6000818152600760205260409020600381015460019091015460055461180e926001600160a01b0391821692339290911690611bbe565b600480546040516323b872dd60e01b81526001600160a01b03909116916323b872dd9161184191309133918791016120b4565b600060405180830381600087803b15801561185b57600080fd5b505af115801561186f573d6000803e3d6000fd5b5050506000828152600760209081526040918290206003810180546001600160a81b031916339081179091556001909101548351918252918101859052918201527ffe2094c9ff56716cb07edf0cff82da158f346cb3bb2d89703228ab4eb0c329b6915060600160405180910390a1600090815260076020526040812060010155565b6000546001600160a01b0316331461191c5760405162461bcd60e51b81526004016103a5906121b2565b6001600160a01b0381166119815760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103a5565b61198a81611a2a565b50565b600054600160a01b900460ff166119dd5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016103a5565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff1615611aa45760405162461bcd60e51b81526004016103a59061215d565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611a0d3390565b60208101516001600160a01b03161561198a576020810151604082015160055461198a926001600160a01b0390911691611c1c565b6000828152600660208181526040808420808401805486526007808552838720600301805460ff60a01b1916905595889052939092529201805460ff1916905560048054915492516323b872dd60e01b81526001600160a01b03909216926323b872dd92611b8892309287929091016120b4565b600060405180830381600087803b158015611ba257600080fd5b505af1158015611bb6573d6000803e3d6000fd5b505050505050565b611c16846323b872dd60e01b858585604051602401611bdf939291906120b4565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611c51565b50505050565b6040516001600160a01b038316602482015260448101829052611c4c90849063a9059cbb60e01b90606401611bdf565b505050565b6000611ca6826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611d239092919063ffffffff16565b805190915015611c4c5780806020019051810190611cc49190611f90565b611c4c5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016103a5565b6060611d328484600085611d3c565b90505b9392505050565b606082471015611d9d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016103a5565b843b611deb5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016103a5565b600080866001600160a01b03168587604051611e079190612098565b60006040518083038185875af1925050503d8060008114611e44576040519150601f19603f3d011682016040523d82523d6000602084013e611e49565b606091505b5091509150611e59828286611e64565b979650505050505050565b60608315611e73575081611d35565b825115611e835782518084602001fd5b8160405162461bcd60e51b81526004016103a5919061214a565b80356001600160a01b0381168114611eb457600080fd5b919050565b600060208284031215611eca578081fd5b611d3582611e9d565b60008060408385031215611ee5578081fd5b611eee83611e9d565b9150602083013567ffffffffffffffff80821115611f0a578283fd5b818501915085601f830112611f1d578283fd5b813581811115611f2f57611f2f612270565b604051601f8201601f19908116603f01168101908382118183101715611f5757611f57612270565b81604052828152886020848701011115611f6f578586fd5b82602086016020830137856020848301015280955050505050509250929050565b600060208284031215611fa1578081fd5b81518015158114611d35578182fd5b600060208284031215611fc1578081fd5b5035919050565b600060208284031215611fd9578081fd5b5051919050565b60008060408385031215611ff2578182fd5b50508035926020909101359150565b600080600060608486031215612015578081fd5b505081359360208301359350604090920135919050565b60008151808452612044816020860160208601612213565b601f01601f19169290920160200192915050565b80518252602080820151908301526040808201516001600160a01b0390811691840191909152606080830151909116908301526080908101511515910152565b600082516120aa818460208701612213565b9190910192915050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0383168152604060208201819052600090611d329083018461202c565b6020808252825182820181905260009190848201906040850190845b8181101561213e5761212b838551612058565b9284019260a09290920191600101612118565b50909695505050505050565b602081526000611d35602083018461202c565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b602080825260119082015270105d58dd1a5bdb881b9bdd08195e1a5cdd607a1b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60a081016121f58284612058565b92915050565b6000821982111561220e5761220e61225a565b500190565b60005b8381101561222e578181015183820152602001612216565b83811115611c165750506000910152565b60006000198214156122535761225361225a565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220d40b3ad321bc19d5cbbdf72c2ab132d6146bd2f3d1525a908e100845559acc3264736f6c63430008040033";

type NFTMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMarket__factory extends ContractFactory {
  constructor(...args: NFTMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _nftContract: string,
    _voteToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTMarket> {
    return super.deploy(
      _nftContract,
      _voteToken,
      overrides || {}
    ) as Promise<NFTMarket>;
  }
  getDeployTransaction(
    _nftContract: string,
    _voteToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _nftContract,
      _voteToken,
      overrides || {}
    );
  }
  attach(address: string): NFTMarket {
    return super.attach(address) as NFTMarket;
  }
  connect(signer: Signer): NFTMarket__factory {
    return super.connect(signer) as NFTMarket__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketInterface {
    return new utils.Interface(_abi) as NFTMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarket {
    return new Contract(address, _abi, signerOrProvider) as NFTMarket;
  }
}
