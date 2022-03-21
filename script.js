var account = null;
var contract = null;

//0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0 matic token address
//funcation get variables from local file 
function getVariables() {
	var request = new XMLHttpRequest();
	request.open('GET', 'ContractList.json', false);
	request.send(null);
	JSONdata = JSON.parse(request.responseText);
	Object.keys(JSONdata).forEach(function (key) {
		var address = key.toString() + "Address";
		var abi = key.toString() + "Abi";
		eval(address + '= JSONdata[key].address;');
		eval(abi + '= JSONdata[key].abi;');
	});
	ContractNames = Object.keys(JSONdata);
	return ContractNames;
}

//anonymous async function to initialize await values
(async () => {
	//call connectWallet function to connect wallet and get account address
	getVariables();
	account = await connectWallet();

	//get wallet information
	accbalance = await web3.eth.getBalance(account);
	document.getElementById("wallet-address").textContent = account;
	document.getElementById("wallet-balance").textContent = (accbalance / 1000000000000000000).toFixed(4) + " MATIC";

	//initialize contracts
	for (var i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let address = eval(contract + "Address");
		let abi = eval(contract + "Abi");
		let contractInstance = new ContractDetails(abi, address);
		eval(contract + "Contract = contractInstance");
		//Withdraw from each contract
		document.getElementById(contract + "Button").onclick = () => {
			withdrawEarned(contract);
		}
		//Reinvest from each contract
		document.getElementById(contract + "ReinvestButton").onclick = () => {
			reinvestEarned(contract);
		}
	}

	//get contract balances, total deposit and earned dividend by default 
	console.log("Getting balances...");
	getBalanceAllContracts();
	console.log("Getting total earned...");
	getDividendsAllContracts();
	console.log("Getting total deposit...");
	getDepositsAllContracts();
})();

// initialize to connect wallet using metamask
async function connectWallet() {
	if (window.ethereum) {
		//check wallet chain and set to polyoh
		await window.ethereum.send('eth_requestAccounts');
		window.web3 = new Web3(window.ethereum);

		var accounts = await web3.eth.getAccounts();

		account = accounts[0];
		return account;
	}
}

//func to get contract balance of all contracts and show on page
const getBalanceAllContracts = async () => {
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		let balance = await contractInstance.getBalance();
		console.log(balance);
		document.getElementById(contract + "Balance").textContent = numberWithCommas((balance / 1000000000000000000).toFixed(0));
		if ((balance / 1000000000000000000) < 20000) {
			document.getElementById(contract + "Balance").style.color = "red";
			document.getElementById(contract + "Balance").style.fontWeight = "normal";
		}
	}
}

//func to get deposits of all contracts and show on page
const getDepositsAllContracts = async () => {
	var totalDeposit = 0;
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		var deposit = await contractInstance.allDeposits(account);
		if (deposit) {
			document.getElementById(contract + "Deposit").textContent = (deposit / 1000000000000000000).toFixed(2);
			totalDeposit += Number(deposit);
		}
	}
	document.getElementById("totalDeposit").textContent =  (totalDeposit / 1000000000000000000).toFixed(2);
}

//func to get total earned of all contracts and show on page
const getDividendsAllContracts = async () => {
	var totalDividend = 0;
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		var dividend = await contractInstance.allDividend(account);
		if (dividend[0]) {
			document.getElementById(contract + "Dividend").textContent = (dividend[0] / 1000000000000000000).toFixed(2);
			totalDividend += Number(dividend[0]);
		}
	}
	document.getElementById("totalDividend").textContent =  (totalDividend / 1000000000000000000).toFixed(2);
}

//func to withdraw and send aleret on click
const withdrawEarned = async (contract) => {
	let contractInstance = eval(contract + "Contract");
	console.log("Withdrawing from " + contract);
	if (contractInstance) {
		var withdraw = await contractInstance.withdrawEarned(account);
		console.log(withdraw);
		alert("Withdraw request sent.");
	}
}

//func to reinvest earned dividend by default
const reinvestEarned = async (contract) => {
	let contractInstance = eval(contract + "Contract");
	console.log("Reinvesting from " + contract);
	if (contractInstance) {
		var reinvest = await contractInstance.reinvestEarned(account);
		console.log(reinvest);
		alert("Reinvest request sent.");
	}
}

//function to get matic price from public api
const getMaticPrice = async () => {
	const response = await fetch('https://rpc-mainnet.matic.today/v1/price/latest');
	const data = await response.json();
	console.log(data);
	document.getElementById("maticPrice").textContent = data.data.price.toFixed(4) + " USD";
}

const sendSMSall = async () => {
	const response = await fetch('https://maker.ifttt.com/trigger/matic_down/with/key/bO6dgTdivMr7LBh4l5kPSr');
	console.log("Alerted Users!");
}


//function to add commas 
function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}