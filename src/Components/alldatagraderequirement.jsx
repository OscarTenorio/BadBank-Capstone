import React from 'react';
import UserContext from './userContext';
import ReferenceLinks from './referencelinks';
import Card from './card';

function AllDataGradeRequirement() {
	const ctx = React.useContext(UserContext);

  function AllDataCards(props) {
       
    return ( <div className="mx-5">
      {props.users.map((user, index) => {
      return <Card key={index}
        bgcolor="primary"
        width="100%"
        // extra="d-inline-block"
        header={(<h3>Name: {user.name}</h3>)}
        text={(
          <div className="d-flex justify-content-center">
            <h5 className="d-inline-block mx-3">Email: {user.email}</h5>
            <h5 className="d-inline-block mx-3">Password: {user.password}</h5>
          </div>
        )}
      />
    })}
    </div>
    )
  }

  return (
    <>
      <ReferenceLinks/>
      <AllDataCards users={ctx.users}/>
    </>
  );

}

export default AllDataGradeRequirement;