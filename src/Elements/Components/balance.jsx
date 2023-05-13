import React from 'react';
import Card from './card';
import UserContext from '../Context/userContext';

function Balance() {
	const {user} = React.useContext(UserContext);
	// console.log('BALANCE user balance: ', user.balance)

	return(
		<Card
			txtcolor="white"
			headerClasses="text-center"
			bgcolor="primary"
			margin="mx-auto mt-5"
			header="Balance"
			balance={user.balance}
			text={<h3 className="text-center">${user.balance}</h3>}
		/>
	);
}

export default Balance;