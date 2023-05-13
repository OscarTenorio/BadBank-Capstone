import React from 'react';
import Card from './card';
import UserContext from '../Context/userContext';

function AtAGlance() {
	// const ctx = React.useContext(UserContext);
	const { user } = React.useContext(UserContext);
	const lastActivity = user.history[user.history.length - 1]
	// console.log('AT A GLANCE plucked values: User: ', user)

	function Rows() {
		 return (
			<>
				<td>{lastActivity.timestamp}</td>
				<td>{lastActivity.type}</td>
				<td>${lastActivity.amount}</td>
				<td>${lastActivity.balance}</td>
			</>
		)
	}

	function latestActivity(){
		// console.log("latestActivity");
		return (
			<>
			<table className="table">
					<thead>
						<tr>
							<th scope="col">When</th>
							<th scope="col">Type</th>
							<th scope="col">Amount</th>
							<th scope="col">Balance</th>
						</tr>
					</thead>
					<tbody>
					<tr>
						{ lastActivity && <Rows/>	}
					</tr>
					</tbody>
				</table>
				{ !lastActivity ? (
					<div className="d-flex justify-content-center" >
						<p className="mx-auto" style={{color: "lightgray"}}>Nothing Here Yet</p>
					</div>
					) : (
						<></>
					)
				}
			</>
		)
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
					<h3 className="text-center">Balance: <span className="text-primary">${user.balance}</span><br></br></h3>
					<p className="text-center mt-3 mb-1">Latest Activity:</p>
					{latestActivity()}
				</>)}
			/>
		</div>
	);
}

export default AtAGlance;