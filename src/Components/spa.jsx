import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
// Components =================
import NotLoggedIn from './notLoggedIn';
import LoggedIn from './loggedIn';
import NavBar from './navbar';
import Depositwithdraw from "./depositwithdraw";
import AllData from "./alldata";
import UserContext from './userContext';
import LoggedInUser from './loggedInUser';
import ReferenceLinks from './referencelinks';

function Spa() {
  const [user, setUser] = React.useState({});
  const userValue = React.useMemo(() => ({ user, setUser }), [user]);

  console.log('SPA memoized value: ', userValue);

  return (
    <>
      <HashRouter>
        <UserContext.Provider value={userValue}>
          { Object.keys(userValue.user).length > 0 ? (
            <>
              <NavBar/>
              <LoggedInUser user={userValue}/>
            </>
          ) : (
            <></>
          )}
          <Routes>
            { Object.keys(userValue.user).length > 0 ? (<Route path="/" element={<LoggedIn user={userValue}/>} exact/>) : (<Route path="/" element={<NotLoggedIn/>} exact/>)}
            <Route path="/depositwithdraw/" element={<Depositwithdraw/>}/>
            <Route path="/balancehistory/" element={<AllData/>}/>
            {/* <Route path="/alldatagraderequirement/" element={<AllDataGradeRequirement/>}/> */}
          </Routes>
        </UserContext.Provider>
      </HashRouter>
      <div className="d-flex justify-content-center mt-5">
        <ReferenceLinks/>
      </div>
    </>
  );
}

export default Spa;