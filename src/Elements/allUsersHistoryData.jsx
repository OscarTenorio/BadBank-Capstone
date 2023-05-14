import React from 'react';
import UserContext from './Context/userContext';

function AllUsersHistoryData() {
	const endpointUrl = 'http://localhost:3006';
	// const endpointUrl = 'http://165.227.220.118:3006';
	const [data, setData] = React.useState(null);
	const {user}				= React.useContext(UserContext);


	// db query ========================
	React.useEffect(() => {
	const fetchData = async () => {
		var res = await fetch(endpointUrl + '/account/all');
		var jsonResponse = await res.json();
		// console.log('DATA jsonResponse: ', jsonResponse);
		setData(jsonResponse);
	}
	fetchData().catch(console.error);
	}, [user]);

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
	};


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
								return (<UserHistoryEntry historyentry={value} key={index + 1} id={index + 1}/>)
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
	function AllUsersHistory(props) {
		// generates a history table per user

		return props.data.map((user, index) => {
			return (
				<div style={{overflow:"scroll"}}>
					<UserHistoryTable user={user} key={index + 1} id={index + 1}/>
				</div>
			)
		})
	}

	

	// ============================================== return statement for AllData()
	return (
		<>
			<div className="p-5">
				<h1 className="text-center mb-0">All Activity Data</h1>
				<p className="text-center font-italic mb-4">across all accounts</p>
				{ data && <AllUsersHistory data={data} key={1} id={1}/>}
			</div>
		</>
	);
}; // end AllData()

export default AllUsersHistoryData;