import React from 'react';
import UserContext from './Context/userContext';

function History() {
	// const ctx = React.useContext(UserContext);
	const {user} = React.useContext(UserContext);
	// const userObject = ctx.user

	// ============================================== UserHistoryEntry()
	function UserHistoryEntry(props) {
		// computes history data into a table row
		return (
			<tr>
				<th scope="row">{props.id + 1}</th>
				<td>{props.historyentry.timestamp}</td>
				<td>{props.historyentry.type}</td>
				<td>${props.historyentry.amount}</td>
				<td>${props.historyentry.balance}</td>
			</tr>
		)
		}


	// ============================================== UserHistoryTable()
	function UserHistoryTable(props){
		// generates user data, and determines whether to show empty state text or user history entries
		return (
			<div className="my-5">
			<hr style={{borderTop: "1px dotted gray"}}/>
				<div className="my-3 d-flex justify-content-center">
					<h5 className="text-center mx-5 d-inline-block"><span className="text-primary">Name | </span>{props.user.name}</h5>
					<h5 className="text-center mx-5 d-inline-block"><span className="text-primary">Email | </span>{props.user.email}</h5>
					<h5 className="text-center mx-5 d-inline-block"><span className="text-primary">Password | </span>{props.user.password}</h5>
				</div>
				<table className="table">
					<thead key={props.id}>
						<tr>
							<th scope="col"><p>#</p></th>
							<th scope="col">When</th>
							<th scope="col">Transaction Type</th>
							<th scope="col">Amount</th>
							<th scope="col">Balance</th>
						</tr>
					</thead>
					<tbody>
						{ 
							props.user.history.map((value, index) => {
								return (<UserHistoryEntry historyentry={value} key={index} id={index}/>)
							})
						}
					</tbody>
				</table>
				{ props.user.history.length < 1 ? 
					(<div className="mx-auto" style={{paddingTop: "4rem"}}>
						<h2 className="text-center" style={{color: "lightgray"}}>Wow, So Much Nothing</h2>
						<p className="text-center" style={{color: "lightgray"}}>Try visiting the Deposit/Withdraw tab as this User first</p>
					</div>
					) : (
						<></>
					)
				}
			</div>
		);
	}


	// ============================================== return statement for AllData()
	return (
		<>
			<div className="p-5">
				<h1 className="text-center mb-0">Account Activity</h1>
				<UserHistoryTable user={user} key={1} id={1}/>
			</div>
		</>
	);

} // end AllData()

export default History;