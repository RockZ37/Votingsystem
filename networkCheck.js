require('dotenv').config();
const { StargateClient } = require('@cosmjs/stargate');

// Use the SECRET_TESTNET_RPC_URL from the environment variables
const rpcUrl = process.env.SECRET_TESTNET_RPC_URL;

async function checkNetwork() {
    try {
        const client = await StargateClient.connect(rpcUrl);
        const chainId = await client.getChainId();
        console.log('Connected to chain:', chainId);
    } catch (error) {
        console.error('Network error:', error);
    }
}

checkNetwork();