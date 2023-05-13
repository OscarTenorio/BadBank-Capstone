import React from 'react';
import Card from './card';

function NewFeatures() {
	return(
		<>
			<div className="d-flex justify-content-center">
				<Card
					width="60%"
					margin="m-3"
					extra="d-inline-block"
					txtcolor="black"
					headerbgcolor="bg-muted"
					header="Upcoming Features in v1.0.1:"
					text={(<>
						<span className="d-flex justify-content-center">
							<p>
								&#8594; Enrollment in different account types<br></br>
								&#8594; Test coverage using Jest<br></br>
								&#8594; Different authentication levels for users<br></br>
								&#8594; Login Error Handling
								<br></br>
							</p>
						</span>
					</>)}
				/>
			</div>
			<div>
				<p className="text-center">Stay tuned for more!</p>
			</div>
		</>
	);
}

export default NewFeatures;