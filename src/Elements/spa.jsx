import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
// Components =================
import NotLoggedIn from './notLoggedIn';
import LoggedIn from './loggedIn';
import NavBar from './Components/navbar';
import Depositwithdraw from "./depositwithdraw";
import History from "./history";
import AllData from './allData';
import UserContext from './Context/userContext';
import LoggedInUser from './Components/loggedInUser';
import ReferenceLinks from './Components/referencelinks';

function Spa() {
  const [user, setUser] = React.useState({});
  const userValue = React.useMemo(() => ({ user, setUser }), [user]);
  // console.log('SPA memoized value: ', userValue);

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
            <Route path="/balancehistory/" element={<History/>}/>
            <Route path="/alldata/" element={<AllData/>}/>
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