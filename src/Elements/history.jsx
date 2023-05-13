import React from 'react';
import UserContext from './Context/userContext';

function History() {
	const ctx = React.useContext(UserContext);
	// const {user} = React.useContext(UserContext);
	const userObject = ctx.user

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
							<th scope="col">#</th>
							<th scope="col">When</th>
							<th scope="col">Activity Type</th>
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

	// ==============================================	// AllUsersHistory()
	// function AllUsersHistory(props) {
	// 	// generates a history table per user

	// 	return props.users.map((user, index) => {
	// 		return (
	// 			<div style={{overflow:"scroll"}}>
	// 				<UserHistoryTable user={props.user} key={1} id={1}/>
	// 			</div>
	// 		)
	// 	})
	// }

	// ============================================== return statement for AllData()
	return (
		<>
			<div className="p-5">
				<h1 className="text-center mb-0">Account Activity</h1>
				<UserHistoryTable user={userObject} key={1} id={1}/>
			</div>
		</>
	);

	// gotta figure out where to toss this, this is how the lecture connected the front-end to the back-end
	// const [data, setData] = React.useState('');

	// React.useEffect(() => {
	// 	// fetch all accounts from API
	// 	fetch('/account/all')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log(data);
	// 			setData(JSON.stringify(data));
	// 	});
	// }, []);

	// return (<>
	// 	<h5>All Data in Store:</h5>
	// 	{data}
	// </>);



} // end AllData()

export default History;