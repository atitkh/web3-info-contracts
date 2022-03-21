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
	//withdraw earned from contract method
	async withdrawEarned(address) {
		const withdraw = await this.contract.methods.withdraw().send({from: account});
		return withdraw;
	}
	//All dividends from contract method
	async allDividend(address) {
		console.log("getting dividends");
		var withdraw = [];
		//add try 
		try {
			withdraw.push(await this.contract.methods.getDividends(address).call());
			return withdraw;
		} catch (error) {
			console.log(error);
		}
		try{
			withdraw.push(await this.contract.methods.getUserAvailable(address).call());
			return withdraw;
		} catch (error) {
			console.log(error);
		}
	}

	async allDeposits(address){
		console.log("getting deposits");
		var deposits = [];
		//add try 
		try {
			deposits.push(await this.contract.methods.investors(address).call());
			return deposits[0][2];
		} catch (error) {
			console.log(error);
		}
		try{
			deposits.push(await this.contract.methods.getUserTotalDeposits(address).call());
			return deposits[0];
		} catch (error) {
			console.log(error);
		}
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
	
	//get total deposit from contract method (MaticStaker contract method)
	async getTotalDepositMaticstaker(address) {
		const totalDeposit = await this.contract.methods.getUserTotalDeposits(address).call();
		return totalDeposit;
	}
	
}