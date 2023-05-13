import React from 'react';
import UserContext from '../Context/userContext';

function LoggedInUser(current){
  const {user, setUser}							= React.useContext(UserContext);
  // console.log('LOGGED IN user context: ',user);
  const userObject = user // <---- yea I gotta sort this out here

  function logout(){
    setUser({});
  }

  return (
    <div className="d-flex justify-content-end mt-3">
      {/* vertical red line */}
      <div style={{"borderStyle":"hidden solid hidden hidden", "padding":"0px 15px", "borderColor":"red"}}>
        <h1 className="text-primary text-end">{String(userObject.name)}</h1>
        <p className="text-primary text-end">{String(userObject.email)}</p>
      </div>
      <div className="text-end m-3">
        <button className="btn btn-outline-primary text-center" id="test" aria-current="page" href="#" onClick={logout}>&#8614; Logout</button>
      </div>
    </div>
  )
};
  
export default LoggedInUser;