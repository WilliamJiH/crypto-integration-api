const axios = require("axios");
const { Web3 } = require("web3");
const provider = "https://ethereum-sepolia.publicnode.com";
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
};

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
};

const getTransaction = async (req, res) => {
  try {
    const hash = req.query.hash;
    const transaction = await web3.eth.getTransaction(hash);
    return res.json({
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      value: web3.utils.fromWei(transaction.value, "ether"),
      block_number: transaction.blockNumber.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getTransactionReceipt = async (req, res) => {
  try {
    const hash = req.query.hash;
    const transaction = await web3.eth.getTransactionReceipt(hash);
    return res.json({
      status: transaction.status.toString(),
      hash: transaction.transactionHash,
      contract_address: transaction.contractAddress,
      gas_used: transaction.gasUsed.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const address = req.query.address;
    const response = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=DAWS3QRDETC784RT8A41VUGAXXC4QG5G54`
    );
    const data = response.data;

    const filteredTransactions = data.result.map((transaction) => ({
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      value: web3.utils.fromWei(transaction.value, "ether"),
      receipt_status: transaction.txreceipt_status,
    }));

    return res.json({
      message: data.message,
      transaction_history: filteredTransactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getBlockNumber,
  getWalletBalance,
  getTransaction,
  getTransactionReceipt,
  getTransactionHistory,
};
