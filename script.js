var account = null;
var contract = null;

//0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0 matic token address

const stableoneAddressV1 = "0x9fd1836885e44EE084A2Ae479982540b0Ba48f04";
const stableoneAbiV1 = [{"inputs":[{"internalType":"address payable","name":"_primaryAddress","type":"address"},{"internalType":"address payable","name":"_secondaryAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnInvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnReinvest","type":"event"},{"inputs":[],"name":"activeInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"calculateDividendsAndautoReinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"}],"name":"changePrimaryBenificiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"}],"name":"changeSecondaryBenificiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInformation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getInvestments","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getInvestorRefs","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ref","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdraw","type":"uint256"},{"internalType":"uint256","name":"totalReinvest","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryBenificiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"secondaryBenificiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReferralReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReinvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const stableoneAddressV2 = "0xe306726C970210541954f25191cB188b6771d9E0";
const stableoneAbiV2 = [{"inputs":[{"internalType":"address payable","name":"_primaryAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnInvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnReinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"}],"name":"changePrimaryBenificiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInformation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getInvestorRefs","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ref","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdraw","type":"uint256"},{"internalType":"uint256","name":"totalReinvest","type":"uint256"},{"internalType":"uint256","name":"dividends","type":"uint256"},{"internalType":"uint256","name":"totalRef","type":"uint256"},{"internalType":"uint256","name":"investmentCount","type":"uint256"},{"internalType":"uint256","name":"depositTime","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"payoutOf","outputs":[{"internalType":"uint256","name":"payout","type":"uint256"},{"internalType":"uint256","name":"max_payout","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryBenificiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReferralReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReinvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const maticstakerAddress = "0xDa3F4D9509C1881F0661BC943Db23024b7DE2f82";
const maticstakerAbi = [{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"},{"internalType":"uint256","name":"startDate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"FeePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROJECT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"commissionWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"startUNIX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

//use class and object to create multiple contract details
class ContractDetails {
	constructor(contractAbi, contractAddress) {
		this.contractAddress = contractAddress;
		this.contractAbi = contractAbi;
		this.contract = new web3.eth.Contract(contractAbi, contractAddress);
	}
	//balance of contract
	async getBalance() {
		const balance = await web3.eth.getBalance(this.contractAddress);
		return balance;
	}
	//get dividends with input address
	async getDividends(address) {
		const dividends = await this.contract.methods.getDividends(address).call();
		return dividends;
	}
	//get investors data from contract method (Stableone contract method)
	async getInvestorsData(address) {
		//[address, referralAddress, totalDeposit, totalWithdraw, totalreInvest]
		const investorsData = await this.contract.methods.investors(address).call();
		return investorsData;
	}

	//get contract information (Stableone contract method)
	async getContractInformation() {
		const contractInformation = await this.contract.methods.getContractInformation().call();
		return contractInformation;
	}
	//get dividends from contract method (MaticStaker contract method)
	async getDividendsMaticstaker(address) {
		const dividends = await this.contract.methods.getUserDividends(address).call();
		return dividends;
	}
	//get total deposit from contract method (MaticStaker contract method)
	async getTotalDepositMaticstaker(address) {
		const totalDeposit = await this.contract.methods.getUserTotalDeposits(address).call();
		return totalDeposit;
	}
	//withdraw earned from contract method
	async withdrawEarned(address) {
		const withdraw = await this.contract.methods.withdraw().send({from: account});
		return withdraw;
	}
}

//anonymous async function to initialize await values
(async () => {
	//call connectWallet function to connect wallet and get account address
	account = await connectWallet();

	//get wallet information
	accbalance = await web3.eth.getBalance(account);
	document.getElementById("wallet-address").textContent = account;
	document.getElementById("wallet-balance").textContent = (accbalance / 1000000000000000000).toFixed(4) + " MATIC";

	//initialize contracts
	stableoneContract = new ContractDetails(stableoneAbiV1, stableoneAddressV1);
	stableoneContractV2 = new ContractDetails(stableoneAbiV2, stableoneAddressV2);
	maticstakerContract = new ContractDetails(maticstakerAbi, maticstakerAddress);

	//get contract balances, total deposit and earned dividend by default 
	getBalanceStableone();
	getBalanceStableoneV2();
	getBalanceMaticstaker();
	getTotalDepositStableone();
	getTotalDepositStableoneV2();
	getTotalDepositMaticstaker();
	getDividendStableone();
	getDividendStableoneV2();
	getDividendMaticstaker();

	//withdraw earned on click
	document.getElementById("withdraw-stableone-button").onclick = () => {
		withdrawEarnedStableone();
	}

	document.getElementById("withdraw-stableone-buttonV2").onclick = () => {
		withdrawEarnedStableoneV2();
	}

	document.getElementById("withdraw-maticstaker-button").onclick = () => {
		withdrawEarnedMaticstaker();
	}

})();

// initialize to connect wallet using metamask
async function connectWallet() {
	if(window.ethereum) {
		//check wallet chain and set to polyoh
		await window.ethereum.send('eth_requestAccounts');
		window.web3 = new Web3(window.ethereum);
		
		var accounts = await web3.eth.getAccounts();
		
		account = accounts[0];
		return account;
	}
}

//funcs to get contract balance and show on page
const getBalanceStableone = async () => {
	if (stableoneContract) {
		var stablebalance = await stableoneContract.getBalance();
		console.log(stablebalance);
		document.getElementById("stableBalance").textContent = (stablebalance / 1000000000000000000).toFixed(2) + " MATIC";
	}
}

const getBalanceStableoneV2 = async () => {
	if (stableoneContractV2) {
		var stablebalanceV2 = await stableoneContractV2.getBalance();
		console.log(stablebalanceV2);
		document.getElementById("stableBalanceV2").textContent = (stablebalanceV2 / 1000000000000000000).toFixed(2) + " MATIC";
	}
}

const getBalanceMaticstaker = async () => {
	if (maticstakerContract) {
		var maticstakerbalance = await maticstakerContract.getBalance();
		console.log(maticstakerbalance);
		document.getElementById("maticstakerBalance").textContent = (maticstakerbalance / 1000000000000000000).toFixed(2) + " MATIC";
	}
}

//funcs to get contract dividend and show on page
const getDividendStableone = async () => {
	if (stableoneContract) {
		var stabledividend = await stableoneContract.getDividends(account);
		console.log(stabledividend[0]);
		document.getElementById("stableDividend").textContent = (stabledividend[0] / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

const getDividendStableoneV2 = async () => {
	if (stableoneContractV2) {
		var stabledividendV2 = await stableoneContractV2.getDividends(account);
		console.log(stabledividendV2[0]);
		document.getElementById("stableDividendV2").textContent = (stabledividendV2[0] / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

const getDividendMaticstaker = async () => {
	if (maticstakerContract) {
		var maticstakerdividend = await maticstakerContract.getDividendsMaticstaker(account);
		console.log(maticstakerdividend[0]);
		document.getElementById("maticstakerDividend").textContent = (maticstakerdividend[0] / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

//funcs to get contract total deposits and show on page
const getTotalDepositStableone = async () => {
	if (stableoneContract) {
		var totalDeposit = await stableoneContract.getInvestorsData(account);
		console.log(totalDeposit[2]);
		document.getElementById("stableDeposit").textContent = (totalDeposit[2] / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

const getTotalDepositStableoneV2 = async () => {
	if (stableoneContractV2) {
		var totalDepositV2 = await stableoneContractV2.getInvestorsData(account);
		console.log(totalDepositV2[2]);
		document.getElementById("stableDepositV2").textContent = (totalDepositV2[2] / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

const getTotalDepositMaticstaker = async () => {
	if (maticstakerContract) {
		var totalDeposit = await maticstakerContract.getTotalDepositMaticstaker(account);
		console.log(totalDeposit);
		document.getElementById("maticstakerDeposit").textContent = (totalDeposit / 1000000000000000000).toFixed(4) + " MATIC";
	}
}

//funcs to withdraw and send aleret on click
const withdrawEarnedStableone = async () => {
	if (stableoneContract) {
		var withdraw = await stableoneContract.withdrawEarned(account);
		console.log(withdraw);
		alert("Withdraw request sent");
	}
}

const withdrawEarnedStableoneV2 = async () => {
	if (stableoneContractV2) {
		var withdrawV2 = await stableoneContractV2.withdrawEarned(account);
		console.log(withdrawV2);
		alert("Withdraw request sent");
	}
}

const withdrawEarnedMaticstaker = async () => {
	if (maticstakerContract) {
		var withdraw = await maticstakerContract.withdrawEarned(account);
		console.log(withdraw);
		alert("Withdraw request sent");
	}
}

//connect moralis API 
// const getMoralis = async () => {
