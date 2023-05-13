import React from 'react';
import CreateAccount from './Components/createaccount';
import Login from './Components/login';

function NotLoggedIn() {
	// const {user, setUser} = React.useContext(UserContext);

	// const [dshow, setDshow] 							= React.useState(true);

	// setTimeout(() => {
	// 	console.log(Object.keys(userValue.user).length < 1)
	// 	console.log(Object.keys(userValue.user).length)
	// }, 0);
	// const userValue = React.useMemo(() => ({ user, setUser }), [user]);
	// const display = React.useMemo(() => ({ dshow, setDshow }), [dshow]);

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
					<div className="my-5">
						<div className="my-5">
							<p>- or -</p>
						</div>
					</div>
					<Login/>
			</div>
		</>
	);
}

export default NotLoggedIn;