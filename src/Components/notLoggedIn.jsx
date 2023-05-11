import React from 'react';
import UserContext from './userContext';
import CreateAccount from './createaccount';
import Login from './login';

function NotLoggedIn() {
	// const {accountCreated, setAccountCreated}	= React.useContext(createdValue);
	const {user, setUser} = React.useContext(UserContext);
	const userValue = React.useMemo(() => ({ user, setUser }), [user]);

	return(
		<>
			<div className="d-flex justify-content-center mt-5">
				<div className="text-center mt-5">
					<h1 className='fs-1'>Welcome to the Bank!</h1>
					<p>To get started, Create an Account or<br></br>Login with previously created credentials</p>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<CreateAccount/>
				{ Object.keys(userValue.user).length < 1 ? (
					// maybe include a check for setShow in here too? to hide/display the other forms or something
					<>
						<div className="my-5">
							<div className="my-5">
								<p>- or -</p>
							</div>
						</div>
						<Login/>
					</>
				) : (<></>)
				}
			</div>
		</>
	);
}

export default NotLoggedIn;