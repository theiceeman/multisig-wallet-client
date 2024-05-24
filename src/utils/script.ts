
import Web3 from 'web3';
import { BigNumber } from "@ethersproject/bignumber";

declare global {
    interface Window {
        ethereum?: any;
        web3: any;
    }
}


const SWAP_ROUTER_ADDRESS_BSC = '0xe41f0FF3f4d90Bb1c4e32714532e064F9eA95F19';
const ASSET_CHAIN_TEST_CHAIN_ID = 56;


// const SWAP_ROUTER_ADDRESS_MATIC = '0x2F34767898CbCb2cd24F86AC4E61C785D49B2df7';
// const MATIC_CHAIN_ID = 137;



export async function connectToBrowserProvider() {
    const { ethereum } = window;
    if (ethereum) {
        if (ethereum) {
            window.web3 = new Web3(ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }

        await confirmUserNetwork()

        let address = await getAddress()
        console.log({ address })
        return address;

    } else {
        console.log("Please install a browser wallet...");
    }
}
export async function loadProvider() {
    const { ethereum } = window;
    if (!ethereum) {
        console.log("Please install a browser wallet...");
        return;
    }
    if (ethereum) {
        window.web3 = new Web3(ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    return window.web3
}
async function confirmUserNetwork() {
    const { ethereum } = window;

    if (!ethereum) {
        console.error("Browser is not Web3 enabled. Install MetaMask!");
        return;
    }
    let userChainId = await ethereum.request({ method: "eth_chainId" });
    console.log("User is connected to chain " + userChainId);

    // String, hex code of the chainId of the  network
    let ChainId = '0x38';
    let networkName = "BSC";

    if (userChainId !== ChainId) {
        console.error("You are not connected to the " + networkName + " Network!");
        return;
    } else {
        console.log("Connected to " + networkName + " Network")
    }

}

const connectedNetworkChainId = async () => {
    const { ethereum } = window;
    if (!ethereum) {
        console.error("Browser is not Web3 enabled. Install MetaMask!");
        return;
    }
    let userChainId = await ethereum.request({ method: "eth_chainId" });
    return parseInt(userChainId, 16)
}

export const getAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
};

const getNetworkName = (chainId: any) => {
    switch (chainId) {
        case 1:
            return 'Ethereum Mainnet';
        case 56:
            return 'BSC';
        case 137:
            return 'MATIC';
        case 567:
            return 'Fantom';
        default:
            return 'Unknown Network';
    }
}

// export async function swap(destinationToken, sourceToken, sourceAmount, address) {
//     let _sourceAmount = BigNumber.from((sourceAmount * 10 ** 18)
//         .toLocaleString('fullwide', { useGrouping: false }));
//     let url = `https://stake.xend.tools/networks/${MATIC_CHAIN_ID}/trades?destinationToken=${destinationToken}&sourceToken=${sourceToken}&sourceAmount=${_sourceAmount}&slippage=3&timeout=10000&walletAddress=${address}`;

//     let result = await Request.get(url)
//     if (result.data) {
//         let swapData = result.data;
//         let tradeData = swapData[0].trade.data;

//         let client = await loadProvider()
//         let txn = await client.eth.sendTransaction({
//             from: address,
//             to: SWAP_ROUTER_ADDRESS_MATIC,
//             data: tradeData,
//             value: _sourceAmount,
//             gas: 300000,   //   300000 GAS
//             gasPrice: 500000000000  //  wei
//         })

//         console.log({ txn })
//     }
// }

// async function processTokenBridgeDetails(bridgeData, destinationNetwork, sourceToken) {
//     let tokenBridgingDetails;
//     bridgeData.forEach(e => {
//         if ((e.address).toLowerCase() == sourceToken.toLowerCase()) {
//             tokenBridgingDetails = e;
//         }
//     });
//     if (tokenBridgingDetails == undefined) {
//         console.error('Token bridging details not found!'); return;
//     }
//     let res;
//     Object.keys(tokenBridgingDetails?.destChains).reduce((accumulator, chainId) => {
//         console.log(tokenBridgingDetails?.destChains)
//         if (Number(chainId) == destinationNetwork)
//             res = { ok: true, destinationBridgeData: tokenBridgingDetails?.destChains[destinationNetwork] }
//     }, 0)

//     if (res) {
//         return res;
//     } else {
//         console.log("Destination not supported. Try another network.")
//         return { ok: false }
//     }
// }

// export async function bridge(destinationNetwork, sourceToken, amount, userAddress) {
//     let client = await loadProvider()
//     let connectedNetwork = await connectedNetworkChainId();
//     let url = `https://madwallet.xend.tools/bridge/${connectedNetwork}`;

//     let result = await Request.get(url)
//     if (!result.ok)
//         console.error('Anyswap api error!')

//     let bridgeData = result.data.data.data;
//     let destinationBridgeData = await processTokenBridgeDetails(bridgeData, destinationNetwork, sourceToken)
//     if (!destinationBridgeData.ok) {
//         return;
//     }
//     console.log(destinationBridgeData)



// }




