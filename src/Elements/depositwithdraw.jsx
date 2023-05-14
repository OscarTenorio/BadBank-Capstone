import React from 'react';
import Card from './Components/card';
import UserContext from './Context/userContext';
import Balance from './Components/balance';


function Depositwithdraw() {
	const {user, setUser}				= React.useContext(UserContext);
	// console.log('DEPWITH user value: ', user)
	// const endpointUrl = 'http://localhost:3006';
	const endpointUrl = 'http://165.227.220.118:3006';

	const [deposit, setDeposit] 								= React.useState(0);
	const [withdraw, setWithdraw] 							= React.useState(0);
	const [showDeposit, setShowDesposit] 				= React.useState(true);
	const [showWithdraw, setShowWithdraw] 			= React.useState(true);
	const [depositStatus, setDepositStatus] 		= React.useState('');
	const [withdrawStatus, setWithdrawStatus] 	= React.useState('');
	const [depositButton, setDespositButton] 		= React.useState(false)
	const [withdrawButton, setWithdrawButton]		= React.useState(false)


	function validate(field, label) {
		if (label == 'deposit' && !field || field < 0) {
			setDepositStatus('ERROR: Please enter a ' + label + ' amount number greater than 0');
			setTimeout(() => setDepositStatus(''), 5000);
			return false;
		}
		if (label == 'withdraw' && !field || field < 0) {
			setWithdrawStatus('ERROR: Please enter a ' + label + ' amount number greater than 0');
			setTimeout(() => setWithdrawStatus(''), 5000);
			return false;
		} else if (label == 'withdraw' && field > user.balance) {
			setWithdrawStatus('ERROR: Cannot ' + label + ' more than your Balance');
			setTimeout(() => setWithdrawStatus(''), 5000);
			return false;
		}
		setDespositButton(true);
		setWithdrawButton(true);
		return true;
	}


	function handleDeposit() {
		let now = String(new Date()).substr(0, 21)
		let formattedTimestamp = now.substring(0, 15) + " @" + now.substring(15, now.length)

		if (!validate(deposit, 'deposit')) {
			clearForm();
			return
		};
		user.balance += parseInt(deposit);
		// update user history =======================================
		var historyEntry = {
			name: user.name,
			email: user.email,
			type: "Deposit",
			amount: Math.abs(deposit),
			balance:user.balance,
			timestamp: formattedTimestamp
		}
		user.history.push(historyEntry);
		setShowDesposit(false);

	
		// enter deposit into DB =======================================
		(async () => {
			var res = await fetch(endpointUrl + `/account/update/Deposit/${user.history[user.history.length - 1].name}/${user.history[user.history.length - 1].email}/
				${user.history[user.history.length - 1].amount}/${user.history[user.history.length - 1].balance}/${user.history[user.history.length - 1].timestamp}`);
			var jsonResponse = await res.json();
			console.log('DEPOSIT JSON response: ',jsonResponse);
		})();
	}

	function handleWithdraw() {
		let now = String(new Date()).substr(0, 21)
		let formattedTimestamp = now.substring(0, 15) + " @" + now.substring(15, now.length)
		

		if (!validate(withdraw, 'withdraw')) {
			clearForm();
			return
		};
		user.balance -= parseInt(withdraw);
		// update user history =======================================
		var historyEntry = {
			name: user.name,
			email: user.email,
			type: "Withdrawal",
			amount: -Math.abs(withdraw),
			balance:user.balance,
			timestamp: formattedTimestamp
		}
		user.history.push(historyEntry);
		setShowWithdraw(false);


		// enter withdrawal into db =======================================
		(async () => {
			var res = await fetch(endpointUrl + `/account/update/Withdrawal/${user.history[user.history.length - 1].name}/${user.history[user.history.length - 1].email}/
				${user.history[user.history.length - 1].amount}/${user.history[user.history.length - 1].balance}/${user.history[user.history.length - 1].timestamp}`);
			var jsonResponse = await res.json();
			console.log('WITHDRAWAL JSON response: ',jsonResponse);
		})();	
	}

	function clearForm() {
		setDeposit(0);
		setWithdraw(0);
		setShowDesposit(true);
		setShowWithdraw(true);
	}

	function buttonClass(button) {
		let activeState = "btn btn-light"
		let inActiveState = "btn btn-light disabled"

		if (button === "withdrawButton") {
			if (withdrawButton) {return activeState} else { return inActiveState};
		} else if (button === "depositButton") {
			if (depositButton) {return activeState} else { return inActiveState};
		};
	}

	return(
		<>
			<Balance/>
			<div className="d-flex justify-content-center">
				<Card 
					bgcolor="success"
					header="Deposit"
					headercolor="text-white"
					margin="m-3 my-5"
					status={depositStatus}
					text={showDeposit ? (
						<>
							<div className="text-center">
								<p>Deposit Amount:</p>
							</div>
							<input type="number" className="form-control" id="deposit" placeholder="Enter Deposit"
								value={deposit} onChange={e => { setDeposit(e.currentTarget.value); setDespositButton(true) }}
							/>
							<br/>
							<div className="text-center">
								<button type="submit" className={buttonClass("depositButton")} onClick={handleDeposit}>Deposit</button>
							</div>
						</>
					) : (
						<>
							<h5 className="my-3 text-center">Success!</h5>
							<div className="text-center">
								<button type="submit" className="btn btn-light mb-2 mt-4" onClick={clearForm}>Continue</button>
							</div>
						</>
					)}
				/>
				<Card 
					bgcolor="warning"
					header="Withdraw"
					headercolor="text-white"
					margin="m-3 my-5"
					status={withdrawStatus}
					text={showWithdraw ? (
						<>
							<div className="text-center">
								<p>Withdrawal Amount:</p>
							</div>
							<input type="number" className="form-control" id="withdraw" placeholder="Enter Withdrawal"
								value={withdraw} onChange={e => { setWithdraw(e.currentTarget.value); setWithdrawButton(true) }}
							/>
							<br/>
							<div className="text-center">
								<button type="submit" id ="withdrawButton" className={buttonClass("withdrawButton")} onClick={handleWithdraw}>Withdraw</button>
							</div>
						</>
					) : (
						<>
							<h5 className="my-3 mx-auto text-center">Success!</h5>
							<div className="text-center">
								<button type="submit" className="btn btn-light mb-2 mt-4" onClick={clearForm}>Continue</button>
							</div>
						</>
					)}
				/>
			</div>
		</>
	);
}

export default Depositwithdraw;