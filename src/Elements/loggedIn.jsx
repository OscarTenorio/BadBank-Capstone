import React from 'react';
import NewFeatures from './Components/upcomingFeatures';
import AtAGlance from './Components/atAGlance';

function LoggedIn(user) {
	// console.log('LOGGEDIN user context: ', user)
	const userObject = user.user.user
	// ====== Time-related code =======
	let hour = new Date().getHours();
	let greeting = "Hello, "
	if (hour > 5 && hour < 12) {
		greeting = "Good Morning, ";
	} else if (hour > 12 && hour < 21) {
		greeting = "Good Afternoon, ";
	} else {
		greeting = "Good Evening, "; 
	}

	return(
		<>
			<div className="d-flex justify-content-center my-3">
				<div className="text-center">
					<h1 className="fs-1">{greeting}</h1>
					<h1 className="fs-1">{userObject.name}</h1>
				</div>
			</div>
			<AtAGlance/>
			<NewFeatures/>
		</>
	);
}

export default LoggedIn;