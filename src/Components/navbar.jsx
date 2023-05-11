import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

function NavBar() {
  // navbar tab states, used to render which is active
  const [homeIsActive, setHomeIsActive]       = React.useState(true);
  const [depwithIsActive, setDepwithIsActive] = React.useState(false);
  const [historyIsActive, setHistoryIsActive] = React.useState(false);


  // sorry it's a bit hardcoded, running into too-many-re-render errors so had to try this
  function toggleHomeActive(){
    setHomeIsActive(true);
    setDepwithIsActive(false);
    setHistoryIsActive(false);
  }

  function toggleDepwithActive(){
    setHomeIsActive(false);
    setDepwithIsActive(true);
    setHistoryIsActive(false);
  }

  function toggleHistoryActive(){
    setHomeIsActive(false);
    setDepwithIsActive(false);
    setHistoryIsActive(true);
  }

  function className(state){
    return state ? "nav-link active" : 'nav-link';
  }

  return(
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={className(homeIsActive)} name="Home" aria-current="page" href="#" onClick={toggleHomeActive}>
            <img src={process.env.PUBLIC_URL + '/house-48.png'} className="" alt="Home Icon PNG" style={{maxWidth:'12%',marginRight:"15px"}}></img>
            Bank Home
          </a>
        </li>
        <li className="nav-item">
          <a className={className(depwithIsActive)} name="DepWith" href="#/depositwithdraw/" onClick={toggleDepwithActive}>Deposit/Withdraw</a>
        </li>
        <li className="nav-item">
          <a className={className(historyIsActive)} name="History" href="#/balancehistory/" onClick={toggleHistoryActive}>History</a>
        </li>
      </ul>
    </>
  );
}

export default NavBar;