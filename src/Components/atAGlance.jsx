import React from 'react';
import Card from './card';
import UserContext from './userContext';

function AtAGlance() {
	const ctx = React.useContext(UserContext);
	const {user, setUser} = React.useContext(UserContext);
	console.log('plucked values: User: ', user)
	console.log('AT A GLANCE ctx: ', ctx)

	function latestActivity(){
		console.log("latestActivity");
	};

	return(
		<div className="d-flex justify-content-center">
			<Card
				width="60%"
				margin="m-3"
				extra="d-inline-block"
				txtcolor="black"
				headerbgcolor="bg-primary"
				headercolor="text-white"
				header="Your Account At A Glance"
				text={(<>
					<h5 className="text-center">Balance: <span className="text-primary">${ctx.user.balance}</span><br></br></h5>
					<p className="text-center mt-3">Latest Activity:</p>
					{latestActivity()}
				</>)}
			/>
		</div>
	);
}

export default AtAGlance;