/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Sezam, SezamInterface } from "../Sezam";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
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
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
  "0x60806040523480156200001157600080fd5b50604080518082018252600581526453657a616d60d81b602080830191825283518085019094526003845262535a4d60e81b9084015281519192916200005a91600091620000e8565b50805162000070906001906020840190620000e8565b5050600b805460ff191690555062000088336200008e565b620001cb565b600b80546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000f6906200018e565b90600052602060002090601f0160209004810192826200011a576000855562000165565b82601f106200013557805160ff191683800117855562000165565b8280016001018555821562000165579182015b828111156200016557825182559160200191906001019062000148565b506200017392915062000177565b5090565b5b8082111562000173576000815560010162000178565b600181811c90821680620001a357607f821691505b60208210811415620001c557634e487b7160e01b600052602260045260246000fd5b50919050565b611f5f80620001db6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80636352211e116100c3578063a22cb4651161007c578063a22cb46514610294578063b88d4fde146102a7578063c87b56dd146102ba578063cd279c7c146102cd578063e985e9c5146102e0578063f2fde38b1461031c57600080fd5b80636352211e1461024057806370a0823114610253578063715018a6146102665780638456cb591461026e5780638da5cb5b1461027657806395d89b411461028c57600080fd5b806323b872dd1161011557806323b872dd146101e15780632f745c59146101f45780633f4ba83a1461020757806342842e0e1461020f5780634f6ccce7146102225780635c975abb1461023557600080fd5b806301ffc9a71461015257806306fdde031461017a578063081812fc1461018f578063095ea7b3146101ba57806318160ddd146101cf575b600080fd5b610165610160366004611c25565b61032f565b60405190151581526020015b60405180910390f35b610182610340565b6040516101719190611d0d565b6101a261019d366004611c5d565b6103d2565b6040516001600160a01b039091168152602001610171565b6101cd6101c8366004611b94565b61045f565b005b6008545b604051908152602001610171565b6101cd6101ef366004611aa6565b610575565b6101d3610202366004611b94565b6105a6565b6101cd61063c565b6101cd61021d366004611aa6565b610676565b6101d3610230366004611c5d565b610691565b600b5460ff16610165565b6101a261024e366004611c5d565b610732565b6101d3610261366004611a5a565b6107a9565b6101cd610830565b6101cd61086a565b600b5461010090046001600160a01b03166101a2565b6101826108a2565b6101cd6102a2366004611b5a565b6108b1565b6101cd6102b5366004611ae1565b6108c0565b6101826102c8366004611c5d565b6108f8565b6101cd6102db366004611bbd565b610903565b6101656102ee366004611a74565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101cd61032a366004611a5a565b610947565b600061033a826109e8565b92915050565b60606000805461034f90611e67565b80601f016020809104026020016040519081016040528092919081815260200182805461037b90611e67565b80156103c85780601f1061039d576101008083540402835291602001916103c8565b820191906000526020600020905b8154815290600101906020018083116103ab57829003601f168201915b5050505050905090565b60006103dd82610a0d565b6104435760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061046a82610732565b9050806001600160a01b0316836001600160a01b031614156104d85760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161043a565b336001600160a01b03821614806104f457506104f481336102ee565b6105665760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161043a565b6105708383610a2a565b505050565b61057f3382610a98565b61059b5760405162461bcd60e51b815260040161043a90611da7565b610570838383610b82565b60006105b1836107a9565b82106106135760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b606482015260840161043a565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b600b546001600160a01b0361010090910416331461066c5760405162461bcd60e51b815260040161043a90611d72565b610674610d2d565b565b610570838383604051806020016040528060008152506108c0565b600061069c60085490565b82106106ff5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b606482015260840161043a565b6008828154811061072057634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b03168061033a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161043a565b60006001600160a01b0382166108145760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161043a565b506001600160a01b031660009081526003602052604090205490565b600b546001600160a01b036101009091041633146108605760405162461bcd60e51b815260040161043a90611d72565b6106746000610dc0565b600b546001600160a01b0361010090910416331461089a5760405162461bcd60e51b815260040161043a90611d72565b610674610e1a565b60606001805461034f90611e67565b6108bc338383610e95565b5050565b6108ca3383610a98565b6108e65760405162461bcd60e51b815260040161043a90611da7565b6108f284848484610f64565b50505050565b606061033a82610f97565b600b546001600160a01b036101009091041633146109335760405162461bcd60e51b815260040161043a90611d72565b61093d8383611106565b6105708282611120565b600b546001600160a01b036101009091041633146109775760405162461bcd60e51b815260040161043a90611d72565b6001600160a01b0381166109dc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161043a565b6109e581610dc0565b50565b60006001600160e01b0319821663780e9d6360e01b148061033a575061033a826111ab565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610a5f82610732565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610aa382610a0d565b610b045760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161043a565b6000610b0f83610732565b9050806001600160a01b0316846001600160a01b03161480610b4a5750836001600160a01b0316610b3f846103d2565b6001600160a01b0316145b80610b7a57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b9582610732565b6001600160a01b031614610bfd5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b606482015260840161043a565b6001600160a01b038216610c5f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161043a565b610c6a8383836111fb565b610c75600082610a2a565b6001600160a01b0383166000908152600360205260408120805460019290610c9e908490611e24565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ccc908490611df8565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b5460ff16610d765760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161043a565b600b805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600b80546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600b5460ff1615610e605760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161043a565b600b805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610da33390565b816001600160a01b0316836001600160a01b03161415610ef75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161043a565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610f6f848484610b82565b610f7b8484848461124c565b6108f25760405162461bcd60e51b815260040161043a90611d20565b6060610fa282610a0d565b6110085760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b606482015260840161043a565b6000828152600a60205260408120805461102190611e67565b80601f016020809104026020016040519081016040528092919081815260200182805461104d90611e67565b801561109a5780601f1061106f5761010080835404028352916020019161109a565b820191906000526020600020905b81548152906001019060200180831161107d57829003601f168201915b5050505050905060006110b860408051602081019091526000815290565b90508051600014156110cb575092915050565b8151156110fd5780826040516020016110e5929190611ca1565b60405160208183030381529060405292505050919050565b610b7a84611359565b6108bc828260405180602001604052806000815250611431565b61112982610a0d565b61118c5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b606482015260840161043a565b6000828152600a6020908152604090912082516105709284019061192f565b60006001600160e01b031982166380ac58cd60e01b14806111dc57506001600160e01b03198216635b5e139f60e01b145b8061033a57506301ffc9a760e01b6001600160e01b031983161461033a565b600b5460ff16156112415760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161043a565b610570838383611464565b60006001600160a01b0384163b1561134e57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611290903390899088908890600401611cd0565b602060405180830381600087803b1580156112aa57600080fd5b505af19250505080156112da575060408051601f3d908101601f191682019092526112d791810190611c41565b60015b611334573d808015611308576040519150601f19603f3d011682016040523d82523d6000602084013e61130d565b606091505b50805161132c5760405162461bcd60e51b815260040161043a90611d20565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610b7a565b506001949350505050565b606061136482610a0d565b6113c85760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161043a565b60006113df60408051602081019091526000815290565b905060008151116113ff576040518060200160405280600081525061142a565b806114098461151c565b60405160200161141a929190611ca1565b6040516020818303038152906040525b9392505050565b61143b8383611636565b611448600084848461124c565b6105705760405162461bcd60e51b815260040161043a90611d20565b6001600160a01b0383166114bf576114ba81600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b6114e2565b816001600160a01b0316836001600160a01b0316146114e2576114e28382611775565b6001600160a01b0382166114f95761057081611812565b826001600160a01b0316826001600160a01b0316146105705761057082826118eb565b6060816115405750506040805180820190915260018152600360fc1b602082015290565b8160005b811561156a578061155481611ea2565b91506115639050600a83611e10565b9150611544565b60008167ffffffffffffffff81111561159357634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156115bd576020820181803683370190505b5090505b8415610b7a576115d2600183611e24565b91506115df600a86611ebd565b6115ea906030611df8565b60f81b81838151811061160d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535061162f600a86611e10565b94506115c1565b6001600160a01b03821661168c5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161043a565b61169581610a0d565b156116e25760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161043a565b6116ee600083836111fb565b6001600160a01b0382166000908152600360205260408120805460019290611717908490611df8565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001611782846107a9565b61178c9190611e24565b6000838152600760205260409020549091508082146117df576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b60085460009061182490600190611e24565b6000838152600960205260408120546008805493945090928490811061185a57634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050806008838154811061188957634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101929092558281526009909152604080822084905585825281205560088054806118cf57634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b60006118f6836107a9565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b82805461193b90611e67565b90600052602060002090601f01602090048101928261195d57600085556119a3565b82601f1061197657805160ff19168380011785556119a3565b828001600101855582156119a3579182015b828111156119a3578251825591602001919060010190611988565b506119af9291506119b3565b5090565b5b808211156119af57600081556001016119b4565b600067ffffffffffffffff808411156119e3576119e3611efd565b604051601f8501601f19908116603f01168101908282118183101715611a0b57611a0b611efd565b81604052809350858152868686011115611a2457600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b0381168114611a5557600080fd5b919050565b600060208284031215611a6b578081fd5b61142a82611a3e565b60008060408385031215611a86578081fd5b611a8f83611a3e565b9150611a9d60208401611a3e565b90509250929050565b600080600060608486031215611aba578081fd5b611ac384611a3e565b9250611ad160208501611a3e565b9150604084013590509250925092565b60008060008060808587031215611af6578081fd5b611aff85611a3e565b9350611b0d60208601611a3e565b925060408501359150606085013567ffffffffffffffff811115611b2f578182fd5b8501601f81018713611b3f578182fd5b611b4e878235602084016119c8565b91505092959194509250565b60008060408385031215611b6c578182fd5b611b7583611a3e565b915060208301358015158114611b89578182fd5b809150509250929050565b60008060408385031215611ba6578182fd5b611baf83611a3e565b946020939093013593505050565b600080600060608486031215611bd1578283fd5b611bda84611a3e565b925060208401359150604084013567ffffffffffffffff811115611bfc578182fd5b8401601f81018613611c0c578182fd5b611c1b868235602084016119c8565b9150509250925092565b600060208284031215611c36578081fd5b813561142a81611f13565b600060208284031215611c52578081fd5b815161142a81611f13565b600060208284031215611c6e578081fd5b5035919050565b60008151808452611c8d816020860160208601611e3b565b601f01601f19169290920160200192915050565b60008351611cb3818460208801611e3b565b835190830190611cc7818360208801611e3b565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611d0390830184611c75565b9695505050505050565b60208152600061142a6020830184611c75565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008219821115611e0b57611e0b611ed1565b500190565b600082611e1f57611e1f611ee7565b500490565b600082821015611e3657611e36611ed1565b500390565b60005b83811015611e56578181015183820152602001611e3e565b838111156108f25750506000910152565b600181811c90821680611e7b57607f821691505b60208210811415611e9c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611eb657611eb6611ed1565b5060010190565b600082611ecc57611ecc611ee7565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146109e557600080fdfea26469706673582212201f2c5b821a75b1d2051c026dbbd4c6ba076c1c040ca840ac9ceb0ac7519f5a5864736f6c63430008040033";

type SezamConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SezamConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Sezam__factory extends ContractFactory {
  constructor(...args: SezamConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Sezam> {
    return super.deploy(overrides || {}) as Promise<Sezam>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Sezam {
    return super.attach(address) as Sezam;
  }
  connect(signer: Signer): Sezam__factory {
    return super.connect(signer) as Sezam__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SezamInterface {
    return new utils.Interface(_abi) as SezamInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Sezam {
    return new Contract(address, _abi, signerOrProvider) as Sezam;
  }
}