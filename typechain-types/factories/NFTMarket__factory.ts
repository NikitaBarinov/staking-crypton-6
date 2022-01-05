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
        indexed: false,
        internalType: "address",
        name: "seller",
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
        name: "sold",
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
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sold",
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
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sold",
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
  "0x60806040523480156200001157600080fd5b5060405162001706380380620017068339810160408190526200003491620000ee565b6200003f3362000081565b6000805460ff60a01b19169055600480546001600160a01b039283166001600160a01b0319918216179091556003805493909216921691909117905562000125565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b0381168114620000e957600080fd5b919050565b6000806040838503121562000101578182fd5b6200010c83620000d1565b91506200011c60208401620000d1565b90509250929050565b6115d180620001356000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063715018a611610071578063715018a6146101e05780638456cb59146101e8578063883efa67146101f05780638da5cb5b14610203578063e7fb74c71461021e578063f2fde38b1461023157600080fd5b80630f08efe0146100b957806326fb76c2146100d75780633129e773146100ec5780633f4ba83a146101a857806340e58ee5146101b05780635c975abb146101c3575b600080fd5b6100c1610244565b6040516100ce919061143c565b60405180910390f35b6100ea6100e5366004611232565b610451565b005b61019b6100fa36600461130f565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915250600090815260056020908152604091829020825160c0810184528154815260018201549281019290925260028101546001600160a01b0390811693830193909352600381015483166060830152600401549182166080820152600160a01b90910460ff16151560a082015290565b6040516100ce91906114fc565b6100ea61063f565b6100ea6101be36600461130f565b610673565b600054600160a01b900460ff1660405190151581526020016100ce565b6100ea610815565b6100ea610849565b6100ea6101fe36600461133f565b61087b565b6000546040516001600160a01b0390911681526020016100ce565b6100ea61022c36600461130f565b610a84565b6100ea61023f366004611218565b610d60565b6060600061025160015490565b9050600080805b838110156102a8576000600581610270846001611510565b815260200190815260200160002060010154111561029657610293600184611510565b92505b806102a081611554565b915050610258565b5060008267ffffffffffffffff8111156102d257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561033257816020015b6040805160c08101825260008082526020808301829052928201819052606082018190526080820181905260a082015282526000199092019101816102f05790505b50905060005b84811015610448576000600581610350846001611510565b8152602001908152602001600020600101541115610436576000600581610378846001611510565b815260208082019290925260409081016000908120548082526005845290829020825160c0810184528154815260018201549481019490945260028101546001600160a01b039081169385019390935260038101548316606085015260048101549283166080850152600160a01b90920460ff16151560a0840152855190935090919085908790811061041b57634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610431600186611510565b945050505b8061044081611554565b915050610338565b50949350505050565b6000546001600160a01b031633146104845760405162461bcd60e51b815260040161047b906114c7565b60405180910390fd5b600054600160a01b900460ff16156104ae5760405162461bcd60e51b815260040161047b9061149d565b6104bc600180546001019055565b60006104c760015490565b600354604051630138280760e01b81529192506001600160a01b0316906301382807906104fa9086908690600401611418565b602060405180830381600087803b15801561051457600080fd5b505af1158015610528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054c9190611327565b506040805160c08101825282815260006020808301828152600380546001600160a01b03908116868801908152606087018681528b83166080890181815260a08a018981528c8a526005909852978a9020985189559451600189015590516002880180549184166001600160a01b031992831617905590519287018054938316939091169290921790915592516004909401805492511515600160a01b026001600160a81b0319909316949093169390931717905590517fa9a8fc8429e9d4b8fe54b38fd34cb56aaa1a9bf6eb605f45b223b08b58b97618906106329084815260200190565b60405180910390a2505050565b6000546001600160a01b031633146106695760405162461bcd60e51b815260040161047b906114c7565b610671610dfb565b565b600054600160a01b900460ff161561069d5760405162461bcd60e51b815260040161047b9061149d565b6000818152600560205260409020600401546001600160a01b031633146106ff5760405162461bcd60e51b81526020600482015260166024820152752cb7ba9030b932903737ba1034ba32b69037bbb732b960511b604482015260640161047b565b60008181526005602052604090206001015461074d5760405162461bcd60e51b815260206004820152600d60248201526c4974656d206e6f742073616c6560981b604482015260640161047b565b6003546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90610781903090339086906004016113f4565b600060405180830381600087803b15801561079b57600080fd5b505af11580156107af573d6000803e3d6000fd5b50505060008281526005602052604080822060018101929092556004909101805460ff60a01b19169055517fb1a176800c8fd3678d67204dac70aeb48aa9bb90b068dd8d94810161f12c68a9915061080a9083815260200190565b60405180910390a150565b6000546001600160a01b0316331461083f5760405162461bcd60e51b815260040161047b906114c7565b6106716000610e98565b6000546001600160a01b031633146108735760405162461bcd60e51b815260040161047b906114c7565b610671610ee8565b600054600160a01b900460ff16156108a55760405162461bcd60e51b815260040161047b9061149d565b60006108b060015490565b9050808311156108f85760405162461bcd60e51b8152602060048201526013602482015272125d195b48191bd95cc81b9bdd08195e1a5cdd606a1b604482015260640161047b565b6000838152600560205260409020600401546001600160a01b031633146109535760405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b604482015260640161047b565b600082116109a35760405162461bcd60e51b815260206004820152601e60248201527f5072696365206d75737420626520626967676572207468656e207a65726f0000604482015260640161047b565b6003546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906109d7903390309088906004016113f4565b600060405180830381600087803b1580156109f157600080fd5b505af1158015610a05573d6000803e3d6000fd5b505050600084815260056020908152604080832060018101879055600401805460ff60a01b1916905560035481513081529283018790529082019290925285925033916001600160a01b0316907f5bfe4f0f5242c27246d16b3be58a2bb6bba41fc761f0c24f081f810a650ab94c9060600160405180910390a4505050565b600054600160a01b900460ff1615610aae5760405162461bcd60e51b815260040161047b9061149d565b600081815260056020526040902060040154600160a01b900460ff1615610b0b5760405162461bcd60e51b8152602060048201526011602482015270125d195b48185b1c9958591e481cdbdb19607a1b604482015260640161047b565b600480546040516370a0823160e01b815233928101929092526001600160a01b0316906370a082319060240160206040518083038186803b158015610b4f57600080fd5b505afa158015610b63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b879190611327565b6000828152600560205260409020600101541115610bdb5760405162461bcd60e51b8152602060048201526011602482015270496e737566666963656e742066756e647360781b604482015260640161047b565b6000818152600560205260409020600401546001600160a01b0316331415610c3e5760405162461bcd60e51b815260206004820152601660248201527521b0b7103737ba10313abc90313c903434b6b9b2b63360511b604482015260640161047b565b60008181526005602052604090206004808201546001909201549054610c75926001600160a01b0391821692339290911690610f4d565b6003546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90610ca9903090339086906004016113f4565b600060405180830381600087803b158015610cc357600080fd5b505af1158015610cd7573d6000803e3d6000fd5b5050506000828152600560209081526040918290206004810180546001600160a81b03191633908117600160a01b179091556001909101548351918252918101859052918201527ffe2094c9ff56716cb07edf0cff82da158f346cb3bb2d89703228ab4eb0c329b6915060600160405180910390a1600090815260056020526040812060010155565b6000546001600160a01b03163314610d8a5760405162461bcd60e51b815260040161047b906114c7565b6001600160a01b038116610def5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161047b565b610df881610e98565b50565b600054600160a01b900460ff16610e4b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161047b565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff1615610f125760405162461bcd60e51b815260040161047b9061149d565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e7b3390565b610fa5846323b872dd60e01b858585604051602401610f6e939291906113f4565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610fab565b50505050565b6000611000826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166110829092919063ffffffff16565b80519091501561107d578080602001905181019061101e91906112ef565b61107d5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161047b565b505050565b6060611091848460008561109b565b90505b9392505050565b6060824710156110fc5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161047b565b843b61114a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161047b565b600080866001600160a01b0316858760405161116691906113d8565b60006040518083038185875af1925050503d80600081146111a3576040519150601f19603f3d011682016040523d82523d6000602084013e6111a8565b606091505b50915091506111b88282866111c3565b979650505050505050565b606083156111d2575081611094565b8251156111e25782518084602001fd5b8160405162461bcd60e51b815260040161047b919061148a565b80356001600160a01b038116811461121357600080fd5b919050565b600060208284031215611229578081fd5b611094826111fc565b60008060408385031215611244578081fd5b61124d836111fc565b9150602083013567ffffffffffffffff80821115611269578283fd5b818501915085601f83011261127c578283fd5b81358181111561128e5761128e611585565b604051601f8201601f19908116603f011681019083821181831017156112b6576112b6611585565b816040528281528860208487010111156112ce578586fd5b82602086016020830137856020848301015280955050505050509250929050565b600060208284031215611300578081fd5b81518015158114611094578182fd5b600060208284031215611320578081fd5b5035919050565b600060208284031215611338578081fd5b5051919050565b60008060408385031215611351578182fd5b50508035926020909101359150565b60008151808452611378816020860160208601611528565b601f01601f19169290920160200192915050565b8051825260208101516020830152604081015160018060a01b038082166040850152806060840151166060850152806080840151166080850152505060a0810151151560a08301525050565b600082516113ea818460208701611528565b9190910192915050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b038316815260406020820181905260009061109190830184611360565b6020808252825182820181905260009190848201906040850190845b8181101561147e5761146b83855161138c565b9284019260c09290920191600101611458565b50909695505050505050565b6020815260006110946020830184611360565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60c0810161150a828461138c565b92915050565b600082198211156115235761152361156f565b500190565b60005b8381101561154357818101518382015260200161152b565b83811115610fa55750506000910152565b60006000198214156115685761156861156f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122061d46d6301f9d049eb813d0a624a1e175bf5c4253220fcb3c2b49f4a2024f6c164736f6c63430008040033";

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
