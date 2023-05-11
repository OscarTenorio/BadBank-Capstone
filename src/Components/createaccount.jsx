import React from 'react';
import Card from './card';
import UserContext from './userContext';

function CreateAccount() {
	const [show, setShow] 							= React.useState(true);
	const [showCreateAccount, setShowCreateAccount]	= React.useState(true);
	const [status, setStatus] 						= React.useState('* Required');
	const [name, setName] 							= React.useState('');
	const [email, setEmail] 						= React.useState('');
	const [password, setPassword] 					= React.useState('');
	const [createButton, setCreateButton] 			= React.useState(false)
	const {user, setUser}							= React.useContext(UserContext);
	// const {accountCreated, setAccountCreated} 			= React.useContext(createdValue);


	function validate(field, label) {					// basic validation stuff
		if (!field) {
			setStatus('ERROR: ' + label + ' cannot be blank');
			setTimeout(() => setStatus('* Required'), 5000);
			return false;
		} else if (label === 'password' && password.length < 8) {
			setStatus('ERROR: ' + label + ' must be at least 8 characters');
			setTimeout(() => setStatus('* Required'), 5000);
			return false;
		}
		setCreateButton(true);
		return true;
	}

	function handleCreate() {
		const endpointUrl = 'http://localhost:3001';

		// validate entry =======================
		if (!validate(name, 		'name')) return;
		if (!validate(email, 		'email')) return;
		if (!validate(password, 'password')) return;
		console.log("HANDLE CREATE: Name: ",String(name),", Email: ",String(email),", Password: ",String(password));

		// store in db =======================
		(async () => {
			var res = await fetch(endpointUrl + `/account/create/${name}/${email}/${password}`);
			var jsonResponse = await res.json();
			console.log('CREATE ACCOUNT JSON response: ',jsonResponse);
		})();

		setShow(false);
		setShowCreateAccount(false);
		
		// update current user state after 5 seconds =======================
		setTimeout(() => {
			setUser({name:name, email:email, password:password, balance:0, history:[]});
		}, 5000);
	}

	function buttonClass() {
		if (createButton) {
			return 'btn btn-primary text-center'
		}
			return 'btn btn-primary text-center disabled'
	}

	// function clearForm() {
	// 	setName('');
	// 	setEmail('');
	// 	setPassword('');
	// 	setCreateButton(true);
	// 	setShowCreateAccount(false);
	// 	setShow(true);
	// }

	function handleCreateButton() {
		if (name.length > 1 && email.length > 1 && password.length > 1) {
			setCreateButton(true);
		} else {
			setCreateButton(false);
		}
	}

	return (
		<div>
			<Card 
				bgcolor="primary"
				header="Create Account"
				status={showCreateAccount ? status : ''}
				margin="mx-5 mt-5 mb-3"
				extra="d-inline-block"
				text={show ? (
					<>
						<p>Name <span className="text-info">*</span>
							<input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => { setName(e.currentTarget.value); handleCreateButton()}}/>
						</p>
						<p>Email Address <span className="text-info">*</span>
							<input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => { setEmail(e.currentTarget.value); handleCreateButton()}}/>
						</p>
						<p>Password <span className="text-info">*</span>
							<input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => { setPassword(e.currentTarget.value); handleCreateButton()}}/>
						</p>
					</>
				) : (
					<>
						<h1 className="text-center">Success!</h1>
						<p className="text-center my-2">Hold tight, we're taking you to the Homepage...</p>
						{(<img src={process.env.PUBLIC_URL + '/gold_coins.png'}
						className="mx-auto d-block" alt="Gold Coins PNG" style={{maxWidth:'100%', maxHeight:'200px'}}
						></img>)}
					</>
				)}
			/>
			<div className="text-center">
				{ show && (<button type="submit" className={buttonClass()} id="createAccountButton" onClick={handleCreate}>Create Account</button>) }
			</div>
		</div>
	);
}

export default CreateAccount;