const { Web3 } = require("web3");
const provider = "https://ethereum-sepolia.publicnode.com"
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);

const getBlockNumber = async (req, res) => {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        return res.json({ block_number: blockNumber.toString() });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

const getWalletBalance = async (req, res) => {
    try {
        const address = req.query.address;
        const walletBalance = await web3.eth.getBalance(address, "latest");
        const balanceConverted = web3.utils.fromWei(walletBalance, "ether");
        return res.json({ balance: balanceConverted.toString() });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}


module.exports = { getBlockNumber, getWalletBalance };