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
		const withdraw = await this.contract.methods.withdraw().send({ from: account });
		return withdraw;
	}

	//Reinvest earned from contract method
	async reinvestEarned(address) {
		const reinvest = await this.contract.methods.reinvest().send({ from: account });
		return reinvest;
	}

	//All dividends from contract method
	async allDividend(address) {
		console.log("getting dividends");
		var dividend;
		try {
			dividend = (await this.contract.methods.getDividends(address).call());
			return dividend;
		} catch (error) {
			console.log(error);
		}
		try {
			dividend = (await this.contract.methods.getUserAvailable(address).call());
			return dividend;
		} catch (error) {
			console.log(error);
		}
	}

	//get geposits from contract method
	async allDeposits(address) {
		console.log("getting deposits");
		var deposits;
		try {
			//get investors data from contract method : [address, referralAddress, totalDeposit, totalWithdraw, totalreInvest]
			deposits = (await this.contract.methods.investors(address).call());
			return deposits[2];
		} catch (error) {
			console.log(error);
		}
		try {
			deposits = (await this.contract.methods.getUserTotalDeposits(address).call());
			return deposits;
		} catch (error) {
			console.log(error);
		}
	}

	//get geposits from contract method
	async allWithdrawn(address) {
		console.log("getting total withdrawn");
		var withdrawn;
		try {
			//get investors data from contract method : [address, referralAddress, totalDeposit, totalWithdraw, totalreInvest]
			withdrawn = (await this.contract.methods.investors(address).call());
			return withdrawn[3];
		} catch (error) {
			console.log(error);
		}
		try {
			withdrawn = (await this.contract.methods.getUserTotalWithdrawn(address).call());
			return withdrawn;
		} catch (error) {
			console.log(error);
		}
	}

	//get contract information (Stableone contract method)
	async getContractInformation() {
		const contractInformation = await this.contract.methods.getContractInformation().call();
		return contractInformation;
	}
}