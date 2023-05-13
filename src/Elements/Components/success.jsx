import React from 'react';
import Card from '../card';

function Success(response) {

	return(
		<div className="d-flex justify-content-center">
			<Card
				bgcolor="primary"
				header={response}
				margin="mx-5 mt-5 mb-3"
				extra="d-inline-block"
				text={(<>
						<h1 className="text-center">Success!</h1>
						<p className="text-center my-2">Hold tight, we're taking you to the Homepage...</p>
						{(<img src={process.env.PUBLIC_URL + '/gold_coins.png'}
						className="mx-auto d-block" alt="Gold Coins PNG" style={{maxWidth:'100%', maxHeight:'200px'}}
						></img>)}
				</>)}
			/>
		</div>
	);
}

export default Success;