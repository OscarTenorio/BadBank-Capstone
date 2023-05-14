import React from 'react';
import UserContext from '../Context/userContext';
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LoggedInUser(current){
  const {user, setUser}							= React.useContext(UserContext);
  const navigation = useNavigate();
  // console.log('LOGGED IN user context: ',user);
  // const url = "http://localhost:3000/"
  const url = "http://165.227.220.118:3000/"

  const logout = () => {
    setUser({});
  }

  return (
    <div className="d-flex justify-content-end mt-3">
      {/* vertical red line */}
      <div style={{"borderStyle":"hidden solid hidden hidden", "padding":"0px 15px", "borderColor":"red"}}>
        <h1 className="text-primary text-end">{String(user.name)}</h1>
        <p className="text-primary text-end">{String(user.email)}</p>
      </div>
      <div className="text-end m-3">
        <a className="btn btn-outline-primary text-center" id="test" aria-current="page" href={url} onClick={logout}>&#8614; Logout</a>
      </div>
    </div>
  )
};
  
export default LoggedInUser;