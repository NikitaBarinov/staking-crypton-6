/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TradingFloor, TradingFloorInterface } from "../TradingFloor";

const _abi = [
  {
    inputs: [
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
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountACDM",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_PriceInETH",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ACDMLeft",
        type: "uint256",
      },
    ],
    name: "ACDMBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "FeeTransfered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountACDM",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_priceForAmountACDM",
        type: "uint256",
      },
    ],
    name: "OrderBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountACDM",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalPriceForACDM",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "idOrder",
        type: "uint256",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newPrice",
        type: "uint256",
      },
    ],
    name: "PriceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "_saleOrTrade",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "RoundStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_firstRefer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_secondRefer",
        type: "address",
      },
    ],
    name: "UserIsRegistrated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalPriceForACDM",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountACDM",
        type: "uint256",
      },
    ],
    name: "addOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "balanceOfACDM",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
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
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "balanceOfETH",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
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
        name: "_amountACDM",
        type: "uint256",
      },
    ],
    name: "buyACDMInSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idOrder",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountACDM",
        type: "uint256",
      },
    ],
    name: "buyOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "finishRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockTimeStamp",
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
    inputs: [],
    name: "getIdOrder",
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
        name: "_idOrder",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_totalAmountACDM",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_totalPriceForACDM",
            type: "uint256",
          },
        ],
        internalType: "struct TradingFloor.order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "getRefer",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "firstRefer",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "secondRefer",
            type: "address",
          },
        ],
        internalType: "struct TradingFloor.refer",
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
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getRound",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "finishTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tradingVolumeETH",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "saleOrTrade",
            type: "bool",
          },
        ],
        internalType: "struct TradingFloor.round",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTradingFloorAddress",
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
        name: "_owner",
        type: "address",
      },
    ],
    name: "getUnlockBalance",
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
    inputs: [],
    name: "numOfRound",
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
        internalType: "address payable",
        name: "_firstRefer",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_secondRefer",
        type: "address",
      },
    ],
    name: "registration",
    outputs: [
      {
        internalType: "bool",
        name: "_success",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupplyACDM",
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
    inputs: [],
    name: "tradingFloorInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "unlockBalance",
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
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060055534801561001557600080fd5b50604051611e9e380380611e9e83398101604081905261003491610066565b600080546001600160a01b0319166001600160a01b03929092169190911781556509184e72a000600255600155610094565b600060208284031215610077578081fd5b81516001600160a01b038116811461008d578182fd5b9392505050565b611dfb806100a36000396000f3fe60806040526004361061011f5760003560e01c806372bbe2d3116100a0578063ca49a54311610064578063ca49a543146103ad578063ce7a60ab146103c0578063d09ef241146103ed578063f28db6c414610449578063fb44b2491461046957600080fd5b806372bbe2d3146102f857806373890fd11461030e5780638f1327c0146103235780639270c82c1461037857806398d5fdca1461039857600080fd5b80634a5338f1116100e75780634a5338f1146101d65780634b845f4c14610261578063547916ea14610297578063561cd462146102ac57806362a7d3a3146102e257600080fd5b8063142ee8d8146101245780632e1a7d4d146101395780632f59547c14610159578063334551ff1461017d57806346ca084a146101b3575b600080fd5b610137610132366004611bb6565b610484565b005b34801561014557600080fd5b50610137610154366004611b9e565b610a25565b34801561016557600080fd5b506005545b6040519081526020015b60405180910390f35b34801561018957600080fd5b5061016a610198366004611b23565b6001600160a01b03166000908152600a602052604090205490565b6101c66101c1366004611b46565b610b03565b6040519015158152602001610174565b3480156101e257600080fd5b5061023a6101f1366004611b23565b604080518082018252600080825260209182018190526001600160a01b039384168152600b82528290208251808401909352805484168352600101549092169181019190915290565b6040805182516001600160a01b039081168252602093840151169281019290925201610174565b34801561026d57600080fd5b5061016a61027c366004611b23565b6001600160a01b031660009081526007602052604090205490565b3480156102a357600080fd5b50610137610d1a565b3480156102b857600080fd5b5061016a6102c7366004611b23565b6001600160a01b031660009081526009602052604090205490565b3480156102ee57600080fd5b5061016a60035481565b34801561030457600080fd5b5061016a60015481565b34801561031a57600080fd5b50610137610db5565b34801561032f57600080fd5b5061034361033e366004611b9e565b61101a565b604051610174919081518152602080830151908201526040808301519082015260609182015115159181019190915260800190565b34801561038457600080fd5b50610137610393366004611b9e565b611091565b3480156103a457600080fd5b5060025461016a565b3480156103b957600080fd5b504261016a565b3480156103cc57600080fd5b5061016a6103db366004611b23565b60076020526000908152604090205481565b3480156103f957600080fd5b5061040d610408366004611b9e565b6113e0565b604051610174919081516001600160a01b0316815260208083015190820152604080830151908201526060918201519181019190915260800190565b34801561045557600080fd5b50610137610464366004611bb6565b611485565b34801561047557600080fd5b50604051308152602001610174565b6005548211156104d25760405162461bcd60e51b815260206004820152601460248201527313dc99195c88191bd95cc81b9bdd08195e1a5cdd60621b60448201526064015b60405180910390fd5b80600683815481106104f457634e487b7160e01b600052603260045260246000fd5b90600052602060002090600402016001015410156105245760405162461bcd60e51b81526004016104c990611bf8565b60006006838154811061054757634e487b7160e01b600052603260045260246000fd5b906000526020600020906004020160020154629896806105679190611d49565b6006848154811061058857634e487b7160e01b600052603260045260246000fd5b906000526020600020906004020160030154629896806105a89190611d49565b6105b29190611c3c565b90506000629896806105c48382611d49565b6105ce9085611d49565b6105d89190611c3c565b90503481111561061e5760405162461bcd60e51b8152602060048201526011602482015270496e737566666963656e732066756e647360781b60448201526064016104c9565b80600960006006878154811061064457634e487b7160e01b600052603260045260246000fd5b600091825260208083206004909202909101546001600160a01b031683528201929092526040018120805490919061067d908490611c24565b909155503390506108fc6106918334611d68565b6040518115909202916000818181858888f193505050501580156106b9573d6000803e3d6000fd5b50600154600090815260086020526040812060020180548392906106de908490611c24565b90915550506004546106f190600a611c9f565b6106fb9084611d49565b600a60006006878154811061072057634e487b7160e01b600052603260045260246000fd5b600091825260208083206004909202909101546001600160a01b0316835282019290925260400181208054909190610759908490611d68565b909155505060045461076c90600a611c9f565b6107769084611d49565b336000908152600a602052604081208054909190610795908490611c24565b9250508190555082600685815481106107be57634e487b7160e01b600052603260045260246000fd5b906000526020600020906004020160010160008282546107de9190611d68565b9250508190555061084581600b60006006888154811061080e57634e487b7160e01b600052603260045260246000fd5b600091825260208083206004909202909101546001600160a01b039081168452908301939093526040909101902054166019611682565b6108a881600b60006006888154811061086e57634e487b7160e01b600052603260045260246000fd5b600091825260208083206004909202909101546001600160a01b039081168452908301939093526040909101902060010154166019611682565b600054600680546001600160a01b03909216916323b872dd9190879081106108e057634e487b7160e01b600052603260045260246000fd5b600091825260209091206004918202015490546001600160a01b0390911690339061090c90600a611c9f565b6109169088611d49565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b15801561096557600080fd5b505af1158015610979573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099d9190611b7e565b50336001600160a01b0316600685815481106109c957634e487b7160e01b600052603260045260246000fd5b600091825260209182902060049091020154604080518781529283018590526001600160a01b03909116917fc5a8e3e52ad7afd94d1c5a892e99f6490c03c4cfb961024f85e6cd6fea7cb25b910160405180910390a350505050565b33600090815260076020526040902054421015610a795760405162461bcd60e51b815260206004820152601260248201527142616c616e6365207374696c6c206c6f636b60701b60448201526064016104c9565b3360009081526009602052604081208054839290610a98908490611d68565b9091555050604051339082156108fc029083906000818181858888f19350505050158015610aca573d6000803e3d6000fd5b5060405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a250565b336000818152600b60205260408120549091906001600160a01b031615610b6c5760405162461bcd60e51b815260206004820152601a60248201527f5573657220697320616c7265616479207265676973746572656400000000000060448201526064016104c9565b6001600160a01b038085166000908152600b6020526040902054859116151580610b9d57506001600160a01b038116155b610bdf5760405162461bcd60e51b8152602060048201526013602482015272155cd95c881b9bdd081c9959da5cdd195c9959606a1b60448201526064016104c9565b6001600160a01b038085166000908152600b6020526040902054859116151580610c1057506001600160a01b038116155b610c525760405162461bcd60e51b8152602060048201526013602482015272155cd95c881b9bdd081c9959da5cdd195c9959606a1b60448201526064016104c9565b336000908152600960209081526040808320349055600a909152812055610c7886611744565b336000908152600b6020526040902080546001600160a01b0319166001600160a01b0392909216919091179055610cae85611744565b336000818152600b60205260408082206001810180546001600160a01b0319166001600160a01b039687169081179091559054915190949190911692917fb58d9a518283fd68405fc94680daa780e552e7f9a19cca68813e0ce00ba88ccb91a450600195945050505050565b306000908152600a60205260409020541580610d49575060018054600090815260086020526040902001544210155b610d955760405162461bcd60e51b815260206004820152601760248201527f526f756e642063616e206e6f7420626520636c6f73656400000000000000000060448201526064016104c9565b60018054906000610da583611d7f565b9190505550610db2611773565b50565b60008054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610e0157600080fd5b505afa158015610e15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e399190611bd7565b60ff1660048190556000546001600160a01b0316906340c10f19903090610e6190600a611c9f565b610e6e90620186a0611d49565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401600060405180830381600087803b158015610eb457600080fd5b505af1158015610ec8573d6000803e3d6000fd5b50506000546004546001600160a01b03909116925063095ea7b391503090610ef190600a611c9f565b610efe90620186a0611d49565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381600087803b158015610f4457600080fd5b505af1158015610f58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f7c9190611b7e565b50600454610f8b90600a611c9f565b610f9890620186a0611d49565b306000908152600a6020526040812091909155610fb59042611c24565b6001805460009081526008602052604090200155600454610fd790600a611c9f565b610fe490620186a0611d49565b6001805460009081526008602052604080822093909355815481528281206002018190559054815220600301805460ff19169055565b61104760405180608001604052806000815260200160008152602001600081526020016000151581525090565b5060009081526008602090815260409182902082516080810184528154815260018201549281019290925260028101549282019290925260039091015460ff161515606082015290565b6000620f4240600254836110a59190611d49565b6110b290620f4240611d49565b6110bc9190611c3c565b306000908152600a60205260409020549091508211156110ee5760405162461bcd60e51b81526004016104c990611bf8565b60015460009081526008602052604090206003015460ff16156111465760405162461bcd60e51b815260206004820152601060248201526f139bdd0818481cd85b19481c9bdd5b9960821b60448201526064016104c9565b336000908152600960205260409020548111156111995760405162461bcd60e51b8152602060048201526011602482015270496e737566666963656e742066756e647360781b60448201526064016104c9565b30600090815260096020526040812080548392906111b8908490611c24565b909155505033600090815260096020526040812080548392906111dc908490611d68565b909155505060015460009081526008602052604081206002018054839290611205908490611c24565b909155505060045461121890600a611c9f565b6112229083611d49565b306000908152600a602052604081208054909190611241908490611d68565b909155505060045461125490600a611c9f565b61125e9083611d49565b336000908152600a60205260408120805490919061127d908490611c24565b9091555050336000908152600b60205260409020546112a89082906001600160a01b03166032611682565b336000908152600b60205260409020600101546112d19082906001600160a01b0316601e611682565b6000546004546001600160a01b03909116906323b872dd90309033906112f890600a611c9f565b6113029087611d49565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b15801561135157600080fd5b505af1158015611365573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113899190611b7e565b50306000908152600a602090815260409182902054825185815291820184905281830152905133917fac8a5786dc6e1d04e5cd79ac17e8b30ba9499efe93b532a3c83f7b63b6e3ba6e919081900360600190a25050565b611414604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b6006828154811061143557634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600490930290910180546001600160a01b03168352600181015493830193909352600283015490820152600390910154606082015292915050565b6001805460009081526008602052604090206003015460ff161515146114e15760405162461bcd60e51b8152602060048201526011602482015270139bdd0818481d1c985919481c9bdd5b99607a1b60448201526064016104c9565b336000908152600a60205260409020548111156115105760405162461bcd60e51b81526004016104c990611bf8565b611544604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b3380825260408083018481526060840186815260208086018781526006805460018101825560009190915287517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f600490920291820180546001600160a01b0319166001600160a01b0390921691909117905590517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4082015592517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4184015590517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4290920191909155600554825186815291820187905292917fc91f8c0f477cf15f9c2817f9ebd625732b44c4753ed718ae0276a96577a69f72910160405180910390a36005805490600061167883611d7f565b9190505550505050565b6000633b9aca006116938386611d49565b6116a090620f4240611d49565b6116aa9190611c3c565b306000908152600960205260408120805492935083929091906116ce908490611d68565b90915550506001600160a01b038316600090815260096020526040812080548392906116fb908490611c24565b90915550506040518181526001600160a01b038416907f2604fdad714a10fb8b95e0f03397e449f85ee9df88bd145ca531f15b8350fb579060200160405180910390a250505050565b60006001600160a01b03821615611759575090565b6001600160a01b03821661176e575030919050565b919050565b600061177f8142611c24565b60018054600090815260086020819052604080832084019490945582548252928120600201819055815490916117b491611d68565b815260208101919091526040016000206003015460ff16151560011415611a0b576117dd611abe565b6001546000908152600860209081526040808320600301805460ff191690558254308452600a90925291829020549151630852cd8d60e31b815260048101929092526001600160a01b0316906342966c6890602401600060405180830381600087803b15801561184c57600080fd5b505af1158015611860573d6000803e3d6000fd5b505050506000600254629896806118779190611d49565b6001546000908152600860205260409020600201546118999062989680611d49565b6118a39190611c3c565b6000546040516340c10f1960e01b8152306004820152602481018390529192506001600160a01b0316906340c10f1990604401600060405180830381600087803b1580156118f057600080fd5b505af1158015611904573d6000803e3d6000fd5b505060005460405163095ea7b360e01b8152306004820152602481018590526001600160a01b03909116925063095ea7b39150604401602060405180830381600087803b15801561195457600080fd5b505af1158015611968573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061198c9190611b7e565b50306000908152600a60209081526040808320849055600180548452600883528184208590555483529182902060038101549054600254845160ff9093161515835292820152918201527f3f1f256d10c452e96cacc3da6ad90cd0b5d4aa08e745cb4ccb46bf38ef4b248d9060600160405180910390a1600191505090565b6008600060018054611a1d9190611d68565b815260208101919091526040016000206003015460ff16611abb57600180546000908152600860209081526040808320839055835483528083206003908101805460ff1916861790559354835291829020928301549254600254835160ff909516151585529184015282820152517f3f1f256d10c452e96cacc3da6ad90cd0b5d4aa08e745cb4ccb46bf38ef4b248d9181900360600190a150600190565b90565b60646002546067611acf9190611d49565b611ad99190611c3c565b611ae9906503a352944000611c24565b60028190556040519081527fa6dc15bdb68da224c66db4b3838d9a2b205138e8cff6774e57d0af91e196d6229060200160405180910390a1565b600060208284031215611b34578081fd5b8135611b3f81611db0565b9392505050565b60008060408385031215611b58578081fd5b8235611b6381611db0565b91506020830135611b7381611db0565b809150509250929050565b600060208284031215611b8f578081fd5b81518015158114611b3f578182fd5b600060208284031215611baf578081fd5b5035919050565b60008060408385031215611bc8578182fd5b50508035926020909101359150565b600060208284031215611be8578081fd5b815160ff81168114611b3f578182fd5b602080825260129082015271496e737566666963656e7420746f6b656e7360701b604082015260600190565b60008219821115611c3757611c37611d9a565b500190565b600082611c5757634e487b7160e01b81526012600452602481fd5b500490565b600181815b80851115611c97578160001904821115611c7d57611c7d611d9a565b80851615611c8a57918102915b93841c9390800290611c61565b509250929050565b6000611b3f8383600082611cb557506001611d43565b81611cc257506000611d43565b8160018114611cd85760028114611ce257611cfe565b6001915050611d43565b60ff841115611cf357611cf3611d9a565b50506001821b611d43565b5060208310610133831016604e8410600b8410161715611d21575081810a611d43565b611d2b8383611c5c565b8060001904821115611d3f57611d3f611d9a565b0290505b92915050565b6000816000190483118215151615611d6357611d63611d9a565b500290565b600082821015611d7a57611d7a611d9a565b500390565b6000600019821415611d9357611d93611d9a565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114610db257600080fdfea264697066735822122055cca338e9af487a3607d971bc36352a62e03dd66a116623f3218fafcdd7cd1564736f6c63430008040033";

type TradingFloorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TradingFloorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TradingFloor__factory extends ContractFactory {
  constructor(...args: TradingFloorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _voteToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TradingFloor> {
    return super.deploy(_voteToken, overrides || {}) as Promise<TradingFloor>;
  }
  getDeployTransaction(
    _voteToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_voteToken, overrides || {});
  }
  attach(address: string): TradingFloor {
    return super.attach(address) as TradingFloor;
  }
  connect(signer: Signer): TradingFloor__factory {
    return super.connect(signer) as TradingFloor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TradingFloorInterface {
    return new utils.Interface(_abi) as TradingFloorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TradingFloor {
    return new Contract(address, _abi, signerOrProvider) as TradingFloor;
  }
}
