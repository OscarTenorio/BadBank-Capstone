import React from 'react';
import UserContext from '../Context/userContext';
import Card from './card';

function Login() {
	const [show, setShow] 				= React.useState(true)
	const [status, setStatus] 			= React.useState('* Required');
	const [loginButton, setLoginButton] = React.useState(false)
	const [email, setEmail] 			= React.useState('');
	const [password, setPassword] 		= React.useState('');
	const {user, setUser}				= React.useContext(UserContext);

	// basic validation stuff
	function validate(field, label) {
		if (!field) {
			setStatus('ERROR: ' + label + ' cannot be blank');
			setTimeout(() => setStatus('* Required'), 5000);
			return false;
		}
		setLoginButton(true);
		return true;
	}

	function buttonClass() {
		if (loginButton) {
			return 'btn btn-primary text-center'
		}
			return 'btn btn-primary text-center disabled'
	};

	function handleLoginButton(field, value) {
		if (field === 'email') {
			setEmail(value);
			if (email.length > 1 && password.length > 1) {
				setLoginButton(true);
			} else {
				setLoginButton(false);
			};
		} else if (field === 'password') {
			setPassword(value);
			if (email.length > 1 && password.length > 1) {
				setLoginButton(true);
			} else {
				setLoginButton(false);
			};
		};
	};

	function handleLogin() {
		const endpointUrl = 'http://localhost:3001';

		if (!validate(email, 		'email')) return;
		if (!validate(password, 'password')) return;
		// console.log("HANDLE LOGIN: Email: ",String(email),", Password: ",String(password));

		//atttempt login with db credentials =======================
		(async () => {
			var res = await fetch(endpointUrl + `/account/login/${email}/${password}`);
			var jsonResponse = await res.json();
			
			// throw error if login failed <--- currently does not work
			if (JSON.stringify(jsonResponse).includes('failed')){
				setStatus('Email or Password are incorrect');
				setTimeout(() => setStatus('* Required'), 5000);
			} else {
				setShow(false);
				setStatus('');
				setLoginButton(false);
				// update current user state after 5 seconds
				setTimeout(() => {
					setUser({name:jsonResponse.name, email:jsonResponse.email, password:jsonResponse.password, balance:jsonResponse.balance, history:jsonResponse.history});
				}, 5000);
				// console.log('JSON Response History: ', jsonResponse.history);
			};
		})();
	};


	return (
		<div>
			<Card 
				bgcolor="primary"
				header="Returning User"
				status={status}
				margin="mx-5 mt-5 mb-3"
				extra="d-inline-block"
				text={ show ? (
					<>
						<p>Email Address <span className="text-info">*</span>
							<input type="input" className="form-control" id="loginemail" placeholder="Enter Email" onChange={e => { {handleLoginButton('email', e.currentTarget.value)} }}/>
						</p>
						<p>Password <span className="text-info">*</span>
							<input type="password" className="form-control" id="loginpassword" placeholder="Enter Password" onChange={e => { {handleLoginButton('password', e.currentTarget.value)} }}/>
						</p>
					</>
				) : (
					<>
					<h1 className="text-center">Success!</h1>
					{(<img src={process.env.PUBLIC_URL + '/green_check.png'}
					className="mx-auto d-block" alt="Gold Coins PNG" style={{maxWidth:'100%', maxHeight:'50px'}}
					></img>)}
					<p className="text-center my-2">Hold tight, we're taking you to the Homepage...</p>
				</>
				)}
			/>
			<div className="text-center">
				{ show && (<button type="submit" className={buttonClass()} style={{minWidth:"7rem"}} onClick={handleLogin}>Login</button>)}
			</div>
		</div>
	);
}

export default Login;