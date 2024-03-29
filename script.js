var account = null;
var contract = null;

//funcation to get contract info variables from local file 
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
	//connectWallet function to connect wallet and get account address
	getVariables();
	account = await connectWallet();

	//wallet information
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

	//get contract balances, total deposit, earned dividend, withdrawn info and next withdraw date by default 
	console.log("Getting balances...");
	getBalanceAllContracts();
	console.log("Getting total earned...");
	getDividendsAllContracts();
	console.log("Getting total deposit...");
	getDepositsAllContracts();
	console.log("Getting total withdrawn...");
	getWithdrawnAllContracts();
	console.log("Getting next withdraw date...");
	getNextWithdrawDate();
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
			if((balance / 1000000000000000000) == 0){
				document.getElementById(contract + "Balance").textContent = document.getElementById(contract + "Balance").textContent + " (R.I.P.)";
			} else {
				document.getElementById(contract + "Balance").textContent = document.getElementById(contract + "Balance").textContent + " (Low)";
			}
			document.getElementById(contract + "Balance").bgColor = "red";
			document.getElementById(contract + "Balance").style.color = "white";
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
	document.getElementById("totalDeposit").style.color = "red";
	document.getElementById("totalDeposit").style.fontWeight = "normal";
}

//func to get total earned of all contracts and show on page
const getDividendsAllContracts = async () => {
	var totalDividend = 0;
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		var dividend = await contractInstance.allDividend(account);
		if (dividend) {
			document.getElementById(contract + "Dividend").textContent = (dividend / 1000000000000000000).toFixed(2);
			if(dividend > 0){
				document.getElementById(contract + "Dividend").style.color = "green";
			}
			totalDividend += Number(dividend);
		}
	}
	document.getElementById("totalDividend").textContent =  (totalDividend / 1000000000000000000).toFixed(2);
	document.getElementById("totalDividend").style.color = "green";
	document.getElementById("totalDividend").style.fontWeight = "normal";
}

//func to get total withdrawn of all contracts and show on page
const getWithdrawnAllContracts = async () => {
	var totalWithdrawn = 0;
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		var withdrawn = await contractInstance.allWithdrawn(account);
		if (withdrawn) {
			document.getElementById(contract + "Withdrawn").textContent = (withdrawn / 1000000000000000000).toFixed(2);
			document.getElementById(contract + "Withdrawn").style.color = "green";
			totalWithdrawn += Number(withdrawn);
		}else{
			document.getElementById(contract + "Withdrawn").textContent = "N/A";
			document.getElementById(contract + "Withdrawn").style.color = "red";
		}
	}
	document.getElementById("totalWithdrawn").textContent =  (totalWithdrawn / 1000000000000000000).toFixed(2);
	document.getElementById("totalWithdrawn").style.color = "green";
	document.getElementById("totalWithdrawn").style.fontWeight = "normal";
}

//func to get next withdraw date from each contract and show on page
const getNextWithdrawDate = async () => {
	for (let i = 0; i < ContractNames.length; i++) {
		let contract = ContractNames[i];
		let contractInstance = eval(contract + "Contract");
		var nextWithdrawDate = await contractInstance.getNextWithdrawDate(account);
		if (nextWithdrawDate) {
			document.getElementById(contract + "NextWithdrawDate").textContent = nextWithdrawDate;
			if(nextWithdrawDate == "Withdrawable"){
				document.getElementById(contract + "NextWithdrawDate").style.color = "green";
			} else if (nextWithdrawDate == "N/A" || nextWithdrawDate == "Not Invested"){
				document.getElementById(contract + "NextWithdrawDate").style.color = "red";
			}
		}
		else{
			document.getElementById(contract + "NextWithdrawDate").textContent = "N/A";
		}
	}
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

//function to add commas 
function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}